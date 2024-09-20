/**
 *  Контроллер документа "Информация о состорянии на начало года"
 */
const YearInf = require('../models/YearInf');

//  Добавление
async function addYearInf(yearInf) {
   
    const newYearInf = await YearInf.create(yearInf);

    return newYearInf;
};

//  Редактирование

async function editYearInf(id, yearInf) {
    const newYearInf = await YearInf.findByIdAndUpdate(id, yearInf, {returndocument: 'after'});

    return newYearInf;
};

//  Удаление
function deleteYearInf(id) {
    return YearInf.deleteOne({ _id: id });
};

//  Получение перечня информации о состоянии на начало года (с пагинацией)
async function getYearInfs(search , limit = 10, page = 1) {
    const [yearInf, count] = await Promise.all([
        // 
        YearInf.find({year_f: Number(search)})
        // YearInf.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({createdAt: -1}),
        // YearInf.countDocuments({year_f: {$regex: search}})
        YearInf.countDocuments({year_f: search})
        // YearInf.countDocuments()
    ])
    return {
        yearInf,
        lastPage: Math.ceil(count / limit)
    };
}

//  Получение информации о состоянии на начало выбранного года
function getYearInf(id) {
    return YearInf.findById(id);
};

module.exports = {
    addYearInf,
    editYearInf,
    deleteYearInf,
    getYearInf, 
    getYearInfs
};