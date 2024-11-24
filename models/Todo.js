const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  todoName: { type: String, required: true },
  todoDesc: { type: String, required: true },
  status: { type: String, default: 'Pending', enum:['Complete', 'Pending', 'InProgress'] },
  priority: { type: String, default: 'Low', enum:['High', 'Medium', 'Low'] },
  deadlineDate: {type: Date},
  image:{ type:String},
  publicId: { type: String }
});

module.exports = mongoose.model('Todos', todoSchema);
