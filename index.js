const express = require('express');
const axios = require('axios')
const dotenv = require('dotenv')
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'))

dotenv.config()
const baseUrl = process.env.API_BASE
const port = Number(process.env.APP_PORT) || 3000

app.get("/", async function (req, res) {
    let page = 0;
    let size = 12;

    if (req.query.page) {
        page = req.query.page
    }

    if (req.query.size) {
        size = req.query.size
    }

    const api = await queryPage(page, size)
    res.render("index", { data: api.data })
})

async function queryPage(page = 0, size = 12) {
    return await axios.get(`${baseUrl}/flight?page=${page}&size=${size}&sort=scheduledAt,asc`)
}

app.get("/about", async function (req, res) {
    res.render("about")
})

app.get("/flight/:id", async function (req, res) {
    if (!req.params.id) {
        res.redirect('/')
        return
    }

    const rsp = await axios.get(`${baseUrl}/flight/${req.params.id}`)
    res.render("flight", { data: rsp.data })
})

app.get("*", (req,res)=>{
    res.redirect('/')
})

app.listen(port, () => {
    console.log(`Application started on port ${port}`)
})