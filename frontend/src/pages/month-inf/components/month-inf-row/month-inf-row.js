import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

import { Icon } from "../../../../components";
import styled from "styled-components";


const MonthInfRowContainer = ({ className, id, year_f, month_f, 
            doctors_taken, doctors_fired, nurses_taken, nurses_fired, 
            doctors_salary, nurses_salary, mh_accpt, tf_accpt
         }) => {
    
    return (
        
            <tr>
                
                <td className="month_f" align="center">{month_f}</td>
                <td className="doctors-taken" align="right">{doctors_taken}</td>
                <td className="nurses-taken" align="right">{nurses_taken}</td>
                <td className="doctors-fired" align="right">{doctors_fired}</td>                
                <td className="nurses-fired" align="right">{nurses_fired}</td>
               
                <td className="mh-accpt" align="center">{mh_accpt}</td>
                <td className="tf-accpt" align="center">{tf_accpt}</td>
                <td className='edit-btn' align="center">
                    
                    <Link to={'/month_inf/' + id}>    <Icon
                            id="fa-pencil-square-o"  
                            margin="0 0 0 10px"   
                            disabled={false}
                            
                        />
                    </Link>    
                </td>  
                
            </tr>
            
    );
};

export const MonthInfRow = styled(MonthInfRowContainer)`
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