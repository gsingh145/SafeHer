package controllers

import (
    "context"
    "log"
    "net/http"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/Safe-Her-Purdue/backend/models"
    "gorm.io/gorm"
    "github.com/google/uuid"
    firebase "firebase.google.com/go/v4"
    fbdb "firebase.google.com/go/v4/db"
    "google.golang.org/api/option"
)

var (
    db         *gorm.DB
    firebaseApp *firebase.App
    firebaseDB  *fbdb.Client
)

// InitializeController sets the DB connection and Firebase instance
func InitializeController(database *gorm.DB, firebaseCredPath string) {
    db = database
    opt := option.WithCredentialsFile(firebaseCredPath)
    app, err := firebase.NewApp(context.Background(), &firebase.Config{
        DatabaseURL: "https://safeher-e7ec3-default-rtdb.firebaseio.com/", // Set the correct URL
    }, opt)
    if err != nil {
        log.Fatalf("Failed to initialize Firebase app: %v", err)
    }
    firebaseApp = app
   

    fbClient, err := app.Database(context.Background())
    if err != nil {
        log.Fatalf("Failed to connect to Firebase Database: %v", err)
    }
    firebaseDB = fbClient
}

func ReportIncident(c *gin.Context) {
    var incident models.Incident
    if err := c.ShouldBindJSON(&incident); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    incident.IncidentID = uuid.New().String()

    incident.Timestamp = time.Now().UnixNano() / int64(time.Millisecond)

    // Save to Gorm Database
    result := db.Create(&incident)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save incident"})
        return
    }

    // Save to Firebase Realtime Database
    ctx := context.Background()
    err := firebaseDB.NewRef("incidents/" + incident.IncidentID).Set(ctx, incident)
    if err != nil {
        log.Printf("Failed to save to Firebase: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save incident to Firebase"})
        return
    }

    c.JSON(http.StatusCreated, incident)
}

func GetIncidents(c *gin.Context) {
    var incidents []models.Incident

    oneHourAgo := time.Now().Add(-time.Hour).UnixNano() / int64(time.Millisecond)

    result := db.Where("timestamp > ?", oneHourAgo).Find(&incidents)

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch incidents"})
        return
    }

    c.JSON(http.StatusOK, incidents)
}

func GetIncidentsByCategory(c *gin.Context) {
    category := c.Query("category") // Get the category from query parameters

    if category == "" {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Category query parameter is required"})
        return
    }

    var incidents []models.Incident

    oneHourAgo := time.Now().Add(-time.Hour).UnixNano() / int64(time.Millisecond)

    result := db.Where("category = ? AND timestamp >= ?", category, oneHourAgo).Find(&incidents)

    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch incidents"})
        return
    }

    c.JSON(http.StatusOK, incidents)
}

func DeleteAll(c *gin.Context) {
    result := db.Exec("DELETE FROM incidents")
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete incidents from MySQL"})
        return
    }
    ctx := context.Background()
    ref := firebaseDB.NewRef("incidents")
    err := ref.Delete(ctx)  // Use Delete instead of Remove
    if err != nil {
        log.Printf("Failed to delete from Firebase: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete incidents from Firebase"})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Successfully deleted all incidents from MySQL and Firebase"})
}

