const mongoose = require('mongoose');
const roles = require('../constants/roles');
const validator = require('validator');

const YearInfSchema = mongoose.Schema({
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
    doctors: {
        type:   Number,
        default:    0
    },
    nurses: {
        type:   Number,
        default:    0
    },
    doctors_need: {
        type:   Number,
        default:    0
    },
    nurses_need: {
        type:   Number,
        default:    0
    },
    nss_rest: {
        type:   Number,
        default:    0
    },
    mh_accpt: {
        type:   String,
        default:    null
    }, 
    mh_stat: {
        type:   String,
        default:    null
    },
    is_ready: {
        type:   Boolean,
        default:    false
    },
    date_set_ready: {
        type:   String,
        default:    null
    },
    month_start: {
        type:   Number,
        default:    null,
        required:   true
    },
    month_finish: {
        type:   Number,
        default:    null,
        required:   true
    },
    user:  {
        type:   String,
        required:   true
        
    }
}, { timestamps:    true });

const YearInf = mongoose.model('YearInf', YearInfSchema);

module.exports = YearInf;