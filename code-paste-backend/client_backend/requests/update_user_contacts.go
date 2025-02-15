package requests

type UpdateUserContactsRequest struct {
	UserId string
	Value  string
	Field  string
}
