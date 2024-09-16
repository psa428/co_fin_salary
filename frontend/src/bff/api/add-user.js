import { generateDate } from '../utils';


export const addUser = (login, password) => 
     fetch('http://localhost:3005/users', {
                method: 'POST',
                headers:    {
                    'Content-Type':  'application/json;charset=utf-8',
                },
                body:   JSON.stringify({
                    login:  login,
                    password:  password,
                    registred_at:   generateDate(),
                    role_id:    1,
                    kdate_lpu:  null,
                    kdlpu:  null,
                    user_name:  null
                }),
        }).then((createdUser) => createdUser.json());
