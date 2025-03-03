package responses

type ResourceMetaDataResponse struct {
	IsPrivate               bool
	IsPrivateForCurrentUser bool
	IsLiked                 bool
	Owner                   string
	Name                    string
	Type                    string
}
