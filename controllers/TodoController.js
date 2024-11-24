const Todo = require('../models/Todo');
const { cloudinary } = require('../config/cloudinary');
const {addTodoValidationSchema} = require('../validations/todoValidation')

module.exports = {
    addTodo : async(req,res)=>{
        try {
          const { error } = addTodoValidationSchema.validate(req.body);
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
          }
            const { todoName ,todoDesc, status, priority, deadlineDate } = req.body;
            let imageUrl = null;
            let publicId = null;
            if (req.file) {
              imageUrl = req.file.path;
              publicId = req.file.filename;
            }
            const todo = new Todo({
                todoName: todoName,
                todoDesc: todoDesc,
                status: status,
                priority: priority,
                deadlineDate: deadlineDate,
                image: imageUrl,
                publicId: publicId,
                user: req.user.id
            })
            await todo.save();
            return res.status(200).send({ success: true, message: 'Todo Added Successfully', data: todo})
        } catch (error) {
          return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message})
        }
    },
    updateTodo : async(req,res)=>{
        const { todoName ,todoDesc, status, priority, deadlineDate } = req.body;
        try {
          const { error } = addTodoValidationSchema.validate(req.body);
          if (error) {
            return res.status(400).json({ message: error.details[0].message });
          }
            const todo = await Todo.findOne({_id: req.params.id})
            if(!todo) return res.status(200).send({success:false, message: 'Invalid Todo ID', data: null})
            if (req.file) {
                if (todo.publicId) {
                  await cloudinary.uploader.destroy(todo.publicId);
                }
                todo.image = req.file.path;
                todo.publicId = req.file.filename;
            }
            if (todoName) todo.name = todoName;
            if (todoDesc) todo.description = todoDesc;
            if (status) todo.status = status;
            if (priority) todo.priority = priority;
            if (deadlineDate) todo.deadlineDate = deadlineDate;
            await todo.save();
            return res.status(200).send({ success: true, message: 'Todo Updated Successfully', data: todo})
        } catch (error) {
          return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message})
        }
    },
    removeTodo: async (req, res)=>{
        try {
            const todo = await Todo.findByIdAndDelete({_id: req.params.id});
            return res.status(200).send({success: true, message: 'Todo Remove Successfully', data: todo._id});
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message})
        }
    },
    getTodo: async (req,res)=>{
        try {
            const todo = await Todo.findOne({_id: req.params.id});
            if(!todo) return res.status(200).send({success:false, message: 'Invalid Todo ID', data: null});
            return res.status(200).send({ success: true, message: 'Success', data: todo})       
        } catch (error) {
            return res.status(500).send({ success: false, message: 'Internal Server Error', data: error.message})
        }
    },
    getTodoList:  async (req, res) => {
        try {
          const { status, priority, deadlineDate, page = 1 } = req.query;
          const userId = req.user.id;
          const filter = { user: userId };
          if (status) filter.status = status;
          if (priority) filter.priority = priority;
          if (deadlineDate) filter.deadlineDate = { $lte: new Date(deadlineDate) };
          const limit = 10;
          const skip = (page - 1) * limit;
          const todos = await Todo.find(filter)
            .sort({ created_at: 1 }) 
            .skip(skip)
            .limit(limit);
          const totalTodos = await Todo.countDocuments(filter);
          res.status(200).send({
            success: true,
            message: 'Todo list fetched successfully',
            data: {
              todos,
              totalTodos,
            },
          });
        } catch (error) {
          console.error(error);
          res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            data: error.message,
          });
        }
    }
}