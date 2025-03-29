package notificators

import (
	"net/smtp"

	. "notification_service/lib"
)

type EmailNotificator struct {
	OurAddress    string
	ServerAddress string
	ServerHost    string
	Password      string
	UserId        string
	Auth          smtp.Auth
}

func (notificator *EmailNotificator) Init() {
	notificator.Auth = smtp.PlainAuth("", notificator.UserId, notificator.Password, notificator.ServerHost)
}

func (notificator *EmailNotificator) Notificate(sender, reciever string) error {
	recievers := []string{
		reciever,
	}
	message := CreateNotificationText(sender)
	err := smtp.SendMail(notificator.ServerAddress, notificator.Auth, notificator.OurAddress, recievers, []byte(message))
	return err
}
