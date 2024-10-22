import { useServerRequest } from "../../hooks/use-server-request"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectKdateLpu, selectKdLpu } from "../../selectors";
import { TableRow } from "./components/table-row/table-row";
import { YearInfRow } from "./components/year-inf-row/year-inf-row";
import { Button } from "../../components";

import styled from "styled-components";

const InfYearContainer = ({ className }) => {
    /**
     *  Информация на начало года
     */

const requestServer = useServerRequest();
const [yearF, setYearF] = useState(2024);
const [yearInfs, setYearInfs] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
const [reload, setReload] = useState();    // флаг необходимо загрузить информацию из базы данных
const navigate = useNavigate();

const kdateLpu = useSelector(selectKdateLpu);
const kdLpu = useSelector(selectKdLpu);

console.log('in YearInf kdlpu = ', kdLpu, ' kdateLpu = ', kdateLpu)

    useEffect(() => {
        console.log('in YearInf useEffect reload = ', reload)
               
        requestServer('fetchYearInfs', kdateLpu, kdLpu).then((yearInfRes) => {
                
                if (yearInfRes.error) {
                    
                    setErrorMessage(yearInfRes.error);
                    return;
                };
                
                setYearInfs(yearInfRes.res.data.yearInfs);
                setReload(0);
                
                
            });
        
        
    }, [requestServer, kdateLpu, kdLpu, reload]);


    const handleClickCreateYearInf = () => {
        /**
         *  Обработка нажатия кнопки "Создать"
        */  

        navigate(`/year_inf/0/${kdateLpu}/${kdLpu}`)
    }

    return (
        <div className={className}>
            <h1>Информация на начало года</h1>
            <div>
                <Button type="button" width="150px" margin="30px" display="inline" 
                    
                    onClick={() => handleClickCreateYearInf()}>
                    Создать
                </Button>
            </div>
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