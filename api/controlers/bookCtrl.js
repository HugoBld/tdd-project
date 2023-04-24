  
  export default (bookRepo, Book) => {

    const listBooks = (_, res) => {
        let books = bookRepo.listBooks();
        res.send({
            data: books
        });
    };

    const checkISBNFormat = (isbn13) => {
        return(isbn13.toString().length !== 13);
    }

    const createBook = (req, res) => {
        let {isbn13, title, authors, editor, langCode, price} = req.body;
        if(checkISBNFormat(isbn13)){
            return res.status(400).send({
                error: 'ISBN is not valid'
            })
        }
        if(typeof price !== 'number'){
            return res.status(400).send({
                error: 'price is not a number'
            })
        }
        else{
            let book = bookRepo.createBook(
                new Book(
                    isbn13,
                    title,
                    authors,
                    editor,
                    langCode,
                    price
                )
            );
            return res.status(201).send({data: book});
        }
        
    }

    const updateBook = (req,res) => {
        let {isbn13, title, authors, editor, langCode, price} = req.body;
        let _id = req.params.id;

        let updatedBook = bookRepo.updateBook(
            Number(_id),
            new Book(isbn13, title, authors, editor, langCode, price)
        );

        if(checkISBNFormat(isbn13)){
            return res.status(400).send({
                error: 'ISBN is not valid'
            })
        }

        if(updatedBook){
            return res.status(200).send({data: updatedBook})
        }

        return res.status(404).send({error: `Book ${_id} not found`})


    }

    const deleteBook = (req,res) => {
        let _id = req.params.id;

        let deletedBook = bookRepo.deleteBook(Number(_id));

        if(checkISBNFormat(_id)){
            return res.status(400).send({
                error: 'ISBN is not valid'
            })
        }

        if(deletedBook){
            return res.status(200).send({meta: {deletedBook}})
        }

        return res.status(404).send({error: `Book ${_id} not found`})


    }

    return{
        deleteBook,
        updateBook,
        listBooks,
        createBook
    }
    
  };
  