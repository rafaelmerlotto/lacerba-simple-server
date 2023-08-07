import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());


interface BlogPost {
    title: string;
    date: Date;
    body: string;
    id: number;
    draft: boolean;

}

let posts: BlogPost[] = [];

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


app.post('/posts/', (req, res) => {
    const postData = req.body;
    const lastPost = posts[posts.length - 1]

    let id = 0;
    if (lastPost) {
        id = lastPost.id + 1;
    }
    const newPost: BlogPost = {
        id: id,
        date: new Date(),
        draft: false,
        title: postData.title,
        body: postData.body
    }
    posts.push(newPost);
    return res.status(201).send(newPost)
})


app.delete('/posts/:id', (req, res) => {
    const id = Number(req.params.id)
    const postToDelete = posts.find(post => post.id === id)
    if (!postToDelete) {
        return res.status(404).send({ msg: 'not found' });
    }
   posts = posts.filter(post => post.id !== postToDelete.id)
   return res.send(postToDelete)
})


app.put('/posts/:id', (req, res) => {
    const id = Number(req.params.id)
    const postData = req.body;
    const postToUpdateIndex = posts.findIndex((post) => post.id === id)
    if (!posts[postToUpdateIndex]) {
        return res.status(404).send({ msg: 'not found' });
    }
    posts[postToUpdateIndex] = {
        ...posts[postToUpdateIndex],
        title: postData.title,
        body: postData.body
    }
    return res.send(posts[postToUpdateIndex]);
})


app.post('/posts/:id/public', (req, res) => {
    const id = Number(req.params.id)
    const postToPublicIdx = posts.findIndex(post => post.id === id)
    if (!posts[postToPublicIdx]) {
        return res.status(404).send({ msg: 'not found' });
    }
    posts[postToPublicIdx].draft = true
    return res.send(posts[postToPublicIdx]);
})



app.listen(port, () => {
    console.log('Server started ate http://localhost:3000')
})