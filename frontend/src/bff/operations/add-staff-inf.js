 //  Добавить сотрудника в перечень

 import { createStaffInf } from "../api";
 import { sessions } from "../sessions";
 import { ROLE } from "../constants";
 
 export const addStaffInf = async (newStaffInf) => {
        
      createStaffInf(newStaffInf);
 
      return {
         error:  null,
         res:    true,
      };
 
 };
 