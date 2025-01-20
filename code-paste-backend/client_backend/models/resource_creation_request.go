package models

type ResourceCreationRequest struct {
	Data     string `json:"Data"`
	Owner    string `json:"Owner"`
	Password string `json:"Password"`
}
