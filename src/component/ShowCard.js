import { useEffect, useState } from 'react'
import { dollertoinr } from '../utility/utility'
import { Link, useLocation, useNavigate} from 'react-router-dom'

export default  ShowCard=(props)=> {

  const location = useLocation()
  const navigate= useNavigate()
  const [path,setPath]= useState()  


  function setpathh(){

        if(props.detailsPage==true){
            navigate('/')
        }

  }

  return (
    
   <Link to={'details/'+props.info.id} onClick={setpathh}><section className='flex flex-col m-4 w-[300px] cursor-pointer hover:scale-[1.1]'>
          <div className='flex justify-center'>
            <img src={props.info.image} className='w-[200px] h-[300px]'/>
            </div>
            <h1 className='inline font-semibold'>{props.info.title}</h1>
            <p>Price:{ dollertoinr(props.info.price)}</p>
    </section>
    </Link>
  )
}
