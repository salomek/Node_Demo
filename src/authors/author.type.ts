export type BaseAuthor = {
    firstName: string;
    lastName: string;
    email: string;
};

export type Author = BaseAuthor & {
    id: number
};