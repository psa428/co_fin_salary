export const setMonthInf = (newMonthInf) => 
    fetch(`http://localhost:3000/month_inf/${newMonthInf._id}`, {
               method: 'PATCH',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                   doctors_taken:   newMonthInf.doctors_taken,
                   nurses_taken:   newMonthInf.nurses_taken,
                   doctors_fired:   newMonthInf.doctors_fired,
                   nurses_fired:   newMonthInf.nurses_fired, 
                   doctors_salary:   newMonthInf.doctors_salary,
                   nurses_salary:   newMonthInf.nurses_salary,
                   date_set_ready:  newMonthInf.date_set_ready,                   
                   is_ready:    newMonthInf.is_ready,
                   mh_accpt:    newMonthInf.mh_accpt,
                   mh_stat: newMonthInf.mh_stat,
                   tf_accpt:    newMonthInf.tf_accpt,
                   tf_stat: newMonthInf.tf_stat,
                   user:    newMonthInf.user,   
                   executor:    newMonthInf.executor,
                   executor_pos:    newMonthInf.executor_pos,
                   executor_phone:  newMonthInf.executor_phone
                   
                   
               }),
       });