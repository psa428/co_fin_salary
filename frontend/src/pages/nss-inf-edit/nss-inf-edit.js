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
const NssInfEditContainer = ({ className }) => {
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
    const [nssInf, setNssInf] = useState();
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
            requestServer('fetchNssInf', params.id).then((nssInfRes) => {              
                    if (nssInfRes.error) {
                        
                        setLoading(false);
                        // setErrorMessage(yearInfRes.error);
                        
                        return;
                    };
                    
                    setNssInf(nssInfRes.res.data);    
                    setYearF(nssInfRes.res.data.year_f);
                    
                    setLoading(false);  
                    
                    
                });
        else {
            //  Создать новую запись
            setIsNew(true);
            setNssInf({ 
                year_f: params.year_f, 
                month_f:    '',
                kdate_lpu: params.kdate_lpu, 
                kdlpu: params.kdlpu,
                user:   currentUser,
                nss_received:   0,
                nss_doctors_month: 0,
                nss_nurses_month: 0,
                nss_ret_month:   0,
                non_target_cur: 0,
                non_target_before:  0,
                tf_accpt:  '',
                date_set_ready: '',
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
        
        requestServer('updateNssInf', nssInf).then((nssInfRes) => {              
            if (nssInfRes.error) {
                
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
        
        requestServer('addNssInf', nssInf).then((nssInfRes) => {              
            if (nssInfRes.error) {
                
                // setLoading(false);
                // setErrorMessage(yearInfRes.error);
                return;
            };
            
            navigate("/month_nss");
        });

    }

    if (loading)
        return <div>Загрузка данных</div>

    return (

        <div className={className}>
            <h2>Информация об использовании средств нормированного страхового запаса</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                
                Месяц:
                <Input 
                    type="text" 
                    name="month-f"
                    width="100px"
                    placeholder="..." 
                    disabled={false}
                    value = {nssInf.month_f}
                    {...register('month_f', {
                        onChange: (e) => setNssInf({...nssInf, month_f: e.target.value}),
                    })} />
                <br />
            <b>Поступило средств НСЗ в МО</b>  врачей:    
                <Input 
                    type="text" 
                    name="nss_received"    
                    width="100px"          
                    placeholder="..." 
                    value={nssInf.nss_received}
                    {...register('nss_received', {
                        onChange: (e) => setNssInf({...nssInf, nss_received: e.target.value}),
                    })} />
            
            <br />
            Использовано средств НСЗ на оплату труда врачей:
                <Input 
                    type="text" 
                    name="nss_doctors_month"   
                    width="100px"           
                    placeholder="..." 
                    value={nssInf.nss_doctors_month}
                    {...register('nss_doctors_month', {
                        onChange: (e) => setNssInf({...nssInf, nss_doctors_month: e.target.value}),
                    })} />  
            Использовано средств НСЗ на оплату труда среднего медицинского персонала:
                <Input 
                    type="text" 
                    name="nss_nurses_month"   
                    width="100px"           
                    placeholder="..." 
                    value={nssInf.nss_nurses_month}
                    {...register('nss_nurses_month', {
                        onChange: (e) => setNssInf({...nssInf, nss_nurses_month: e.target.value}),
                    })} />  <br />
            Возвращено средств НСЗ в бюджет ТФОМС:
                <Input 
                    type="text" 
                    name="nss-ret-month"   
                    width="100px"           
                    placeholder="..." 
                    value={nssInf.nss_ret_month}
                    {...register('nss_ret_month', {
                        onChange: (e) => setNssInf({...nssInf, nss_ret_month: e.target.value}),
                    })} />  <br />
            
            Состояние:
                <select 
                    id="is-ready" 
                    name="is-ready" 
                    style={{width: "200px",height:"30px", margin:"0 10px 10px 10px", font_size:"18px", border: "1px solid #007889"}}
                    value={nssInf.is_ready}
                    onChange= {                     
                        (e) => {
                            let dateSetReady; 
                            
                            if (e.target.value === "true") {  
                                dateSetReady = convDate();                                
                            }     
                            else  {
                                dateSetReady = '';                                
                            }
                            
                            setNssInf({...nssInf, is_ready: e.target.value, date_set_ready: dateSetReady});
                            
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
                    value={nssInf.date_set_ready}
                    width="120px" 
                    disabled         
                    
                    {...register('date_set_ready', {
                        onChange: (e) => {},
                   
                        
                    })} /> <br />
                
            Дата согласования ТФОМС:
                <Input 
                    type="text" 
                    name="tf-accpt"   
                    width="100px"  
                    disabled     
                    placeholder="..." 
                    {...register('tf_accpt', {
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
                    value={nssInf.executor}
                    {...register('executor', {
                        onChange: (e) => setNssInf({...nssInf, executor: e.target.value}),
                    })} />  
            Должность:
                <Input 
                    type="text" 
                    name="executor-pos"   
                    width="300px"           
                    placeholder="..." 
                    value={nssInf.executor_pos}
                    {...register('executor_pos', {
                        onChange: (e) => setNssInf({...nssInf, executor_pos: e.target.value}),
                    })} />  <br />
            Телефон:
                <Input 
                    type="text" 
                    name="executor-phone"   
                    width="100px"           
                    placeholder="..." 
                    value={nssInf.executor_phone}
                    {...register('executor_phone', {
                        onChange: (e) => setNssInf({...nssInf, executor_phone: e.target.value}),
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
                
                
            </form>    
        </div>

    )

};  

export const NssInfEdit = styled(NssInfEditContainer)`
    margin: 40px 0;
    padding:    0 80px;
`