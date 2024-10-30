module.exports = function (monthNss) {
    return {
        id: monthNss.id,
        kdateLpu:   monthNss.kdate_lpu,
        kdLpu:  monthNss.kdlpu,
        year_f: monthNss.year_f,
        month_f:    monthNss.month_f,
        nss_received:   monthNss.nss_received,
        nss_doctors_month:    monthNss.nss_doctors_month,
        nss_nurses_month:    monthNss.nss_nurses_month,
        nss_ret_month:  monthNss.nss_ret_month,
        non_target_cur: monthNss.non_target_cur,
        non_target_before:  monthNss.non_target_before, 
        mh_accpt:   monthNss.mh_accpt,
        mh_stat:    monthNss.mh_stat,
        tf_accpt:   monthNss.tf_accpt,
        tf_stat:    monthNss.tf_stat,
        is_ready:   monthNss.is_ready,
        date_set_ready: monthNss.date_set_ready,
        executor:    monthNss.executor,
        executor_pos:    monthNss.executor_pos,
        executor_phone:    monthNss.executor_phone,
        user:  monthNss.user,
        createdAt:   monthNss.createdAt
    }
}