import { logout, fetchRoles, fetchUsers, authorize, register, updateUserRole, removeUser } from "./operations";


export const server = {
    authorize,
    logout,
    register,
    fetchUsers,
    fetchRoles, 
    updateUserRole,
    removeUser,
    
};
