import { useServerRequest } from "../../hooks/use-server-request"; 
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectKdateLpu, selectKdLpu } from "../../selectors";
import { TableRow } from "./components/table-row/table-row";
import { YearInfRow } from "./components/year-inf-row/year-inf-row";
import styled from "styled-components";

const InfYearContainer = ({ className }) => {

const requestServer = useServerRequest();
const [yearF, setYearF] = useState(2024);
const [yearInfs, setYearInfs] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);

const kdateLpu = useSelector(selectKdateLpu);
const kdLpu = useSelector(selectKdLpu);

    useEffect(() => {
               
        requestServer('fetchYearInf', kdateLpu, kdLpu).then((yearInfRes) => {
                
                if (yearInfRes.error) {
                    
                    setErrorMessage(yearInfRes.error);
                    return;
                };
                
                setYearInfs(yearInfRes.res.data.yearInfs);
                
            });
        
        
    }, [requestServer, kdateLpu, kdLpu]);

    return (
        <div className={className}>
            <h1>Информация на начало года</h1>
            <div>
                    <TableRow border={true}>
                        <div className="year-f-column">Год</div>
                        <div className="doctors-column">Численность врачей</div>
                        <div className="nurses-column">Численность среднего медицинского персонала</div>
                        <div className="doctors-need-column">Потребность на текущий год врачей</div>
                        <div className="nurses-need-column">Потребность на текущий год среднего медицинского персонала</div>
                        <div className="nss-rest-column">Остаток средств НСЗ в МО (руб. и коп.)</div>
                    </TableRow>
                    
                    { 
                    yearInfs ?
                        yearInfs.map(({ id, year_f, doctors, nurses, doctors_need, nurses_need, nss_rest }) => (
                            <YearInfRow 
                                key={id} 
                                id={id}
                                year_f={year_f} 
                                doctors={doctors} 
                                nurses={nurses}
                                doctors_need={doctors_need} 
                                nurses_need={nurses_need}  
                                nss_rest={nss_rest} 
                                
                            />    
                        ))
                    : <></>
                    }  
            </div>
        </div>

    )

};  

export const InfYear = styled(InfYearContainer)`
    margin: 40px 0;
    padding:    0 80px;
    color:  #007889;

`;