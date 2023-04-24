export default class Book{
    constructor(isbn13, title, authors, editor, langCode, price){
        this.isbn13 = isbn13;
        this.title = title;
        this.authors = authors;
        this.editor = editor;
        this.langCode = langCode;
        this.price = price;
    }
}