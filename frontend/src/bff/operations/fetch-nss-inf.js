import { getNssInf } from "../api";

export const fetchNssInf = async (nssInfId) => {
   
    const nssInf = await getNssInf(nssInfId);

    return {
        error:  null,
        res:    {
            ...nssInf
        }    
    };
};