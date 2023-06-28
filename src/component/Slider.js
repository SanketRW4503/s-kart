import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Slider() {

    const [slidetoshow, setSlidetoShow] = useState(0)
    const [banner, setBanner] = useState([])
    const navigate = useNavigate()

    function handlenext() {
        if (slidetoshow !== banner.length - 1) {
            setSlidetoShow(slidetoshow + 1)
        } else {
            setSlidetoShow(0)
        }
    }
    function handleprev() {
        if (slidetoshow !== 0) {
            setSlidetoShow(slidetoshow - 1)
        } else {
            setSlidetoShow(banner?.length - 1)
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


    if (banner == []) return null
    return (
        <div className='relative'>
        <div onClick={() => {
            navigate('/details/'+banner[slidetoshow]?.product_id);
          }}
        
        className=' h-[550px] max-[700px]:h-[400px] max-[500px]:h-[250px] z-0 w-full  relative p-[6]  cursor-pointer'>
        
            <img src={banner[slidetoshow]?.imageUrl}   
                className='w-full h-full  duration-500  cursor-pointer z-4'/>

        </div>
      
                <button onClick={handleprev} 
                className='bg-white rounded-[50%] w-[35px] h-[35px] text-[20px] flex justify-center items-center absolute left-2 top-[45%]'>&lt;</button>

                <button onClick={handlenext} 
                className='bg-white rounded-[50%] w-[35px] h-[35px] text-[20px] flex justify-center items-center absolute right-2 top-[45%] '>&gt;</button>
     
     </div>
    );
}
