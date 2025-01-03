import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  if (authUser) {
    navigate('/');
  }

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1><IoEarthOutline /></h1>
      </header>
      <article className="login-page__main">
        <h2>
          See
          {' '}
          <strong>The World</strong>
          ,
          {' '}
          <br />
          Through Open Space.
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
