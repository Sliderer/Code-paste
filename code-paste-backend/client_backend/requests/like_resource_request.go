package models

type LikeResourceRequest struct {
	UserId       string `json:"UserId"`
	ResourceUuid string `json:"ResourceUuid"`
}
