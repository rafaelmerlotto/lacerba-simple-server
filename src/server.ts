import express from "express";

const app = express()

app.get('/', (req, res) => {
    return res.status(200).send("<h1>Hello Rafael</h1> <p> Questo è il nostro primo server</p>");
})

app.get('/Ciao', (req, res) => {
    return res.send("<h1>Ciao Rafael</h1> <p> Questa è una pagina Ciao</p>");
})

app.get('*', (req, res) => {
    return res.status(404).send("<h1>404</h1> <p>Pagina non trovata</p>");
})

app.listen(3000, () => {
    console.log("Server started ad http://localhost:3000")
})