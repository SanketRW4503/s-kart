import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {   useParams } from 'react-router-dom'
import store from '../utility/store'
import { dollertoinr } from '../utility/utility'
import { addItem } from '../utility/cartSlice'
import { All_PRODUCTS } from '../utility/constants'
import { storeData } from '../utility/dataSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function DetailsPage() {

    const param = useParams()

    const [details, setDetails] = useState([])
    const [product, setProduct] = useState([])
    const stored_data = useSelector(store => store?.products?.items);
    const cart_data = useSelector(store => store?.cart?.items);

    const dispatch = useDispatch();


    useEffect(() => {
        if (stored_data.length > 0) {

            let s = stored_data.filter((p) => p?.id == param.id)
            setDetails(s)
        } else {
            getAllProduct()
        }

    }, [param.id, stored_data])

    function setdata_tocart() {

        dispatch(addItem(details[0]))
        toast('Item Added to Cart!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

    }

    async function getAllProduct() {

        try {
            const res = await fetch(All_PRODUCTS);
            const json = await res.json()
            dispatch(storeData(json))
        } catch (error) {
            console.log('s' + error);
        }


    }

    useEffect(() => {
        setCategory();
    }, [details])


    
    function setCategory() {
        let s = stored_data?.filter((p) => p?.category.includes(details[0]?.category));
        setProduct(s);

    }



    return (




        <section>
            <div className='flex  m-[auto] mt-[50px]  w-[85%] p-2 mb-8 max-[800px]:flex-col max-[800px]:p-0 '>
                <div className='flex items-center justify-center '>
                    <img src={details[0]?.image} className='w-[600px]  h-[400px] max-[800px]:w-[300px] ' />
                </div>
                <div className='ml-12 max-[800px]:ml-0'>
                    <h1 className='inline font-semibold text-[25px]'>{details[0]?.title}</h1>

                    <ul className='flex '>
                        <li className='text-[15px] mt-4 max-[800px]:p-0'>Price: {dollertoinr(details[0]?.price)}</li>
                        <li className='text-[15px] max-[800px]:p-0 mt-4 list-disc ml-8 marker:text-gray-500'>{details[0]?.rating.rate}&#9733;</li>
                    </ul>
                    <p className='text-[15px] max-[800px]:p-0 mt-4'>Hurry {details[0]?.rating?.count} left only...!</p>
                    <p className='mt-8 max-[800px]:p-0 text-justify '>{details[0]?.description}</p>
                    <button onClick={() => setdata_tocart()} className='bg-black px-[10px] py-[5px] text-white mt-4 '>Add to Cart</button>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        />

                </div>


            </div>
            {
                <section >
                    <div className='mx-[10%]'>
                        <hr />
                        <h1 className='text-[30px]'>Similar Products</h1>

                    </div>
                    <section className='flex flex-wrap justify-center items-center '>

                        {product ? product?.map((p) => {

                            return <ShowCard info={p} key={p.id} detailsPage={true} />

                        }) : null}
                    </section>
                </section>

            }

        </section>
    )
}
