export type BaseBook = {
    title: string;
    genre: string;
    authorID: number;
};

export type Book = BaseBook & {
    id: number
};