import { getNssInfs } from "../api";
import { sessions } from "../sessions";

export const fetchNssInfs = async (kdateLpu, kdLpu, yearF) => {
    
   
    const nssInfs = await getNssInfs( kdateLpu, kdLpu, yearF);
    
    return {
        error:  null,
        res:    nssInfs,
    };
};