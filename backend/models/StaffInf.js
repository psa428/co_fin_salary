const mongoose = require('mongoose');

const validator = require('validator');

const StaffInfSchema = mongoose.Schema({
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
    fam:    {
        type:   String,
        required:   true
    },
    name:    {
        type:   String,
        required:   true
    },
    otch:    {
        type:   String,
        required:   true
    },
    kdposition: {
        type:   String,
        required:   true
    },
    numst:  {
        type:  Number,
        required:   true
    },
    emp_date:   {
        type:  String,
        required:   true 
    },
    order_date:   {
        type:  String,
        required:   true 
    },
    order_num:   {
        type:  String
    },
    docs_subm:   {
        type:  Number,
        required:   true,
        default: 0
    },
    salary:   {
        type:  Number,
        required:   true, 
        default:    0
    },
    charges:   {
        type:  Number,
        required:   true, 
        default:    0
    },
    name_position:  {
        type:   String,
        required:   true,
        default:    ''
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
    user:  {
        type:   String,
        required:   true
        
    }
}, { timestamps:    true });

const StaffInf = mongoose.model('StaffInf', StaffInfSchema);

module.exports = StaffInf;