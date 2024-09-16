import styled from "styled-components";


const NssContainer = ({ className }) => {

    return (
        <div className={className}>
            <h1>Информация об использовании средств НСЗ</h1>
            
        </div>

    )

};  

export const Nss = styled(NssContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;