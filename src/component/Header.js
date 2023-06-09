import shopicon from '../../assets/images/shop-icon.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store from '../utility/store';
import cartbag from '..//../assets/images/cart-bag.png'

export default function Header() {


  const cartData = useSelector(store => store.cart.totalItems);
  const [menucss, setMenuCSS] = useState({})
  const [menustatus, setMenuStatus] = useState(false)

  useEffect(() => {
    if (menustatus === true) {
      setMenuCSS({
        display: 'block'
      });
    } else {
      setMenuCSS({
        display: 'hidden'
      });
    }
  }, [menustatus])

  return (
    <nav className='px-4 py-4 flex justify-between items-center bg-gray-100 mb-4 shadow'>
      <div className='flex justify-between  max-[650px]:block '>
        <div className='flex items-center'>
          <img src={shopicon} width={50} height={50} className='w-[50px] h-[50px]' />
          <Link to={'/'}><h1 className='font-semibold text-[40px] max-[1100px]:text-[30px] italic'>S-Kart.IN</h1></Link> 
        </div>

      </div>

      <ul className='flex max-[940px]:flex-col items-center max-[940px]:hidden max-[940px]:fixed max-[940px]:right-[0px] 
              max-[940px]:top-[0px] max-[940px]:bottom-[0px] z-[100] max-[940px]:left-[55%] max-[940px]:justify-center  max-[940px]:p-[20px] max-[940px]:bg-slate-200 max-[940px]:transition-all duration-1000
              ' style={menucss} >
        <span className='text-[20px] font-semibold min-[940px]:hidden' onClick={() => setMenuStatus(!menustatus)}>&#10005;</span>
        <Link to='/'><li className='px-4 max-[940px]:mt-[50px] text-[20px] '>Home</li></Link>
       
        <li className='px-4 max-[940px]:mt-[50px] text-[20px]'>Offers</li>
       <Link to={'/about'}><li className='px-4 max-[940px]:mt-[50px] text-[20px]'>About us</li></Link> 
        <Link to={'/contact'} ><li className='px-4 max-[940px]:mt-[50px] text-[20px]'>Contact us</li></Link>

        <Link to={'/cart'}><img src={cartbag} className='w-[40px] mr-[10px] z-4 max-[940px]:hidden' /></Link>
        <Link to={'/cart'}>  <span className='relative left-[-34px] top-[5px] text-[15px]  z-[20] cursor-pointer max-[940px]:hidden'>{cartData}</span></Link>
      </ul>

      <div className=' hidden max-[940px]:flex max-[940px]:items-center'>
        <Link to={'/cart'}><img src={cartbag} className='w-[40px] mr-[10px] z-4' /></Link>
        <Link to={'/cart'}>  <span className='relative left-[-34px] top-[5px] text-[15px]  z-[20]  cursor-pointer'>{cartData}</span></Link>
        <span onClick={() => setMenuStatus(!menustatus)} className='text-[25px] cursor-pointer'>&#9776;</span>
      </div>
    </nav>
  )
}
