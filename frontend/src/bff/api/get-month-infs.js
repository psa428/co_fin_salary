// import { transformMenu } from "../transformers";

export const getMonthInfs = (kdateLpu, kdLpu, yearF) =>{
     
     return fetch(`http://localhost:3000/month_inf?kdate_lpu=${kdateLpu}&kdlpu=${kdLpu}&year_f=${yearF}`).then((loadedMonthInfs) => loadedMonthInfs.json())
          .then((loadedMonthInfs) => loadedMonthInfs);// && loadedMenuItems.map(transformMenu));

};          