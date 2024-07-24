import asyncHandler from 'express-async-handler'
import { Transaction } from '../model/Transaction.js'

//! User Registration

const transactionController = {
    //! add
    create: asyncHandler(async (req, res) => {
        const {type,category,amount,date,description} = req.body;
        if(!amount || !type || !date){
            throw new Error('Type, amount and date are required');
        }
        //! Create 
        const transaction = await Transaction.create({
            user:req.user,
            type,
            category,
            amount,
            date,
            description
        })
        res.status(201).json(transaction)
    }),
    //! lists
    lists: asyncHandler(async (req, res) => {
        const transactions = await Transaction.find({
            user:req.user
        });
        res.json(transactions);
    }),
    //! update
    update: asyncHandler(async (req, res) => { }),
    //! delete
    delete: asyncHandler(async (req, res) => { })

}


export default transactionController