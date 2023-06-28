import { useEffect, useState } from 'react'
import ShowCard from './ShowCard';
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '../utility/dataSlice';
import store from '../utility/store';
import ShimmerCard from './ShimmerCard';
import { shuffleArray } from '../utility/utility';
import Slider from './Slider';
import { Link } from 'react-router-dom';
import slidebtn from '../../assets/images/next.png'
export default function Body() {



    const [product, setProducts] = useState([]);
    const [filtertab, setFilterTab] = useState(false);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [minPrice, setMinPrice] = useState(100000)
    const [filterStatus, setFilterStatus] = useState(false)
    const [preLi, setPreLi] = useState('');
    const [slidevalue, setSlideValue] = useState(0)
    const stored_data = useSelector(store => store?.products?.items);

    const storedCategory = useSelector(store=>store?.category?.items)



    useEffect(() => {
        if (stored_data?.length > 0) {
            if(storedCategory?.length>0){
            setProducts(stored_data)
            console.log(storedCategory)
            setCategory(storedCategory)

            setLoading(false)
            }
        } else {
            setLoading(true)
        }


    }, [stored_data,storedCategory]);








    //for filter price range change
    useEffect(() => {
        if (minPrice != 100000) {
            let data = product.filter((p) => p.price < minPrice)
            setProducts(data)
            setFilterStatus(true)
        }
    }, [minPrice])





  
 





    function handlenextslider(cat_id) {
        let nextBtn = document.getElementById(cat_id + 'next');
        let prevBtn = document.getElementById(cat_id + 'prev');

        let comps = document.getElementsByClassName('class' + cat_id)

        for (let i = 0; i < comps.length; i++) {
            let comp = comps[i];
            comp.style.transition = 'transform 1s';
            comp.style.transform = 'translateX(-500px)';
        }

        nextBtn.style.display = 'none';
        prevBtn.style.display = 'flex';
    }
    function handleprevslider(cat_id) {
        let prevBtn = document.getElementById(cat_id + 'prev');
        let nextBtn = document.getElementById(cat_id + 'next');

        let comps = document.getElementsByClassName('class' + cat_id)

        for (let i = 0; i < comps.length; i++) {
            let comp = comps[i];
            comp.style.transition = 'transform 1s';
            comp.style.transform = 'translateX(0px)';
        }

        nextBtn.style.display = 'flex';
        prevBtn.style.display = 'none';
    }


    // shows shimmer UI
    if (loading == true) { return <ShimmerCard /> }
    else {
        // if not loading shows  this content
        return (

            <section >

                {
                    category?.map((c, index) => {



                        return <div className='flex justify-between mx-[18px] items-center max-[800px]:flex-col '>

      
                               <Link to={'/view-all/'+c.category}> <div className='bg-slate-100 text-black text-[25px] font-semibold  flex justify-center items-center cursor-pointer hover:shadow-lg
                                             rounded-md w-[200px] h-[300px] max-[800px]:h-[70px] max-[800px]:w-[95%] '>
                                    <span className='flex flex-col items-center justify-center max-[800px]:flex-row cursor-pointer max-[800px]:px-[20px] ' >
                                        <label className='text-[30px] max-[800px]:hidden cursor-pointer'>View All</label>
                                        <label className='min-[800px]:text-[16px] cursor-pointer whitespace-nowrap' >{c.category.toUpperCase()} </label>
                                    </span>
                                </div>
                                </Link>
                                <img src={slidebtn} onClick={() => handleprevslider(c.category)} id={c.category + 'prev'}
                                    className=' h-[40px] rounded-[20px] rotate-[180deg] w-[40px]  justify-center items-center hidden max-[800px]:hidden' /> 
                                
                                <section className='flex overflow-hidden  max-[800px]:overflow-auto w-[85%] my-[10px] transition-all duration-[1s] ' id='section'>
                               

                                    {product?.map((p, index) => {


                                        return <div className={'class' + c.category}  >
                                            {p.category == c.category ?
                                                <ShowCard info={p} key={p.id} detailsPage={true} />
                                                : null}</div>

                                    })}
                             
                               
                             <Link to={'/view-all/'+c.category}  ><div className='bg-slate-100 flex justify-center items-center min-[800px]:hidden
                                             rounded-md h-[300px] '>
                                    <span className='flex flex-col items-center justify-center ' >
                                        <label className='text-[30px] mx-[50px] whitespace-nowrap '>View All</label>
                                        <label>{c.category} Products</label>
                                    </span>
                                </div>
                                </Link>
                                </section>
                                
                                <img src={slidebtn} onClick={() => handlenextslider(c.category)} id={c.category + 'next'} 
                                    className=' h-[40px] rounded-[20px] w-[40px] flex justify-center items-center max-[800px]:hidden '/> 
                        </div>

                    })
                }

                <Link to={'/view-all/viewAll'}><div className='w-[96%] hover:shadow-md my-6 bg-slate-100 text-black text-[25px] font-semibold  flex justify-center items-center m-[auto] rounded-md p-[20px]' >
                    View All Products
                </div>
                </Link>
            </section>
        )
    }
}
