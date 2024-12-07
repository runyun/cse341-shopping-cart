const { ObjectId } = require('mongodb');
const dbConfig = require('../configs/db-config');
const user = require('../models/user-schema');
const item = require('../models/item-schema');
const baseModel = {};


baseModel.getUser = async function(){
    try {
        const db = await dbConfig.connectDB();
        const userCollection = dbConfig.connectUserCollection(db);
        const allData = await userCollection.find({}).toArray();
        return allData;

    } catch (error) {
        console.error('error when get user data - ', error);
    }
}

baseModel.getUserById = async function (id) {
    try {
        const db = await dbConfig.connectDB();
        const userCollection = dbConfig.connectUserCollection(db);
        const user = await userCollection.findOne({_id:new ObjectId(id)});

        return user;

    } catch (error) {
        console.error('error when fetch the user by ID - ', error); 
    } 
}

baseModel.getItemsByUserId = async function (userId) {
    try {
        const db = await dbConfig.connectDB();
        const itemCollection = dbConfig.connectItemCollection(db);

        const items = await itemCollection.find({user_id: userId}).toArray();

        return items;

    } catch (error) {
        console.error('error when fetch the user by ID - ', error); 
    } 
}

baseModel.getItemByUserIdAndItemName = async function (userId, itemName) {
    try {
        const db = await dbConfig.connectDB();
        const itemCollection = dbConfig.connectItemCollection(db);

        const item = await itemCollection.findOne({user_id: userId, name: itemName});

        return item;

    } catch (error) {
        console.error('error when fetch the user by ID - ', error); 
    } 
}

baseModel.insertUser = async function(data){
    const db = await dbConfig.connectDB();
    const userCollection = await dbConfig.connectUserCollection(db);

    const newUser = new user({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
    });

    const savedUser = await userCollection.insertOne(newUser);

    return savedUser.insertedId;
}

baseModel.insertItem = async function(data){
    const db = await dbConfig.connectDB();
    const itemCollection = await dbConfig.connectItemCollection(db);

    const newItem = new item({
        user_id: data.user_id,
        name: data.name,
        amount: data.amount,
        color: data.color,
        from_country: data.from_country,
        to_country: data.to_country,
        purchase_date: data.purchase_date,
        is_paid: data.is_paid
    });

    const savedItem = await itemCollection.insertOne(newItem);

    return savedItem.insertedId;
}

baseModel.updateUser = async function(id, data){
    try {
        const db = await dbConfig.connectDB();
        const userCollection = await dbConfig.connectUserCollection(db);
        const filter = {_id: new ObjectId(id)};
        const updateData = {
            $set: {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email
            }
        }

        const result = await userCollection.updateOne(filter, updateData);

        if (result.matchedCount === 0) {
            console.log('No data been updated.');

        } else {
            console.log('Updated successfully:', result.modifiedCount);
        }
    } catch (error) {
        console.error('update data failed - ', error); 
    }
}

baseModel.updateItem = async function(id, itemName, data){
    try {
        const db = await dbConfig.connectDB();
        const itemCollection = await dbConfig.connectItemCollection(db);
        const filter = {_id: new ObjectId(id), name: itemName};
        const updateData = {
            $set: {
                name: data.name,
                amount: data.amount,
                color: data.color,
                from_country: data.from_country,
                to_country: data.to_country,
                purchase_date: data.purchase_date,
                is_paid: data.is_paid 
            }
        }

        const result = await itemCollection.updateOne(filter, updateData);

        if (result.matchedCount === 0) {
            console.log('No data been updated.');

        } else {
            console.log('Updated successfully:', result.modifiedCount);
        }
    } catch (error) {
        console.error('update data failed - ', error); 
    }
}

baseModel.deleteUserById = async function(id){
    const db = await dbConfig.connectDB();
    const userCollection = await dbConfig.connectUserCollection(db);
    const filter = {_id: new ObjectId(id)};
    const result = await userCollection.deleteOne(filter);

    return result;
}

baseModel.deleteItemByUserIdAndItemName = async function(userId, itemName){
    const db = await dbConfig.connectDB();
    const itemCollection = await dbConfig.connectItemCollection(db);
    const filter = {user_id: userId, name: itemName};
    const result = await itemCollection.deleteOne(filter);

    return result;
}

module.exports = baseModel;