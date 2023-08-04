import express from "express";

const app = express()

///?firstName=Rafael&lastName=Merlotto
app.get('/', (req, res) => {
    console.log(req.query)
    return res.send("<h1>Hello Rafael</h1> <p> Questo è il nostro primo server</p>");
})

app.get('/greeting/:name', (req, res) => {
    console.log(req.params)
    const name: string = req.params.name;
    return res.send(`<h1>Hello ${name}</h1> <p> Questa e la pagina greeting</p>`);
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