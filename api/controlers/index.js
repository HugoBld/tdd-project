import statusCheck from './statusCheck.js';
import bookCtrl from './bookCtrl.js';
import userCtrl from './userCtrl.js';
import bookingCtrl from './bookingCtrl.js';

export default (repository, model) => ({
  statusCheck,
  bookCtrl: bookCtrl( model.Book),
  userCtrl: userCtrl(repository.userRepo, model.User),
  bookingCtrl: bookingCtrl(repository.bookingRepo, repository.userRepo, repository.bookRepo, model.Booking)
});
