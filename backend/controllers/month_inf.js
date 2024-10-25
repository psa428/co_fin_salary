/**
 *  Контроллер документа "Заявка на софинансирование зарплаты на месяц"
 */
const MonthInf = require('../models/MonthInf');

//  Добавление
async function addMonthInf(monthInf) {

    const newMonthInf = await MonthInf.create(monthInf);

    return newMonthInf;
};

//  Редактирование

async function editMonthInf(id, monthInf) {
    const newMonthInf = await MonthInf.findByIdAndUpdate(id, monthInf, {returndocument: 'after'});

    return newMonthInf;
};

//  Удаление
function deleteMonthInf(id) {
    return MonthInf.deleteOne({ _id: id });
};

//  Получение перечня заявок на заданный года (с пагинацией)
async function getMonthInfs(kdate_lpu, kdlpu, year_f, limit = 12, page = 1) {
    
    
    const [monthInf, count] = await Promise.all([
        // 
        MonthInf.find({
            kdate_lpu: Number(kdate_lpu),
            kdlpu:  Number(kdlpu),
            year_f: Number(year_f)
        })
        // YearInf.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({createdAt: -1}),
        // YearInf.countDocuments({year_f: {$regex: search}})
        MonthInf.countDocuments({
                kdate_lpu: Number(kdate_lpu),
                kdlpu:  Number(kdlpu),
                year_f: Number(year_f)
        })
        // YearInf.countDocuments()
    ])
    return {
        monthInf,
        lastPage: Math.ceil(count / limit)
    };
}

//  Получение заявки по id
function getMonthInf(id) {
    return MonthInf.findById(id);
};

module.exports = {
    addMonthInf,
    editMonthInf,
    deleteMonthInf,
    getMonthInf, 
    getMonthInfs
};