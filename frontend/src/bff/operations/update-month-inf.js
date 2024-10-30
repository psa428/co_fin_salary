import { setMonthInf } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateMonthInf = async (newMonthInf) => {
       
     setMonthInf(newMonthInf);

     return {
        error:  null,
        res:    true,
     };

};