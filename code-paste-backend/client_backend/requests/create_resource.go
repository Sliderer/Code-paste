package requests

type CreateResource struct {
	UserName         string
	UserId           string
	Password         string
	FileName         string
	FolderName       string
	Language         string
	HighlightSetting string
	TTL              int
	Data             []byte
}
