export const setYearInf = (newYearInf) => 
    fetch(`http://localhost:3000/year_inf/${newYearInf._id}`, {
               method: 'PATCH',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                   date_set_ready:  newYearInf.date_set_ready,
                   doctors: newYearInf.doctors,
                   doctors_need:    newYearInf.doctors.need,
                   is_ready:    newYearInf.is_ready,
                   nss_rest:    newYearInf.nss_rest,
                   nurses:  newYearInf.nurses,
                   nurses_need: newYearInf.nurses_need,
                   
               }),
       });