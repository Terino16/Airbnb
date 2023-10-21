import React from 'react';
import Navbar from '../src/components/navbar/Navbar'
import Container from './components/Container';
const Layout = ({ children }) => {
  return (
    <div className=''>
<Navbar/>
<Container>
  {children} 
  </Container> 
    </div>
  );
};

export default Layout;
