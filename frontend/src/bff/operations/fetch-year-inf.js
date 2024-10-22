import { getYearInf } from "../api";

export const fetchYearInf = async (yearInfId) => {
   
    const yearInf = await getYearInf(yearInfId);

    return {
        error:  null,
        res:    {
            ...yearInf
        }    
    };
};