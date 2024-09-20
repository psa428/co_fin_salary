module.exports = function (yearInf) {
    return {
        id: yearInf.id,
        kdateLpu:   yearInf.kdate_lpu,
        kdLpu:  yearInf.kdlpu,
        year_f: yearInf.year_f,
        doctors:    yearInf.doctors,
        nurses: yearInf.nurses,
        doctors_need:   yearInf.doctors_need,
        nurses_need:    yearInf.nurses_need,
        nss_rest:   yearInf.nss_rest,
        mh_accpt:   yearInf.mh_accpt,
        mh_stat:    yearInf.mh_stat,
        is_ready:   yearInf.is_ready,
        date_set_ready: yearInf.date_set_ready,
        month_start:    yearInf.month_start,
        month_finish:  yearInf.month_finish,
        user:  yearInf.user,
        createdAt:   yearInf.createdAt
    }
}