const express = require('express');
const router = new express.Router();
const baseController = require('../controllers/base-constoller');
const validator = require('../utils/validator');
const validationErrorHandler = require('../utils/validation-error-handler');


router.get('/getUser', baseController.getUser);

router.get('/getUserById',
    validator.validateUserId,
    validationErrorHandler,
    baseController.getUserById);

router.get('/getItemsByUserId',
    validator.validateUserId,
    validationErrorHandler,
    baseController.getItemsByUserId);

router.get('/getItemByUserIdAndItemName',
    validator.validateUserId,
    validator.validateItemName,
    validationErrorHandler,
    baseController.getItemByUserIdAndItemName);



router.post('/createUser',
    validator.validateUser,
    validationErrorHandler,
    baseController.addUser);

router.post('/createItem',
    validator.validateItem,
    validationErrorHandler,
    baseController.addItem);



router.put('/updateUser/:userId',
    validator.validateUserId,
    validator.validateUser,
    validationErrorHandler,
    baseController.updateUser);

router.put('/updateItem/:userId&itemName',
    validator.validateUserId,
    validator.validateItemName,
    validator.validateItem,
    validationErrorHandler,
    baseController.updateItem);



router.delete('/deleteUser/:userId',
    validator.validateUserId,
    validationErrorHandler,
    baseController.deleteUser);

router.delete('/deleteItem/:userId&itemName', 
    validator.validateUserId,
    validator.validateItemName,
    validationErrorHandler,
    baseController.deleteItem);
 
module.exports = router;