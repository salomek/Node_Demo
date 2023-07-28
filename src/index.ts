import express from 'express';
import * as dotenv from 'dotenv';
import { authorRouter } from './authors/author.router';
import { bookRouter } from './books/book.router';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/authors', authorRouter);
app.use('/api/books', bookRouter);



const port = parseInt(process.env.PORT as string);
app.listen(port, ()=> {
    console.log(`Express Started at port ${port}`);
});