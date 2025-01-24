import React from 'react'
import RegisterCard from '../Components/RegisterCard'
import Background from '../Components/Background'

function Register() {
  return (
    
    <div className='relative h-screen w-screen'> 
        console.log('hello world');
        {/* Background */}
        <Background/>


        {/* Register Card */}
        <div className='relative z-10'>
            <RegisterCard/>
        </div>
    </div>
  )
}

export default Register
