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
const StaffInfEditContainer = ({ className }) => {
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
    const [staffInf, setStaffInf] = useState();
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
            requestServer('fetchStaffInf', params.id).then((staffInfRes) => {              
                    if (staffInfRes.error) {
                        
                        setLoading(false);
                        // setErrorMessage(yearInfRes.error);
                        
                        return;
                    };
                    
                    setStaffInf(staffInfRes.res.data);    
                    setYearF(staffInfRes.res.data.year_f);
                    
                    setLoading(false);  
                    
                    
                });
        else {
            //  Создать новую запись
            setIsNew(true);
            setStaffInf({ 
                year_f: params.year_f, 
                month_f:    '',
                kdate_lpu: params.kdate_lpu, 
                kdlpu: params.kdlpu,
                user:   currentUser,
                fam:    '',
                name:   '',
                otch:   '',
                kdposition: 2,
                numst:  '',
                emp_date:   '',
                order_date: '',
                order_num:  '',
                doc_subm:   '',
                salary: 0,
                charges:    0,
                name_position:  '',                
                date_set_ready: '',
                is_ready:   'false',
                tf_accpt:  '',
                tf_stat:    '',
                mh_accpt:  '',
                mh_stat:    ''

                
             })
            
            setLoading(false);  

        }
                   
            
    }, [requestServer, params.id])
        
    
    /**
     * Обработка события нажатия кнопки Сохранить
     */
    const onSubmit = () => {
        
        requestServer('updateStaffInf', staffInf).then((staffInfRes) => {              
            if (staffInfRes.error) {
                
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
        
        requestServer('addStaffInf', staffInf).then((staffInfRes) => {              
            if (staffInfRes.error) {
                
                // setLoading(false);
                // setErrorMessage(yearInfRes.error);
                return;
            };
            
            navigate("/staff_inf");
        });

    }

    if (loading)
        return <div>Загрузка данных</div>

    return (

        <div className={className}>
            <h2>Информация<br /> о сотруднике медицинской организации, <br />зарплата которого финансируется из средств нормированного страхового запаса</h2>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                
                Месяц:
                <Input 
                    type="text" 
                    name="month-f"
                    width="100px"
                    placeholder="..." 
                    disabled={false}
                    value = {staffInf.month_f}
                    {...register('month_f', {
                        onChange: (e) => setStaffInf({...staffInf, month_f: e.target.value}),
                    })} />
                <br />
            Фамилия:
                <Input 
                    type="text" 
                    name="fam"    
                    width="100px"          
                    placeholder="..." 
                    value={staffInf.fam}
                    {...register('fam', {
                        onChange: (e) => setStaffInf({...staffInf, fam: e.target.value}),
                    })} />
            Имя:
                <Input 
                    type="text" 
                    name="name"    
                    width="100px"          
                    placeholder="..." 
                    value={staffInf.name}
                    {...register('name', {
                        onChange: (e) => setStaffInf({...staffInf, name: e.target.value}),
                    })} />
            Отчество:
                <Input 
                    type="text" 
                    name="otch"    
                    width="100px"          
                    placeholder="..." 
                    value={staffInf.otch}
                    {...register('otch', {
                        onChange: (e) => setStaffInf({...staffInf, otch: e.target.value}),
                    })} />
            
            <br />
            Категория персонала:
            <select  
                    name="kdposition"    
                    value={staffInf.kdposition}   
                    onChange= {(e) => setStaffInf({...staffInf, kdposition: e.target.value})}           
                    // {...register('kdposition', {
                    //     onChange: (e) => {
                    //         setStaffInf({...staffInf, kdposition: e.target.value})
                    //         console.log('in select kdposition', staffInf.kdposition)
                    //     }
                    // })

                    // }                    
                >
                    <option disabled >Выберите категорию</option>
                    <option value={1}>врач</option>
                    <option value={2}>средний медицинский персонал</option>
                    
                </select>  
            Объем занимаемой должности:
                <Input 
                    type="text" 
                    name="numst"   
                    width="100px"           
                    placeholder="..." 
                    value={staffInf.numst}
                    {...register('num_st', {
                        onChange: (e) => setStaffInf({...staffInf, numst: e.target.value}),
                    })} />  <br />
            Наименование должности:
                <Input 
                    type="text" 
                    name="name_position"   
                    width="600px"           
                    placeholder="..." 
                    value={staffInf.name_position}
                    {...register('name_position', {
                        onChange: (e) => setStaffInf({...staffInf, name_position: e.target.value}),
                    })} />  <br />
            Дата приема на работу:
                <Input 
                    type="text" 
                    name="emp_date"   
                    width="130px"           
                    placeholder="..." 
                    value={staffInf.emp_date}
                    {...register('date_emp', {
                        onChange: (e) => setStaffInf({...staffInf, emp_date: e.target.value}),
                    })} />  
            Дата приказа:
                <Input 
                    type="text" 
                    name=" order_date"   
                    width="130px"           
                    placeholder="..." 
                    value={staffInf.order_date}
                    {...register('order_date', {
                        onChange: (e) => setStaffInf({...staffInf, order_date: e.target.value}),
                    })} />  
            Номер приказа:            
                <Input 
                    type="text" 
                    name=" order_num"   
                    width="100px"           
                    placeholder="..." 
                    value={staffInf.order_num}
                    {...register('order_num', {
                        onChange: (e) => setStaffInf({...staffInf, order_num: e.target.value}),
                    })} />  <br />

            Отметка о предоставлении подтверждающих документов:
                <select 
                    defaultValue={false}
                    {...register('docs_subm', {
                        onChange: (e) => setStaffInf({...staffInf, docs_subm: e.target.value}),
                    })}                    
                >                    
                    <option value={false}>документы не представлены</option>
                    <option value={true}>документы представлены</option>
                    
                </select>  
                <br />
            Зарплата:            
                <Input 
                    type="number" 
                    name="salary"   
                    width="200px"           
                    placeholder="..." 
                    value={staffInf.salary}
                    {...register('salary', {
                        onChange: (e) => setStaffInf({...staffInf, salary: e.target.value}),
                    })} />  
            Начисления на заработную плату:            
                <Input 
                    type="number" 
                    name="charges"   
                    width="200px"           
                    placeholder="..." 
                    value={staffInf.charges}
                    {...register('charges', {
                        onChange: (e) => setStaffInf({...staffInf, charges: e.target.value}),
                    })} />  <br />
            
            
            Состояние:
                <select 
                    id="is-ready" 
                    name="is-ready" 
                    style={{width: "200px",height:"30px", margin:"0 10px 10px 10px", font_size:"18px", border: "1px solid #007889"}}
                    value={staffInf.is_ready}
                    onChange= {                     
                        (e) => {
                            let dateSetReady; 
                            
                            if (e.target.value === "true") {  
                                dateSetReady = convDate();                                
                            }     
                            else  {
                                dateSetReady = '';                                
                            }
                            
                            setStaffInf({...staffInf, is_ready: e.target.value, date_set_ready: dateSetReady});
                            
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
                    value={staffInf.date_set_ready}
                    width="120px" 
                    disabled         
                    
                    {...register('date_set_ready', {
                        onChange: (e) => {},
                   
                        
                    })} /> <br />
            Дата согласования МЗ КО:
                <Input 
                    type="text" 
                    name="mh-accpt"   
                    width="130px"  
                    disabled     
                    placeholder="..." 
                    {...register('mh_accpt', {
                        // onChange: (e) => setYearInf({...yearInf, date_mh_accpt: e.target.value}),
                    })} /> 
            
            Комментарий МЗ КО:
                <Input 
                    type="text" 
                    name="mh-stat"   
                    width="300px"  
                    disabled      
                    placeholder="..." 
                    
                    {...register('mh_stat', {
                        // onChange: (e) => setYearInf({...yearInf, mh_stat: e.target.value}),
                    })} />  <br /><br /> 
                
            Дата согласования ТФОМС:
                <Input 
                    type="text" 
                    name="tf-accpt"   
                    width="120px"  
                    disabled     
                    placeholder="..." 
                    {...register('tf_accpt', {
                        // onChange: (e) => setYearInf({...yearInf, date_mh_accpt: e.target.value}),
                    })} /> 
            
            Комментарий ТФОМС:
                <Input 
                    type="text" 
                    name="tf-stat"   
                    width="300px"  
                    disabled      
                    placeholder="..." 
                    
                    {...register('tf_stat', {
                        // onChange: (e) => setYearInf({...yearInf, mh_stat: e.target.value}),
                    })} />  <br /><br /> 

            
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

export const StaffInfEdit = styled(StaffInfEditContainer)`
    margin: 40px 0;
    padding:    0 80px;
`