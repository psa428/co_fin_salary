const express = require('express')
const { addMonthInf,
        editMonthInf,
        deleteMonthInf,
        getMonthInf, 
        getMonthInfs } = require('../controllers/month_inf');
const authenticated = require('../midlewares/authenticated');
const hasRole = require('../midlewares/hasRole');
const mapMonthInf = require('../helpers/mapMonthInf');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

    // Добавление заявки на софинансирвоание зарплаты
router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
    
    const newMonthInf = await addMonthInf({
        kdate_lpu: req.body.kdate_lpu,
        kdlpu: req.body.kdlpu,
        year_f: req.body.year_f,
        month_f:    req.body.month_f,
        doctors_taken:    req.body.doctors_taken,
        nurses_taken: req.body.nurses_taken,
        user:   req.body.user,
        doctors_fired:   req.body.doctors_need,
        nurses_fired:    req.body.nurses_need,
        doctors_salary:   req.body.doctors_need,
        nurses_salary:    req.body.nurses_need,
        executor:    req.body.executor,
        executor_pos:   req.body.executor_pos,
        executor_phone:   req.body.executor_phone
    });
   
    res.send({ data: mapMonthInf(newMonthInf) }) 
    
}); 

    // Получение всех месячных заявок для заданного года года
router.get('/', async (req, res) => {
    const {monthInf, lastPage } = await getMonthInfs(
        req.query.kdate_lpu,
        req.query.kdlpu,
        req.query.year_f,
        req.query.limit,
        req.query.page
    )
    res.send({ data: {lastPage, monthInfs: monthInf.map(mapMonthInf)} });
});

    //  Получение получение заявки на софинансирование по id

    router.get('/:id', async (req, res) => {
       
        const monthInf = await getMonthInf(req.params.id);
    
        res.send({ data: monthInf });
    });    

    // //  Маршрут создания новой заявки на софинансирование зарплаты.
    // //  Возвращает запись, содержащую код территории МО и код МО

    // router.get('/:id/:kdate_lpu/:kdlpu', async (req, res) => {
       
    //     const monthInf = {
    //         kdate_lpu:  req.params.kdate_lpu,
    //         kdlpu:  req.params.kdlpu
    //     }
    
    //     res.send({ data: monthInf });
    // }); 

    //  Редактирование заявки на софинансирование зарплаты
    
    router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
        
        const updatedMonthInf = await editMonthInf(
            req.params.id,
            {   
                doctors_taken:    req.body.doctors_taken,
                nurses_taken: req.body.nurses_taken,
                user:   req.body.user,
                doctors_fired:   req.body.doctors_fired,
                nurses_fired:    req.body.nurses_fired,
                doctors_salary:   req.body.doctors_salary,
                nurses_salary:    req.body.nurses_salary,
                
                is_ready: req.body.is_ready,
                date_set_ready: req.body.date_set_ready,
                executor:    req.body.executor,
                executor_pos:    req.body.executor_pos,
                executor_phone:    req.body.executor_phone

            }
        );
        res.send({ data: mapMonthInf(updatedMonthInf)});
    
    });

        //  Удаление заявки на софинансирование по заданному id
    router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
        await deleteMonthInf(req.params.id);
    
        res.send({ error: null });
    });

module.exports = router;