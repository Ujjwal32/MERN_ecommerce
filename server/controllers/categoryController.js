const Category = require("../model/category")


const getAllCategories = async (req,res) => {
    try{
        const category = await Category.find().sort({ _id: -1})
        res.json({
            msg: 'Success',
            result:{
                category
            }
        })
    }catch(err){
        res.json({
            msg: 'Error on fetching',
            error: err
        })
    }
}

const addCategory = async (req,res) => {
    try{
        const category = await Category.create({...req.body})
        res.json({
            msg: 'Category added!',
            result: {
                category
            }
        })
    }catch(err){
        res.json({
            msg: 'Error on adding',
            error: err
        })
    }
}

const deleteCategory = async (req,res) => {
    const id = req.params.id;
    try{
        const deletedItem = await Category.findByIdAndDelete(id)

        res.json({
            msg: 'Category Added!',
            result: {
                deletedItem
            }
        })
    } catch(err){
        res.json({
            msg: "Error",
            error: err
        })
    }
}

const updateCategory = async (req,res) => {
    const id = req.params.id;
    const name = req.body.name
    try{
        const updatedItem = await Category.findByIdAndUpdate(id, {name},{new: true,runValidators: true })

        res.json({
            msg: 'Category Added!',
            result: {
                updatedItem
            }
        })
    } catch(err){
        res.json({
            msg: "Error",
            error: err
        })
    }
}
module.exports = {
    getAllCategories,
    addCategory,
    deleteCategory,
    updateCategory
}