const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser')

const app = express();
// Connect Database
connectDB();

// Init Middleware
app.use(bodyParser.json({ extended: false }));
//app.use(express.json({ extended: false }));


app.get('/', (req, res) => res.send("API Running"))

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))