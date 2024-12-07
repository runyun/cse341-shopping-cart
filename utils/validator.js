const { body, query } = require('express-validator');
const validator = {};

validator.validateUserId = [
    query('userId')
    .notEmpty()
    .withMessage('User id is required')
    .isString()
    .withMessage('User ID must be a string')
    .isLength({min:24, max:24})
    .withMessage('The length of ID is incorrect')
];

validator.validateItemName = [
    query('itemName')
    .notEmpty()
    .withMessage('Item name is required')
    .isString()
    .withMessage('The item name must be a string')
];

validator.validateUser = [
    body('first_name')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  body('last_name')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email address')
];

validator.validateItem = [
    body('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isString()
    .withMessage('User ID must be a string')
    .isLength({ min: 24, max: 24 })
    .withMessage('User ID must be 24 characters long'),

  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .isFloat({ min: 1 })
    .withMessage('Amount must be greater than 0'),

  body('color')
    .notEmpty()
    .withMessage('Color is required')
    .isString()
    .withMessage('Color must be a string'),

  body('from_country')
    .notEmpty()
    .withMessage('From Country is required')
    .isString()
    .withMessage('From Country must be a string'),

  body('to_country')
    .notEmpty()
    .withMessage('To Country is required')
    .isString()
    .withMessage('To Country must be a string'),

  body('purchase_date')
    .notEmpty()
    .withMessage('Purchase date is required')
    .isISO8601()
    .withMessage('Purchase date must be a valid date'),

  body('is_paid')
    .notEmpty()
    .withMessage('is_paid is required')
    .isBoolean()
    .withMessage('is_paid must be a boolean value (true or false)'),
];

module.exports = validator;