import  { useEffect } from 'react'
import { toast } from 'react-toastify'

export default function VerificationCom() {


  useEffect(()=>{
    toast.dismiss();
  },[])

  return (
    <div className='m-[auto] h-[500px] flex flex-col justify-center items-center'>
        <h1 className='font-semibold text-[25px]'>Account Verification Link is sent to your email address !</h1>
        <h2>Please Check Your Mail Index !</h2>

    </div>
  )
}
