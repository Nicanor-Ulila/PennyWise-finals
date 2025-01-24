import React from 'react';
import logo_trans from './../assets/images/logo_trans.png';

function Background() {
  return (
    <div className="fixed inset-0 w-full min-h-screen bg-[#435585]">
      <header className="flex items-center pl-10 pt-6">
        <img src={logo_trans} className="w-[230px]" alt="Logo" />
       
      </header>
    </div>
  );
}

export default Background;
