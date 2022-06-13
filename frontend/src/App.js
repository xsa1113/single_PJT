import logo from './logo.svg';
import './App.css';
import Login from './component/Login/Login';
import BootstrapLogin from './component/Login/BootstrapLogin';
import Main from './component/Main/Main';
import Page404 from './component/Page404';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Main></Main>}></Route>
                <Route index path="/login" element={<BootstrapLogin></BootstrapLogin>}></Route>
                <Route index path="/*" element={<Page404></Page404>}></Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default App;
