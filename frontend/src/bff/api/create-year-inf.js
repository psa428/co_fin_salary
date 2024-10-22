export const createYearInf = (newYearInf) => {
    console.log('in API createYearInf', newYearInf)
    fetch(`http://localhost:3000/year_inf`, {
               method: 'POST',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                    kdate_lpu:  newYearInf.kdate_lpu,
                    kdlpu:  newYearInf.kdlpu,
                    year_f: newYearInf.year_f,
                   date_set_ready:  newYearInf.date_set_ready,
                   doctors: newYearInf.doctors,
                   doctors_need:    newYearInf.doctors.need,
                   is_ready:    newYearInf.is_ready,
                   nss_rest:    newYearInf.nss_rest,
                   nurses:  newYearInf.nurses,
                   nurses_need: newYearInf.nurses_need,
                   user:    newYearInf.user,
                   month_start: newYearInf.month_start,
                   month_finish:    newYearInf.month_finish
                   
               }),
       });
    };