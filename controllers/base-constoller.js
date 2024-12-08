const baseController = {};
const baseModel = require('../models/base-model');
const { validationResult } = require('express-validator');

baseController.getUser = async function(req, res){
    const result = await baseModel.getUser();
    res.json(result); 
}

baseController.getUserById = async function(req, res){

    const userId = req.query.userId;
    const result = await baseModel.getUserById(userId);

    res.json(result);
}

baseController.getItemsByUserId = async function(req, res){
    const userId = req.query.userId;
    const result = await baseModel.getItemsByUserId(userId);

    res.json(result);
}
 
baseController.getItemByUserIdAndItemName = async function(req, res){
    const {userId, itemName} = req.query;
    const result = await baseModel.getItemByUserIdAndItemName(userId, itemName);

    res.json(result);
}

baseController.addUser = async function(req, res){
    try{
        const {first_name, last_name, email} = req.body;
        const result = await baseModel.insertUser(req.body);

        res.status(200).send(result);

    }catch(error){
        res.status(500).send('Error adding user');
        console.error('Error in addUser:', error);
    }
}

baseController.addItem = async function(req, res){
    try{
        const {user_id, name, amount, color, from_country, to_country, purchase_date, is_paid} = req.body;
        const result = await baseModel.insertItem(req.body);

        res.status(200).send(result);

    }catch(error){
        res.status(500).send('Error adding item');
        console.error('Error in addItem:', error);
    }
}

baseController.updateUser = async function(req, res){
    try {
        const userId = req.query.userId;
        const {first_name, last_name, email} = req.body;
        const result = await baseModel.updateUser(userId, req.body);

        if (result) {
            return res.status(204).send(); 
        }

        return res.status(404).json({ error: "user not found or could not be updated" });
        
    } catch (error) {
        res.status(500).send('Error update user');
        console.error('Error in updateUser:', error);
    }
}

baseController.updateItem = async function(req, res){
    try {
        const {userId, itemName} = req.query;
        const {amount, color, from_country, to_country, purchase_date, is_paid} = req.body;
        const result = await baseModel.updateItem(userId, itemName, req.body);

        if (result) {
            return res.status(204).send(); 
        }

        return res.status(404).json({ error: "Item not found or could not be updated" });
        
        
    } catch (error) {
        res.status(500).send('Error update item');
        console.error('Error in updateItem:', error);
    }
}

baseController.deleteUser = async function(req, res){
    try {
        const deleteId = req.query.userId;
        const result = await baseModel.deleteUserById(deleteId);

        if (result) {
            return res.status(204).send(); 
        }

        return res.status(404).json({ error: "User not found" });
        
    } catch (error) {
        res.status(500).send('Error delete user');
        console.error('Error in deleteUser:', error);
    }
}

baseController.deleteItem = async function(req, res){
    try {
        const {userId, itemName} = req.query;
        const result = await baseModel.deleteItemByUserIdAndItemName(userId, itemName);

        if (result) {
            return res.status(204).send(); 
        }

        return res.status(404).json({ error: "Item not found" });
        
    } catch (error) {
        res.status(500).send('Error delete item');
        console.error('Error in deleteItem:', error);
    }
}

module.exports = baseController;