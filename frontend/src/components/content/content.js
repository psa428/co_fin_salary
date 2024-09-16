import styled from "styled-components";

const Div = styled.div`
    display:    flex;
    flex-direction: column;
    align-items:    center;
`;


export const Content = ({ children, error }) => 
    error ? (
         <Div>
            <h2>Ошибка</h2>
            <div>{error}</div>
        </Div>
     ) : (
        children
     );   
