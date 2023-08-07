// import express from 'express'

// const app = express();
// const port = 3000;

// app.use(express.json());


// app.post('/stats', (req, res) => {
//     const body = req.body;

//     let sum = 0;
//     for (let n of body) {
//         sum += n;
//     }
//     const med = sum / body.length;

//     res.send(`
//     <h1>la somma è ${sum}</h1>
//     <h1>la media è ${med}</h1>
//     `)
// })

// app.listen(port, () => {
//     console.log('Server started at http://localhost:3000')
// })


import express from 'express'

const app = express();
const port = 3000;


const computeSumAndMed = (nums: number[]): [number, number] => {
    let sum = 0;
    for (let n of nums) {
        sum += n
    }
    const med = sum / nums.length;
    return [sum, med]
}

app.use(express.json())
app.post('/stats', (req, res) => {
    const numbers: number[] = req.body;
    const [sum, med] = computeSumAndMed(numbers);
    return res.send({sum, med})
})


app.listen(port, () => {
    console.log("Server started at http://localhost:3000")
})
