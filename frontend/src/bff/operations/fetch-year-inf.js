import { getYearInf } from "../api";
import { sessions } from "../sessions";

export const fetchYearInf = async (kdateLpu, kdLpu) => {
   
    const yearInf = await getYearInf( kdateLpu, kdLpu);
    
    return {
        error:  null,
        res:    yearInf,
    };
};