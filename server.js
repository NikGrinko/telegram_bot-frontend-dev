const TelegramBot = require('node-telegram-bot-api');
const userRegistration = require('./userRegistration');
const FileSystem = require('fs');
const privedData = require('./privedData');

const bot = new TelegramBot(privedData.TelegramToken, { polling: true });

bot.on('message', (msg) => {
    userRegistration(msg);

    const chatID = msg.chat.id;

    if (msg.text === 'Закрыть') {
        bot.sendMessage(chatID, 'Клавиатура закрыта', {
            reply_markup: {
                remove_keyboard: true
            }
        });
    } else {
        bot.sendMessage(chatID, `Здравствуйте, ${msg.from.first_name}\nВыберите необходимые файлы:`, {
            reply_markup: {
                keyboard: [
                    [{
                        text: 'Получить сниппеты'
                    }],
                    [{
                        text: 'FED code style'
                    }],
                    [{
                        text: 'Закрыть'
                    }]
                ]
            }
        });
    }
});

bot.onText(/Получить сниппеты/, msg => {
    const chatID = msg.chat.id;

    bot.sendMessage(msg.chat.id, 'Start uploading file...');

    bot.sendDocument(chatID, './bd.json').then(() => {
        bot.sendMessage(chatID, 'Uploading finish')
    });
})
