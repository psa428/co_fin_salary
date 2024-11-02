import { useServerRequest } from "../../hooks/use-server-request"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectKdateLpu, selectKdLpu } from "../../selectors";
import { TableRow } from "./components/table-row/table-row";
import { MonthInfRow } from "./components/month-inf-row/month-inf-row";
import { Button } from "../../components";

import styled from "styled-components";

const MonthInfContainer = ({ className }) => {
    /**
     *  Месячная заявка на софинансирование зарплаты
     */

const requestServer = useServerRequest();
const [yearF, setYearF] = useState(new Date().getFullYear());
const [monthF, setMonthF] = useState(null);
const [monthInfs, setMonthInfs] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
const [reload, setReload] = useState();    // флаг необходимо загрузить информацию из базы данных
const navigate = useNavigate();

const kdateLpu = useSelector(selectKdateLpu);
const kdLpu = useSelector(selectKdLpu);

    useEffect(() => {
        
        if (!yearF || !kdateLpu || !kdLpu )
            return;
               
        requestServer('fetchMonthInfs', kdateLpu, kdLpu, yearF).then((monthInfRes) => {
                
                if (monthInfRes.error) {
                    
                    setErrorMessage(monthInfRes.error);
                    return;
                };
                
                setMonthInfs(monthInfRes.res.data.monthInfs);
                setReload(0);
                
                
            });
        
        
    }, [requestServer, kdateLpu, kdLpu, yearF, reload]);


    const handleClickCreateMonthInf = () => {
        /**
         *  Обработка нажатия кнопки "Создать"
        */  

        navigate(`/month_inf/0/${kdateLpu}/${kdLpu}/${yearF}`)
    }

    return (
        <div className={className}>
            <h1>Заявки на софинансирование заработной платы</h1>
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
                    
                    onClick={() => handleClickCreateMonthInf()}>
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
                        <th className="doctors-taken-column">Принято<br /> на последнее число месяца врачей</th>
                        <th className="nurses-taken-column">Принято<br /> на последнее число месяца среднего медицинского персонала</th>
                        <th className="doctors-fired-column">Уволено<br /> на последнее число месяца врачей</th>
                        <th className="nurses-fired-column">Уволено<br /> на последнее число месяца среднего медицинского персонала</th>
                        <th className="mh-accpt-column">Дата<br />согласования<br /> министерством,<br />здравоохранения</th>
                        <th className="mh-accpt-column">Дата<br />согласования<br /> ТФОМС</th>
                        <th className="edit-column">            </th>
                        
                    </tr>
                </thead>
                <tbody>
                    { 
                    monthInfs ?
                        monthInfs.map(({ id, year_f, month_f, doctors_taken, nurses_taken, doctors_fired, nurses_fired, 
                            doctors_salary, nurses_salary, mh_accpt, tf_accpt }) => (
                            <MonthInfRow 
                                key={id} 
                                id={id}
                                year_f={year_f} 
                                month_f={month_f}
                                doctors_taken={doctors_taken} 
                                nurses_taken={nurses_taken}
                                doctors_fired={doctors_fired} 
                                nurses_fired={nurses_fired}  
                                doctors_salary={doctors_salary} 
                                nurses_salary={nurses_salary}  
                                mh_accpt={mh_accpt} 
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

export const MonthInf = styled(MonthInfContainer)`
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