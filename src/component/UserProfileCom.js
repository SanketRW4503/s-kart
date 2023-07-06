import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from '../utility/store'
import { setUser } from '../utility/userSlice'
import {  toast } from 'react-toastify'
import { setLoginStatus } from '../utility/loginSlice'
import { useNavigate } from 'react-router-dom'
import EditProfileForm from './EditProfileForm'
import { useState } from 'react'
import AdressCom from './AdressCom'
import Orders_Com from './Orders_Com'

export default function UserProfileCom() {


  let userStore = useSelector(store => store.user.userdata)
  const [updatetoggle, setUpdateToggle] = useState(false)
  let navigate = useNavigate()
  let dispatch = useDispatch()

  async function getCurrentUserInfo() {

    const res = await fetch(process.env.REACT_APP_USER_PROFILE, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const json = await res.json()
    dispatch(setUser(json))
  }



  // logout user
  async function logoutUser() {
    toast.loading('logging out...');

    const res = await fetch(process.env.LOG_OUT_USER, {
      method: 'GET', withCredntials: true,
      credentials: 'include'
    });

    const json = await res.json()

    if (json.success == true) {
      toast.dismiss();

      dispatch(setLoginStatus(false))
      navigate("/")
      toast.success('log out successfully');

    } else {
      toast.dismiss();
      toast.error(json.message);

    }

  }

 

  useEffect(() => {
    getCurrentUserInfo();
  }, [updatetoggle])

  useEffect(() => {
    if (userStore.length == 0) {
      getCurrentUserInfo();
    }
  }, [updatetoggle])

  return (


    <div className='m-[50px] flex flex-col  '>
      <h1 className=' font-semibold text-[40px]' >{userStore?.profile?.firstname} {userStore?.profile?.lastname}</h1>




      <div className=" px-5 bg-white ">

        <div className="grid divide-y divide-neutral-200  mt-8">
          {/* orders */}
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> Orders</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <Orders_Com className="text-neutral-600 mt-3 group-open:animate-fadeIn flex flex-col items-center" getCurrentUserInfo={getCurrentUserInfo}/>
             
            </details>
          </div>
          {/* edit profile */}
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> Edit Profile</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <EditProfileForm className="text-neutral-600 mt-3 group-open:animate-fadeIn" setUpdateToggle={setUpdateToggle} updatetoggle={updatetoggle} />




            </details>
          </div>
          <div className="py-5">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span> Address</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <AdressCom className="text-neutral-600 mt-3 group-open:animate-fadeIn" 
              setUpdateToggle={setUpdateToggle} updatetoggle={updatetoggle}  cartpage={false} />
            </details>
          </div>


          <button onClick={() => logoutUser()}
            className='my-[20px] bg-theme hover:bg-darktheme text-center text-t-theme rounded-lg px-10 py-2 '
          >Log Out</button>
        </div>
      </div>


    </div>
  )
}
