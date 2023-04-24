import { DateTime } from "luxon";

export default(User) => {
    let users = [
        new User('ab724d8c-38c0-4f6c-ba66-944750217338','BLANCHARD','Hugo', DateTime.fromISO("2000-12-17").toFormat('yyyy-MM-dd'),'Nantes', '+33609080706', 'hugo.blanchard17@gmail.com'),
        new User('d8671313-020b-414e-a60a-589ba98999c6','LEE','Bruce', DateTime.fromISO("1999-01-13").toFormat('yyyy-MM-dd'),'Nantes', '+33609086543', 'bruce.lee@gmail.com')
    ];

    const listUsers = () => {
        return users;
    }

    const getUser = (id) => {
      return users.find(user => user.id === id) || null;
    }

    const createUser = (user) => {
        users.push(user);
        return user;
    }

    const updateUser = (id, user) => {
        let userUpdateIndex = users.findIndex(user => user.id === id);
        if(userUpdateIndex < 0){
            return null
        }
        users[userUpdateIndex] = user;
        return  users[userUpdateIndex];
    }

    const deleteUser = (id) => {
        let userToDeleteIndex = users.findIndex(user => user.id === id);
        if(userToDeleteIndex < 0){
            return null
        }
        const deletedUser = users.splice(userToDeleteIndex, 1)[0];
        return deletedUser;
    }

    return{
        createUser,
        updateUser,
        deleteUser,
        listUsers,
        getUser
    }
}