export const createMonthInf = (newMonthInf) => {
    
    
    fetch(`http://localhost:3000/month_inf`, {
               method: 'POST',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                    kdate_lpu:  newMonthInf.kdate_lpu,
                    kdlpu:  newMonthInf.kdlpu,
                    year_f: newMonthInf.year_f,
                    month_f:    newMonthInf.month_f,
                    doctors_taken:  newMonthInf.doctors_taken,
                    nurses_taken:   newMonthInf.nurses_taken,
                    doctors_fired:  newMonthInf.doctors_fired,
                    nurses_fired:   newMonthInf.nurses_fired,
                    doctors_salary:  newMonthInf.doctors_salary,
                    nurses_salary:   newMonthInf.nurses_salary,
                    mh_accpt:   newMonthInf.mh_accpt,
                    tf_accpt:   newMonthInf.tf_accpt,
                    mh_stat:    newMonthInf.mh_stat,
                    tf_stat:    newMonthInf.tf_stat,
                    is_ready:   newMonthInf.is_ready,
                    date_set_ready: newMonthInf.date_set_ready,
                    executor:   newMonthInf.executor,
                    executor_pos:   newMonthInf.executor_pos,
                    executor_phone:   newMonthInf.executor_phone,
                    user:   newMonthInf.user
                   
               }),
       });
    };