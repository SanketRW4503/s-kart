import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function ShowCard(props) {

  let navigate = useNavigate()
  function setpathh() {

    if (props.detailsPage == true) {
      navigate('/')
    }

  }



  return (

  
    <Link to={'details/' + props.info._id} onClick={setpathh}  >
      <section
      className='flex p-[5px]  rounded-lg z-10 m-[5px] w-[240px] h-[300px]  flex-col mx-[10px]  cursor-pointer hover:scale-[1.02]'>
      <div className='flex justify-center items-center'>
        <img src={props.info.imageUrl} className='w-[180px] h-[200px]' />
      </div>
      <h1 className='inline font-semibold'>{props.info.title.slice(0,30)}</h1>
      <p>Price:{props.info.price}</p>
    </section>
    </Link>
  )
}
