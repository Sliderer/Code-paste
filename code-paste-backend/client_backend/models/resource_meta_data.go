package models

import (
	"encoding/json"
)

type ResourceMetaData struct {
	Title        string `json:"Title"`
	Path         string `json:"Path"`
	Owner        string `json:"Owner"`
	Password     string `json:"Password"`
	Preview      string `json:"Preview"`
	Type         string `json:"Type"`
	CreationTime uint64 `json:"CreationTime"`
}

func (i ResourceMetaData) MarshalBinary() ([]byte, error) {
	return json.Marshal(i)
}

func (i ResourceMetaData) HasPassword() bool {
	return len(i.Password) > 0
}
