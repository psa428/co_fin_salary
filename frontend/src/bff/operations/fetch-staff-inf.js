import { getStaffInf } from "../api";

export const fetchStaffInf = async (staffInfId) => {
   
    const staffInf = await getStaffInf(staffInfId);

    return {
        error:  null,
        res:    {
            ...staffInf
        }    
    };
};