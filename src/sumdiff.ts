import express from 'express'

const app = express();

app.get('/sum/:num1/:num2', (req, res) => {
    const num1 = Number(req.params.num1);
    const num2 = Number(req.params.num2);
    const somma = num1 + num2
    res.send(`<h1>${num1} + ${num2} = ${somma}</h1>`)
})

app.get('/diff/:num1/:num2', (req, res) => {
    const num1 = Number(req.params.num1);
    const num2 = Number(req.params.num2);
    const diff = num1 - num2
    res.send(`<h1>${num1} - ${num2} = ${diff}</h1>`)
})

app.listen(3000, () => {
    console.log('Started at http://localhost:3000')
})