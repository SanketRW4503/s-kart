import { useDispatch, useSelector } from 'react-redux'
import store from '../utility/store';
import { dollertoinr } from '../utility/utility';
import { addItem, deleteItem, remove_one_item } from '../utility/cartSlice';
import cartbag from '..//../assets/images/cart-bag.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function CartPage() {


    const cart_data = useSelector(store => store.cart.items);
    const totalItems = useSelector(store => store.cart.totalItems);
    const totalPrice = useSelector(store => store.cart.totalPrice);


    const dispatch = useDispatch()
   


    // adding item quantity to the cart
    function setdata_tocart(item) {

        dispatch(addItem(item))
    }


    // minus one item from cart
    function removeOne(item) {

        if (item.quantity == 1) {
            dispatch(deleteItem(item))

       
            
            toast('removed from Cart!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

        } else {
            dispatch(remove_one_item(item))
           
        }

    }


    // remove complete one item from cart 
    function remove_item(item) {

        dispatch(deleteItem(item))
        toast('removed from Cart!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    return (
        <div>
              <ToastContainer

position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
            <h1 className='text-[40px] mx-[10%]'>Cart {totalItems}</h1>

            <section className='flex mx-[10%] justify-between mt-[30px]'>

                <div className='flex flex-col'>

                    {
                        cart_data.length > 0 ?
                            cart_data.map((e) => {
                                return <div className='flex border p-[30px] m-4'>
                                    <div>
                                        <img src={e.image} className='w-[200px] h-[200px]' />

                                    </div>
                                    <div className='ml-[30px]'>
                                        <h1 className='text-[20px] font-semibold'>{e.title}</h1>
                                        <p>{e.description}</p>
                                        <p>Price:{dollertoinr(e.price)}</p>
                                        <div className=' mt-8 flex'>
                                            <div className='flex items-center border w-[max-content]'>
                                                <button className='bg-slate-200 px-4 py-2' onClick={() => removeOne(e)}>-</button>
                                                <div className='bg-white px-4 py-2'>{e.quantity}</div>
                                                <button onClick={() => setdata_tocart(e)} className='bg-slate-200 px-4 py-2'
                                                >+</button>
                                            </div>
                                            <button className='ml-[50px] bg-blue-300  px-4 rounded-lg' onClick={() => remove_item(e)}>Remove From Cart</button>
                                          
                                        </div>
                                    </div>
                                </div>

                            })
                            : null

                    }
                </div>
                {
                    cart_data.length > 0 ?
                        <div className='w-[40%] ml-8 mb-3'>
                            <h1 className='text-[40px] '>Payment Summary</h1>

                            <div className='flex flex-col w-[350px] mt-4 mb-8 '>

                                <input type='text' className='border outline-none my-2 py-2 px-2 rounded-lg' placeholder='Enter Here' />
                                <button className='bg-green-500 rounded-xl text-white py-[5px]'> Apply Coupan Code</button>

                            </div>
                            <table >
                                <tr className='flex justify-between w-[350px]'>
                                    <td>Total Items</td>
                                    <td>{totalItems}</td>
                                </tr>
                                <tr className='flex justify-between '>
                                    <td>Delevary Charges</td>
                                    <td>40Rs</td>
                                </tr>
                                <tr className='flex justify-between '>
                                    <td>Tax & GST</td>
                                    <td>10%</td>
                                </tr>
                                <tr className='flex justify-between '>
                                    <td>Discount</td>
                                    <td>0%</td>
                                </tr>
                                <hr />
                                <tr className='flex justify-between '>
                                    <td>Total</td>
                                    <td>{totalPrice}</td>
                                </tr>
                            </table>
                            <button className='bg-black  text-white px-4 w-[350px] mt-2 py-[5px]'>Place Order</button>
                        </div> : null
                }


            </section>
            {
                cart_data.length == 0 ? <div className=' justify-center  flex flex-col items-center mb-[100px]'>

                    <div className='flex'>

                        <img src={cartbag} width={300} />
                        <span className='font-semibold text-[120px] ml-[-145px] mt-[80px]'>0</span>

                    </div>
                    <h1>Your Cart is Empaty</h1>

                </div> : null

            }
        </div>
    )
}
