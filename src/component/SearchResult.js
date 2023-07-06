import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import store from '../utility/store';
import { useSelector } from 'react-redux';
import ShowCard from './ShowCard';

export default function SearchResult() {


  let params = useParams();

  const [product, setProduct] = useState([])
  const stored_data = useSelector(store => store?.products?.items);

  // finds search result 
  useEffect(() => {
    if (stored_data) {
      let data=[];
      
      stored_data.map((s)=>{
        
          for(let i=0;i!==s.search_keyword.length-1;i++){
            if(s.search_keyword[i].toLowerCase().includes(params.text.toLowerCase())){
                data.push(s)
            }
          }
      })
      // remove duplicate value 
      let uniquedata= [...new Set(data)]
      setProduct(uniquedata)
    }
  }, [params]);


  return (
    <section>
      <section className='px-[10%] mt-6 mb-5'>

        <hr />
        <h1 className='text-[25px]'>Search Results for '{params.text}'</h1>
      </section>


      <section className='flex flex-wrap justify-center items-center'>

        {product.length > 0 ? product?.map((p,index) => {


          return <ShowCard info={p} key={index} detailsPage={true} />

        }) : <div>No Search Result Found</div>}
      </section>
    </section>
  )
}
