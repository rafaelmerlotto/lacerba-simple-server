import express from 'express';

const app = express();

const port = 3000;
app.use(express.json());

const InputValidationMiddleware: express.RequestHandler = (req, res, next) => {
    const postData: Todo = req.body
    if (!postData.name) {
        return res.status(403).send({ error: "Name field is required" })
    }
    next();
}

interface Todo {
    id: number,
    name: string,
    completed: boolean
}

const listTodo: Todo[] = []

app.get('/todos', (req, res) => {
    const completed = req.query.completed;
    if(completed){
        res.send(listTodo)
    }
    const taskTodo = listTodo.filter((t) => !t.completed)
    res.send(taskTodo)
})

app.get('/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const getId = listTodo.find(post => post.id === id)
    if (!getId) {
        return res.status(404).send({ msg: 'not found' });
    }
    return res.send(getId)
})

app.post('/todos/',InputValidationMiddleware, (req, res) => {
    const body: Pick<Todo, 'name'> = req.body;
    const lastTask = listTodo[listTodo.length - 1]
    let id = 0;
    if (lastTask) {
        id = lastTask.id + 1;
    }
    const newTodo: Todo = {
        id: id,
        name: body.name,
        completed: false
    }
    listTodo.push(newTodo);
    return res.status(201).send(newTodo);
})

app.post('/todos/:id/complete',  (req, res) => {
    const id = Number(req.params.id)
    const completeToUpdateIndex = listTodo.findIndex((post) => post.id === id)
    if (!listTodo[completeToUpdateIndex]) {
        return res.status(404).send({ msg: 'not found' });
    }
    if(listTodo[completeToUpdateIndex].completed){
        return res.status(409).send({msg: 'task already completed'})
    }
   listTodo[completeToUpdateIndex].completed = true;
   return res.send(listTodo[completeToUpdateIndex])  
})






app.listen(port, () => {
    console.log("Server started at http://localhost:3000")
})