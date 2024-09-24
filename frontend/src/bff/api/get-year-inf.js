// import { transformMenu } from "../transformers";

export const getYearInf = (kdateLpu, kdLpu) =>{
     // fetch(`http://localhost:3001/menu?role_id=${roleId}`).then((loadedMenuItems) => loadedMenuItems.json())
     //      .then((loadedMenuItems) => loadedMenuItems);// && loadedMenuItems.map(transformMenu));
     
     return fetch(`http://localhost:3000/year_inf?kdate_lpu=${kdateLpu}&kdlpu=${kdLpu}`).then((loadedYearInfs) => loadedYearInfs.json())
          .then((loadedYearInfs) => loadedYearInfs);// && loadedMenuItems.map(transformMenu));

};          