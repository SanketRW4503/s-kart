import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import searchicon from '../../assets/images/searchicon.png'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import store from '../utility/store'


export default function SearchBar() {

  const [searchtext, setSearchText] = useState('')
  const [keywords, setKeywords] = useState([])
  let navigate = useNavigate()

  const searchkeywords = useSelector(store => store.search.keywords)

  useEffect(() => {
  const timer= setTimeout(()=>get_search_result(),200)    

  return()=>{
    clearTimeout(timer)
  }
  }, [searchtext])


  function get_search_result(){
    if (searchtext.length>0) {
      let data = []
      searchkeywords.map((keyword) => {

        if (keyword.toLowerCase().includes(searchtext.toLowerCase())) {
          data.push(keyword)
        }
      });

      setKeywords(data)
    }
  }
  function handleSearch() {
    /*when user clicks on clear search btn it get invoked and
      it lands user to that page where he was when he clicked on search btn*/
    setSearchText('');
    navigate(-1);
  }

  return (
    <div className='relative' >
      <section className='flex items-center justify-center ml-[30px]  max-[940px]:mt-5 '>
        <input type='text' value={searchtext} onChange={(e) => { setSearchText(e.target.value) }}
          className=' border-[1px] border-white outline-none max-[940px]:border-black w-[500px] text-black  max-[1100px]:w-[300px]  rounded-[20px] px-2 py-1'
          placeholder='Search' />
        {
          searchtext.length > 0 ? <span className=' z-10 text-[30px]  relative  left-[-35px] top-[-4px] cursor-pointer '
            onClick={() => handleSearch()}>&#215;</span> : null
        }
        <Link to={'/search/' + searchtext}><button >

          <img src={searchicon} className={searchtext.length > 0 ? 'left-[-25px] ml-2 w-[30px] h-[25px]  max-[940px]:invert-0 cursor-pointer relative invert'
            : 'left-[0px] ml-2 w-[28px] h-[24px] cursor-pointer relative invert max-[940px]:invert-0'} /></button></Link>

      </section>
      {
        searchtext.length > 0 ? <ul
          className=' shadow absolute top-11 text-[black]  max-[940px]:top-16 max-[940px]:bg-lightslate  max-[940px]:w-[280px] z-10 ml-[30px] px-2 py-1 w-[500px] rounded-lg bg-[white]'>

          {
            keywords.map((k, index) => {
              return <Link to={'/search/' + k}>
                <li onClick={()=>setSearchText('')} className=' py-2 cursor-pointer hover:bg-lightslate' key={index}>{k}</li></Link>
            })
          }


        </ul> : null
      }
    </div>
  )
}
