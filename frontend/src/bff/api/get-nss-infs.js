export const getNssInfs = (kdateLpu, kdLpu, yearF) =>{
    
     
    return fetch(`http://localhost:3000/month_nss?kdate_lpu=${kdateLpu}&kdlpu=${kdLpu}&year_f=${yearF}`).then((loadedNssInfs) => loadedNssInfs.json())
         .then((loadedNssInfs) => loadedNssInfs);// && loadedMenuItems.map(transformMenu));

};  