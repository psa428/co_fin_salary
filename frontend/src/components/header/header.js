// import { Logo } from './components/logo_delete/logo';        //'./components/logo/logo';
import { ControlPanel } from './components/control-panel/control-panel';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Discription = styled.div`
  color: #007988;
    font-family: arial;
    font-size: 182%;
    
    text-align: center;

`;

const HeaderContainer = ({ className }) => (
    <header className={className}>
      
      <Link to="/">
        <img src="https://kemoms.ru/img/logo_horizontal.png" width="220" height="80"  alt='logo' />
      </Link>
        {/* <Logo /> */}
        <Discription>
          Учет заявок медицинских организаций<br /> на софинансирование заработной платы
        </Discription> 
        <ControlPanel />
      </header>
  );

  export const Header = styled(HeaderContainer)`
    display:  flex;
    justify-content:  space-between;
    position: fixed;
    top:  0;
    width:  1000px;
    height: 120px;
    padding: 20px 40px; 
    background-color: #fff;
    box-shadow: 0px -2px 17px #007889;
    z-index:  10;
`;
  