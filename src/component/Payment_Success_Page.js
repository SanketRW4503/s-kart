import  { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'

export default function Payment_Success_Page() {

  const params = useParams()

  const userdata = useSelector(store => store.user.userdata)

  useState(() => {
    console.log(userdata);
    clearCart()
  }, [])

  async function clearCart() {


    try {

    } catch (error) {

    }
  }

  return (
    <div >
      <Confetti
        width={innerWidth} height={innerHeight} gravity={0.58} friction={0.99} tweenDuration={5000} recycle={false} />
      <div className='flex justify-center flex-col items-center h-[500px]'>
        <h1 className=' text-[40px] font-semibold '>Order Confirmed !</h1>
        <p className='text-gray-400'>Order Id:{params.id}</p>
        <Link to='/myProfile'><button className='bg-theme hover:bg-darktheme mt-[50px] text-t-theme px-[10px] rounded-md py-[5px]'>Go to Orders</button></Link>
      </div>

    </div>
  )
}
