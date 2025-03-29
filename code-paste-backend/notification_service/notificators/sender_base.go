package notificators

type INotificator interface {
	Notificate(sender, reciever string) error
}
