import React, { useEffect, useState } from 'react'
import { All_PRODUCTS, GET_ALL_CATEGORY } from '../utility/constants';
import ShowCard from './ShowCard';
import { useDispatch, useSelector } from 'react-redux';
import { storeData } from '../utility/dataSlice';
import store from '../utility/store';
import ShimmerCard from './ShimmerCard';

export default function Body() {



    const [product,setProducts]= useState([]);
    const [filtertab,setFilterTab] = useState(false);
    const [category , setCategory]= useState();
    const [loading,setLoading]=useState(true);

    const dispatch= useDispatch()
    const stored_data= useSelector(store=> store?.products?.items);
   
    
    
    useEffect(()=>{
        if(stored_data.length>0){
            setProducts(stored_data)
            getAllCategory()

            setLoading(false)
        }else{
            getAllProduct()
            getAllCategory()
            setLoading(false)
        }

       
    },[stored_data]);

   

    // fetching all category
    async function getAllCategory(){

        try {
            const res= await fetch(GET_ALL_CATEGORY);
            const json= await res.json()
           setCategory(json)
        } catch (error) {
            console.log('s'+error);
        }


    }

    // fetching data from api
    async function getAllProduct(){

        try {
            const res= await fetch(All_PRODUCTS);
            const json= await res.json()
            dispatch(storeData(json))
            setProducts(json)
        } catch (error) {
            console.log('s'+error);
        }


    }


// set-perticular category
async function setcat(category_name){
    if(category_name==='all'){  
        setProducts(stored_data)
    }else{
     let s=   stored_data.filter((p)=>p.category.includes(category_name)) 
    setProducts(s)
    }
}



if(loading){ return <ShimmerCard/> }
else{

  return (
    
    <section>
        <section className='px-[10%] mt-6 mb-5 '>
                <ul className='flex  flex-wrap justify-center'>          
                {
                    filtertab===true?<div className='w-[200px] h-[200px] bg-slate-900 ml-10 fixed shadow-2xl text-white'>FilterComponent </div>:null
                }

                        <li  onClick={()=>setcat('all')} className='px-4 cursor-pointer max-[764px]:text-[12px]'>all products</li>
                        {category?.map((p,index)=>{
                            return <li onClick={()=>setcat(p)} className='px-4 cursor-pointer max-[764px]:text-[12px]' key={index}>{p}</li>
                        })}
                </ul>
                <hr/>
        </section>

    
                    <section className='flex flex-wrap justify-center items-center mb-[60px]'>

                        {product.map((p)=>{

                            return <ShowCard info={p} key={p.id} />
                            
                        })}
                    </section>
        </section>
  )
                    }
}
