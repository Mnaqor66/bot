const TelegramBot = require("node-telegram-bot-api")
const commands = require("../libs/commands")

class Cuybot extends TelegramBot {
    constructor(token, options) {
        super(token, options)
    }
    getStart() {
        this.on("message", (data) => {
            this.sendMessage(data.from.id, "Hai")
        })
    }
    getSticker() {
        this.on("sticker", (data) => {
            this.sendMessage(data.from.id, data.sticker.emoji)
        })
    }
    getGreetings() {
        this.onText(/^!halo$/, (data) => {
            this.sendMessage(data.from.id, "Halo Juga Sayang💕")
        })
    }
    getFollow() {
        this.onText(/^!follow(.+)/, (data, after) => {
            this.sendMessage(data.from.id, `Kamu Mengirimkan: ${after[1]}`)
        })
    }
    getQuote() {
        this.onText(/^!quote$/, async (data) => {
            const quoteEndpoint = "https://api.kanye.rest/"
            try{
                const apiCall = await fetch(quoteEndpoint)
                const response = await apiCall.json()
        
                this.sendMessage(data.from.id, `Quotes hari ini untuk kamu: \n${response.quote}`)
            } catch(error) {
                console.log(error)
                this.sendMessage(data.from.id, "Maaf silahkan ulangi lagi😢")
            }
        })
    }
    getNews() {
        this.onText(/^!news$/, async (data) => {
            const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia"
            this.sendMessage(data.from.id, "Tunggu sebentar...")
            try {
                const apiCall = await fetch(newsEndpoint)
                const response = await apiCall.json()
                const maxNews = 5
        
                for (let i = 0; i < maxNews; i++){
                    const news = response.posts[i]
                    const {title, image, headline} = news
                    this.sendPhoto(data.from.id, image, {caption: `judul: ${title} \n\n${headline}`})
                }
            } catch(error) {
                console.log(error)
            }
        })
    }
    getQuake() {
        const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"

        try {
            this.onText(/^!quake$/, async (data) => {
                const apiCall = await fetch(quakeEndpoint)
                const response = await apiCall.json()
                const { gempa } = response.Infogempa
                const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman } = gempa


                this.sendMessage(data.from.id, `Info gempa terbaru ${Tanggal}/${Jam}\n\nWilayah: ${Wilayah}\nKekuatan: ${Magnitude}\nKedalaman: ${Kedalaman}`)
            })
        } catch(error) {
            console.log(error)
        }
    }
}

module.exports = Cuybot