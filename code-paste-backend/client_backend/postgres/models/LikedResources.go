package models

import "gorm.io/gorm"

type LikedResources struct {
	gorm.Model
	UserId     string `gorm:"not null"`
	User       User   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	ResourceId string `gorm:"type:varchar(128);unique;not null"`
	IsActive   bool   `gorm:"type:bool;not null;default:true"`
}
