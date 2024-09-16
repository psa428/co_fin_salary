import { transformMenu } from "../transformers";

export const getMenu = (roleId) =>
     fetch(`http://localhost:3005/menu?role_id=${roleId}`).then((loadedMenuItems) => loadedMenuItems.json())
          .then((loadedMenuItems) => loadedMenuItems);// && loadedMenuItems.map(transformMenu));