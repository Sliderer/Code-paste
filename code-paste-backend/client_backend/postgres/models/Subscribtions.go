package models

import "gorm.io/gorm"

type Subscribtions struct {
	gorm.Model
	SubscriberId string `gorm:"not null"`
	Subscriber   User   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;not null"`
	PublisherId  string `gorm:"not null"`
	Publisher    User   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;not null"`
}
