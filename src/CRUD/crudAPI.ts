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

const posts: BlogPost[] = [
    // {
    //     id: 0,
    //     title: 'first post',
    //     date: new Date,
    //     body: "this is the first post",
    //     draft: false
    // },
    // {
    //     id: 1,
    //     title: 'second post',
    //     date: new Date,
    //     body: "this is the second post",
    //     draft: false
    // },
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


app.post('/posts/', (req, res) => {
    const postData = req.body;
    const lastPost = posts[posts.length - 1]

    // let id = 0;
    // if(lastPost){
    //     id = lastPost.id +1;
    // }
    const newPost: BlogPost = {
        id: lastPost ? lastPost.id + 1 : 0,
        date: new Date(),
        draft: false,
        title: postData.title,
        body: postData.body
    }
    posts.push(newPost);
    return res.status(201).send(newPost)
})



app.listen(port, () => {
    console.log('Server started ate http://localhost:3000')
})