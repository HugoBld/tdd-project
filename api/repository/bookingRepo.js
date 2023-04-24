import { DateTime } from "luxon";

export default (Booking, Book, User) =>{
    const bookings = [
      new Booking(
        'f86b3f21-b88d-4b55-a2bd-d077cb6e5d1c', 
        DateTime.fromISO("2000-01-01").toFormat('yyyy-MM-dd'),
        DateTime.fromISO("2000-12-17").toFormat('yyyy-MM-dd'),
        new Book('1010101010101', 'Harry Potter', 'JK Rowling', 'Minalima', 'FR', 35.00),
        new User('ab724d8c-38c0-4f6c-ba66-944750217338', 'BLANCHARD', 'Hugo', DateTime.fromISO('2000-12-17').toFormat('yyyy-MM-dd'), 'Nantes', '+33609080706', 'hugo.blanchard17@gmail.com')
      ),
      new Booking(
        '680af88c-cca8-4fb7-b6e3-d5ffd0defaad',
        DateTime.fromISO("2003-03-21").toFormat('yyyy-MM-dd'),
        DateTime.fromISO("2003-06-17").toFormat('yyyy-MM-dd'),
        new Book('2020202020202', 'La communaute de l anneau', 'JRR Tolkien', 'Univers Poche', 'FR', 19.90),
        new User('d8671313-020b-414e-a60a-589ba98999c6', 'LEE', 'Bruce', DateTime.fromISO('1999-01-13').toFormat('yyyy-MM-dd'), 'Nantes', '+33609086543', 'bruce.lee@gmail.com')
      )
    ];
      
    const listBookings = () => {
      return bookings;
    }
  
    const createBooking = (booking) => {
      bookings.push(booking);
      return booking
    }
  
    const findBooking = (id) => {
      return bookings.find(booking => booking.id === id) || null;
    }
  
    const updateBooking = (id ,booking) => {

      let bookingUpdateIndex = bookings.findIndex(booking => booking.id === id);
        if(bookingUpdateIndex < 0){
            return null
        }
        booking[bookingUpdateIndex] = booking;
        return  booking[bookingUpdateIndex];
    }
  
    const deleteBooking = (id) => {
      let bookingToDeleteIndex = bookings.findIndex(booking => booking.id === id);
      if(bookingToDeleteIndex < 0) return null
  
      let deletedBooking = bookings.splice(bookingToDeleteIndex, 1)
      return deletedBooking[0];
    }
  
    return {
      listBookings,
      createBooking,
      findBooking,
      updateBooking,
      deleteBooking
    };
  }