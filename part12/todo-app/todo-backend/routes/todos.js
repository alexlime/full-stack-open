const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis')


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  // Todos counter (REDIS)
  let todos = Number(await getAsync('added_todos')) || 0
  // if (isNaN(todos)) { todos = 0 }
  await setAsync('added_todos', ++todos)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body

  if(isNaN(todos)) {
    todos = await setAsync('added_todos', 0)
  }

  // Update the todo object in memory
  req.todo.text = text;
  req.todo.done = done;

  // Save the updated todo object to the database
  const updatedTodo = await req.todo.save();

  res.status(200).json(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
