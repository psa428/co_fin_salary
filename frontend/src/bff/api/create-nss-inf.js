export const createNssInf = (newNssInf) => {
    
    
    fetch(`http://localhost:3000/month_nss`, {
               method: 'POST',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                    kdate_lpu:  newNssInf.kdate_lpu,
                    kdlpu:  newNssInf.kdlpu,
                    year_f: newNssInf.year_f,                  
                    month_f:    newNssInf.month_f,
                    nss_received:   newNssInf.nss_received,
                    nss_doctors_month:  newNssInf.nss_doctors_month,
                    nss_nurses_month:   newNssInf.nss_nurses_month,
                    nss_ret_month:  newNssInf.nss_ret_month,
                    non_target_cur: newNssInf.non_target_cur,
                    non_target_before:  newNssInf.non_target_before,                    
                    tf_accpt:   newNssInf.tf_accpt,                   
                    tf_stat:    newNssInf.tf_stat,
                    is_ready:   newNssInf.is_ready,
                    date_set_ready: newNssInf.date_set_ready,
                    executor:   newNssInf.executor,
                    executor_pos:   newNssInf.executor_pos,
                    executor_phone:   newNssInf.executor_phone,
                    user:   newNssInf.user
                   
               }),
       });
    };