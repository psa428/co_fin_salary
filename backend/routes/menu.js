const express = require('express')
const { getMenu, addMenuItem } = require('../controllers/menu');

const authenticated = require('../midlewares/authenticated')
const mapMenu = require('../helpers/mapMenu');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true })

router.get('/:role_id', authenticated, async (req, res) => {
   
  const menu = await getMenu(req.params.role_id);
    
  
  res.send({ data: menu.map(mapMenu) })

});

    //  Add menu item

router.post('/', async (req, res) => {
    const newMenuItem = await addMenuItem({
        menu_item: req.body.menu_item,
        path: req.body.path,
        role_id:    req.body.role_id
    });
   
    res.send({ data: mapMenu(newMenuItem) }) 
    
}); 




module.exports = router