import React, { Profiler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import store from '../utility/store';
import { useSelector } from 'react-redux';

export default function SearchResult() {


  const params= useParams();
  const [product , setProduct] = useState([])
  const stored_data = useSelector(store=>store?.products?.items);
  console.log(params);
  useEffect(()=>{
    if(stored_data){
      let s= stored_data.filter((p)=>p.title.toLowerCase().includes(params.text.toLowerCase())); 
      console.log(s);
      setProduct(s)
    }
  },[params]);
  return (
    <section>
    <section className='px-[10%] mt-6 mb-5'>
           
            <hr/>
            <h1 className='text-[25px]'>Search Results</h1>
    </section>


                <section className='flex flex-wrap justify-center items-center'>

                    {product.length>0?product?.map((p)=>{

                       
                        return <ShowCard info={p} key={p.id} detailsPage={true} />
                        
                    }):<div>No Search Result Found</div>}
                </section>
    </section>
  )
}
