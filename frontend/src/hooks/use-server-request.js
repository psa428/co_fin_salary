import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUserSession } from "../selectors";
import { server } from "../bff";


export const useServerRequest = () => {
    const session = useSelector(selectUserSession);   
     
    
    return useCallback((operation, ...params) => {
      
        const request = ['register', 'authorize', 'fetchMenu', 'fetchYearInfs', 'fetchYearInf', 
            'updateYearInf', 'addYearInf', 'fetchMonthInfs', 'addMonthInf', 'fetchMonthInf', 'fetchNssInfs', 
            'fetchNssInf', 'addNssInf', 'updateNssInf', 'updateMonthInf',
            'fetchStaffInfs', 'fetchStaffInf', 'updateStaffInf', 'addStaffInf'].includes(operation)
        ? params
        : [session, ...params];     

        return server[operation](...request);
    }, [session]);
};    