import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'

export default function Payment_Success_Page() {

  const params = useParams()

  const userdata = useSelector(store => store.user.userdata)

  useState(()=>{
    console.log(userdata);
    clearCart()
  },[])

  async function clearCart(){


    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div >
        <Confetti 
        width={innerWidth} height={innerHeight} gravity={0.58} friction={0.99} tweenDuration={5000} recycle={false}/>
        <div className='flex justify-center flex-col items-center h-[500px]'>
            <h1 className=' text-[40px] font-semibold '>Order Confirmed !</h1>
            <p className='text-gray-400'>Order Id:{params.id}</p>
            <button className='bg-blue-500 mt-[50px] text-white px-[10px] rounded-md py-[5px]'>Go to Orders</button>
        </div>
  
    </div>
  )
}
