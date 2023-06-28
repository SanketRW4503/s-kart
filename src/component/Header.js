import shopicon from '../../assets/images/shop-icon.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import store from '../utility/store';
import cartbag from '..//../assets/images/cart-bag.png'
import { ToastContainer, toast } from 'react-toastify';
import Profile_Icon from '../../assets/images/profile-icon.png'
import { setLoginStatus } from '../utility/loginSlice';
import { setUser } from '../utility/userSlice';
import { addItem } from '../utility/cartSlice';
import { get_data_from_cart } from '../utility/constants';
import { GET_ALL_CATEGORY } from '../utility/constants';
import { All_PRODUCTS } from '../utility/constants';
import { storeData } from '../utility/dataSlice';
import Slider from './Slider';
import SearchBar from './SearchBar';
import { storeCategory } from '../utility/categorySlice';

export default function Header() {

  const [menucss, setMenuCSS] = useState({});
  const [menustatus, setMenuStatus] = useState(false);
  const cartData = useSelector(store => store.cart.totalItems);
  const loginStatus = useSelector(store => store.login.status);
  const location = useLocation()
  const dispatch = useDispatch()

  const stored_data = useSelector(store => store?.products?.items);

  const storedCategory = useSelector(store=>store?.category?.items)

  
    // fetching all category from api
    async function getAllCategory() {

      try {
          const res = await fetch(GET_ALL_CATEGORY,
              {
                  method: 'GET', withCredntials: true,
                  credentials: 'include'
              });
          const json = await res.json()
          console.log(json)

          dispatch(storeCategory(json.allcollection))
          console.log(storedCategory)
      } catch (error) {
          console.log('s' + error);
      }


  }

useEffect(()=>{
  getAllCategory()
},[])

  // fetching data from api
  async function getAllProduct() {

    try {
      const res = await fetch(All_PRODUCTS, {

        method: 'GET', withCredntials: true,
        credentials: 'include'
      });
      const json = await res.json()

      dispatch(storeData(json.items))

    } catch (error) {

      console.log('s' + error);
    }


  }

  useEffect(() => {
    if (stored_data.length == 0) {
      getAllProduct()
      console.log(location);
    }


  }, [stored_data]);


  // check user login or not if login save his info to store
  const userStore = useSelector(store => store.user.userdata)
  async function getCurrentUserInfo() {

    const res = await fetch('https://s-kart-backend.onrender.com/user/myProfile', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    const json = await res.json()
    console.log(json);

    if (json.success == true) {
      dispatch(setUser(json))

      dispatch(setLoginStatus(true))
      getDataFromCart(json.profile._id)
    }
  }

  // this function will return user cart data 
  async function getDataFromCart(userid) {
    let dataset = { userid: userid }
    dataset = JSON.stringify(dataset);
    try {

      const res = await fetch(get_data_from_cart, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: dataset
      })

      const json = await res.json()
      json.items.length > 0 ? json.items.map((i) => {
        for (let k = 0; k < i.quantity; k++) {
          dispatch(addItem(i))

        }
      }) : null

    } catch (error) {
      console.log(error);
    }

  }


  useEffect(() => {
    if (userStore.length == 0) {
      getCurrentUserInfo();
  
    }
  }, [])

  // end check user function 


  //Hamburger Logic : it helps to hide and show menu 
  function menuFunction() {
    setMenuStatus(!menustatus);
    if (menustatus == true) {
      setMenuCSS({
        display: 'block'
      });
    } else {
      setMenuCSS({
        display: 'none'
      });
    }
  }

  return (
    <div className='mb-[30px]'>
      <nav className='px-4 py-4 flex justify-between items-center bg-slate-100  shadow scroll-smooth' id='nav'>
        <div className='flex justify-between  max-[650px]:block '>
          <div className='flex items-center'>
            <img src={shopicon} width={50} height={50} className='w-[50px] h-[50px] transition-all duration-500'/>
            <Link to={'/'}><h1 className='font-semibold text-[40px] max-[1100px]:text-[30px] italic'>S-Kart.IN</h1></Link>
          </div>

        </div>
        <div className='hidden min-[940px]:flex items-center'>
      <SearchBar className='' />
      </div>
        <ul className='flex max-[940px]:flex-col items-center max-[940px]:hidden max-[940px]:fixed max-[940px]:right-[0px] 
              max-[940px]:top-[0px] max-[940px]:bottom-[0px] z-[100] max-[940px]:left-[55%] max-[940px]:justify-center  max-[940px]:p-[20px] max-[940px]:bg-slate-200 max-[940px]:transition-all duration-1000
              ' style={menucss} >
          <span className='text-[20px] font-semibold min-[940px]:hidden' onClick={() => menuFunction()}>&#10005;</span>
          <Link to='/'><li className='px-4 max-[940px]:mt-[50px] text-[20px] hidden max-[940px]:flex '>Home</li></Link>

          {
            loginStatus == false ?
              <Link to={'/login'} ><li className='px-4 max-[940px]:mt-[50px] text-[20px]'>Login</li></Link>
              :<Link to={'/myProfile#openorder'}> <li className='px-4 max-[940px]:mt-[50px] text-[20px]   hidden max-[940px]:flex' >Orders</li></Link>

          }

          {
            loginStatus != false ?
              <Link to={'/myProfile'}> <li className='px-4 max-[940px]:mt-[50px] text-[20px] hidden max-[940px]:flex ' >My Profile</li></Link>
              : <Link to={'/signup'}><li className='px-4 max-[940px]:mt-[50px] text-[20px]' >Sign up </li></Link>
          }
          <Link to='/about'><li className='px-4 max-[940px]:mt-[50px] text-[20px] hidden max-[940px]:flex'>About us</li></Link>
          <Link to='/contact'><li className='px-4 max-[940px]:mt-[50px] text-[20px] hidden max-[940px]:flex'>Contact us</li></Link>

          <Link to={'/cart'}><img src={cartbag} className='w-[40px] mr-[10px] z-4 max-[940px]:hidden' /></Link>
          <Link to={'/cart'}>  <span className='relative left-[-34px] top-[5px] text-[15px]  z-[20] cursor-pointer max-[940px]:hidden'>{cartData}</span></Link>

          {
            loginStatus != false ?
              <Link to={'/myProfile'}> <img src={Profile_Icon} className='w-[30px] mr-[10px] z-4 max-[940px]:hidden' /> </Link>
              : null
          }


        </ul>

        <div className=' hidden max-[940px]:flex max-[940px]:items-center'>
          <Link to={'/cart'}><img src={cartbag} className='w-[40px] mr-[10px] z-4' /></Link>

          <Link to={'/cart'}>  <span className='relative left-[-34px] top-[5px] text-[15px]  z-[20]  cursor-pointer'>{cartData}</span></Link>

          <span onClick={() => menuFunction()} className='text-[25px] cursor-pointer'>&#9776;</span>


        </div>

      </nav>
      <ToastContainer />
      {
        location.pathname=='/'?<Slider/>:null
      }

<div className='hidden max-[940px]:flex items-center justify-center'>
      <SearchBar className='' />
      </div>
    </div>
  )
}
