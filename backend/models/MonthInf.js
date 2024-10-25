const mongoose = require('mongoose');

const validator = require('validator');

const MonthInfSchema = mongoose.Schema({
    kdate_lpu: {
        type:   Number,
        required:   true
    },
    kdlpu:  {
        type:   Number,
        required:   true
    },
    year_f: {
        type:   Number,
        required:   true
    },
    month_f: {
        type:   Number,
        required:   true
    },
    doctors_taken: {
        type:   Number,
        default:    0
    },
    nurses_taken: {
        type:   Number,
        default:    0
    },
    doctors_fired: {
        type:   Number,
        default:    0
    },
    nurses_fired: {
        type:   Number,
        default:    0
    },
    doctors_salary: {
        type:   Number,
        default:    0
    },
    nurses_salary: {
        type:   Number,
        default:    0
    },
    mh_accpt: {
        type:   String,
        default:    ''
    }, 
    mh_stat: {
        type:   String,
        default:    ''
    },
    tf_accpt: {
        type:   String,
        default:    ''
    }, 
    tf_stat: {
        type:   String,
        default:    ''
    },
    is_ready: {
        type:   Boolean,
        default:    false
    },
    date_set_ready: {
        type:   String,
        default:    ''
    },
    executor: {
        type:   String,
        default:    '',
        required:   true
    },
    executor_pos: {
        type:   String,
        default:    '',
        required:   true
    },
    executor_phone: {
        type:   String,
        default:    '',
        required:   true
    },
    user:  {
        type:   String,
        required:   true
        
    }
}, { timestamps:    true });

const MonthInf = mongoose.model('MonthInf', MonthInfSchema);

module.exports = MonthInf;