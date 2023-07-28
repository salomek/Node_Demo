import {Author, BaseAuthor} from './author.type';
import * as fs from 'fs';

const booksFilePath = 'C:/Users/s.kezherashvili/Desktop/Node_Demo/src/authors/author.json';
let authors: Author[];

try {
  const data = fs.readFileSync(booksFilePath, 'utf8');
  authors = JSON.parse(data);

} catch (error) {
  console.error('Error reading authors.json:', error);
  authors = [];
}

export const getall = async(): Promise <Author[]>  =>
{
  return JSON.parse(JSON.stringify(authors));
}
 export const getAuthorByID = async(id: number): Promise <Author| null> => {

    const author = authors.find ((author) => author.id=== id);
    if (!author) return null;
    return author;

 }

 export const createAuthor = async(newAuthor: BaseAuthor):Promise <Author| null>  => {
   const id = new Date().valueOf();
  
   const author = {id,...newAuthor,};
  
   try {
    
      authors.push(author);  
      const newJson = JSON.stringify(authors, null, 2);
      await fs.promises.writeFile ('/Users/s.kezherashvili/Desktop/Node_Demo/src/authors/author.json',newJson,'utf8');
      return author;
    } catch (parseError) {
      console.error('Error parsing existing JSON data:', parseError);
      return null;
    }   

   };
   
   export const updateAuthor = async(newAuthor: BaseAuthor,ID : number):Promise <Author| null>  => {
       
    const author = getAuthorByID (ID);
    if (!author)
    {
     return null;
    }
    else 
     try {
         
         for (let i = 0; i < authors.length ; i++) {
           if  (authors[i].id===ID)
           {authors[i].firstName=newAuthor.firstName;
            authors[i].lastName=newAuthor.lastName;
            authors[i].email=newAuthor.email;
               break;
           }
         }
             const newJson = JSON.stringify(authors, null, 2);
             await fs.promises.writeFile ('/Users/s.kezherashvili/Desktop/Node_Demo/src/authors/author.json',newJson,'utf8');
         return author;
           } 
           
       catch (Error) {
        console.error('Error parsing existing JSON data:', Error);
        return null;
      }              
     };

  
 export const deleteAuthor = async(ID : number):Promise <{status:number;message:string}| null>  => {
             
      const book = getAuthorByID (ID);
      if (!book)
         {
            return null;
          }
      else 
        try {
                      
              for (let i = 0; i < authors.length ; i++) {
                  if  (authors[i].id===ID)
                        {authors.splice(i, 1);
                            break;
                        }
                      }
                          const newJson = JSON.stringify(authors, null, 2);
                          await fs.promises.writeFile ('/Users/s.kezherashvili/Desktop/Node_Demo/src/authors/author.json',newJson,'utf8');
                          return {status: 200, message: `Book with ID ${ID} deleted successfully` };
                        } 
                        
        catch (Error) {
                     console.error('Error parsing existing JSON data:', Error);
                     return null;
      }              
    };