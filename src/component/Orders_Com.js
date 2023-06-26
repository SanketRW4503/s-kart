import { useEffect } from "react"
import { useSelector } from "react-redux"
import store from "../utility/store"
import { toast } from "react-toastify"
import { useState } from "react"
import cartbag from '..//../assets/images/empty-cart.jpg'
import { Link } from "react-router-dom"

export default function Orders_Com() {
    const [orders, setOrder] = useState([])
    const userStore = useSelector(store => store.user.userdata)
    const stored_data = useSelector(store => store?.products?.items);

    useEffect(() => {
        let data = { email: userStore.profile.email }
        data = JSON.stringify(data)
        getOrderData(data)
    }, [userStore])


    async function getOrderData(data) {

        try {
            const result = await fetch('https://s-kart-backend.onrender.com/order/userorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                withCredntials: true,
                credentials: 'include',
                body: data
            })

            const json = await result.json()

            if (json.success) {
                setOrder(json.orders);
                console.log(orders);
            } else {
                toast.error('Login With Correct Email ID')
            }

        } catch (error) {
            toast.error(error)
        }
    }

    function getProductData(order_id){
         
                let s = stored_data?.filter((p,index) => p?._id==order_id);
               return s[0]
        
            
    }

    return (


        orders.length>0 ? orders.map((p) => {

            return <div className="border rounded-[10px] p-[20px] bg-slate-100  mt-[20px]"> 
          
            { p?.product_details.map((i)=>{
                const product=   getProductData(i.product_id)
                return <div className="flex p-[3px] justify-center items-center max-[800px]:flex-col ">
                    <img src={product.imageUrl} className=" w-[200px] h-[20%]" />
                    <div className="m-[10px]">
                    <h1 className='text-[20px] font-semibold'>{product.title}</h1>
                    <span >
                        {product.description}</span>
                    <h1 className='text-[20px] '>Price:{product.price}₹</h1>
                    <p>Quantity:{i.quantity}</p>
                    </div>
                </div>

            })
    
            } 
            <div className=" mt-[10px] ">
                <div className="flex justify-between max-[460px]:flex-col">
                <label className="font-semibold">ORDER ID:</label>
                <span>{p.order_id}</span>
                </div>
                <div className="flex justify-between max-[460px]:flex-col">
                <label className="font-semibold">Delevery status:</label>
                <span>{p.delevery_status}</span>
                </div>
                <div className="flex justify-between max-[460px]:flex-col">
                <label className="font-semibold">Payment status:</label>
                <span>{p.payment_status}</span>
                </div>
                <div className="flex justify-between border-t-2 max-[460px]:flex-col">
                <label className="font-semibold">Total Amount:</label>
                <span>{p.amount}₹</span>
                </div>
              
            </div>

            </div>
        }) : <div className="flex flex-col justify-center items-center"><img src={cartbag} width={300} />
            <p>You Dont Have Any recent orders</p>

            <Link to='/' ><button className='bg-blue-500 px-[20px] text-white rounded-md m-4 '>Shop Now</button></Link>
        </div>



    )
}
