const bcrypt = require('bcrypt');
    const User = require('../models/User');
    const { generate } = require('../helpers/token');
    const ROLES = require('../constants/roles');
    
    
    //  register

    async function register(login, password, role, kdate_lpu, kdlpu, name_user) {
        
        if (!password) {
            throw new Error('Password is empty');
        };
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({ login, password: passwordHash, role: role, 
            kdate_lpu: kdate_lpu, kdlpu: kdlpu, name_user: name_user });
        const token = generate({ id: user.id });
        
        return { user, token };


    }

    //  login

    async function login(login, password) {
        const user = await User.findOne({ login });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new Error('Wrong password');
        };

        const token = generate({ id: user.id });

        return { token, user };

    };

    function getUsers() {
        return User.find();
    };

    function getRoles() {
        return [
            {id: ROLES.ADMIN, name: 'Admin' },
            {id: ROLES.HOSP, name: 'HOSP' },
            {id: ROLES.MH, name: 'MH' },
            {id:    ROLES.TFOMS, name: 'TFOMS'}

        ]
    };

    //  delete

    function deleteUser(id){
        return User.deleteOne({ _id: id})
    }

    //  edit (rtoles)
    function updateUser(id, userData){
        return User.findByIdAndUpdate(id, userData, {returnDocument: 'after'})
    }

    module.exports = {
        register, 
        login,
        getUsers,
        deleteUser,
        getRoles,
        updateUser
    }