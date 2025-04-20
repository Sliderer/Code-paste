package responses

type ResourceMetaDataResponse struct {
	IsPrivate               bool
	IsPrivateForCurrentUser bool
	IsLiked                 bool
	Owner                   string
	OwnerId                 string
	Name                    string
	Type                    string
	HighlightSetting        string
	Path                    string
}
