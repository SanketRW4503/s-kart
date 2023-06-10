import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import searchicon from '../../assets/images/searchicon.png'


export default function SearchBar() {

  const[searchtext,setSearchText]= useState('')
  const navigate = useNavigate()




  function handleSearch(){
      /*when user clicks on clear search btn it get invoked and
        it lands user to that page where he was when he clicked on search btn*/
    setSearchText('');
    navigate(-1);
  }

  return (
    <section className='flex items-center justify-center ml-[30px]  max-[940px]:mt-5 '>
    <input type='text' value={searchtext} onChange={(e)=>{setSearchText(e.target.value)}} 
    className=' border-[1px] outline-none border-slate-600 w-[500px] max-[1100px]:w-[300px]  rounded-[20px] px-2 py-1' 
    placeholder='Search'/>
    {
      searchtext.length>0?<span className='text-[30px]  relative left-[-35px] top-[-4px] '
       onClick={()=>handleSearch()}>&#215;</span>:null
    }
      <Link to={'/search/'+searchtext}><button >

    <img src={searchicon} className={searchtext.length>0?'left-[-25px] ml-2 w-[30px] h-[25px] cursor-pointer relative '
    :'left-[0px] ml-2 w-[28px] h-[24px] cursor-pointer relative '} /></button></Link>
</section> 
  )
}
