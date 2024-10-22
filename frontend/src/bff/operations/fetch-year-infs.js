import { getYearInfs } from "../api";
import { sessions } from "../sessions";

export const fetchYearInfs = async (kdateLpu, kdLpu) => {
   
    const yearInfs = await getYearInfs( kdateLpu, kdLpu);
    
    return {
        error:  null,
        res:    yearInfs,
    };
};