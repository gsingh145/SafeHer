package routes

import (
    "github.com/gin-gonic/gin"
    "github.com/Safe-Her-Purdue/backend/controllers"
)

func RegisterRoutes(r *gin.Engine) {
	r.POST("/incidents", controllers.ReportIncident)  // Report a new incident
    r.GET("/incidents", controllers.GetIncidents)     // Get a list of all incidents
    r.GET("/incidents/filter", controllers.GetIncidentsByCategory)
    r.GET("/del", controllers.DeleteAll)
}
