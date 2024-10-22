    //  Добавить новую запись о состоянии на начало года

import { createYearInf } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const addYearInf = async (newYearInf) => {
       
     createYearInf(newYearInf);

     return {
        error:  null,
        res:    true,
     };

};
