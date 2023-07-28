import express, {Request, Response} from 'express';
import {getall,getAuthorByID, createAuthor,updateAuthor,deleteAuthor} from './author.service';
import { BaseAuthor , Author} from './author.type';

 export const authorRouter= express.Router();

 authorRouter.get ('/', async(req: Request, res: Response)=> {
    try {
        const authors = await getall();
        res.status(200).send(authors);
    } catch (error) {
        res.status(500).send(error);
    }

 });

 authorRouter.get ('/:id', async(req: Request, res: Response)=> {
    const id =parseInt(req.params.id);
    try {
        const author = await getAuthorByID(id);
        if (author)
        res.status(200).send(author);
        else 
        res.status(404).send('Author with provided ID does not exists');

    } catch (error) {
        res.status(500).send(error);
    }

 });

 authorRouter.post ('/', async(req: Request, res: Response)=> {
    
    try {
        const author = req.body as BaseAuthor;
        const newAuthor_ = await createAuthor(author)     
        res.status(201).send(newAuthor_);
      
    } catch (error: any) {
        res.status(500).send(error);
    }

 });

 authorRouter.put ('/:id', async(req: Request, res: Response)=> {
    
    const id = parseInt(req.params.id);
    try {
        const author = req.body as BaseAuthor;
        const newAuthor_ = await updateAuthor(author,id)     
        if (newAuthor_) {
            res.status(200).send(newAuthor_); // Use 200 for successful update
          } else {
            res.status(404).send('Author with provided ID does not exist');
          }
    } catch (error: any) {
        res.status(500).send(error);
    }

 });

authorRouter.delete ('/:id', async(req: Request, res: Response)=> {
    
    const id = parseInt(req.params.id);
    try {
        
        const oldAuthorID = await deleteAuthor(id)     
       // res.status(201).send(newBook_);
        if (oldAuthorID) {
            res.status(200).send(oldAuthorID); 
          } else {
            res.status(404).send('Book with provided ID does not exist');
          }
    } catch (error: any) {
        res.status(500).send(error);
    }

 });
 