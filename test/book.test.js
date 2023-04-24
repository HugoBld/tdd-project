import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe('CRUD Books', function(){
    it('GET /books should return status code 200 with books list', function(done){
        chai.request(api)
            .get('/books')
            .end((_, res) => {
                chai.expect(res.statusCode).to.equal(200);
                chai.expect(res.body).to.deep.equal({
                    data: [
                        {
                            isbn13: 9782744005084,
                            title: 'UML et C++',
                            authors: 'Richard C. Lee, William M. Tepfenhart',
                            editor: 'CampusPress',
                            langCode: 'FR',
                            price: 29.95
                          },
                          {
                            isbn13: 9782746035966,
                            title: 'Cree su primer sitio web con dreamweaver 8',
                            authors: 'B.A. GUERIN',
                            editor: 'ENI',
                            langCode: 'ES',
                            price: 10.02
                          }
                    ]
                });
                done();
            })
    });
    it('POST /book should create a book and return it with a status code 201', function(done){
        const book = {
            isbn13: 9782879017198,
            title: 'Connaitre la Cuisine du Périgord',
            authors: 'Thibault Clementine',
            editor: 'Sud Ouest',
            langCode: 'FR',
            price: 3.9
          };
        chai.request(api)
          .post('/book')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(201);
            chai.expect(res.body).to.deep.equal({
                data: book
            })
            done()
          }

          )
    });
    it('POST /book should return a status code 400 if isbn13 malformed', function(done){
        const book = {
            isbn13: 97,
            title: 'Connaitre la Cuisine du Périgord',
            authors: 'Thibault Clementine',
            editor: 'Sud Ouest',
            langCode: 'FR',
            price: 3.9
          };
        chai.request(api)
          .post('/book')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.deep.equal({
                error: 'ISBN is not valid'
            })
            done();
          }
          )
    });
    it('POST /book should return a status code 400 if price is not a number', function(done){
        const book = {
            isbn13: 9782744005084,
            title: 'Connaitre la Cuisine du Périgord',
            authors: 'Thibault Clementine',
            editor: 'Sud Ouest',
            langCode: 'FR',
            price: '3.9'
          };
        chai.request(api)
          .post('/book')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.deep.equal({
                error: 'price is not a number'
            })
            done();
          }
          )
    });
    it('PUT /book/:id sould return a status code 200 with updated book', function(done){
        const book = {
            isbn13: 9782746035966,
            title: 'New title',
            authors: 'B.A. GUERIN',
            editor: 'ENI',
            langCode: 'ES',
            price: 10.02
          };
        chai.request(api)
          .put('/book/9782746035966')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.deep.equal({
                data: book
            })
            done();
          }
          )
    });
    it('PUT /book/:id sould return a status code 404 if book not found', function(done){
        const book = {
            isbn13: 9780046034966,
            title: 'New title',
            authors: 'B.A. GUERIN',
            editor: 'ENI',
            langCode: 'ES',
            price: 10.02
          };
        chai.request(api)
          .put('/book/9780046034966')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(404);
            chai.expect(res.body).to.deep.equal({
                error: 'Book 9780046034966 not found'
            })
            done();
          }
          )
    });
    it('PUT /book/:id should return a status code 400 if isbn13 malformed', function(done){
        const book = {
            isbn13: 97,
            title: 'Connaitre la Cuisine du Périgord',
            authors: 'Thibault Clementine',
            editor: 'Sud Ouest',
            langCode: 'FR',
            price: 3.9
          };
        chai.request(api)
          .put('/book/97')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(400);
            chai.expect(res.body).to.deep.equal({
                error: 'ISBN is not valid'
            })
            done();
          }
          )
    });
    it('DELETE /book/:id should return a status code 200 with the deleted book', function(done){
        const book = {
            isbn13: 9782744005084,
            title: 'UML et C++',
            authors: 'Richard C. Lee, William M. Tepfenhart',
            editor: 'CampusPress',
            langCode: 'FR',
            price: 29.95
          };
        chai.request(api)
          .delete('/book/9782744005084')
          .send(book)
          .end((_,res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.deep.equal({
                meta: {
                    deletedBook: book
                }
            })
            done();
          }
          )
    });
})