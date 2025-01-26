package main

import (
    "fmt"
    "log"

    "github.com/gin-gonic/gin"
    "github.com/Safe-Her-Purdue/backend/controllers"
    "github.com/Safe-Her-Purdue/backend/models"
    "github.com/Safe-Her-Purdue/backend/routes"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

var DB *gorm.DB

func main() {
    var err error

    // Set up the database connection
	dsn := "root:your_password@tcp(localhost:3306)/db?charset=utf8mb4&parseTime=True&loc=Local"
    DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("failed to connect to the database")
    }
    err = DB.AutoMigrate(&models.Incident{})
    if err != nil {
        log.Fatal("failed to migrate database")
    }
    fmt.Println("Database migrated!")
    fmt.Println("Database connected!")

    // Initialize the controller with the correct DB instance
    firebaseCredPath := "./firebase-key.json"
    controllers.InitializeController(DB, firebaseCredPath)

    r := gin.Default()

    // Register routes
    routes.RegisterRoutes(r)

    // Start the server
    r.Run(":8080")
}
