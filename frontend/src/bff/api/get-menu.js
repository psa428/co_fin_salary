import { transformMenu } from "../transformers";

export const getMenu = (roleId) =>
     // fetch(`http://localhost:3001/menu?role_id=${roleId}`).then((loadedMenuItems) => loadedMenuItems.json())
     //      .then((loadedMenuItems) => loadedMenuItems);// && loadedMenuItems.map(transformMenu));

     fetch(`http://localhost:3000/menu/${roleId}`).then((loadedMenuItems) => loadedMenuItems.json())
          .then((loadedMenuItems) => loadedMenuItems);// && loadedMenuItems.map(transformMenu));