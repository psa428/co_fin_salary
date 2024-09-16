export const transformUser = (dbUser) => ({
    
    id: dbUser.id,
    login:  dbUser.login,
    password:   dbUser.password,
    registredAt:    dbUser.registred_at,
    roleId: dbUser.role_id,
    kdateLpu:   dbUser.kdate_lpu,
    kdlpu:  dbUser.kdlpu,
    userName:   dbUser.user_name 
});