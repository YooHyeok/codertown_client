import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

/* 컴포넌트 */
import Header from './component/info/Header';
import Footer from './component/info/Footer';
import Main from './component/main/Main';
import Coggle from './component/coggle/Coggle';
import CoggleDetail from './component/coggle/CoggleDetail';
import CoggleWrite from './component/coggle/CoggleWrite';
import CoggleEdit from './component/coggle/CoggleEdit';
import Cokkiri from './component/recruit/cokkiri/Cokkiri';
import CokkiriDetail from './component/recruit/cokkiri/CokkiriDetail';
import CokkiriWrite from './component/recruit/cokkiri/CokkiriWrite';
import CokkiriEdit from './component/recruit/cokkiri/CokkiriEdit';
import Mammoth from './component/recruit/mammoth/Mammoth';
import MammothDetail from './component/recruit/mammoth/MammothDetail';
import MammothWrite from './component/recruit/mammoth/MammothWrite';
import MammothEdit from './component/recruit/mammoth/MammothEdit';
import DirectMessengerButton from './component/DirectMessengerButton';
import MyPage from './component/mypage/MyPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <InitScroll />
        <Header/>
        <DirectMessengerButton/>
        <Routes>
              <Route exact path='/' element={<Main />} />
              <Route exact path='/coggle' element={<Coggle />} />
              <Route exact path='/coggle-write' element={<CoggleWrite />} />
              <Route exact path='/coggle-detail/:coggleNo' element={<CoggleDetail />} />
              <Route exact path='/coggle-edit' element={<CoggleEdit />} />
              <Route exact path='/cokkiri' element={<Cokkiri />} />
              <Route exact path='/cokkiri-write' element={<CokkiriWrite />} />
              <Route exact path='/cokkiri-detail/:cokkiriNo' element={<CokkiriDetail />} />
              <Route exact path='/cokkiri-edit' element={<CokkiriEdit />} />
              <Route exact path='/mammoth' element={<Mammoth />} />
              <Route exact path='/mammoth-write' element={<MammothWrite />} />
              <Route exact path='/mammoth-detail/:mammothNo' element={<MammothDetail />} />
              <Route exact path='/mammoth-edit' element={<MammothEdit />} />
              <Route exact path='/mypage' element={<MyPage />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

function InitScroll() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 후 스크롤 위치를 맨 위로 이동
  }, [location]);

}

export default App;
