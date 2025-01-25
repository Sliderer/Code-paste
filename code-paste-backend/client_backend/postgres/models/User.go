package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Id       string `gorm:"primaryKey;autoIncrement:false`
	Name     string `gorm:"type:varchar(256);unique;not null"`
	Email    string `gorm:"type:varchar(256);unique;not null"`
	Telegram string `gorm:"type:varchar(256);"`
	Password string `gorm:"type:varchar(256);not null"`
}
