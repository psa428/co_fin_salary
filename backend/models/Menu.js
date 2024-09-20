const mongoose = require('mongoose');
const validator = require('validator');

const MenuSchema = mongoose.Schema({
    menu_item:  {
        type:   String,
        required:   true
    },
    path:   {
        type:   String,
        required:   true
    },
    role_id:   {
        type:   Number,
        required:   true
    }
});

const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;