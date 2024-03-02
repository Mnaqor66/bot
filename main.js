require("dotenv").config()
const Cuybot = require("./app/Cuybot")

const token = process.env.TELEGRAM_TOKEN
const options = {
    polling: true
}

const cuybot = new Cuybot(token, options)
cuybot.getStart()
cuybot.getSticker()
cuybot.getGreetings()
cuybot.getFollow()
cuybot.getQuote()
cuybot.getNews()
cuybot.getQuake()
