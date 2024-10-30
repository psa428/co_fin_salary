export const createStaffInf = (newStaffInf) => {
    
    
    fetch(`http://localhost:3000/staff_inf`, {
               method: 'POST',
               headers:    {
                   'Content-Type':  'application/json;charset=utf-8',
               },
               body:   JSON.stringify({
                kdate_lpu:  newStaffInf.kdate_lpu,
                kdlpu:  newStaffInf.kdlpu,
                year_f: newStaffInf.year_f,
                month_f:    newStaffInf.month_f,
                fam:    newStaffInf.fam,
                name:   newStaffInf.name,
                otch:   newStaffInf.otch,
                kdposition: newStaffInf.kdposition,
                numst:  newStaffInf.numst,
                emp_date:   newStaffInf.emp_date,
                order_date: newStaffInf.order_date,
                order_num:  newStaffInf.order_num,
                docs_subm:  newStaffInf.docs_subm,
                salary: newStaffInf.salary,
                charges:    newStaffInf.charges,
                name_position:  newStaffInf.name_position,                 
               date_set_ready:  newStaffInf.date_set_ready,                   
               is_ready:    newStaffInf.is_ready,
               mh_accpt:    newStaffInf.mh_accpt,
               mh_stat: newStaffInf.mh_stat,
               tf_accpt:    newStaffInf.tf_accpt,
               tf_stat: newStaffInf.tf_stat,
               user:    newStaffInf.user
  
                   
               }),
       });
    };