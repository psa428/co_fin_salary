import { ACTION_TYPE } from "./action-type";
import { server } from "../bff/server-del";

export const logout = (session) => {
    server.logout(session);

   
    return  {
        type:   ACTION_TYPE.LOGOUT,
    }
    
   

}