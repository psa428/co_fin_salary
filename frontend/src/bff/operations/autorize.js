import { getUser } from "../api";
import { sessions } from "../sessions";

export const authorize = async (authLogin, authPassword) => {
        
    const user = await getUser(authLogin);

    if (!user) {
        return {
            error: 'Пользователь не найден',
            res:    null,
        };
    };



    const { id, login, password, roleId, kdateLpu, kdlpu, userName} = user;
    
    if (authPassword !== user.password) {
        return {
            error: 'Неверный пароль',
            res:    null,
        };
    };
    
    return {
        error:  null,
        res:    {
            id,
            login,
            roleId,
            kdateLpu,
            kdlpu,
            userName,
            session: sessions.create(user),   
        },  
    };      
          
   
};