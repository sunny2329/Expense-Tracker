import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
        const hashedPassword = await bcrypt.hash(password, salt);
        //! Create the user and save it in the database
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword
        })


        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated._id
        })
        console.log(req.body);
        // res.json({ message: "Register" })
    }),

    //! Login
    login: asyncHandler(async (req, res) => {
        //! Get the user data
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid login credentials')
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid login credentials');
        }
        //! Generate a token for the user
        const token = jwt.sign({ id: user._id }, "sunnyToken", {
            expiresIn: '30d'
        });
        //! Send the response
        res.json({
            message: 'Login Success',
            token,
            id: user._id,
            email: user.email,
            username: user.username
        })
    }),

    //!profile
    profile: asyncHandler(async (req, res) => {
        //! Find the user
        const user = await User.findById("req.user");
        if (!user) {
            throw new Error('User not found');
        }
        //! Send the response
        res.json({
            username: user.username,
            email: user.email
        })
    }),
    //! Change user password
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;
        //! Find the user
        const user = await User.findById("req.user");
        if (!user) {
            throw new Error('User not found');
        }
        //! Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword
        await user.save();
        //! Send the response
        res.json({
            message: 'Password changed successfully'
        })
    }),
    //! Update the user profile
    updateUserProfile: asyncHandler(async (req, res) => {
        const { email, username } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.user, {
            username,
            email
        }, {
            new: true
        })
        //! Send the response
        res.json({
            message: 'User Profile updated successfully',
            updatedUser

        })
    })
}


export default usersController