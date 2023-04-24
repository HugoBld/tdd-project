import bookRepo from "./bookRepo.js";
import userRepo from "./userRepo.js";
import bookingRepo from "./bookingRepo.js";

export default(model) => ({
    bookRepo : bookRepo(model.Book),
    userRepo: userRepo(model.User),
    bookingRepo: bookingRepo(model.Booking, model.Book, model.User)
});