import express from 'express';
import path from 'path';
import indexRouter from './routes';
import exphbs  from 'express-handlebars';
import appController from './routes/app/app.controller';

console.log('Hello Node.js project.', appController.multi);
var app = express();
app.use('/public', express.static(path.join(__dirname, '../public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', 'src/views/')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);
app.use((req, res, next) => {
    const err = new Error('Resource does not exist');
    res.status(404).json({ status: 404, message: 'Resource Not Found' });
});
module.exports = app;
