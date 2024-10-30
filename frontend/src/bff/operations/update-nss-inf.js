import { setNssInf } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateNssInf = async (newNssInf) => {
       
     setNssInf(newNssInf);

     return {
        error:  null,
        res:    true,
     };

};