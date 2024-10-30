/**
 *  Контроллер документа "Информация об использовании средств НСЗ"
 */
const MonthNss = require('../models/MonthNss');

//  Добавление
async function addMonthNss(monthNss) {

    const newMonthNss = await MonthNss.create(monthNss);
    

    return newMonthNss;
};

//  Редактирование

async function editMonthNss(id, monthNss) {
    const newMonthNss = await MonthNss.findByIdAndUpdate(id, monthNss, {returndocument: 'after'});

    return newMonthNss;
};

//  Удаление
function deleteMonthNss(id) {
    return monthNss.deleteOne({ _id: id });
};

//  Получение перечня заявок на заданный года (с пагинацией)
async function getMonthsNss(kdate_lpu, kdlpu, year_f, limit = 12, page = 1) {
    
    
    const [monthNss, count] = await Promise.all([
        // 
        MonthNss.find({
            kdate_lpu: Number(kdate_lpu),
            kdlpu:  Number(kdlpu),
            year_f: Number(year_f)
        })
        // YearInf.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({createdAt: -1}),
        // YearInf.countDocuments({year_f: {$regex: search}})
        MonthNss.countDocuments({
                kdate_lpu: Number(kdate_lpu),
                kdlpu:  Number(kdlpu),
                year_f: Number(year_f)
        })
        // YearInf.countDocuments()
    ])
    return {
        monthNss,
        lastPage: Math.ceil(count / limit)
    };
}

//  Получение заявки по id
function getMonthNss(id) {
    return MonthNss.findById(id);
};

module.exports = {
    addMonthNss,
    editMonthNss,
    deleteMonthNss,
    getMonthNss, 
    getMonthsNss
};