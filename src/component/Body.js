import { useEffect, useState } from 'react'
import ShowCard from './ShowCard';
import { useSelector } from 'react-redux';
import store from '../utility/store';
import ShimmerCard from './ShimmerCard';
import { Link, useParams } from 'react-router-dom';
import slidebtn from '../../assets/images/next.png'
import { toast } from 'react-toastify';
export default function Body() {



    const [product, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const stored_data = useSelector(store => store?.products?.items);

    const storedCategory = useSelector(store => store?.category?.items)
    const userdata = useSelector(store => store?.user?.userdata)
    const params = useParams()


    useEffect(() => {
        if (userdata?.profile?.firstname !== undefined) {
            if (params?.id == 'welcome') {
                toast.success('Verification Success !')
                toast.success(`Welcome to s-kart ${userdata?.profile?.firstname} !`)

            }
        }
    }, [userdata])




    useEffect(() => {
        if (stored_data?.length > 0) {
            if (storedCategory?.length > 0) {

                if (product?.length == 0) {


                    setCategory(storedCategory)
                    // adding only 6 items of each catgory in Product state so we can show only 6 items in homepage
                    let d = []
                    category.map((c) => {

                        let items = stored_data.filter((i) => {


                            return c?.category == i?.category

                        })
                        items = items.slice(0, 6)
                        for (let k = 0; k != 6; k++) {

                            d.push(items[k])
                        }
                    })
                    setProducts(d)



                    setLoading(false)
                }
            }
        } else {
            setLoading(true)
        }


    }, [stored_data, storedCategory, product]);




    function handlenextslider(cat_id) {
        let nextBtn = document.getElementById(cat_id + 'next');
        let prevBtn = document.getElementById(cat_id + 'prev');

        let comps = document.getElementsByClassName('class' + cat_id)

        for (let i = 0; i < comps.length; i++) {
            let comp = comps[i];
            comp.style.transition = 'transform 1s';
            comp.style.transform = 'translateX(-250px)';
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



                        return <div key={index} className='flex justify-between mx-[18px] items-center max-[800px]:flex-col '>


                            <Link to={'/view-all/' + c.category}> <div
                                className='bg-theme hover:bg-darktheme  max-[800px]:bg-white  max-[800px]:text-black text-t-theme text-[25px] font-semibold  flex justify-center items-center cursor-pointer hover:shadow-lg
                                             rounded-md w-[200px] h-[300px] max-[800px]:h-[70px] max-[800px]:w-[95%] '>
                                <span className='flex flex-col items-center justify-center max-[800px]:flex-row cursor-pointer max-[800px]:px-[20px] ' >
                                    <label className='text-[30px] max-[800px]:hidden cursor-pointer text-t-theme'>View All</label>
                                    <label className='min-[800px]:text-[16px]   cursor-pointer whitespace-nowrap text-t-theme' >{c.category.toUpperCase()} </label>
                                </span>
                            </div>
                            </Link>
                            <img src={slidebtn} onClick={() => handleprevslider(c.category)} id={c.category + 'prev'}
                                className=' h-[40px] rounded-[20px] rotate-[180deg] w-[40px] cursor-pointer  justify-center items-center hidden max-[800px]:hidden' />

                            <section className='flex overflow-hidden items-center  max-[800px]:overflow-auto w-[85%] my-[10px] transition-all duration-[1s] ' id='section'>


                                {product?.map((p, index) => {

                                    return <div key={index} className={'class' + c?.category}  >
                                        {p?.category == c?.category ?
                                            <ShowCard info={p} key={p.id} detailsPage={true} /> : null}
                                    </div>

                                })}


                                <Link to={'/view-all/' + c?.category}  ><div className=' bg-slate flex justify-center items-center min-[800px]:hidden
                                             rounded-md h-[300px] '>
                                    <span className='flex flex-col items-center justify-center ' >
                                        <label className=' text-[30px] mx-[50px] whitespace-nowrap '>View All</label>
                                        <label>{c?.category} Products</label>
                                    </span>
                                </div>
                                </Link>
                            </section>

                            <img src={slidebtn} onClick={() => handlenextslider(c.category)} id={c.category + 'next'}
                                className=' h-[40px] rounded-[20px] w-[40px] flex justify-center items-center cursor-pointer max-[800px]:hidden ' />
                        </div>

                    })
                }

                <Link to={'/view-all/viewAll'}><div className='w-[96%]  my-6 bg-slate hover:shadow-md text-black text-[25px] font-semibold  flex justify-center items-center m-[auto] rounded-md p-[20px]' >
                    View All Products
                </div>
                </Link>
            </section>
        )
    }
}
