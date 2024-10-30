import { getStaffInfs } from "../api";
import { sessions } from "../sessions";

export const fetchStaffInfs = async (kdateLpu, kdLpu, yearF, monthF) => {
    
   
    const staffInfs = await getStaffInfs( kdateLpu, kdLpu, yearF, monthF);
    
    return {
        error:  null,
        res:    staffInfs,
    };
};