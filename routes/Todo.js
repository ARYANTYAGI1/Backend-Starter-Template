const express = require('express');
const { addTodo, updateTodo, getTodo, getTodoList, removeTodo } = require('../controllers/TodoController');
const { validateToken, upload } = require('../helpers/Common');

const router = express.Router();

router.post('/add', validateToken, upload.single('image'), addTodo);
router.post('/update/:id', validateToken, upload.single('image'), updateTodo);
router.delete('/remove/:id', validateToken, removeTodo);
router.get('/get/:id', validateToken, getTodo);
router.get('/list', validateToken, getTodoList);

module.exports = router;
