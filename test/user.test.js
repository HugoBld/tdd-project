import chai from 'chai';
import chaiHttp from 'chai-http';
import api from '../index.js';

chai.use(chaiHttp);

describe.only('CRUD User', function(){
  it('GET /users should return status code 200 with users list', function(done){
    chai.request(api)
        .get('/users')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(200);
            chai.expect(res.body).to.deep.equal({
                data: [
                    {
                        id: 'ab724d8c-38c0-4f6c-ba66-944750217338',
                        lastName: 'BLANCHARD',
                        firstName: 'Hugo',
                        birthDate: '2000-12-17',
                        address: 'Nantes',
                        phone: '+33609080706',
                        email: 'hugo.blanchard17@gmail.com',
                      },
                      {
                        id: 'd8671313-020b-414e-a60a-589ba98999c6',
                        lastName: 'LEE',
                        firstName: 'Bruce',
                        birthDate: '1999-01-13',
                        address: 'Nantes',
                        phone: '+33609086543',
                        email: 'bruce.lee@gmail.com',
                      }
                ]
            });
        done();
    })
  })
  it('GET /user/:id should return status code 200 with a user', function(done){
    const user = {
      id: 'ab724d8c-38c0-4f6c-ba66-944750217338',
      lastName: 'BLANCHARD',
      firstName: 'Hugo',
      birthDate: '2000-12-17',
      address: 'Nantes',
      phone: '+33609080706',
      email: 'hugo.blanchard17@gmail.com'
    }
    chai.request(api)
        .get('/user/ab724d8c-38c0-4f6c-ba66-944750217338')
        .end((_, res) => {
            chai.expect(res.statusCode).to.equal(200)
            chai.expect(res.body.data).to.deep.equal(user)
        done();
    })
  })
  it('GET /user/:id with invalid ID should return a status code 404', function(done){
    chai.request(api)
      .get('/user/ab724d8c-38c0-4f6c-ba66-invalid')
      .end((_,res) => {
        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.deep.equal({
          error: `User ab724d8c-38c0-4f6c-ba66-invalid not found`
        })
        done();
      }
      )
  })
  it('POST /user should create the user and return status code 201 with the user', function(done){
      const user = {
        lastName: 'LEE',
        firstName: 'Bruce',
        birthDate: '1999-01-13',
        address: 'Nantes',
        phone: '+33609086543',
        email: 'bruce.lee@gmail.com'
      }
      chai.request(api)
      .post('/user')
      .send(user)
      .end((_, res) => {
        chai.expect(res.statusCode).to.equal(201)
        chai.expect(res.body.data).to.deep.include(user)
        chai.expect(res.body.data).to.have.property('id')
        chai.expect(res.body.data.id).to.have.lengthOf(36)
        done()
      })
  })
  it('POST /user with invalid birthDate format should return an error with status code 400 with the user', function(done){
    const user = {
      lastName: 'LEE',
      firstName: 'Bruce',
      birthDate: '01-13-1999',
      address: 'Nantes',
      phone: '+33609086543',
      email: 'bruce.lee@gmail.com'
    }
    chai.request(api)
    .post('/user')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: 'BirthDate format is invalid : YYYY-MM-DD'
      })
      done()
    })
  })
  it('POST /user with invalid phone format should return an error with status code 400 with the user', function(done){
    const user = {
      lastName: 'LEE',
      firstName: 'Bruce',
      birthDate: '1999-01-13',
      address: 'Nantes',
      phone: '09086543',
      email: 'bruce.lee@gmail.com'
    }
    chai.request(api)
    .post('/user')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: 'Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres'
      })
      done()
    })
  })
  it('POST /user with missing data should return an error with status code 400 with the user', function(done){
    const user = {
      lastName: 'Lee',
      firstName: '',
      birthDate: '1999-01-13',
      address: null,
      phone: '09086543',
      email: 'bruce.lee@gmail.com'
    }
    chai.request(api)
    .post('/user')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: 'Data is missing'
      })
      done()
    })
  })
  it('PUT /user should update the user and return status code 200 with the updated user', function(done){
    const user = {
      id: 'd8671313-020b-414e-a60a-589ba98999c6',
      lastName: 'BRUCE',
      firstName: 'LEE',
      birthDate: '2000-12-17',
      address: 'Paris',
      phone: '+33609080706',
      email: 'bruce.updated@gmail.com',
    }
    chai.request(api)
    .put('/user/d8671313-020b-414e-a60a-589ba98999c6')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(200)
      chai.expect(res.body.data).to.deep.include(user)
      done()
    })
  })
  it('PUT /user with invalid birthDate format should return an error with status code 400', function(done){
    const user = {
      id: 'd8671313-020b-414e-a60a-589ba98999c6',
      lastName: 'BRUCE',
      firstName: 'LEE',
      birthDate: '21-01-2000',
      address: 'Paris',
      phone: '+33609080706',
      email: 'bruce.updated@gmail.com',
    }
    chai.request(api)
    .put('/user/d8671313-020b-414e-a60a-589ba98999c6')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: 'BirthDate format is invalid : YYYY-MM-DD'
      })
      done()
    })
  })
  it('PUT /user with invalid phone format should return an error with status code 400', function(done){
    const user = {
      id: 'd8671313-020b-414e-a60a-589ba98999c6',
      lastName: 'BRUCE',
      firstName: 'LEE',
      birthDate: '2000-12-17',
      address: 'Paris',
      phone: '09080706',
      email: 'bruce.updated@gmail.com',
    }
    chai.request(api)
    .put('/user/d8671313-020b-414e-a60a-589ba98999c6')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(400)
      chai.expect(res.body).to.deep.equal({
        error: 'Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres'
      })
      done()
    })
  })
  it('PUT /user with invalid UUID should return an error with status code 400', function(done){
    const user = {
      id: 'd8671313-020b-414e-a60a-589ba98999r9',
      lastName: 'BRUCE',
      firstName: 'LEE',
      birthDate: '2000-12-17',
      address: 'Paris',
      phone: '+33609080706',
      email: 'bruce.updated@gmail.com',
    }
    chai.request(api)
    .put('/user/d8671313-020b-414e-a60a-589ba98999r9')
    .send(user)
    .end((_, res) => {
      chai.expect(res.statusCode).to.equal(404)
      chai.expect(res.body).to.deep.equal({
        error: `User ${user.id} not found`
      })
      done()
    })
  })
  it('DELETE /user/:id should return a status code 200 with the deleted user', function(done){
    const user = {
        id: 'ab724d8c-38c0-4f6c-ba66-944750217338',
        lastName: 'BLANCHARD',
        firstName: 'Hugo',
        birthDate: '2000-12-17',
        address: 'Nantes',
        phone: '+33609080706',
        email: 'hugo.blanchard17@gmail.com',
      }
    chai.request(api)
      .delete('/user/ab724d8c-38c0-4f6c-ba66-944750217338')
      .send(user)
      .end((_,res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.deep.equal({
            meta: {
                deletedUser: user
            }
        })
        done();
      }
      )
  })
  it('DELETE /user/:id with invalid ID should return a status code 404', function(done){
    const user = {
        id: '128Y414',
        lastName: 'NO',
        firstName: 'USER',
        birthDate: '2000-12-17',
        address: 'Nantes',
        phone: '+33609080706',
        email: 'no.user@gmail.com',
      }
    chai.request(api)
      .delete('/user/128Y414')
      .send(user)
      .end((_,res) => {
        chai.expect(res).to.have.status(404);
        chai.expect(res.body).to.deep.equal({
          error: `User ${user.id} not found`
        })
        done();
      }
      )
  })

})