const mongoose = require('mongoose')

const Customer = new mongoose.Schema({
	name: {
		type: String,
        required: true,
        trim: true
	},
	slug: {
		type: String,
        required: true,
        trim: true
	},
	email: {
		type: String,
        required: true,
        trim: true
	},
	password: {
        type: String,
        required: true,
        trim: true
    },
    cpf: {
        type: String,
        required: true,
        trim: true
	},
	celphone: {
		type: String,
		default: ''
	},
	address: {
        cep: {
            type: String,
            required: true
        },
		street: {
			type: String,
			required: true
		},
		number: {
			type: Number,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		neightborhood: {
			type: String,
			required: true
        },
        uf: {
            type: String,
			required: true
        }
	}
})

module.exports = mongoose.model('Customer', Customer)