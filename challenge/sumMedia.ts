import express from "express";

const app = express();

app.get('/stats', (req, res) => {
    const nums: number[] = (req.query.nums as string[]).map((n) => {
        return Number(n)
    });

    let sum = 0;
    for (let n of nums) {
        sum += n;
    }
    const med = sum / nums.length;

    res.send(`<p>la somma ${sum} \n\ la media ${med}</p>`);
})

app.listen(3000, () => {
    console.log('started at http://localhost:3000')
})