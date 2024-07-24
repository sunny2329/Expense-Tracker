import asyncHandler from 'express-async-handler'
import { Category } from '../model/Category.js'

//! User Registration

const categoryController = {
    //! add
    create: asyncHandler(async (req, res) => {
        const { name, type } = req.body;
        if (!name || !type) {
            throw new Error('Name and type are required for creating a category');
        }
        const normalizedName = name.toLowerCase();
        //!Check if the type is valid
        const validTypes = ['income', 'expense'];
        if (!validTypes.includes(type.toLowerCase())) {
            throw new Error('Invalid category type' + type);
        }
        //! Check if category already exists on the user
        const categoryExists = await Category.findOne({ name: normalizedName, user: req.user });
        if(categoryExists){
            throw new Error(`Category ${categoryExists.name} already exists`);
        }
        //! Create the category
        const category = await Category.create({
            name:normalizedName,
            user:req.user,
            type
        })
        res.status(201).json(category)
    }),
    //! lists
    lists: asyncHandler(async (req, res) => {
        const categories = await Category.find({user:req.user});
        res.status(200).json(categories);
    }),
    //! update
    update: asyncHandler(async (req, res) => { }),
    //! delete
    delete: asyncHandler(async (req, res) => { })

}


export default categoryController