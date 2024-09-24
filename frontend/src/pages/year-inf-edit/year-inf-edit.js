import { Input, Button } from "../../components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";

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
    const formError = false;

    const onSubmit = () => {

    };

    return (
        <div className={className}>
            <h2>Заявка на софинансирование заработной платы</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            
                Год:
                <Input 
                    type="text" 
                    name="year-f"
                    width="100px"
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />
                <br />
            Численность врачей на 1 января текущего года или на дату<br />
            распределения объемов предоставления медицинской помощи:    
                <Input 
                    type="text" 
                    name="doctors"    
                    width="100px"          
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />
                <br />
            Численность среднего медицинского персонала на 1 января текущего года или на дату<br />
            распределения объемов предоставления медицинской помощи:    
                <Input 
                    type="text" 
                    name="nurses"   
                    width="100px"           
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />
            <br />
            Потребность на текущий год врачи:    
                <Input 
                    type="text" 
                    name="doctors-need"   
                    width="100px"           
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />        
            Средний медицинский персонал:
                <Input 
                    type="text" 
                    name="nurses-need"   
                    width="100px"           
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />  <br />
            Остаток средств НСЗ в медицинской организации (руб. и коп.)
                <Input 
                    type="text" 
                    name="nss-rest"   
                    width="100px"           
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />  <br />
            Состояние:
                <Input 
                    type="text" 
                    name="stat"   
                    width="300px"           
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />   
            Дата отправки на согласование:
                <Input 
                    type="text" 
                    name="date-send"   
                    width="100px"           
                    placeholder="..." 
                    {...register('year_f', {
                        onChange: () => setServerError(null),
                    })} />



                
                <Button type="submit" width="200px" disabled={!!formError}>
                    Сохранить
                </Button>
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