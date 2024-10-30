export const getNssInf = async (nssInfId) => 
    fetch(`http://localhost:3000/month_nss/${nssInfId}`)
        .then((loadedNssInf) => loadedNssInf.json())
        .then((loadedNsshInf) => loadedNsshInf); //&& transformYearInf(loadedPost))
