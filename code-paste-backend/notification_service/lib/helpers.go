package lib

import "fmt"

func CreateNotificationText(sender string) string {
	return fmt.Sprintf("Пользователь %v опубликовал новую запись", sender)
}
