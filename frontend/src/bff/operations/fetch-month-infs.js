import { getMonthInfs } from "../api";
import { sessions } from "../sessions";

export const fetchMonthInfs = async (kdateLpu, kdLpu, yearF) => {
   
    const monthInfs = await getMonthInfs( kdateLpu, kdLpu, yearF);
    
    return {
        error:  null,
        res:    monthInfs,
    };
};