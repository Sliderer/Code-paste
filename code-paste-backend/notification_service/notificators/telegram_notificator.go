package notificators

import (
	"log"

	. "notification_service/lib"
	. "notification_service/redis"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type TelegramNotificator struct {
	Bot         *tgbotapi.BotAPI
	RedisClient *RedisClient
}

func (notificator *TelegramNotificator) Notificate(sender, reciever string) error {
	chatId, _ := notificator.RedisClient.GetUserInfo(reciever)
	message := CreateNotificationText(sender)
	return notificator.SendMessage(chatId, message)
}

func (notificator *TelegramNotificator) SendMessage(chatId int64, message string) error {
	_, err := notificator.Bot.Send(tgbotapi.NewMessage(chatId, message))
	if err != nil {
		log.Println(err)
	}

	return err
}

func (notificator *TelegramNotificator) StartBot(botToken string, redisClient *RedisClient, startedChan chan bool) {
	bot, err := tgbotapi.NewBotAPI(botToken)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	notificator.Bot = bot
	notificator.RedisClient = redisClient
	startedChan <- true

	for update := range updates {
		if update.Message != nil {
			switch update.Message.Command() {
			case "start":
				charId := update.Message.Chat.ID
				userName := update.Message.From.UserName

				err := redisClient.SaveUserInfo(userName, charId)
				if err != nil {
					log.Println("Error getting user info: ", err)
					bot.Send(tgbotapi.NewMessage(update.Message.Chat.ID, "Не удалось зарегистрироваться, попробуйте еще раз"))
				} else {
					bot.Send(tgbotapi.NewMessage(update.Message.Chat.ID, "Пользователь успешно зарегистрирован"))
				}
			}
		}
	}
}
