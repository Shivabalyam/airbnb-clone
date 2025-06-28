const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({

        title: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .pattern(/.*[a-zA-Z].*/)
            .required()
            .messages({
                'string.empty': 'Title is required.',
                'string.min': 'Title must be at least 3 characters long.',
                'string.max': 'Title cannot exceed 100 characters.',
                'string.pattern.base': 'Title must contain at least one letter.',
                'any.required': 'Title is required.'
            }),

        price: Joi.number()
            .min(0)
            .required()
            .messages({
                'number.base': 'Price must be a valid number.',
                'number.min': 'Price cannot be negative.',
                'any.required': 'Price is required.'
            }),

        description: Joi.string()
            .trim()
            .min(10)
            .max(1000)
            .required()
            .messages({
                'string.empty': 'Description is required.',
                'string.min': 'Description must be at least 10 characters long.',
                'string.max': 'Description cannot exceed 1000 characters.',
                'any.required': 'Description is required.'
            }),

        location: Joi.string()
            .trim()
            .min(2)
            .max(100)
            .pattern(/^[a-zA-Z\s]+$/)
            .required()
            .messages({
                'string.empty': 'Location is required.',
                'string.min': 'Location must be at least 2 characters.',
                'string.max': 'Location cannot exceed 100 characters.',
                'string.pattern.base': 'Location must only contain letters and spaces.',
                'any.required': 'Location is required.'
            }),

        country: Joi.string()
            .trim()
            .min(2)
            .max(56)
            .pattern(/^[a-zA-Z\s]+$/)
            .required()
            .messages({
                'string.empty': 'Country is required.',
                'string.min': 'Country must be at least 2 characters.',
                'string.max': 'Country cannot exceed 56 characters.',
                'string.pattern.base': 'Country must only contain letters and spaces.',
                'any.required': 'Country is required.'
            }),
    }).required().messages({
        'object.base': 'Invalid listing format.',
        'any.required': 'Listing data is required.'
    })
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required().messages({
            'number.base': 'Rating must be a number.',
            'number.min': 'Rating must be at least 1.',
            'number.max': 'Rating cannot exceed 5.',
            'any.required': 'Rating is required.'
        }),
        comment: Joi.string().trim().min(5).max(500).required().messages({
            'string.empty': 'Comment is required.',
            'string.min': 'Comment must be at least 5 characters long.',
            'string.max': 'Comment cannot exceed 500 characters.',
            'any.required': 'Comment is required.'
        })
    }).required(),
});
        








