import { Input, Button } from "../../components";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useServerRequest } from "../../hooks";
import { selectUserLogin } from "../../selectors";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration:    underline;
    margin: 20px 0;
    font-size:  18px;
`;
const MonthInfEditContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState:  { errors }

    } = useForm({
        defaultValues:  {
            login:  '',
            password:   '',
        },
        // resolver:   yupResolver(authFormSchema),

    });
    const [serverError, setServerError] = useState(null);
    const [loading,setLoading]=useState(true);
    const [monthInf, setMonthInf] = useState();
    const [yearF, setYearF] = useState();
    const [isNew, setIsNew] = useState(false);  // флаг создания новой записи
    
    const formError = false;
    const navigate = useNavigate();

    const params = useParams();
    const requestServer = useServerRequest();

    let currentUser = useSelector(selectUserLogin);
    
    useEffect(() => {   
        
        if (params.id !== '0')   
            //  Редактирование записи       
            requestServer('fetchMonthInf', params.id).then((monthInfRes) => {              
                    if (monthInfRes.error) {
                        
                        setLoading(false);
                        // setErrorMessage(yearInfRes.error);
                        
                        return;
                    };
                    
                    setMonthInf(monthInfRes.res.data);    
                    setYearF(monthInfRes.res.data.year_f);
                    
                    setLoading(false);  
                    
                    
                });
        else {
            //  Создать новую запись
            setIsNew(true);
            setMonthInf({ year_f: params.year_f, 
                month_f:    '',
                kdate_lpu: params.kdate_lpu, 
                kdlpu: params.kdlpu,
                user:   currentUser,
                doctors_taken: 0,
                nurses_taken: 0,
                doctors_fired:   0,
                nurses_fired:    0,
                doctors_salary:   0,
                nurses_salary:   0,
                date_mh_accpt:  '',
                date_tf_accpt:  '',
                date_set_ready: '',
                mh_stat:    '',
                tf_stat:    '',
                is_ready:   'false',
                executor:    '',
                executor_pos:   '',
                executor_phone: ''
             })
            
            setLoading(false);  

        }
                   
            
    }, [requestServer, params.id])
        
    
    /**
     * Обработка события нажатия кнопки Сохранить
     */
    const onSubmit = () => {
        
        requestServer('updateMonthInf', monthInf).then((monthInfRes) => {              
            if (monthInfRes.error) {
                
                // setLoading(false);
                // setErrorMessage(yearInfRes.error);
                return;
            };
            navigate(-1);
        });
    };

    /**
     *  Преобразование  даты в формат DD.MM.YYYY
     */
    const convDate = () => {
        let date = new Date();
        let newStrdate = date.getDate() + '.' + (date.getMonth() > 8 ? date.getMonth()+ 1 : 
                '0' + (date.getMonth()+ 1)) + '.' + date.getFullYear();
        
        return newStrdate;

    }

        /**
         *  Обработка нажатия кнопк Создать
         */
    const crtNewRecord = () => {
        
        requestServer('addMonthInf', monthInf).then((monthInfRes) => {              
            if (monthInfRes.error) {
                
                // setLoading(false);
                // setErrorMessage(yearInfRes.error);
                return;
            };
            
            navigate("/month_inf");
        });

    }

    if (loading)
        return <div>Загрузка данных</div>

    return (

        <div className={className}>
            <h2>Заявка МО на софинансирование заработной платы</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                
                Месяц:
                <Input 
                    type="text" 
                    name="month-f"
                    width="100px"
                    placeholder="..." 
                    disabled={false}
                    value = {monthInf.month_f}
                    {...register('month_f', {
                        onChange: (e) => setMonthInf({...monthInf, month_f: e.target.value}),
                    })} />
                <br />
            <b>Принято на последнее число месяца</b>  врачей:    
                <Input 
                    type="text" 
                    name="doctors_taken"    
                    width="100px"          
                    placeholder="..." 
                    value={monthInf.doctors_taken}
                    {...register('doctors_taken', {
                        onChange: (e) => setMonthInf({...monthInf, doctors_taken: e.target.value}),
                    })} />
                
            среднего медицинского персонала:    
                <Input 
                    type="text" 
                    name="nurses_taken"   
                    width="100px"           
                    placeholder="..." 
                    value={monthInf.nurses_taken}
                    {...register('nurses', {
                        onChange: (e) => setMonthInf({...monthInf, nurses_taken: e.target.value}),
                    })} />
            <br />
            <b>Уволено на последнее число месяца</b>  врачей:    
                <Input 
                    type="text" 
                    name="doctors-fired"   
                    width="100px"           
                    placeholder="..." 
                    value={monthInf.doctors_fired}
                    {...register('doctors_fired', {
                        onChange: (e) => setMonthInf({...monthInf, doctors_fired: e.target.value}),
                    })} />        
            среднего медицинского персонала:
                <Input 
                    type="text" 
                    name="nurses-fired"   
                    width="100px"           
                    placeholder="..." 
                    value={monthInf.nurses_fired}
                    {...register('nurses_fired', {
                        onChange: (e) => setMonthInf({...monthInf, nurses_fired: e.target.value}),
                    })} />  <br />
            <b>Прирост численности на последнее число месяца</b><br />
              врачей:    
                <Input 
                    type="text" 
                    name="doctors-growth"   
                    width="100px"    
                    readOnly
                    disabled
                    value={monthInf.doctors_taken - monthInf.doctors_fired}
                    onChange={() => {}}
                />        
            среднего медицинского персонала:
                <Input 
                    type="text" 
                    name="nurses-fired"   
                    width="100px"           
                    readOnly
                    disabled
                    value={monthInf.nurses_taken - monthInf.nurses_fired}
                    onChange={() => {}}
                />  <br />        
            <b>Общая сумма за счет средств ОМС начисленной заработной платы и начисления на оплату труда
            в отчетном месяце на прирост численности, руб. коп.</b><br /><br />
            врачей:
                <Input 
                    type="text" 
                    name="doctors-salary"   
                    width="100px"           
                    placeholder="..." 
                    value={monthInf.doctors_salary}
                    {...register('doctors_salary', {
                        onChange: (e) => setMonthInf({...monthInf, doctors_salary: e.target.value}),
                    })} />  
            среднего медицинского персонала:
                <Input 
                    type="text" 
                    name="nurses-salary"   
                    width="100px"           
                    placeholder="..." 
                    value={monthInf.nurses_salary}
                    {...register('nurses_salary', {
                        onChange: (e) => setMonthInf({...monthInf, nurses_salary: e.target.value}),
                    })} />  <br />
            
            Состояние:
                <select 
                    id="is-ready" 
                    name="is-ready" 
                    style={{width: "200px",height:"30px", margin:"0 10px 10px 10px", font_size:"18px", border: "1px solid #007889"}}
                    value={monthInf.is_ready}
                    onChange= {                     
                        (e) => {
                            let dateSetReady; 
                            
                            if (e.target.value === "true") {  
                                dateSetReady = convDate();                                
                            }     
                            else  {
                                dateSetReady = '';                                
                            }
                            
                            setMonthInf({...monthInf, is_ready: e.target.value, date_set_ready: dateSetReady});
                            
                        }
                    }
                    >
                    <option value="false">Находится в разработке</option>
                    <option value="true">Готова к согласованию</option>

                </select>
                
            Дата отправки на согласование:
                    
                <Input 
                    type="text" 
                    name="date-set-ready"   
                    value={monthInf.date_set_ready}
                    width="120px" 
                    disabled         
                    
                    {...register('date_set_ready', {
                        onChange: (e) => {},
                   
                        
                    })} /> <br />

            Дата согласования МЗ КО:
                <Input 
                    type="text" 
                    name="date-mh-accpt"   
                    width="100px"  
                    disabled     
                    placeholder="..." 
                    {...register('date_mh_accpt', {
                        // onChange: (e) => setYearInf({...yearInf, date_mh_accpt: e.target.value}),
                    })} /> 
            
            Комментарий МЗ КО:
                <Input 
                    type="text" 
                    name="mh-stat"   
                    width="330px"  
                    disabled      
                    placeholder="..." 
                    
                    {...register('mh_stat', {
                        // onChange: (e) => setYearInf({...yearInf, mh_stat: e.target.value}),
                    })} /> <br />      
            Дата согласования ТФОМС:
                <Input 
                    type="text" 
                    name="date-tf-accpt"   
                    width="100px"  
                    disabled     
                    placeholder="..." 
                    {...register('date_tf', {
                        // onChange: (e) => setYearInf({...yearInf, date_mh_accpt: e.target.value}),
                    })} /> 
            
            Комментарий ТФОМС:
                <Input 
                    type="text" 
                    name="tf-stat"   
                    width="320px"  
                    disabled      
                    placeholder="..." 
                    
                    {...register('tf_stat', {
                        // onChange: (e) => setYearInf({...yearInf, mh_stat: e.target.value}),
                    })} />  <br /><br /> 

            Исполнитель:
                <Input 
                    type="text" 
                    name="executor"   
                    width="150px"           
                    placeholder="..." 
                    value={monthInf.executor}
                    {...register('executor', {
                        onChange: (e) => setMonthInf({...monthInf, executor: e.target.value}),
                    })} />  
            Должность:
                <Input 
                    type="text" 
                    name="executor-pos"   
                    width="300px"           
                    placeholder="..." 
                    value={monthInf.executor_pos}
                    {...register('executor_pos', {
                        onChange: (e) => setMonthInf({...monthInf, executor_pos: e.target.value}),
                    })} />  <br />
            Телефон:
                <Input 
                    type="text" 
                    name="executor-phone"   
                    width="100px"           
                    placeholder="..." 
                    value={monthInf.executor_phone}
                    {...register('executor_phone', {
                        onChange: (e) => setMonthInf({...monthInf, executor_phone: e.target.value}),
                    })} />  <br />




                <div>
                    
                    <Button 
                        type="button" 
                        className="button-create"
                        width="150px" 
                        margin="30px"
                        display="inline" 
                        visibility={(!isNew || !!formError) ? "hidden" : ""}
                        onClick={() => crtNewRecord()}>
                        Создать
                    </Button>
                    <Button 
                        type="submit" 
                        className="button-update"
                        width="150px" 
                        margin="30px" 
                        display="inline" 
                        visibility={(!!formError || isNew) ? "hidden" : ""}>
                        Сохранить
                    </Button>
                    <Button type="button" 
                        width="150px" margin="30px auto auto 10px" display="inline"
                        onClick = {() => navigate(-1)}
                    >
                        Назад
                    </Button>
                </div> 
                {/* {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>} */}
                <StyledLink to="/register">Регистрация</StyledLink>
                
            </form>    
        </div>

    )

};  

export const MonthInfEdit = styled(MonthInfEditContainer)`
    margin: 40px 0;
    padding:    0 80px;
`