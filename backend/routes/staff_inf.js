const express = require('express')
const { addStaffInf,
        editStaffInf,
        deleteStaffInf,
        getStaffInf, 
        getStaffInfs
      } = require('../controllers/staff_inf');
const authenticated = require('../midlewares/authenticated');
const hasRole = require('../midlewares/hasRole');
const mapStaffInf = require('../helpers/mapStaffInf');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

    // Добавление перечня персонала
router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
    
    const newStaff = await addStaffInf({
        kdate_lpu: req.body.kdate_lpu,
        kdlpu: req.body.kdlpu,
        year_f: req.body.year_f,
        month_f:    req.body.month_f,
        fam:    req.body.fam,
        name:   req.body.name,
        otch:   req.body.otch,
        kdposition: req.body.kdposition,
        numst:  req.body.numst,
        emp_date:   req.body.emp_date,
        order_date: req.body.order_date,
        order_num:  req.body.order_num,
        docs_subm:  req.body.docs_subm,
        salary: req.body.salary,
        charges:    req.body.charges,
        name_position:  req.body.name_position,
        is_ready:   req.body.is_ready,
        date_set_ready: req.body.date_set_ready,
        user:   req.body.user

    });
   
    res.send({ data: mapStaffInf(newStaff) }) 
    
}); 

    // Получение перечней персонала выбранной МО для зваданного года и месяца
router.get('/', async (req, res) => {
    const {staffInf, lastPage } = await getStaffInfs(
        req.query.kdate_lpu,
        req.query.kdlpu,
        req.query.year_f,
        req.query.month_f,
        req.query.limit,
        req.query.page
    )
    res.send({ data: {lastPage, staffInfs: staffInf.map(mapStaffInf)} });
});

    //  Получение списка персрнала по id

    router.get('/:id', async (req, res) => {
       
        const staffInf = await getStaffInf(req.params.id);
    
        res.send({ data: staffInf });
    });    

    //  Редактирование списка персонала
    
    router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
        
        const updatedStaffInf = await editStaffInf(
            req.params.id,
            {   
                fam:    req.body.fam,
                name:    req.body.name,
                otch:    req.body.otch,
                kdposition: req.body.kdposition,
                numst:  req.body.numst,
                emp_date:   req.body.emp_date,
                order_date: req.body.order_date,
                order_num:  req.body.order_num,
                docs_subm:  req.body.docs_subm,
                salary: req.body.salary,
                charges:    req.body.charges,
                name_position:  req.body.name_position,
                mh_accpt:   req.body.mh_accpt,
                mh_stat:    req.body.mh_stat,
                tf_accpt:   req.body.tf_accpt,
                tf_stat:    req.body.tf_stat,
                user:   req.body.user,
                
            }
        );
        res.send({ data: mapStaffInf(updatedStaffInf)});
    
    });

        //  Удаление перечня персонала по заданному id
    router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
        await deleteStaffInf(req.params.id);
    
        res.send({ error: null });
    });

module.exports = router;