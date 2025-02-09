package notificators

type INotificator interface {
	Notificate(message, recieverId string)
}