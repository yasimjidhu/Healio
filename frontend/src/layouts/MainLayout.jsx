import React from 'react';
import { Navbar } from '../components/Navbar';


const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1">
        <Navbar />
        <main className="p-4 mt-2">{children}</main> 
      </div>
    </div>
  );
};

export default MainLayout;
