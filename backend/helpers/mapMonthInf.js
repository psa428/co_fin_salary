module.exports = function (monthInf) {
    return {
        id: monthInf.id,
        kdateLpu:   monthInf.kdate_lpu,
        kdLpu:  monthInf.kdlpu,
        year_f: monthInf.year_f,
        month_f:    monthInf.month_f,
        doctors_taken:    monthInf.doctors_taken,
        nurses_taken: monthInf.nurses_taken,
        doctors_fired:   monthInf.doctors_fired,
        nurses_fired:    monthInf.nurses_fired,
        doctors_salary:   monthInf.doctors_salary,
        nurses_salary:    monthInf.nurses_salary,
        mh_accpt:   monthInf.mh_accpt,
        mh_stat:    monthInf.mh_stat,
        tf_accpt:   monthInf.tf_accpt,
        tf_stat:    monthInf.tf_stat,
        is_ready:   monthInf.is_ready,
        date_set_ready: monthInf.date_set_ready,
        executor:    monthInf.executor,
        executor_pos:    monthInf.executor_pos,
        executor_phone:    monthInf.executor_phone,
        
        user:  monthInf.user,
        createdAt:   monthInf.createdAt
    }
}