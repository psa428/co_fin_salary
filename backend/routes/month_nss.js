const express = require('express')
const { addMonthNss,
        editMonthNss,
        deleteMonthNss,
        getMonthNss, 
        getMonthsNss } = require('../controllers/month_nss');
const authenticated = require('../midlewares/authenticated');
const hasRole = require('../midlewares/hasRole');
const mapMonthNss = require('../helpers/mapMonthNss');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

    // Добавление информации об использовании средств НСЗ
router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
    
    const newMonthNss = await addMonthNss({
        kdate_lpu: req.body.kdate_lpu,
        kdlpu: req.body.kdlpu,
        year_f: req.body.year_f,
        month_f:    req.body.month_f,
        nss_received:   req.body.nss_received,   
        nss_doctors_month:    req.body.nss_doctors_month,
        nss_nurses_month:    req.body.nss_nurses_month,
        nss_ret_month: req.body.nss_ret_month,
        non_target_cur: req.body.non_target_cur,
        non_target_before: req.body.non_target_before,
        user:   req.body.user,
        mh_accpt:   req.body.mh_accpt,
        mh_stat:    req.body.mh_stat,
        tf_accpt:   req.body.tf_accpt,
        tf_stat:    req.body.tf_stat,
        is_ready:   req.body.is_ready,
        date_set_ready: req.body.date_set_ready,
        executor:   req.body.executor,
        executor_pos:   req.body.executor_pos,
        executor_phone:   req.body.executor_phone

    });
   
    res.send({ data: mapMonthNss(newMonthNss) }) 
    
}); 

    // Получение всех записей обиспользовании НСЗ для заданного года года
router.get('/', async (req, res) => {
    const {monthNss, lastPage } = await getMonthsNss(
        req.query.kdate_lpu,
        req.query.kdlpu,
        req.query.year_f,
        req.query.limit,
        req.query.page
    )
    res.send({ data: {lastPage, monthsNss: monthNss.map(mapMonthNss)} });
});

    //  Получение получение заявки на софинансирование по id

    router.get('/:id', async (req, res) => {
       
        const monthNss = await getMonthNss(req.params.id);
    
        res.send({ data: monthNss });
    });    

    

    //  Редактирование информации об использовании НСЗ
    
    router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.HOSP]), async (req, res) => {
        
        const updatedMonthNss = await editMonthNss(
            req.params.id,
            {   
                nss_received:   req.body.nss_received,   
                nss_doctors_month:    req.body.nss_doctors_month,
                nss_nurses_month:    req.body.nss_nurses_month,
                nss_ret_month: req.body.nss_ret_month,
                non_target_cur: req.body.non_target_cur,
                non_target_before: req.body.non_target_before,
                user:   req.body.user,
                mh_accpt:   req.body.mh_accpt,
                mh_stat:    req.body.mh_stat,
                tf_accpt:   req.body.tf_accpt,
                tf_stat:    req.body.tf_stat,
                is_ready:   req.body.is_ready,
                date_set_ready: req.body.date_set_ready,
                executor:   req.body.executor,
                executor_pos:   req.body.executor_pos,
                executor_phone:   req.body.executor_phone

            }
        );
        res.send({ data: mapMonthNss(updatedMonthNss)});
    
    });

        //  Удаление информации обиспользовании НСЗ по заданному id
    router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
        await deleteMonthNss(req.params.id);
    
        res.send({ error: null });
    });

module.exports = router;