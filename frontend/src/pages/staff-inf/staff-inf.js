import { useServerRequest } from "../../hooks/use-server-request"; 
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectKdateLpu, selectKdLpu } from "../../selectors";
import { TableRow } from "../../components/table-row/table-row";
import { StaffInfRow } from "./components/staff-inf-row/staff-inf-row";
import { Button } from "../../components";

import styled from "styled-components";

const StaffInfContainer = ({ className }) => {
    /**
     *  Перечни персонала за месяцы года
     */

const requestServer = useServerRequest();
const [yearF, setYearF] = useState(new Date().getFullYear());
const [monthF, setMonthF] = useState(new Date().getMonth() + 1);
const [staffInfs, setStaffInfs] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
const [reload, setReload] = useState();    // флаг необходимо загрузить информацию из базы данных
const navigate = useNavigate();

const kdateLpu = useSelector(selectKdateLpu);
const kdLpu = useSelector(selectKdLpu);


    useEffect(() => {
        
        if (!yearF)
            return;
               
        requestServer('fetchStaffInfs', kdateLpu, kdLpu, yearF, monthF).then((staffInfRes) => {
                
                if (staffInfRes.error) {
                    
                    setErrorMessage(staffInfRes.error);
                    return;
                };
                
                setStaffInfs(staffInfRes.res.data.staffInfs);
                
                setReload(0);
                
                
            });
        
        
    }, [requestServer, kdateLpu, kdLpu, yearF, monthF, reload]);


    const handleClickCreateStaffInf = () => {
        /**
         *  Обработка нажатия кнопки "Создать"
        */  

        navigate(`/staff_inf/0/${kdateLpu}/${kdLpu}/${yearF}/${monthF}`)
    }

    return (
        <div className={className}>
            <h1>Сведения о медицинских работниках на софинансирвоание оплаты труда из средств НСЗ ТФОМС</h1>
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
            <div className="select-container">
                <label >Месяц: </label>
             
                <select 
                    defaultValue={monthF}
                    onChange={(e) => setMonthF(e.target.value)}
                >
                    <option disabled >Выберите месяц</option>
                    <option value={1}>январь</option>
                    <option value={2}>февраль</option>
                    <option value={3}>март</option>
                    <option value={4}>апрель</option>
                    <option value={5}>май</option>
                    <option value={6}>июнь</option>
                    <option value={7}>июль</option>
                    <option value={8}>август</option>
                    <option value={9}>сентябрь</option>
                    <option value={10}>октябрь</option>
                    <option value={11}>ноябрь</option>
                    <option value={12}>декабрь</option>
                </select>               
            </div>
            <div className="button-container">
                <Button type="button" width="100px" margin="10px" display="inline"  
                    
                    onClick={() => handleClickCreateStaffInf()}>
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
                        <th className="fam-column">Фамилия</th>
                        <th className="name-column">Имя</th>
                        <th className="otch-column">Отчество</th>
                        <th className="kdposition-column">Категория персонала</th>
                        {/* <th className="name_position-column">Должность</th>
                        <th className="date-emp-column">Дата<br /> приема<br />bна работу</th> */}
                        <th className="salary-column">Заработная плата<br />руб. и коп.</th>
                        <th className="charges-column">Начисления<br /> на заработную плату<br />руб. и коп.</th>
                        <th className="total-column">Начислено всего<br />руб. и коп.</th>
                        <th className="mh-accpt-column">Дата<br />согласования<br /> МЗ КО</th>
                        <th className="tf-accpt-column">Дата<br />согласования<br /> ТФОМС</th>
                        <th className="edit-column">            </th>
                        
                    </tr>
                </thead>
                <tbody>
                    { 
                    staffInfs ?
                        staffInfs.map(({ id, year_f, month_f, fam, name, otch, kdposition, name_position, 
                            date_emp, salary, charges, mh_accpt, tf_accpt }) => (
                            <StaffInfRow 
                                key={id} 
                                id={id}
                                year_f={year_f} 
                                month_f={month_f}
                                fam={fam}
                                name={name}
                                otch={otch}
                                kdposition={kdposition = 1 ?  "врач" : "средний медицинский персонал"}
                                date_emp={date_emp}
                                salary={salary}
                                charges={charges}
                                total={salary + charges}
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

export const StaffInf = styled(StaffInfContainer)`
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