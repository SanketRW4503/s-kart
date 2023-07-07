import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOnline from '../utility/useOnline';

import slidebtn from '../../assets/images/next.png'

export default function Slider() {

    const online = useOnline()
    const [slide, setSlide] = useState(0)
    const [banner, setBanner] = useState([])
    const [temp, setTemp] = useState('')

    const navigate = useNavigate()



    function handleprev() {
        if (slide == 0) {
            setSlide(banner.length - 1)

        } else {
            setSlide(slide - 1);

        }
    }

    function handlenext() {

        if (banner.length - 1 > slide) {
            setSlide(slide + 1);
        } else {
            setSlide(0)

        }
    }


    async function getAllCarousel() {
        try {
            const res = await fetch(process.env.GET_CAROUSEL, {
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

    function setMannually(slide_number) {
        setSlide(slide_number);

    }

    useEffect(() => {
        getAllCarousel()
    }, [])


    useEffect(() => {
        let round = document.getElementById(slide);
        if (temp.length !== 0) {
            let prevRound = document.getElementById(temp);
            prevRound.style.background = 'transparent'
        }
        if (round) {
            setTemp(slide);
            round.style.backgroundColor = '#12457a';
        }
    }, [slide, banner])




    useEffect(() => {

        const interval = setInterval(() => {
            setSlide(prevSlide => {
                if (banner.length - 1 > prevSlide) {
                    return prevSlide + 1;
                } else {
                    return 0;
                }
            });
        }, 3000);

        return () => clearInterval(interval);

    }, [banner])

    if (!online) return null
    if (banner.length == 0) { return <div className=' h-[550px] max-[700px]:h-[400px] top-4 animate-pulse max-[500px]:h-[250px] bg-slate'></div> }
    return (
        <div className=' h-[550px]  max-[700px]:h-[400px] max-[500px]:h-[250px]
          duration-1000  flex items-center justify-center z-4 transition-all z-0 w-full  relative cursor-pointer  '>


            <div id='slider-div' onClick={() => navigate('/details/' + banner[slide]?.product_id)}
                style={{ backgroundImage: `url(${banner[slide]?.image.url})` }}
                className='h-[550px] overflow-hidden  max-[700px]:h-[400px] max-[500px]:h-[250px]  transition-all z-0 w-full  bg-no-repeat '>

            </div>

            <div className='flex absolute bottom-2 '>

                {
                    banner.map((i, index) => {
                        return <div key={index} id={index}
                            onClick={() => setMannually(index)}

                            className='font-semibold  mx-[2px] w-[15px] h-[15px] flex justify-center
                        items-center rounded-[50%] border-[white] shadow-md stroke-current border'></div>
                    })
                }
            </div>




            <img onClick={handleprev} src={slidebtn}
                className=' rotate-[180deg] max-[800px]:w-[20px] z-10 max-[800px]:h-[20px] mix-blend-multiply shadow-2xl rounded-[50%] w-[35px] h-[35px] text-[20px] flex justify-center items-center absolute left-2 top-[45%]' />

            <img onClick={handlenext} src={slidebtn}
                className=' rounded-[50%]  max-[800px]:w-[20px] z-10 max-[800px]:h-[20px] mix-blend-multiply w-[35px] h-[35px] text-[20px] flex justify-center items-center absolute right-2 top-[45%]  ' />



        </div>
    );
}
