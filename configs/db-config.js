const {MongoClient} = require('mongodb');
const dbConfig = {};

const uri = process.env.CONNECT_STRING;
const client = new MongoClient(uri);

dbConfig.connectDB = async function () {
    try {

        await client.connect();

        const db = client.db('cse341');
        return db

    } catch (error) {
        console.error('failed to connect to the db - ', error);

    } 
}

dbConfig.connectUserCollection = function(db){
    const collection = db.collection("user");
    return collection;
}

dbConfig.connectItemCollection = function(db){
    const collection = db.collection("item");
    return collection;
}


module.exports = dbConfig;