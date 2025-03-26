package telegram_bot

import (
	"log"

	. "notification_service/redis"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api/v5"
)

type BotFather struct {
	Bot *tgbotapi.BotAPI
}

func (botFather *BotFather) SendMessage(chatId int64, message string) {
	_, err := botFather.Bot.Send(tgbotapi.NewMessage(chatId, message))
	if err != nil {
		log.Println(err)
	} else {
		log.Println("sender")
	}
}

func (botFather *BotFather) StartBot(botToken string, redisClient *RedisClient, startedChan chan bool) {
	bot, err := tgbotapi.NewBotAPI(botToken)
	if err != nil {
		log.Panic(err)
	}

	bot.Debug = true

	log.Printf("Authorized on account %s", bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates := bot.GetUpdatesChan(u)

	botFather.Bot = bot
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
