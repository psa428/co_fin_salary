import { getMonthInf } from "../api";

export const fetchMonthInf = async (monthInfId) => {
   
    const monthInf = await getMonthInf(monthInfId);

    return {
        error:  null,
        res:    {
            ...monthInf
        }    
    };
};