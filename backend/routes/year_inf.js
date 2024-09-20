const express = require('express')
const { addYearInf,
        editYearInf,
        deleteYearInf,
        getYearInf, 
        getYearInfs } = require('../controllers/year_inf');
const authenticated = require('../midlewares/authenticated');
const hasRole = require('../midlewares/hasRole');
const mapYearInf = require('../helpers/mapYearInf');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

    // Добавление информации о состоянии на начало года
router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
    const newYearInf = await addYearInf({
        kdate_lpu: req.body.kdate_lpu,
        kdlpu: req.body.kdlpu,
        year_f: req.body.year_f,
        doctors:    req.body.doctors,
        nurses: req.body.nurses,
        user:   req.body.user,
        doctors_need:   req.body.doctors_need,
        nurses_need:    req.body.nurses_need,
        nss_rest:   req.body.nss_rest,
        month_start:    req.body.month_start,
        month_finish:   req.body.month_finish
    });
   
    res.send({ data: mapYearInf(newYearInf) }) 
    
}); 

    // Получение всей информации о состоянии на начало года
router.get('/', async (req, res) => {
    const {yearInf, lastPage } = await getYearInfs(
        req.query.search,
        req.query.limit,
        req.query.page
    )
    res.send({ data: {lastPage, yearInfs: yearInf.map(mapYearInf)} });
});

    //  Получение конкретной записи о состоянии на начало года по id

    router.get('/:id', async (req, res) => {
        const yearInf = await getYearInf(req.params.id);
    
        res.send({ data: yearInf });
    });    

    //  Редактирование информации о состоянии на начало года
    router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
        const updatedYearInf = await editYearInf(
            req.params.id,
            {   
                doctors:    req.body.doctors,
                nurses: req.body.nurses,
                user:   req.body.user,
                doctors_need:   req.body.doctors_need,
                nurses_need:    req.body.nurses_need,
                nss_rest:   req.body.nss_rest,
                month_start:    req.body.month_start,
                month_finish:   req.body.month_finish
            }
        );
        res.send({ data: mapYearInf(updatedYearInf)});
    
    });

        //  Удаление записи о состоянии на начало года по заданному id
    router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
        await deleteYearInf(req.params.id);
    
        res.send({ error: null });
    });

module.exports = router;