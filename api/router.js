
export default (controlers, app) => {
  app.get('/statusCheck', controlers.statusCheck.getStatus);
  app.get('/books', controlers.bookCtrl.listBooks);
  app.post('/book', controlers.bookCtrl.createBook);
  app.put('/book/:id', controlers.bookCtrl.updateBook);
  app.delete('/book/:id', controlers.bookCtrl.deleteBook);

  app.get('/users', controlers.userCtrl.listUsers);
  app.get('/user/:id', controlers.userCtrl.getUser);
  app.post('/user', controlers.userCtrl.createUser);
  app.put('/user/:id', controlers.userCtrl.updateUser);
  app.delete('/user/:id', controlers.userCtrl.deleteUser);


  app.get('/bookings', controlers.bookingCtrl.listBookings);
  app.post('/booking', controlers.bookingCtrl.createBooking);
  app.put('/booking/:id', controlers.bookingCtrl.updateBooking);
  app.delete('/booking/:id', controlers.bookingCtrl.deleteBooking);
}
