import express from 'express'

const app = express();

app.use(express.json())


let count = 1;
app.get('/', (req, res) => {
    count ++;
    res.send({hello: 'hello Rafael', count})
})

app.post('/', (req, res) => {
    count --;
    res.send({hello: 'hello Rafael', count})
})

app.post('/reply', (req, res) => {
    const body = req.body;
console.log(body)
    res.send({body: body})
})

const PORT = 3000
app.listen(PORT, () => {
    console.log('Server started at http://localhost:3000')
})
