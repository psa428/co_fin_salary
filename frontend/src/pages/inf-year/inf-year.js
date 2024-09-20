import styled from "styled-components";

const InfYearContainer = ({ className }) => {

    return (
        <div className={className}>
            <h1>Информация на начало года</h1>
            
        </div>

    )

};  

export const InfYear = styled(InfYearContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;