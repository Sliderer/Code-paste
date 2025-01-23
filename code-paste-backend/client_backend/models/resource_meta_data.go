package models

import (
	"encoding/json"
)

type ResourceMetaData struct {
	Path     string `json:"Path"`
	Owner    string `json:"Owner"`
	Password string `json:"Password"`
}

func (i ResourceMetaData) MarshalBinary() ([]byte, error) {
	return json.Marshal(i)
}

func (i ResourceMetaData) HasPassword() bool {
	return len(i.Password) > 0
}
