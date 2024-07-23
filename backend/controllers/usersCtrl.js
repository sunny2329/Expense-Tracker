import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import { User } from '../model/User.js'

//! User Registration

const usersController = {
    //!Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;
        //!validate
        if (!username || !email || !password) {
            throw new Error('Please all fields are required')
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.json({
                message: 'User already exists'
            })
            throw new Error('User already exists')
        }
        //! Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        //! Create the user and save it in the database
        const userCreated = await User.create({
            email,
            username,
            password:hashedPassword
        })


        res.json({
            username: userCreated.username,
            email:userCreated.email,
            id: userCreated._id
        })
        console.log(req.body);
        // res.json({ message: "Register" })
    })
}


export default usersController