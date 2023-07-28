import express, {Request, Response} from 'express';
import {getall,getBookByID, createBook,updateBook,deleteBook} from './book.service';
import { BaseBook, Book } from './book.type';

import { getAuthorByID } from '../authors/author.service';

 export const bookRouter= express.Router();

 bookRouter.get ('/', async(req: Request, res: Response)=> {
    try {
        const books = await getall();
        res.status(200).send(books);
    } catch (error) {
        res.status(500).send(error);
    }

 });

 bookRouter.get ('/:id', async(req: Request, res: Response)=> {
    const id =parseInt(req.params.id);
    try {
        const book = await getBookByID(id);
        
        //const author = await getAuthorByID (book?.authorID)
        if (book)
        {
        const authorID = book.authorID;
        console.log(book);
        const author = await getAuthorByID(authorID);
        const data = {...book, author}
        res.status(200).send(data);
        }
        else 
        res.status(404).send('Book with provided ID does not exists');

    } catch (error) {
        res.status(500).send(error);
    }

 });

 bookRouter.post ('/', async(req: Request, res: Response)=> {
    
    try {
        const book = req.body as BaseBook;
        const newBook_ = await createBook(book)     
        res.status(201).send(newBook_);
      
    } catch (error: any) {
        res.status(500).send(error);
    }

 });

 bookRouter.put ('/:id', async(req: Request, res: Response)=> {
    
    const id = parseInt(req.params.id);
    try {
        const book = req.body as BaseBook;
        const newBook_ = await updateBook(book,id)     
       // res.status(201).send(newBook_);
        if (newBook_) {
            res.status(200).send(newBook_); // Use 200 for successful update
          } else {
            res.status(404).send('Book with provided ID does not exist');
          }
    } catch (error: any) {
        res.status(500).send(error);
    }

 });
 
 bookRouter.delete ('/:id', async(req: Request, res: Response)=> {
    
    const id = parseInt(req.params.id);
    try {
        const oldBookID = await deleteBook(id)     
       // res.status(201).send(newBook_);
        if (oldBookID) {
            res.status(200).send(oldBookID); 
          } else {
            res.status(404).send('Book with provided ID does not exist');
          }
    } catch (error: any) {
        res.status(500).send(error);
    }

 });
 