import {BaseBook, Book} from './book.type';
import * as fs from 'fs';
import { authorRouter } from '../authors/author.router';
import { Author } from '../authors/author.type';
const booksFilePath = 'C:/Users/s.kezherashvili/Desktop/Node_Demo/src/books/book.json';

// Use proper file path separators and escape backslashes

//const myJson = require(booksFilePath);
//let books : Book [] = myJson.books;
let books: Book[];


// Read the JSON data synchronously during the initialization of the script
try {
  const data = fs.readFileSync(booksFilePath, 'utf8');
  books = JSON.parse(data);

} catch (error) {
  console.error('Error reading books.json:', error);
  books = [];
}


export const getall = async(): Promise <Book[]>  =>
{
return JSON.parse(JSON.stringify(books));
// [...books]

}
export const getBookByID = async(id: number): Promise <Book| null> => {

    const book = books.find ((book) => book.id=== id);
    if (!book) return null;
    return book;

 }

 export const createBook = async(newBook: BaseBook):Promise <Book| null>  => {
    const id = new Date().valueOf();
   
    const book = {id,...newBook,};
   
    try {
       books.push(book);  
       const newJson = JSON.stringify(books, null, 2);
       await fs.promises.writeFile ('/Users/s.kezherashvili/Desktop/Node_Demo/src/books/book.json',newJson,'utf8');
       return book;
     } catch (parseError) {
       console.error('Error parsing existing JSON data:', parseError);
       return null;
     }   
 
    };
export const updateBook = async(newBook: BaseBook,ID : number):Promise <Book| null>  => {
       
       const book = getBookByID (ID);
       if (!book)
       {
        return null;
       }
       else 
        try {
            
            for (let i = 0; i < books.length ; i++) {
              if  (books[i].id===ID)
              {books[i].authorID=newBook.authorID;
                books[i].genre=newBook.genre;
                books[i].title=newBook.title;
                  break;
              }
            }
                const newJson = JSON.stringify(books, null, 2);
                await fs.promises.writeFile ('/Users/s.kezherashvili/Desktop/Node_Demo/src/books/book.json',newJson,'utf8');
            return book;
              } 
              
          catch (Error) {
           console.error('Error parsing existing JSON data:', Error);
           return null;
         }              
        };
        
  
export const deleteBook = async(ID : number):Promise <{status:number;message:string}| null>  => {
             
  const book = getBookByID (ID);
  if (!book)
     {
        return null;
      }
  else 
    try {
                  
          for (let i = 0; i < books.length ; i++) {
              if  (books[i].id===ID)
                    {books.splice(i, 1);
                        break;
                    }
                  }
                      const newJson = JSON.stringify(books, null, 2);
                      await fs.promises.writeFile ('/Users/s.kezherashvili/Desktop/Node_Demo/src/books/book.json',newJson,'utf8');
                      return {status: 200, message: `Book with ID ${ID} deleted successfully` };
                    } 
                    
    catch (Error) {
                 console.error('Error parsing existing JSON data:', Error);
                 return null;
  }              
};