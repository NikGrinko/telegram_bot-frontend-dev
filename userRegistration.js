const FileSystem = require('fs');

const userRegistration = (msg) => {

    // Считываем файлик Базы данных
    let userList = JSON.parse(FileSystem.readFileSync('bd.json', 'utf-8'));
    // Проверяем наличие пользователя в бд
    if (!userList.botUsers[msg.from.id]) {
        // Заполняем данные пользователя
        userList.botUsers[msg.from.id] = {
            id: msg.from.id,
            is_bot: msg.from.is_bot,
            first_name: msg.from.first_name,
            last_name: msg.from.last_name,
            username: msg.from.username,
            language_code: msg.from.language_code
        };
        // Обновляем бд с новой записью пользователя
        FileSystem.writeFile('bd.json', JSON.stringify(userList), (err) => {
            if (err) throw err;
            console.log('The file has been saved in userRegistration!');;
        })
    }
}



module.exports = userRegistration;