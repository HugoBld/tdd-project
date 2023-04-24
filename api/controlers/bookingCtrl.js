import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";

  export default (bookingRepo, userRepo, bookRepo, Booking) => {

    const listBookings = (_, res) => {
        let bookings = bookingRepo.listBookings();
        
        if(bookings){
            res.send({
                data: bookings
            });
        }
    };

    const createBooking = (req, res) => {
        let {rentDate,returnDate,item,user} = req.body;

         //CHECK IF DATA IS MISSING
         if(!rentDate || !returnDate || !item || !user ){
            return res.status(400).send({
                error: 'Data is missing'
            })
        }



        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(rentDate) || !/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(returnDate)){
            return res.status(400).send({
                error: 'Date format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF RENT DATE < RETURN DATE
        if(DateTime.fromISO(rentDate) > DateTime.fromISO(returnDate)){
            return res.status(400).send({
                error: 'This period is not valid for a booking'
            })
        }

        

        else{
            const _id = uuidv4();

            //CHECK IF USER EXIST
            const u = userRepo.getUser(user);
            if (u === null){
                return res.status(404).send({
                    error: {
                    message: 'No user found'
                    }
                })
            }

            //CHECK IF BOOK EXIST
            const b = bookRepo.getBook(item);
            if (b === null){
                return res.status(404).send({
                    error: {
                    message: 'No book found'
                    }
                })
            }

            //CHECK IF BOOK IS AVAILABLE
            if (bookingRepo.listBookings().find(booking => booking.item.isbn13 === req.body.item)){
                return res.status(400).send({
                  error: {
                    message: `Book ${req.body.item} is not available`
                  }
                })
              }

            let booking = bookingRepo.createBooking(
                new Booking(
                    _id,
                    rentDate,
                    returnDate,
                    b,
                    u
                )
            );
            return res.status(201).send({data: booking});
        }
        
    }

    const updateBooking = (req,res) => {
        let {rentDate, returnDate, item, user} = req.body;
        let _id = req.params.id;

        //CHECK IF DATA IS MISSING
        if(!rentDate || !returnDate || !item || !user ){
            return res.status(400).send({
                error: 'Data is missing'
            })
        }

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(rentDate) || !/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(returnDate)){
            return res.status(400).send({
                error: 'Date format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF RENT DATE < RETURN DATE
        if(DateTime.fromISO(rentDate) > DateTime.fromISO(returnDate)){
            return res.status(400).send({
                error: 'This period is not valid for a booking'
            })
        }
        
        //CHECK IF USER EXIST
        const u = userRepo.getUser(user);
        if (u === null){
            return res.status(404).send({
                error: {
                message: 'No user found'
                }
            })
        }

        //CHECK IF BOOK EXIST
        const b = bookRepo.getBook(item);
        if (b === null){
            return res.status(404).send({
                error: {
                message: 'No book found'
                }
            })
            
        }

        //CHECK IF BOOK IS AVAILABLE
        if (bookingRepo.listBookings().find(booking => booking.item.isbn13 === req.body.item)){
            return res.status(400).send({
                error: {
                message: `Book ${req.body.item} is not available`
                }
            })
            }

        let updatedBooking = bookingRepo.updateBooking(
            _id,
            new Booking(
                _id,
                rentDate,
                returnDate,
                b,
                u
            )
        );

        if(updatedBooking){
            return res.status(200).send({data: updatedBooking})
        }

        return res.status(404).send({error: `Booking ${_id} not found`})


    }

    const deleteBooking = (req,res) => {
        let _id = req.params.id;

        let deletedBooking = bookingRepo.deleteBooking(_id);

        if(deletedBooking){
            return res.status(200).send({meta: deletedBooking})
        }

        return res.status(404).send({error: `Booking ${_id} not found`})


    }

    return{
        deleteBooking,
        updateBooking,
        listBookings,
        createBooking
    }
    
  };
  