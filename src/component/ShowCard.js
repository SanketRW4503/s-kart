import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import StarRating from './StarRating'
import WishListIcon from './WishListIcon'
import { useSelector } from 'react-redux'
import store from '../utility/store'

export default function ShowCard(props) {

  const [load, setLoad] = useState(false)
  const loginStatus = useSelector(store => store.login.status);

  let navigate = useNavigate()
  function setpathh() {

    if (props.detailsPage == true) {
      navigate('/')
    }

  }


  useEffect(() => {

    if (loginStatus == true) {
      setLoad(true)
    } else {
      setLoad(false)
    }
  }, [loginStatus])






  return (



    <section
      className='flex p-[5px] relative rounded-lg z-10 m-[5px] w-[240px] h-[320px]  flex-col mx-[10px]  cursor-pointer hover:scale-[1.02]'>
      {load == true ? <div className='absolute right-1 top-1'>
        <WishListIcon info={props?.info?._id} />
      </div> : null
      }
      <Link to={'details/' + props.info._id} onClick={setpathh}  >
        <div className='flex justify-center items-center mt-3'>
          <img src={props.info.image.url} className='w-[180px] h-[200px] mix-blend-multiply' />
        </div>
        <h1 className='inline font-semibold'>{props.info.title.slice(0, 30)}</h1>
        <div >
          <StarRating stars={parseInt(props?.info?.rating)} />
        </div>
        <p>Price:{props.info.price}</p>
      </Link>
    </section>

  )
}
