import { v4 as uuidv4 } from 'uuid';
import { DateTime } from "luxon";


export default (userRepo, User) => {

    const checkUUIDFormat = (id) => {
        return uuidValidate(id) && uuidVersion(id) === 4;
    }

    const listUsers = (_, res) => {
        let users = userRepo.listUsers();
        res.send({
            data: users
        });
    };

    const getUser = (req, res) => {
        let _id = req.params.id;
        let user = userRepo.getUser(_id);
        if(user){
            return res.status(200).send({data: user})
        }
        return res.status(404).send({error: `User ${_id} not found`})
    }



    const createUser = (req, res) => {
        let {id,lastName, firstName, birthDate, address, phone, email} = req.body;
        
        //CHECK IF DATA IS MISSING
        if(!lastName || !firstName || !birthDate || !address || !phone|| !email){
            return res.status(400).send({
                error: 'Data is missing'
            })
        }

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(birthDate)){
            return res.status(400).send({
                error: 'BirthDate format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF PHONE NUMBER FORMAT IS INVALID
        if(!/^(0|\+33|0033)[1-9][0-9]{8}$/.test(phone)){
            return res.status(400).send({
                error: 'Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres'
            })
        }

        else{
            birthDate = DateTime.fromISO(birthDate).toFormat('yyyy-MM-dd');
            id = uuidv4();

            let user = userRepo.createUser(
                new User(
                    id, 
                    lastName, 
                    firstName, 
                    birthDate, 
                    address, 
                    phone, 
                    email
                )
            );
            return res.status(201).send({data: user});
        }
        
    }

    const updateUser = (req,res) => {
        let {lastName, firstName, birthDate, address, phone, email} = req.body;
        let _id = req.params.id;

        // if(checkUUIDFormat(_id)){
        //     return res.status(400).send({
        //         error: 'UUID is not valid'
        //     })
        // }

        //CHECK IF DATE FORMAT IS INVALID
        if(!/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(birthDate)){
            return res.status(400).send({
                error: 'BirthDate format is invalid : YYYY-MM-DD'
            })
        }

        //CHECK IF PHONE NUMBER FORMAT IS INVALID
        if(!/^(0|\+33|0033)[1-9][0-9]{8}$/.test(phone)){
            return res.status(400).send({
                error: 'Phone number is invalid : (+33 ou 0 ou 0033) suivi de exactement 9 chiffres'
            })
        }

        let updatedUser = userRepo.updateUser(
            _id,
            new User(_id, lastName, firstName, birthDate, address, phone, email)
        );

        if(updatedUser){
            return res.status(200).send({data: updatedUser})
        }

        return res.status(404).send({error: `User ${_id} not found`})
    }
    

    const deleteUser = (req,res) => {
        let _id = req.params.id;

        let deletedUser = userRepo.deleteUser(_id);

        if(deletedUser){
            return res.status(200).send({meta: {deletedUser}})
        }

        return res.status(404).send({error: `User ${_id} not found`})

    }


    

    return {
        listUsers,
        getUser,
        createUser,
        updateUser,
        deleteUser
    }
}