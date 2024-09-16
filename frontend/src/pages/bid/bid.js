import styled from "styled-components";


const BidContainer = ({ className }) => {

    return (
        <div className={className}>
            <h1>Заявка на софинансирование заработной платы</h1>
            
        </div>

    )

};  

export const Bid = styled(BidContainer)`
    margin: 40px 0;
    padding:    0 80px;

`;