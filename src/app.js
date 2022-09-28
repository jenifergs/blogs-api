const express = require('express');
const controller = require('./controller/login.controller');
const { validation, validationValid } = require('./middlewares/loginValidation');

const RouterUsers = require('./routes/users.routes');
const RouterCategories = require('./routes/categories.routes');
const RouterPosts = require('./routes/posts.routes');

// ...

const app = express();

app.use(express.json());

app.post('/login', validation, validationValid, controller.signIn);

app.use('/user', RouterUsers);
app.use('/categories', RouterCategories);
app.use('/post', RouterPosts);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
