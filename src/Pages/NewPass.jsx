import React from 'react'
import NewPassCard from '../Components/NewPassCard'
import Background from '../Components/Background'

function NewPass() {
  return (
    
    <div className='relative h-screen w-screen'> 
        console.log('hello world');
        {/* Background */}
        <Background/>


        {/* Register Card */}
        <div className='relative z-10'>
            <NewPassCard/>
        </div>
    </div>
  )
}

export default NewPass;
