const express = require('express')
const bodyParser = require('body-parser')
const mailer = require('./nodemailer')

const app = express()

const port = process.env.PORT || 9000

let user = undefined

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded( { extended: false } ))
app.post('/services', (req, res) => {
    if(!req.body.name) return res.sendStatus(400)
    const message = {
        to: 'tatanahrustaleva79@gmail.com',
        subject: "Заполненая анкета от пользователя.",
        text: `Полученные данные от пользователя:
                ФИО: ${req.body.name}
                Дата: ${req.body.date}
                Рост: ${req.body.growth} cm
                Вес: ${req.body.weight} kg
                Группа крови: ${req.body.group}
                Резус фактор: ${req.body.plus || req.body.minus}
                Адрес: ${req.body.adress}
                Брак: ${req.body.brack}
                Количество родов: ${req.body.pregnancy}
                Количество абортов: ${req.body.abortion}
                Последние роды: ${req.body.last}
                Родорозрешение: ${req.body.pregrancyLast}
                Желаемая компенсация: ${req.body.compinsation}
                Номер телефона: ${req.body.phoneNumber}
                Электронная почта: ${req.body.mail}
                Соглашение: ${req.body.consent}
                
        
        Обратного ответа не требует.
        `
    }
    mailer(message)
    user = req.body
    res.redirect('/services')
    
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/services', (req, res) => {
    if(typeof user !== 'object') return res.sendFile(__dirname + '/services.html')
    res.sendFile(__dirname + '/fromstelegram.html');
    user = undefined
})

app.listen(port, () => console.log(`server listening at http://localhost:${port}`))