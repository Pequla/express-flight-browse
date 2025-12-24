import express from 'express'
import dotenv from 'dotenv'
import { FlightService } from './services/flight.service'
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))

dotenv.config()
const port = Number(process.env.APP_PORT) || 3000

app.get("/", async (req, res) => {
    let page = 0;
    let size = 12;

    if (req.query.page) {
        page = Number(req.query.page)
    }

    if (req.query.size) {
        size = Number(req.query.size)
    }

    const api = await FlightService.getFlights(page, size)
    res.render("index", { data: api.data })
})

app.get("/about", async (req, res) => {
    res.render("about")
})

app.get("/flight/:id", async (req, res) => {
    if (!req.params.id) {
        res.redirect('/')
        return
    }

    const rsp = await FlightService.getFlightById(req.params.id)
    res.render("flight", { data: rsp.data })
})

app.get("{/*path}", (req, res) => {
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Application started on port ${port}`)
})