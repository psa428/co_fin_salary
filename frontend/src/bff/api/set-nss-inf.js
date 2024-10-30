export const setNssInf = (newNssInf) => 
    fetch(`http://localhost:3000/month_nss/${newNssInf._id}`, {
               method: 'PATCH',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                    nss_received:   newNssInf.nss_received,
                    nss_doctors_month:  newNssInf.nss_doctors_month,
                    nss_nurses_month:   newNssInf.nss_nurses_month,
                    nss_ret_month:  newNssInf.nss_ret_month,
                    non_target_cur: newNssInf.non_target_cur,
                    non_target_before:  newNssInf.non_target_before,
                   date_set_ready:  newNssInf.date_set_ready,                   
                   is_ready:    newNssInf.is_ready,
                   executor:    newNssInf.executor,
                   executor_pos:    newNssInf.executor_pos,
                   executor_phone:  newNssInf.executor_phone
                   
                   
               }),
       });