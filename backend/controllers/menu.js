const Menu = require('../models/Menu');
const User = require('../models/User');

//  Добавление
async function addMenuItem(menuItem) {
   
    const newMenuItem = await Menu.create(menuItem);

    return newMenuItem;
};

function getMenu(roleId) {
    return Menu.find({ role_id: roleId });
   
};

module.exports = {
    getMenu,
    addMenuItem
}    