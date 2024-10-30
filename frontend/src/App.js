import { Routes, Route } from 'react-router-dom';

 import { Header} from './components';
 import { useDispatch, useSelector } from 'react-redux';
 import { Post } from './pages/post/post';
 import { InfYear, MonthInf, MonthInfEdit, StaffInf, StaffInfEdit,  NssInfEdit } from './pages';
 import { Autorization, Registration, Users, NssInf } from './pages';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { setUser } from './actions';
import { selectUserName } from './selectors';
import { Menu } from './components';
import { YearInfEdit } from './pages/year-inf-edit/year-inf-edit';


const AppColumn = styled.div`
  display:  flex;
  flex-direction: column;
  justify-content:  space-between;
  width:  1000px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
  
`;

const Page = styled.div`
  padding:  120px 0 20px;
  
`;

const H2 = styled.h2`
  text-align:  center;
`;


const Footer = () => <div>Футер</div>;

const StyleHeader = styled(Header)`
  height: 120px;
`;

function App() {
  const dispatch = useDispatch();


  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');
   
    if (!currentUserDataJSON) { 
      return;
    };

    const currentUserData = JSON.parse(currentUserDataJSON);
    
    dispatch(setUser({
      ...currentUserData,
      roleId: Number(currentUserData.roleId),
    })
    ); 

  }, [dispatch]);

   const currentUserName = useSelector(selectUserName);
   
  return (
    <AppColumn>
      
      <StyleHeader />
      <Page>
      
          <H2>{currentUserName}</H2>
          
          <Routes>
            <Route path='/' element={<Menu />} />
            {/* <Route path='/' element={<div>Главная страница</div>} /> */}
            <Route path='/login' element={<Autorization />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/year_inf' element={<InfYear />} />
              <Route path='/year_inf/:id' element={<YearInfEdit />} />
              <Route path='/year_inf/:id/:kdate_lpu/:kdlpu' element={<YearInfEdit />} />
              
            <Route path='/month_inf' element={<MonthInf />} />  
              <Route path='/month_inf/:id' element={<MonthInfEdit />} />
              <Route path='/month_inf/:id/:kdate_lpu/:kdlpu/:year_f' element={<MonthInfEdit />} />

            <Route path='/users' element={<Users />} />
            
            <Route path='/staff_inf' element={<StaffInf />} />
              <Route path='/staff_inf/:id' element={<StaffInfEdit />} />
              <Route path='/staff_inf/:id/:kdate_lpu/:kdlpu/:year_f/:month_f' element={<StaffInfEdit />} />
            <Route path='/month_nss' element={<NssInf />} />
              <Route path='/month_nss/:id' element={<NssInfEdit />} />
              <Route path='/month_nss/:id/:kdate_lpu/:kdlpu/:year_f' element={<NssInfEdit />} />

            <Route path='/post/:id' element={<Post />} />
            <Route path='*' element={<div>Ошибка</div>} />


          </Routes>
      </Page>
      <Footer />
    
    </AppColumn>
  );
}

export default App;
