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
            console.log('in userReducer action = ', action)
            
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id,
                roleId: action.payload.roleId,
                kdateLpu:  action.payload.kdateLpu,
                kdlpu:  action.payload.kdLpu,
                userName:  action.payload.nameUser,
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