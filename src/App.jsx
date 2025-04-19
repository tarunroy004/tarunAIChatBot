// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';  // Create a simple Home.jsx if needed
import Login from './pages/Login';
import Verify from './pages/Verify';
import { UserData } from './context/UserContext';
import { LoadingSpinnerBig } from './components/loading';

const App = () => {
const { user, isAuth, loading } = UserData();

    return (
        <>
            { loading? <LoadingSpinnerBig/> : <BrowserRouter>
                <Routes>
                    <Route path="/" element={ isAuth? <Home /> : <Login /> } />
                    <Route path="/login" element={ isAuth? <Home /> : <Login /> } />
                    <Route path="/verify" element={ isAuth? <Home /> : <Verify /> } />
                </Routes>
            </BrowserRouter>}
        </>
    );
};

export default App;



// 2:44:36