const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('db connected'));

mongoose.connection.on('error', err => {
    console.log(`db connection error ${err.message}`);
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

app.use(cookieParser());
app.use(express.json());
app.use(expressValidator());
app.use(morgan('dev'));

app.use('/', postRoutes);
app.use('/', authRoutes);

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'invalid token...' });
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`a node js api is listening on port ${port}`);
});
