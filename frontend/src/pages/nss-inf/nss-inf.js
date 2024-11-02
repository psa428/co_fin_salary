import { useServerRequest } from "../../hooks/use-server-request"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectKdateLpu, selectKdLpu } from "../../selectors";
import { TableRow } from "../../components/table-row/table-row";
import { NssInfRow } from "./components/nss-inf-row/nss-inf-row";
import { Button } from "../../components";

import styled from "styled-components";

const NssInfContainer = ({ className }) => {
    /**
     *  Информация об использовании средств НСС за месяц
     */

const requestServer = useServerRequest();
const [yearF, setYearF] = useState(new Date().getFullYear());
const [monthF, setMonthF] = useState(null);
const [nssInfs, setNssInfs] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
const [reload, setReload] = useState();    // флаг необходимо загрузить информацию из базы данных
const navigate = useNavigate();

const kdateLpu = useSelector(selectKdateLpu);
const kdLpu = useSelector(selectKdLpu);


    useEffect(() => {
        
        if (!yearF || !kdateLpu || !kdLpu)
            return;
               
        requestServer('fetchNssInfs', kdateLpu, kdLpu, yearF).then((nssInfRes) => {
                
                if (nssInfRes.error) {
                    
                    setErrorMessage(nssInfRes.error);
                    return;
                };
                
                setNssInfs(nssInfRes.res.data.monthsNss);
                
                setReload(0);
                
                
            });
        
        
    }, [requestServer, kdateLpu, kdLpu, yearF, reload]);


    const handleClickCreateNssInf = () => {
        /**
         *  Обработка нажатия кнопки "Создать"
        */  

        navigate(`/month_nss/0/${kdateLpu}/${kdLpu}/${yearF}`)
    }

    return (
        <div className={className}>
            <h1>Информация об использовании средств нормированного страхового запаса</h1>
            <div className="select-container">
                <label >Год: </label>
             
                <select 
                    defaultValue={yearF}
                    onChange={(e) => setYearF(e.target.value)}
                >
                    <option disabled >Выберите год</option>
                    <option value={2023}>2023</option>
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                </select>
               
                
            </div>
            <div className="button-container">
                <Button type="button" width="100px" margin="10px" display="inline"  
                    
                    onClick={() => handleClickCreateNssInf()}>
                    Создать
                </Button>
                <Button type="button" width="100px" margin="10px" display="inline"  
                    
                    onClick={() => navigate('/')}>
                    Назад
                </Button>
            </div>
            <table border="1" border-color="#007889">
                <thead>
                    <tr>
                        <th className="month-f-column">Месяц</th>
                        <th className="nss-received">Поступило<br />средств НСЗ в МО</th>
                        <th className="nss-used-month">Использовано<br />средств НСЗ на оплату труда всего </th>
                        <th className="nss-doctors-month">Использовано<br />средств НСЗ на оплату труда врачей </th>
                        <th className="nss-nurses-month">Использовано<br />средств НСЗ на оплату труда среднего медицинского персонала </th>
                        <th className="nss-ret-month">Возвращено<br />средств НСЗ в бюджет ТФОМС</th>
                        <th className="tf-accpt-column">Дата<br />согласования<br /> ТФОМС</th>
                        <th className="edit-column">            </th>
                        
                    </tr>
                </thead>
                <tbody>
                    { 
                    nssInfs ?
                        nssInfs.map(({ id, year_f, month_f, nss_received, nss_doctors_month, nss_nurses_month, nss_ret_month, 
                            tf_accpt }) => (
                            <NssInfRow 
                                key={id} 
                                id={id}
                                year_f={year_f} 
                                month_f={month_f}
                                nss_received={nss_received}
                                nss_used_month={nss_doctors_month + nss_nurses_month}
                                nss_doctors_month={nss_doctors_month} 
                                nss_nurses_month={nss_nurses_month}
                                nss_ret_month={nss_ret_month}
                                tf_accpt={tf_accpt}
                                
                            />    
                        ))
                    : <></>
                    }  
                </tbody>
            </table>
        </div>

    )

};  

export const NssInf = styled(NssInfContainer)`
    margin: 40px 0;
    padding:    0 80px;
    color:  #007889;
    

    & > th {
        text-align: center
    }
    & > table {
        border-color:   #007889;
    }
    & > .button-container {
        display:    flex;
        justify-content:  right;
    }        

`;