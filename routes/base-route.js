const express = require('express');
const router = new express.Router();
const baseController = require('../controllers/base-constoller');
const validator = require('../utils/validator');
const validationErrorHandler = require('../utils/validation-error-handler');
const isAuthenticated = require('../utils/authenticate');


router.get('/getUser',isAuthenticated , baseController.getUser);

router.get('/getUserById',
    isAuthenticated,
    validator.validateUserId,
    validationErrorHandler,
    baseController.getUserById);

router.get('/getItemsByUserId',
    isAuthenticated,
    validator.validateUserId,
    validationErrorHandler,
    baseController.getItemsByUserId);

router.get('/getItemByUserIdAndItemName',
    isAuthenticated,
    validator.validateUserId,
    validator.validateItemName,
    validationErrorHandler,
    baseController.getItemByUserIdAndItemName);



router.post('/createUser',
    isAuthenticated,
    validator.validateUser,
    validationErrorHandler,
    baseController.addUser);

router.post('/createItem',
    isAuthenticated,
    validator.validateItem,
    validationErrorHandler,
    baseController.addItem);



router.put('/updateUser',
    isAuthenticated,
    validator.validateUserId,
    validator.validateUser,
    validationErrorHandler,
    baseController.updateUser);

router.put('/updateItem',
    isAuthenticated,
    validator.validateUserId,
    validator.validateItemName,
    validator.validateItem,
    validationErrorHandler,
    baseController.updateItem);



router.delete('/deleteUser',
    isAuthenticated,
    validator.validateUserId,
    validationErrorHandler,
    baseController.deleteUser);

router.delete('/deleteItem', 
    isAuthenticated,
    validator.validateUserId,
    validator.validateItemName,
    validationErrorHandler,
    baseController.deleteItem);
    
module.exports = router;