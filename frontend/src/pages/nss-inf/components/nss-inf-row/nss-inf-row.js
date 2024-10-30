import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

import { Icon } from "../../../../components";
import styled from "styled-components";


const NssInfRowContainer = ({ className, id, year_f, month_f, 
            nss_received, nss_used_month, nss_doctors_month, nss_nurses_month, nss_ret_month, 
            tf_accpt
         }) => {
    
    return (
        
            <tr>
                
                <td className="month_f" align="center">{month_f}</td>
                <td className="nss-received" align="right">{nss_received}</td>
                <td className="nss-used-month" align="right">{nss_used_month}</td>
                <td className="nss-doctors-month" align="right">{nss_doctors_month}</td>
                <td className="nss-nurses-month" align="right">{nss_nurses_month}</td>
                <td className="nss-ret-month" align="right">{nss_ret_month}</td>                
                
                <td className="tf-accpt" align="center">{tf_accpt}</td>
                <td className='edit-btn' align="center">
                    
                    <Link to={'/month_nss/' + id}>    <Icon
                            id="fa-pencil-square-o"  
                            margin="0 0 0 10px"   
                            disabled={false}
                            
                        />
                    </Link>    
                </td>  
                
            </tr>
            
    );
};

export const NssInfRow = styled(NssInfRowContainer)`
    td {
        text-align: center;
    }

    // display:    flex;  
    // margin-top: 10px;


    // & select {
    //     padding: 0 5px;
    //     font-size:  16px;
    // }

    & .month-f {
        width:  50px;
        text-align: center;
    }

    & .doctors-taken {
        width:  150px;
        justify-content: right;
    }

    // & .nurses-taken {
    //     width:  150px;
    //     justify-content: right;
    // }

    // & .doctors-fired{
    //     width:  150px;
    //     justify-content: right;
    // }

    // & .nurses-fired {
    //     width:  150px;
    //     justify-content: right;
    // }

    


    
    
`;
// UserRow.propTypes = {
//     id: PropTypes.string.isRequired, 
//     login: PropTypes.string.isRequired, 
//     registeredAt: PropTypes.string.isRequired, 
//     roleId: PROP_TYPE.ROLE_ID.isRequired, 
//     roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired, 
//     onUserRemove: PropTypes.func.isRequired,
// };