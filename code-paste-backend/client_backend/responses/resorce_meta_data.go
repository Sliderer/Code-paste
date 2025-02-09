package responses

type ResourceMetaDataResponse struct {
	IsPrivate               bool
	IsPrivateForCurrentUser bool
	Owner                   string
	Name                    string
}
