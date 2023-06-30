import React, { useEffect, useState } from 'react';
import { Link, Router, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useOnline from '../utility/useOnline';
import ShimmerCard from './ShimmerCard';
import slidebtn from '../../assets/images/next.png'

export default function Slider() {

    const online = useOnline()
    const [slide, setSlide] = useState(0)
    const [banner, setBanner] = useState([])


    const [slideStyle, setSlideStyle] = useState({
        transform: 'translate(0px)'
    })
    const navigate = useNavigate()

   

    function handlenext(){
        if(banner.length-1>slide){
        setSlide(slide+1);
        }else{
            setSlide(0)
        }
    }

    function handleprev(){
        if(slide==0){
            setSlide(banner.length-1)

        }else{
            setSlide(slide-1);

        }
    }

    async function getAllCarousel() {
        try {
            const res = await fetch('https://s-kart-backend.onrender.com/carousel/get-all-banner', {
                method: 'GET', withCredntials: true,
                credentials: 'include'
            })
            const json = await res.json()
            if (json.success == true) {
                setBanner(json.all_banners)

                
            } else {
                console.log('could not fetch carousel');
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getAllCarousel()
    }, [])


    


    if (!online) return null
    if (banner.length == 0) { return <div className=' h-[550px] max-[700px]:h-[400px] top-4 animate-pulse max-[500px]:h-[250px] bg-slate'></div> }
    return (
        <div id='slider-div'
            className='overflow-hidden h-[550px]  max-[700px]:h-[400px] max-[500px]:h-[250px]     
                duration-500   z-4 transition-all z-0 w-full flex justify-between items-center relative cursor-pointer  '>
                
                {
                   <img src={banner[slide].imageUrl}
                    onClick={()=>
                        navigate('/details/'+banner[slide].product_id)
                    }
                        className=' w-full h-full'
                       />

      
                }

            


            <img onClick={handleprev} src={slidebtn}
                className='rotate-[180deg] mix-blend-multiply shadow-2xl rounded-[50%] w-[35px] h-[35px] text-[20px] flex justify-center items-center absolute left-2 top-[45%]'/>

            <img onClick={handlenext}src={slidebtn}
                className=' rounded-[50%]  mix-blend-multiply w-[35px] h-[35px] text-[20px] flex justify-center items-center absolute right-2 top-[45%]  '/>

           

        </div>
    );
}
