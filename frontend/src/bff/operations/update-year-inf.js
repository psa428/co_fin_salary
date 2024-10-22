import { setYearInf } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateYearInf = async (newYearInf) => {
       
     setYearInf(newYearInf);

     return {
        error:  null,
        res:    true,
     };

};