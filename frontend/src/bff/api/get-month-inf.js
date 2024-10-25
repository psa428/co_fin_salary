//import { transformPost } from "../transformers";

export const getMonthInf = async (monthInfId) => 
    fetch(`http://localhost:3000/month_inf/${monthInfId}`)
        .then((loadedMonthInf) => loadedMonthInf.json())
        .then((loadedMonthInf) => loadedMonthInf); //&& transformYearInf(loadedPost))
