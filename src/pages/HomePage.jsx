import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function HomePage() {
  const {
    authUser,
  } = useSelector((states) => states); 

  return (
    <section className="home-page">
      <h1>This is Home!</h1>
    </section>
  );
}

export default HomePage;