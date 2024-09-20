import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon} from '../../../../components';
import styled from "styled-components";
import { selectUserLogin, selectUserRole } from '../../../../selectors';
// import { ROLE } from '../../../../bff/operations/constants/role';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
    display:    flex;
    justify-content:    flex-end;
    align-itrms:    center;
    

`;

const UserName = styled.div`
    font-size:  18ps;
    font-weight:    bold;
    color:  #007889;

`;

const ControlPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const roleId = useSelector(selectUserRole);
    const login = useSelector(selectUserLogin);
    

    const onLogout = () => {
        dispatch(logout());
        sessionStorage.removeItem('userData');
    }

    return (
        <div className={className}>
            <RightAligned>
                
                    
                    {!roleId ? (
                        <Button>
                            <Link to="/login">Войти</Link>
                        </Button>
                    ) : (
                        <>
                            <UserName>{login}</UserName>                   
                                <Icon 
                                    id="fa-sign-out" 
                                    margin="0 0 0 10px" color="#007889"
                                    onClick = {onLogout}
                                    
                                 />
                        </>
                    )}
        
            </RightAligned>
            <RightAligned>
                
                    <Icon id="fa-backward" margin="10px 0 0 0" onClick = {() => navigate(-1)}/>
                
                
                <Link to="/post"><Icon id="fa-file-text-o" margin="10px 0 0 17px" color="#007889"/></Link>
                <Link to="/users"><Icon id="fa-users" margin="10px 0 0 17px" color="#007889"/></Link>
                

            </RightAligned>

        </div>    
    );    

};

export const ControlPanel = styled(ControlPanelContainer)`

`;
