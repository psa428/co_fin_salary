import { setStaffInf } from "../api";
import { sessions } from "../sessions";
import { ROLE } from "../constants";

export const updateStaffInf = async (newStaffInf) => {
       
     setStaffInf(newStaffInf);

     return {
        error:  null,
        res:    true,
     };

};