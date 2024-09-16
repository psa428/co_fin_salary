import {  TableRow } from "./components";
import { Content } from "../../components";

import { UserRow } from "./components";
// import { server } from "../../bff/server";
import { useServerRequest } from "../../hooks"; 

import { useEffect, useState } from "react";
import styled from "styled-components";
import { ROLE } from "../../bff/constants";

const UsersContainer = ({ className }) => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const requestServer = useServerRequest();
    const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);


    useEffect(() => {
        Promise.all([
            requestServer('fetchUsers'), 
            requestServer('fetchRoles'),
        ]).then(([usersRes, rolesRes]) => {
            if (usersRes.error || rolesRes.error) {
               
                setErrorMessage(usersRes.error || rolesRes.error);
                return;
            };
            setUsers(usersRes.res);
            setRoles(rolesRes.res);
            
        });
       
    }, [requestServer, shouldUpdateUserList]);

    const onUserRemove = (userId) => {
        requestServer('removeUser', userId).then(() => {    
            setShouldUpdateUserList(!shouldUpdateUserList);

        })
    };



    return (
        <div className={className}>
            <Content error={errorMessage}>
            <h2>Пользователи</h2>
            <div>
                <TableRow>
                    <div className="login-column">Логин</div>
                    <div className="registred-at-column">Дата регистрации</div>
                    <div className="role-column">Роль</div>
                </TableRow>
                
                    
 
                {users.map(({ id, login, registredAt, roleId }) => (
                    <UserRow 
                        key={id} 
                        id={id}
                        login={login} 
                        registredAt={registredAt} 
                        roleId={roleId}  
                        roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
                        onUserRemove={() => onUserRemove(id)}
                    />    
                ))}  

            </div>    
            </Content>
            
        </div>    
    );

}

export const Users = styled(UsersContainer)`
    display:    flex;
    flex-direction: column;  
    align-items:   center;
    margin: 0   auto;
    width:  570px;
    front-size: 18px;

`;