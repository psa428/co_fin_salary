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
    margin:  ${({ margin = 'auto'}) => margin};
    height: 32px;
    border: 1px solid rgb(0, 0, 0);
    background-color:   #007889;
    color:  #fff;
    display: ${({ display = 'block'}) => display};
    visibility:  ${({ visibility = ''}) => visibility};

    &:hover {
        cursor: pointer;
    }
   
    &:a {
        color:  #fff;
    }

`;