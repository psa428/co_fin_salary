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
    const [yearInf, setYearInf] = useState();
    const [yearF, setYearF] = useState();
    const [isNew, setIsNew] = useState(false);  // флаг создания новой записи
    
    const formError = false;
    const navigate = useNavigate();

    const params = useParams();
    const requestServer = useServerRequest();

    let currentUser = useSelector(selectUserLogin);
    
    useEffect(() => {   
        console.log('in YearINfEdit in useEffect')
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

            console.log('Добавление новой записи') 
            console.log('params = ', params)
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
            console.log('params = ', params)
            console.log('currentUser = ', currentUser)
            console.log(`kdate_lpu =  ${params.kdate_lpu} kdlpu =  ${params.kdlpu}`)
            setLoading(false);  

        }
                   
            
    }, [requestServer, params.id])
        
    
    /**
     * Обработка события нажатия кнопки Сохранить
     */
    const onSubmit = () => {
        
        requestServer('updateYearInf', yearInf).then((yearInfRes) => {              
            if (yearInfRes.error) {
                
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
        console.log('newStrDate = ', newStrdate)
        return newStrdate;

    }

        /**
         *  Обработка нажатия кнопк Создать
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
                    type="text" 
                    name="year-f"
                    width="100px"
                    placeholder="..." 
                    disabled={false}
                    value = {yearInf.year_f}
                    {...register('year_f', {
                        onChange: (e) => setYearInf({...yearInf, year_f: e.target.value}),
                    })} />
                <br />
            Численность врачей на 1 января текущего года или на дату<br />
            распределения объемов предоставления медицинской помощи:    
                <Input 
                    type="text" 
                    name="doctors"    
                    width="100px"          
                    placeholder="..." 
                    value={yearInf.doctors}
                    {...register('doctors', {
                        onChange: (e) => setYearInf({...yearInf, doctors: e.target.value}),
                    })} />
                <br />
            Численность среднего медицинского персонала на 1 января текущего года или на дату<br />
            распределения объемов предоставления медицинской помощи:    
                <Input 
                    type="text" 
                    name="nurses"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.nurses}
                    {...register('nurses', {
                        onChange: (e) => setYearInf({...yearInf, nurses: e.target.value}),
                    })} />
            <br />
            Потребность на текущий год врачи:    
                <Input 
                    type="text" 
                    name="doctors-need"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.doctors_need}
                    {...register('doctors_need', {
                        onChange: (e) => setYearInf({...yearInf, doctors_need: e.target.value}),
                    })} />        
            Средний медицинский персонал:
                <Input 
                    type="text" 
                    name="nurses-need"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.nurses_need}
                    {...register('nurses_need', {
                        onChange: (e) => setYearInf({...yearInf, nurses_need: e.target.value}),
                    })} />  <br />
            Остаток средств НСЗ в медицинской организации (руб. и коп.)
                <Input 
                    type="text" 
                    name="nss-rest"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.nss_rest}
                    {...register('nss_rest', {
                        onChange: (e) => setYearInf({...yearInf, nss_rest: e.target.value}),
                    })} />  <br />
            Месяц начала действия записи)
                <Input 
                    type="text" 
                    name="month-start"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.month_start}
                    {...register('month_start', {
                        onChange: (e) => setYearInf({...yearInf, month_start: e.target.value}),
                    })} />
            Месяц окончания действия записи)
                <Input 
                    type="text" 
                    name="month-finish"   
                    width="100px"           
                    placeholder="..." 
                    value={yearInf.month_finish}
                    {...register('month_finish', {
                        onChange: (e) => setYearInf({...yearInf, month_finish: e.target.value}),
                    })} /> <br />
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
                    })} /> <br />
            
            Комментарий МЗ КО:
                <Input 
                    type="text" 
                    name="mh-stat"   
                    width="600px"  
                    disabled      
                    placeholder="..." 
                    
                    {...register('mh_stat', {
                        // onChange: (e) => setYearInf({...yearInf, mh_stat: e.target.value}),
                    })} />        


                <div>
                    {console.log('проверка режима !isNew', !isNew,  '  formError = ',  formError)}
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

export const YearInfEdit = styled(YearInfEditContainer)`
    margin: 40px 0;
    padding:    0 80px;
`