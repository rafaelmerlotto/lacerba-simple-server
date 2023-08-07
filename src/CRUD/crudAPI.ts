import express from 'express';

const app = express();
const port = 3000;


interface BlogPost {
    title: string;
    author: string;
    date: Date;
    body: string;
    id: number;
    draft: boolean;

}

const posts: BlogPost[] = [
    {
        id: 0,
        title: 'first post',
        author: 'Lea Bolko',
        date: new Date,
        body: "this is the first post",
        draft: false
    },
    {
        id: 1,
        title: 'second post',
        author: "Rafael Merlotto",
        date: new Date,
        body: "this is the second post",
        draft: false
    },
];

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.get('/posts/:id', (req, res) => {
    const id = Number(req.params.id)
    const post = posts.find(post => post.id === id)
    if (!post) {
        return res.status(404).send({ msg: 'not found' });
    }
    return res.send(post);
})



app.listen(port, () => {
    console.log('Server started ate http://localhost:3000')
})