import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/Navigation';
import { asyncUnsetAuthUser} from './states/authUser/action';
// import { asyncSetAuthUser } from './states/authUser/action';
import Leaderboards from './pages/Leaderboards';

function App() {
  const { authUser} = useSelector((states) => states);
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <div className="app-container">
      <header>
        <Navigation authUser={authUser} signOut={onSignOut} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Leaderboards" element={<Leaderboards />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;