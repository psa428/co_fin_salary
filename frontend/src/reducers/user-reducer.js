import { ACTION_TYPE } from '../actions';
import { ROLE } from '../bff/operations/constants/role';

const initialUserState = {
    id: null,
    login:  null,
    roleId: null,
    kdateLpu:  null,
    kdlpu:  null,
    userName:  null,
    session:    null,

};

export const userReducer = (state = initialUserState, action) => {
    
    switch (action.type) {
        case ACTION_TYPE.SET_USER: {
            
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id,
                roleId: action.payload.roleId,
                kdateLpu:  action.payload.kdateLPu,
                kdlpu:  action.payload.kdlpu,
                userName:  action.payload.userName,
                session:    action.payload.session

            }
        }
        case ACTION_TYPE.LOGOUT: {
            
 
            return initialUserState;
        }

        default:
            return state;
    }
       
};