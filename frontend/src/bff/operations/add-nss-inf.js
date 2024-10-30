   //  Добавить новую заявку на софинансирование зарплаты

   import { createNssInf } from "../api";
   import { sessions } from "../sessions";
   import { ROLE } from "../constants";
   
   export const addNssInf = async (newNssInf) => {
          
        createNssInf(newNssInf);
   
        return {
           error:  null,
           res:    true,
        };
   
   };
   