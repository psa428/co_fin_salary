/**
 *  Контроллер документа "Перечень персонала МО, участвующего в софинансировании заработной платы"
 */
const StaffInf = require('../models/StaffInf');

//  Добавление
async function addStaffInf(staffInf) {

    const newStaffInf = await StaffInf.create(staffInf);

    return newStaffInf;
};

//  Редактирование

async function editStaffInf(id, staffInf) {
    const newStaffInf = await StaffInf.findByIdAndUpdate(id, staffInf, {returndocument: 'after'});

    return newStaffInf;
};

//  Удаление
function deleteStaffInf(id) {
    return StaffInf.deleteOne({ _id: id });
};

//  Получение перечня персонала на заданный года и месяца(с пагинацией)
async function getStaffInfs(kdate_lpu, kdlpu, year_f, month_f, limit = 12, page = 1) {
    
    
    const [staffInf, count] = await Promise.all([
        // 
        StaffInf.find({
            kdate_lpu: Number(kdate_lpu),
            kdlpu:  Number(kdlpu),
            year_f: Number(year_f),
            month_f:    Number(month_f)
        })
        // YearInf.find()
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({createdAt: -1}),
        // YearInf.countDocuments({year_f: {$regex: search}})
        StaffInf.countDocuments({
                kdate_lpu: Number(kdate_lpu),
                kdlpu:  Number(kdlpu),
                year_f: Number(year_f),
                month_f:    Number(month_f)
        })
        // YearInf.countDocuments()
    ])
    return {
        staffInf,
        lastPage: Math.ceil(count / limit)
    };
}

//  Получение перечня персонала по id
function getStaffInf(id) {
    return StaffInf.findById(id);
};

module.exports = {
    addStaffInf,
    editStaffInf,
    deleteStaffInf,
    getStaffInf, 
    getStaffInfs
};