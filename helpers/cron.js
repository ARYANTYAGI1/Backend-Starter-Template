const cron = require('node-cron');
const { sendEmail } = require('./mail');
const Todo = require('../models/Todo');
const User = require('../models/User')
const moment = require('moment');

cron.schedule('* * * * *', async () => {
    try {
        console.log('Code is HERE')
        const today = moment().format('YYYY-MM-DD');
        const todos = await Todo.find({ deadlineDate: today });
        for (const todo of todos) {
            const user = await User.findById(todo.user);
            console.log(user, 'USER')
            if (user) {
                const emailContext = {
                    todoName: todo.todoName,
                    todoDesc: todo.todoDesc,
                    deadlineDate: todo.deadlineDate,
                    priority: todo.priority,
                };
                await sendEmail(
                    user.email,
                    user.name,
                    'Your Todo is Due Today',
                    'reminder',
                    emailContext
                );
            }
        }
        console.log('Cron job executed successfully.');
    } catch (error) {
        console.error('Error during cron job execution:', error);
    }
});

