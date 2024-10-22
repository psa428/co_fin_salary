//import { transformPost } from "../transformers";

export const getYearInf = async (yearInfId) => 
    fetch(`http://localhost:3000/year_inf/${yearInfId}`)
        .then((loadedYearInf) => loadedYearInf.json())
        .then((loadedYearInf) => loadedYearInf); //&& transformYearInf(loadedPost))
