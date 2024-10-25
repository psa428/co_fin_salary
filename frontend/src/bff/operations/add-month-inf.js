   //  Добавить новую заявку на софинансирование зарплаты

   import { createMonthInf } from "../api";
   import { sessions } from "../sessions";
   import { ROLE } from "../constants";
   
   export const addMonthInf = async (newMonthInf) => {
          
        createMonthInf(newMonthInf);
   
        return {
           error:  null,
           res:    true,
        };
   
   };
   