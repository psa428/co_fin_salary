import { getMenu } from "../api";
import { sessions } from "../sessions";

export const fetchMenu = async (roleId) => {
    
    const menuItems = await getMenu(roleId);
    
    return {
        error:  null,
        res:    menuItems,
    };
};