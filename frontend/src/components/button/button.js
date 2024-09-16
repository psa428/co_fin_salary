import { Children } from 'react';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props}) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )

};

export const Button = styled(ButtonContainer)`
    display:    flex;
    justify-content:    center;
    align-items:    center;
    font-size:  18px;
    width:  ${({ width = '100%'}) => width};
    height: 32px;
    border: 1px solid rgb(0, 0, 0);
    background-color:   #007889;
    color:  #fff;

    &:hover {
        cursor: pointer;
    }
   
    &:a {
        color:  #fff;
    }

`;