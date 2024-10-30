const mongoose = require('mongoose');

const validator = require('validator');

const MonthNssSchema = mongoose.Schema({
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
    nss_received: {
        type:   Number,
        default:   0
    },

    nss_doctors_month: {
        type:   Number,
        default:    0
    },
    nss_nurses_month: {
        type:   Number,
        default:    0
    },
    nss_ret_month: {
        type:   Number,
        default:    0
    },
    
    non_target_cur: {
        type:   Number,
        default:    0
    },
    non_target_before: {
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

const MonthNss = mongoose.model('MonthNss', MonthNssSchema);

module.exports = MonthNss;