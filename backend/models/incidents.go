package models

type Incident struct {
    IncidentID string  `gorm:"primaryKey;type:char(36);not null" json:"incident_id"`
    Category   string  `gorm:"not null" json:"category"`
    Description string `gorm:"not null" json:"description"`
    Latitude   float64 `gorm:"not null" json:"latitude"`
    Longitude  float64 `gorm:"not null" json:"longitude"`
    Timestamp  int64   `gorm:"not null" json:"timestamp"` // Use Unix timestamp (milliseconds)
}
