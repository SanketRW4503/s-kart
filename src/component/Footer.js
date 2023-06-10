import twitter from '..//../assets/images/twitter.png'
import instagram from '..//../assets/images/instagram.png'
import facebook from '..//../assets/images/facebook.png'
import { Link } from 'react-router-dom'



export default function Footer() {
        return (

                <footer className='bg-black text-white m-[auto] flex flex-col p-[20px] items-center justify-center'>
                        <ul className='flex  justify-center pt-8'>
                                <li><a href='https://www.linkedin.com/in/sanket-r-waghmare-a07711208/'><img src={twitter} width={50} className='rounded-[10px] mx-4 cursor-pointer ' /></a></li>
                                <li><a href='https://www.linkedin.com/in/sanket-r-waghmare-a07711208/'><img src={instagram} width={50} className='rounded-[10px]  mx-4 cursor-pointer' /></a></li>
                                <li><a href='https://www.linkedin.com/in/sanket-r-waghmare-a07711208/'><img src={facebook} width={50} className='rounded-[10px]  mx-4 cursor-pointer' /> </a></li>
                        </ul>
                        <ul className='flex  justify-center pt-8'>
                                <Link to={'/about'}><li className='mx-[10px]  underline text-[12px] cursor-pointer'>About us</li></Link>
                                <Link to={'/contact'} ><li className='mx-[10px]  underline text-[12px] cursor-pointer'>Contact us</li></Link>
                                <li className='mx-[10px]  underline text-[12px] cursor-pointer ' >Privacy Policy</li>
                         </ul>
                        <p className='flex justify-center pt-4 text-[15px] text-gray-400'> &#169; Copyrights Reserved 2023 </p>

                </footer>

        )
}
