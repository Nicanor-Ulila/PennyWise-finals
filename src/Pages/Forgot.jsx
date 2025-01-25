import React from 'react'
import ForgotCard from '../Components/ForgotCard'
import Background from '../Components/Background'

function Forgot() {
  return (
    
    <div className='relative h-screen w-screen'> 
        console.log('hello world');
        {/* Background */}
        <Background/>


        {/* Forgot Card */}
        <div className='relative z-10'>
            <ForgotCard/>
        </div>
    </div>
  )
}

export default Forgot;
