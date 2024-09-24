import PropTypes from 'prop-types'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Icon } from "../../../../components";
import styled from "styled-components";
import { TableRow } from "../table-row/table-row";
import { FaPen } from "react-icons/fa";

// import { ROLE } from '../../../../bff/constants';

// import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils';


const YearInfRowContainer = ({ className, id, year_f, doctors, doctors_need, nurses, nurses_need, nss_rest }) => {
    const navigate = useNavigate();
    return (
        <div className={className} >
            <TableRow border={true}>
                <div className="year-f">{year_f}</div>
                <div className="doctors">{doctors}</div>
                <div className="nurses">{nurses}</div>
                <div className="doctors-need">{doctors_need}</div>
                
                <div className="nurses-need">{nurses_need}</div>
                <div className="nss-rest">{nss_rest}</div>
                <div className='edit-btn'>
                    <Link to="/year_inf/edit">    <Icon
                            id="fa-pencil-square-o"  
                            margin="0 0 0 10px"   
                            disabled={false}
                            
                        />
                    </Link>    
                </div>                             
            </TableRow>
            
            
            <div className="year-inf-data"></div>
            

        </div>
    );
};

export const YearInfRow = styled(YearInfRowContainer)`
    display:    flex;  
    margin-top: 10px;

    & select {
        padding: 0 5px;
        font-size:  16px;
    }

    & .year-f {
        width:  50px;
    }

    & .doctors {
        width:  130px;
        justify-content: right;
    }

    & .nurses {
        width:  130px;
        justify-content: right;
    }

    & .doctors-need{
        width:  170px;
        justify-content: right;
    }

    & .nurses-need {
        width:  200px;
        justify-content: right;
    }

    & .nss-rest {
        width:  150px;
        justify-content: right;
    }


    
    
`;
// UserRow.propTypes = {
//     id: PropTypes.string.isRequired, 
//     login: PropTypes.string.isRequired, 
//     registeredAt: PropTypes.string.isRequired, 
//     roleId: PROP_TYPE.ROLE_ID.isRequired, 
//     roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired, 
//     onUserRemove: PropTypes.func.isRequired,
// };