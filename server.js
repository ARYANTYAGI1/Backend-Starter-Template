require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db');
const userRoutes = require('./routes/User');
const todoRoutes = require('./routes/Todo');
const app = express();
app.use(express.json());
require('./helpers/cron');

app.use('/api/users', userRoutes);
app.use('/api/todo',todoRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
