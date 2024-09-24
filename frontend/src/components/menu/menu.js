import { useServerRequest } from "../../hooks"; 
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";


const MenuContainer = ({ className }) => {
    
    const [errorMessage, setErrorMessage] = useState(null);
    const [menuItems, setMenuItems] = useState(null);
    const requestServer = useServerRequest();
    
    let roleId = useSelector(selectUserRole)
    
    useEffect(() => {
        // Promise.all([
        //     requestServer('fetchMenu'), 
            
        // ]).then((menuRes) => {
        if (roleId) {    
            requestServer('fetchMenu', roleId).then((menuRes) => {
                
                if (menuRes.error) {
                    
                    setErrorMessage(menuRes.error);
                    return;
                };
                
                setMenuItems(menuRes.res.data);
               
            });
        
        }    
        else
            setMenuItems(null) ;
    }, [requestServer, roleId]);

    return (
        <div className={className}>
            {/* <Content error={errorMessage}> */}
            
            {menuItems ?
           
            <div className="menu-items">
                <h2>Меню</h2>
               <ul>
                { 
                menuItems.map((item, index) => 
                     
                    <li className="menu-item" key={index}>
                        <Link to={`${item.path}`}>
                            {item.menu_item}
                        </Link>
                    </li>
                
                  
                )}  
                </ul>

            </div>
            : <></> 
            
                }   
            {/* </Content> */}
            
        </div>    
    );

}

export const Menu = styled(MenuContainer)`
    display:    flex;
    flex-direction: column;  
    align-items:   center;
    margin: 0   auto;
    width:  570px;
    front-size: 28px;

    & .menu-item {
        margin: auto auto 10px;
        font-size:  large;color:  #007879
    }
    & a {
        color:  #007879
        
    }    



`;