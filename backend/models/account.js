const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    bought: [
        {
            name: String,
            image: String,
            price: String
        }
    ]
},
{
    timestamps: true,
})

const Account = mongoose.model('account', accountSchema);

module.exports = Account;
