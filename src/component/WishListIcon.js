import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import store from "../utility/store";
import { useEffect, useState } from "react";
import { add_data, remove_data } from "../utility/wishlishSlice";


export default function WishListIcon(props) {


  let userStore = useSelector(store => store?.user?.userdata)
  let wishlist = useSelector(store => store?.wishlist?.list)
  const dispatch = useDispatch()
  const [colorstatus, setColorStatus] = useState(false)


  async function add_to_wishlist(info) {


    toast.loading('Adding to wishlist...');
    let dataset = { email: userStore?.profile?.email, product_id: info }
    dataset = JSON.stringify(dataset);
    try {
      let res = await fetch(process.env.WISHLIST_ADD_DELETE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, withCredntials: true,
        credentials: 'include',
        body: dataset
      });

      let json = await res.json()

      if (json.success == true) {
        toast.dismiss()
        toast.success(json?.message)

        if (json?.add == true) {
          dispatch(add_data([{ product_id: info }]))
        } else {

          dispatch(remove_data(info))
          setColorStatus(false)
        }

      } else {
        toast.dismiss()
        toast.error(json?.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    wishlist.map((w) => {
      if (props?.info == w?.product_id) {
        setColorStatus(true)
      }

    })
  }, [wishlist, colorstatus])


  return (

    colorstatus == true ? <div onClick={() => add_to_wishlist(props?.info)} className="text-[30px] z-30 w-full h-full text-[red]" >&#9829;</div>
      : <div onClick={() => add_to_wishlist(props?.info)} className="text-[30px] z-30 w-full h-full" >&#9825;</div>

  )
}

