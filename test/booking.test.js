import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe.only('CRUD Booking', function(){
      it('GET /bookings should return a success response with all bookings', function(done){
        chai.request(api)
        .get('/bookings')
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(200)
          chai.expect(res.body).to.deep.equal({
            data : [
              {
                id: "f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c",
                item: {
                  authors: "JK Rowling",
                  editor: "Minalima",
                  isbn13: "1010101010101",
                  langCode: "FR",
                  price: 35.00,
                  title: "Harry Potter"
                },
                rentDate: "2000-01-01",
                returnDate: "2000-12-17",
                user: {
                    id: 'ab724d8c-38c0-4f6c-ba66-944750217338',
                    lastName: 'BLANCHARD',
                    firstName: 'Hugo',
                    birthDate: '2000-12-17',
                    address: 'Nantes',
                    phone: '+33609080706',
                    email: 'hugo.blanchard17@gmail.com',
                }
              },
              {
                id: "680af88c-cca8-4fb7-b6e3-d5ffd0defaad",
                item: {
                  authors: "JRR Tolkien",
                  editor: "Univers Poche",
                  isbn13: "2020202020202",
                  langCode: "FR",
                  price: 19.90,
                  title: "La communaute de l anneau"
                },
                rentDate: "2003-03-21",
                returnDate: "2003-06-17",
                user: {
                    id: 'd8671313-020b-414e-a60a-589ba98999c6',
                    lastName: 'LEE',
                    firstName: 'Bruce',
                    birthDate: '1999-01-13',
                    address: 'Nantes',
                    phone: '+33609086543',
                    email: 'bruce.lee@gmail.com',
                }
              },
            ]
          })
          done()
        })
      })
      it('POST /booking should create the booking and return a success response with the booking', function(done){
        const booking = {
          item:  "9782746035966",
          rentDate: "2023-04-22",
          returnDate: "2023-04-29",
          user: "d8671313-020b-414e-a60a-589ba98999c6"
        }
        chai.request(api)
        .post('/booking')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(201)
          chai.expect(res.body.data.rentDate).to.equal(booking.rentDate)
          chai.expect(res.body.data.item.isbn13).to.equal(booking.item)
          chai.expect(res.body.data.user.id).to.equal(booking.user)
          chai.expect(res.body.data).to.have.property('id')
          chai.expect(res.body.data.id).to.have.lengthOf(36)
          done()
        })
      })
      it('POST /booking with invalid date format should return an error with status code 400', function(done){
        const booking = {
          item:  "9782744005084",
          rentDate: "20230404",
          returnDate: "2023-04-29",
          user: "d8671313-020b-414e-a60a-589ba98999c6"
        }
        chai.request(api)
        .post('/booking')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(400)
          chai.expect(res.body).to.deep.equal({
            error: 'Date format is invalid : YYYY-MM-DD'
          })
          done()
        })
      })
      it('POST /booking should return a not found if book does not exist', function(done){
        const booking = {
          item:  "123456",
          rentDate: "2023-04-22",
          returnDate: "2023-04-29",
          user: "d8671313-020b-414e-a60a-589ba98999c6"
        }
        chai.request(api)
        .post('/booking')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
          error: {
            message: "No book found"
          }
          })
          done()
        })
      })
      it('POST /booking should return a not found if user does not exist', function(done){
        const booking = {
          item:  "2020202020202",
          rentDate: "2023-04-22",
          returnDate: "2023-04-29",
          user: "00000"
        }
        chai.request(api)
        .post('/booking')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
          error: {
            message: 'No user found'
          }
          })
          done()
        })
      })
      it('POST /booking with missing data should return an error with status code 400', function(done){
        const booking = {
          item:  "2020202020202",
          rentDate: "",
          returnDate: "2023-04-29",
          user: "00000"
        }
        chai.request(api)
        .post('/booking')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(400)
          chai.expect(res.body).to.deep.equal({
            error: 'Data is missing'
          })
          done()
        })
      })
      it('POST /booking should return a bad request if book is already rented', function(done){
        const booking = {
          item:  "2020202020202",
          rentDate: "2023-04-22",
          returnDate: "2023-04-29",
          user: "d8671313-020b-414e-a60a-589ba98999c6"
        }
        chai.request(api)
        .post('/booking')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(400)
          chai.expect(res.body).to.deep.equal({
          error: {
            message: 'Book 2020202020202 is not available'
          }
          })
          done()
        })
      })
      it('PUT /booking/:id should return a bad request if rentdate is malformed', function(done){
        const booking = {
          item: "1010101010101",
          rentDate: "20000101",
          returnDate: "2000-12-31",
          user: "ab724d8c-38c0-4f6c-ba66-944750217338"
        }
    
        chai.request(api)
        .put('/booking/f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(400)
          chai.expect(res.body).to.deep.equal({
            error: 'Date format is invalid : YYYY-MM-DD'
          })
          done()
        })
      })
      it('PUT /bookings/:id should return a bad request if returnDate is malformed', function(done){
        const booking = {
          item: "1010101010101",
          rentDate: "2000-01-01",
          returnDate: "20001231",
          user: "ab724d8c-38c0-4f6c-ba66-944750217338"
        }
    
        chai.request(api)
        .put('/booking/f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(400)
          chai.expect(res.body).to.deep.equal({
            error: 'Date format is invalid : YYYY-MM-DD'
          })
          done()
        })
      })
      it('PUT /bookings/:id should return a bad request if rentdate is greater than returndate', function(done){
        const booking = {
          item: "9782746035966",
          rentDate: "2024-04-22",
          returnDate: "2023-04-22",
          user: "ab724d8c-38c0-4f6c-ba66-944750217338"
        }
    
        chai.request(api)
        .put('/booking/f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c')
        .send(booking)
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(400)
          chai.expect(res.body).to.deep.equal({
            error: 'This period is not valid for a booking'
          })
          done()
        })
      }) 
      it('DELETE /booking/:id should return a success response with the deleted booking', function(done){
        chai.request(api)
        .delete('/booking/f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c')
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(200)
          chai.expect(res.body).to.deep.equal({
            meta: {
                id: "f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c",
                item: {
                  authors: "JK Rowling",
                  editor: "Minalima",
                  isbn13: "1010101010101",
                  langCode: "FR",
                  price: 35.00,
                  title: "Harry Potter"
                },
                rentDate: "2000-01-01",
                returnDate: "2000-12-17",
                user: {
                    id: 'ab724d8c-38c0-4f6c-ba66-944750217338',
                    lastName: 'BLANCHARD',
                    firstName: 'Hugo',
                    birthDate: '2000-12-17',
                    address: 'Nantes',
                    phone: '+33609080706',
                    email: 'hugo.blanchard17@gmail.com',
                }
            }
          })
          done()
        })
      })
      it('DELETE /booking/:id should return not found response if the booking does not exist', function(done){
        chai.request(api)
        .delete('/booking/f86b3f21-b88d-4b55-a2bd-d077invalid')
        .end((_, res) => {
          chai.expect(res.statusCode).to.equal(404)
          chai.expect(res.body).to.deep.equal({
            error: 'Booking f86b3f21-b88d-4b55-a2bd-d077invalid not found'
          })
          done()
        })
      })
})