import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';

import { Icon } from "../../../../components";
import styled from "styled-components";


const StaffInfRowContainer = ({ className, id, year_f, month_f, 
            fam, name, otch, kdposition, name_position, date_emp, salary, charges, total, 
            mh_accpt, tf_accpt
         }) => {
    
    return (
        
            <tr>
                
                <td className="fam" align="left">{fam}</td>
                <td className="name" align="left">{name}</td>
                <td className="otch" align="left">{otch}</td>
                <td className="kdposition" align="left">{kdposition}</td>
                {/* <td className="name_position" align="left">{name_position}</td> */}
                {/* <td className="date-emp" align="center">{date_emp}</td> */}
                <td className="salary" align="right">{salary}</td>                
                <td className="charges" align="right">{charges}</td>   
                <td className="total" align="right">{total}</td>                             
                <td className="mh-accpt" align="center">{mh_accpt}</td>
                <td className="tf-accpt" align="center">{tf_accpt}</td>
                <td className='edit-btn' align="center">
                    
                    <Link to={'/staff_inf/' + id}>    <Icon
                            id="fa-pencil-square-o"  
                            margin="0 0 0 10px"   
                            disabled={false}
                            
                        />
                    </Link>    
                </td>  
                
            </tr>
            
    );
};

export const StaffInfRow = styled(StaffInfRowContainer)`
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