import React, { useEffect, useState } from 'react'

export default function StarRating(props) {

    const [stars,setStars]= useState()
  

    

    useEffect(()=>{
        setStars(props.stars)
    },[props.stars])
 return (

    <div>
        {
            stars!==undefined?Array(5).fill('').map((e,index)=>{
                return <span key={index}
                className='text-[20px] mx-1'>{index<stars?<span className='text-yellow  stroke-theme'>&#9733;</span>:
                <span  >&#9734;</span>}</span>
            }):null
        }
        
    </div>
  )
}
