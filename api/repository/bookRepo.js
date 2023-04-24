export default(Book) => {
    let books = [
        new Book('9782744005084','UML et C++','Richard C. Lee, William M. Tepfenhart','CampusPress','FR',29.95),
        new Book('9782746035966','Cree su primer sitio web con dreamweaver 8','B.A. GUERIN','ENI','ES',10.02),
        new Book('1010101010101', 'Harry Potter', 'JK Rowling', 'Minalima', 'FR', 35.00),
        new Book('2020202020202', 'La communaute de l anneau', 'JRR Tolkien', 'Univers Poche', 'FR', 19.90),
        new Book('3030303030303', 'Harry Potter et les Reliques de la mort', 'JK Rowling', 'Minalima', 'FR', 35.00)
    ];

    const listBooks = () => {
        return books;
    }

    const getBook = (id) => {
        return books.find((book) => book.isbn13 === id) || null;
      }

    const createBook = (book) => {
        books.push(book);
        return book;
    }

    const updateBook = (id, book) => {
        let bookUpdateIndex = books.findIndex(book => book.isbn13 === id);
        if(bookUpdateIndex < 0){
            return null
        }
        books[bookUpdateIndex] = book;
        return book;
    }

    const deleteBook = (id) => {
        let bookUpdateIndex = books.findIndex(book => book.isbn13 === id);
        if(bookUpdateIndex < 0){
            return null
        }
        const deletedBook = books.splice(bookUpdateIndex, 1)[0];
        return deletedBook;
    }

    return{
        deleteBook,
        updateBook,
        createBook,
        listBooks,
        getBook
    };
}