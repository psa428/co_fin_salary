export const getStaffInfs = (kdateLpu, kdLpu, yearF, monthF) =>{
   
     
    return fetch(`http://localhost:3000/staff_inf?kdate_lpu=${kdateLpu}&kdlpu=${kdLpu}&year_f=${yearF}&month_f=${monthF}`).then((loadedNssInfs) => loadedNssInfs.json())
         .then((loadedStaffInfs) => loadedStaffInfs);// && loadedMenuItems.map(transformMenu));

}; 