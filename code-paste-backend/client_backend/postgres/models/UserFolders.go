package models

import "gorm.io/gorm"

type UserFolders struct {
	gorm.Model
	UserId     string `gorm:"not null"`
	User       User   `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	FolderPath string `gorm:"unique;not null"`
	ResourceId string `gorm:"type:varchar(128);unique;not null"`
}
