const express = require('express')
const { addTodo, getTodo, removeTodo, updateTodo } = require('../controllers/todoController')
const router = express.Router()

router.post('/', addTodo)
router.get('/', getTodo)
router.delete('/:id', removeTodo)
// router.put('/:id', updateTodo)

module.exports = router