export const getStaffInf = async (staffInfId) => 
    fetch(`http://localhost:3000/staff_inf/${staffInfId}`)
        .then((loadedStaffInf) => loadedStaffInf.json())
        .then((loadedStaffhInf) => loadedStaffhInf); //&& transformYearInf(loadedPost))
