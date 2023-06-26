import { Link, useNavigate } from 'react-router-dom'

export default function ShowCard(props) {

  let navigate = useNavigate()


  function setpathh() {

    if (props.detailsPage == true) {
      navigate('/')
    }

  }

  return (

    <Link to={'details/' + props.info._id} onClick={setpathh}><section className='flex flex-col m-4 w-[300px] cursor-pointer hover:scale-[1.1]'>
      <div className='flex justify-center'>
        <img src={props.info.imageUrl} className='w-[200px] h-[300px]' />
      </div>
      <h1 className='inline font-semibold'>{props.info.title}</h1>
      <p>Price:{props.info.price}</p>
    </section>
    </Link>
  )
}
