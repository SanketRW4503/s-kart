import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import store from '../utility/store'
import { addItem } from '../utility/cartSlice'
import { All_PRODUCTS } from '../utility/constants'
import { storeData } from '../utility/dataSlice'
import { ToastContainer, toast } from 'react-toastify'
import { add_mongoDb_cart } from '../utility/utility'
import 'react-toastify/dist/ReactToastify.css';


import ShowCard from './ShowCard'

export default function DetailsPage() {

    let param = useParams()

    const [details, setDetails] = useState([])
    const [product, setProduct] = useState([])



    let stored_data = useSelector(store => store?.products?.items);
    const userdata = useSelector(store => store.user.userdata);

    let dispatch = useDispatch();


    useEffect(() => {
        // if data is present in cart it will show that data ,if not then it will fetch all data from api
        if (stored_data.length > 0) {

            let s = stored_data.filter((p) => p?._id == param.id)
            setDetails(s)
        } else {
            getAllProduct()
        }

    }, [param.id, stored_data])

    // fetching Data from Api
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


    // adds item to the cart
    function setdata_tocart() {

        dispatch(addItem(details[0]))
        if (userdata.success == true) {


            add_mongoDb_cart(details[0], userdata)

        }
        toast.success('Item Added to Cart!');

    }





    //  to show the similar product to the user is will store all similar category items to the state
    function setCategory() {
        let s = stored_data?.filter((p) => p?.category.includes(details[0]?.category));
        setProduct(s);

    }

    useEffect(() => {
        setCategory();
    }, [details])



    return (




        <section>
            <div className='flex  m-[auto] mt-[50px]  w-[85%] p-2 mb-8 max-[800px]:flex-col max-[800px]:p-0 '>
                <div className='flex items-center justify-center '>
                    <img src={details[0]?.imageUrl} className='w-[450px]  h-[500] max-[800px]:w-[300px] ' />
                </div>
                <div className='ml-12 max-[800px]:ml-0'>
                    <h1 className='inline font-semibold text-[25px]'>{details[0]?.title}</h1>

                    <ul className='flex '>
                        <li className='text-[15px] mt-4 max-[800px]:p-0'>Price: {details[0]?.price}</li>
                        <li className='text-[15px] max-[800px]:p-0 mt-4 list-disc ml-8 marker:text-gray-500'>{details[0]?.rating}&#9733;</li>
                    </ul>
                    <p className='text-[15px] max-[800px]:p-0 mt-4'>Hurry {details[0]?.rating} left only...!</p>
                    <p className='mt-8 max-[800px]:p-0 text-justify '>{details[0]?.description}</p>
                    <a href='#nav' className='scroll-smooth'>  <button onClick={() => setdata_tocart()}
                        className='bg-black px-[10px] py-[5px] text-white mt-4 rounded-xl '>Add to Cart</button>
                    </a>
                  

                </div>


            </div>

            {/* similar product Component */}
            {
                <section  className=' '>
                    <div className='mx-[10%]'>
                        <hr />
                        <h1 className='text-[30px]'>Similar Products</h1>

                    </div>
                    <section className='flex flex-wrap justify-center items-center mx-[5%] '>


                        {product ? product?.map((p) => {

                            return <ShowCard info={p} key={p.id} detailsPage={true} />

                        }) : null}
                    </section>
                </section>

            }

        </section>
    )
}
