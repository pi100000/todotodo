const asyncHandler = require('express-async-handler')
const todoModel = require('../models/todoModel')

const addTodo = asyncHandler(async (req, res) => {
    try {
        const todo = await todoModel.create({
            taskName: req.body.taskName,
            comment: req.body.comment,
            date: req.body.date
        })
        res.status(200).json(todo)
    } catch(err) {
        console.log(err)
        res.status(400)
        throw new Error('Invalid Request')
    }
})

const getTodo = asyncHandler(async (req, res) => {
    try {
        const todos = await todoModel.aggregate([
            { $sort : { date : -1 }}
        ])
        res.status(200).json(todos)
    } catch(err) {
        console.log(error)
        res.status(400)
        throw new Error('Invalid Request')
    }
})

const removeTodo = asyncHandler(async (req, res) => {
    const todo = await todoModel.findById(req.params.id)

    if(!todo) {
        res.status(400)
        throw new Error('todo not found')
    }
    await todo.remove()

    res.status(200).json({ id: req.params.id })
})

// const updateTodo = asyncHandler(async (req, res) => {
//     const todo = await todoModel.findById(req.params.id)

//     if(!todo) {
//         res.status(400)
//         throw new Error('Todo Not Found')
//     }

//     const updatedTodo = await todoModel.findByIdAndUpdate(req.params.id, req.body, 
//         {
//         new: true,
//         })

//     res.json(updatedTodo)
// })

module.exports = {
    addTodo,
    getTodo,
    removeTodo,
    // updateTodo
}