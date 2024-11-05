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
const YearInfEditContainer = ({ className }) => {
    const {
        register,
        // reset,
        handleSubmit,
        formState:  { errors }

    } = useForm(
        {
            mode: "onBlur"
        }        
    );
    // const [serverError, setServerError] = useState(null);
    const [loading,setLoading]=useState(true);
    const [yearInf, setYearInf] = useState();
    const [yearF, setYearF] = useState();
    const [isNew, setIsNew] = useState(false);  // флаг создания новой записи
    
    // const formError = false;
    const navigate = useNavigate();

    const params = useParams();
    const requestServer = useServerRequest();

    let currentUser = useSelector(selectUserLogin);
    
    useEffect(() => {   
        
        if (params.id !== '0')   
            //  Редактирование записи       
            requestServer('fetchYearInf', params.id).then((yearInfRes) => {              
                if (yearInfRes.error) {
                    
                    setLoading(false);
                    // setErrorMessage(yearInfRes.error);
                    
                    return;
                };                    
                setYearInf(yearInfRes.res.data);    
                setYearF(yearInfRes.res.data.year_f);  
                setLoading(false);                      
            });
        else {
            //  Создать новую запись
            setIsNew(true);
            setYearInf({ year_f: new Date().getFullYear(), 
                kdate_lpu: params.kdate_lpu, 
                kdlpu: params.kdlpu,
                user:   currentUser,
                doctors: 0,
                nurses: 0,
                doctors_need:   0,
                nurses_need:    0,
                nss_rest:   0,
                date_mh_accpt:  '',
                date_set_ready: '',
                is_ready:   'false',
                month_start:    1,
                month_finish:   12
             })
            
            setLoading(false);  
        }                             
    }, [requestServer, params.id])
        
    
    /**
     * Обработка события нажатия кнопки Сохранить
     */
    const onSubmit = () => {
        if (!isNew)
            // Сохранение информации
            requestServer('updateYearInf', yearInf).then((yearInfRes) => {              
                if (yearInfRes.error) {
                    
                    // setLoading(false);
                    // setErrorMessage(yearInfRes.error);
                    return;
                };
                navigate(-1);
            });
        else
            // Добавление новой записи
            crtNewRecord();
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
         *  Создать новую запись
         */
    const crtNewRecord = () => {
        requestServer('addYearInf', yearInf).then((yearInfRes) => {              
            if (yearInfRes.error) {
                
                // setLoading(false);
                // setErrorMessage(yearInfRes.error);
                return;
            };
            
            navigate("/year_inf");
        });

    }

    if (loading)
        return <div>Загрузка данных</div>

    return (
        <div className={className}>
            <h2>Информация о состоянии на начало года</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                Год:
                <Input 
                    type="number" 
                    name="year_f"
                    width="100px"
                    placeholder="..." 
                    disabled={false}
                    value = {yearInf.year_f}
                    {...register('year_f', {
                        onChange: (e) => setYearInf({...yearInf, year_f: e.target.value}),
                        required:   'Поле является обязательным для заполнения',                                                
                    })}                     
                    />
                    {errors.year_f && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                        {errors.year_f.message}</p>}
                    
                <br /><br />
            Численность врачей на 1 января текущего года или на дату<br />
            распределения объемов предоставления медицинской помощи:    
                <Input 
                    type="number" 
                    name="doctors"    
                    width="100px"          
                    placeholder="..." 
                    value={yearInf.doctors}
                    {...register('doctors', {
                        onChange: (e) => setYearInf({...yearInf, doctors: e.target.value}),
                        required:   'Поле является обязательным для заполнения',      
                    })} />
                    {errors.doctors && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.doctors.message}</p>}
                <br /><br />
            Численность среднего медицинского персонала на 1 января текущего года или на дату<br />
            распределения объемов предоставления медицинской помощи:    
                <Input 
                    type="number" 
                    name="nurses"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.nurses}
                    {...register('nurses', {
                        onChange: (e) => setYearInf({...yearInf, nurses: e.target.value}),
                        required:   'Поле является обязательным для заполнения',      
                    })} />
                    {errors.nurses && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.nurses.message}</p>}
                <br /><br />
            Потребность на текущий год врачи:    
                <Input 
                    type="number" 
                    name="doctors-need"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.doctors_need}
                    {...register('doctors_need', {
                        onChange: (e) => setYearInf({...yearInf, doctors_need: e.target.value}),
                        required:   'Поле является обязательным для заполнения',      
                    })} />
                    {errors.doctors_need && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.doctors_need.message}</p>}      
            Средний медицинский персонал:
                <Input 
                    type="number" 
                    name="nurses-need"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.nurses_need}
                    {...register('nurses_need', {
                        onChange: (e) => setYearInf({...yearInf, nurses_need: e.target.value}),
                        required:   'Поле является обязательным для заполнения',      
                    })} />
                    {errors.nurses_need && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.nurses_need.message}</p>}
                    <br /><br />
            Остаток средств НСЗ в медицинской организации (руб. и коп.)
                <Input 
                    type="number" 
                    name="nss-rest"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.nss_rest}
                    {...register('nss_rest', {
                        onChange: (e) => setYearInf({...yearInf, nss_rest: e.target.value}),
                        required:   'Поле является обязательным для заполнения',      
                    })} />
                    {errors.nss_rest && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.nss_rest.message}</p>}
                    <br /><br />
            Месяц начала действия записи
                <Input 
                    type="number" 
                    name="month-start"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.month_start}
                    {...register('month_start', {
                        onChange: (e) => setYearInf({...yearInf, month_start: e.target.value}),
                        required:   'Поле является обязательным для заполнения',   
                        min:    {
                            value:  1,
                            message:    'Значение поля не может быть меньше 1'
                        },
                        max: {
                            value:  12,
                            message:    "значение поля не может быть больше 12"
                        }   
                    })} />
                    {errors.month_start && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.month_start.message}</p>}
            Месяц окончания действия записи
                <Input 
                    type="text" 
                    name="month-finish"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.month_finish}
                    {...register('month_finish', {
                        onChange: (e) => setYearInf({...yearInf, month_finish: e.target.value}),
                        min:    {
                            value:  1,
                            message:    'Значение поля не может быть меньше 1'
                        },
                        max: {
                            value:  12,
                            message:    "значение поля не может быть больше 12"
                        }   
                    })} />
                    {errors.month_finish && <p style={{color: "red", fontSize: "smaller", position: "absolute", margin: "0"}}>
                    {errors.month_finish.message}</p>}
                    <br /><br />
            Состояние:
                <select 
                    id="is-ready" 
                    name="is-ready" 
                    style={{width: "200px",height:"30px", margin:"0 10px 10px 10px", font_size:"18px", border: "1px solid #007889"}}
                    value={yearInf.is_ready}
                    onChange= {                     
                        (e) => {
                            let dateSetReady; 
                            
                            if (e.target.value === "true") {  
                                dateSetReady = convDate();                                
                            }     
                            else  {
                                dateSetReady = '';                                
                            }
                            
                            setYearInf({...yearInf, is_ready: e.target.value, date_set_ready: dateSetReady});
                            
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
                    width="120px" 
                    disabled         
                    placeholder="..." 
                    
                    {...register('date_set_ready', {
                        onChange: (e) => {},
                    })} /> <br />

            Дата согласования МЗ КО:
                <Input 
                    type="text" 
                    name="date-mh-accpt"   
                    value={yearInf.mh_accpt}
                    width="120px"  
                    disabled     
                    placeholder="..." 
                    {...register('date_mh_accpt', {
                        // onChange: (e) => setYearInf({...yearInf, date_mh_accpt: e.target.value}),
                    })} /> <br />
            
            Комментарий МЗ КО:
                <Input 
                    type="text" 
                    name="mh-stat"   
                    value={yearInf.mh_stat}
                    width="600px"  
                    disabled      
                    placeholder="..." 
                    
                    {...register('mh_stat', {
                        // onChange: (e) => setYearInf({...yearInf, mh_stat: e.target.value}),
                    })} />        


                <div>
                    <Button 
                        type="submit" 
                        className="button-update"
                        width="150px" 
                        margin="30px" 
                        display="inline" 
                        // visibility={(!!formError || isNew) ? "hidden" : ""}
                        visibility={!!yearInf.mh_accpt ? "hidden" : ""}
                    >
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
                
                
            </form>    
        </div>

    )

};  

export const YearInfEdit = styled(YearInfEditContainer)`
    margin: 40px 0;
    padding:    0 80px;

    & > .error-message {
            color: "red"; 
            fontSize: "smaller"; 
            position: "absolute"; 
            margin: "0";
        }
`