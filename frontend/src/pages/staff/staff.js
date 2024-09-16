import styled from "styled-components";


const StaffContainer = ({ className }) => {

    return (
        <div className={className}>
            <h1>Сведения о медицинских работниках на софинансирование 
                оплаты труда из средств НСЗ ТФОМС
            </h1>
            
        </div>

    )

};  

export const Staff = styled(StaffContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;