import { useDispatch, useSelector } from 'react-redux'
import store from '../utility/store';
import { addItem, deleteItem, remove_one_item } from '../utility/cartSlice';
import cartbag from '..//../assets/images/empty-cart.jpg'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { add_mongoDb_cart, deleteitem_from_Mongodb, remove_item_mongoDb_cart } from '../utility/utility';
import { setUser } from '../utility/userSlice';
import { setLoginStatus } from '../utility/loginSlice';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdressCom from './AdressCom';




export default function CartPage() {


    const cart_data = useSelector(store => store.cart.items);
    const totalItems = useSelector(store => store.cart.totalItems);
    const totalPrice = useSelector(store => store.cart.totalPrice);
    const loginStatus = useSelector(store => store.login.status);
    const [address_component, setAddress_Component] = useState(false);
    const [updatetoggle, setUpdateToggle] = useState(false)
    let product_array = [];
    const navigate = useNavigate()

    const dispatch = useDispatch()

    // check user login or not if login save his info to store
    const userdata = useSelector(store => store.user.userdata)
    async function getCurrentUserInfo() {

        const res = await fetch(process.env.REACT_APP_USER_PROFILE, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })

        const json = await res.json()
        if (json.success == true) {

            dispatch(setUser(json))
            dispatch(setLoginStatus(true))

        }
    }

    useEffect(() => {
        getCurrentUserInfo()
    }, [])

    // adding item quantity to the cart
    function setdata_tocart(item) {

        dispatch(addItem(item))
        if (userdata.success == true) {
            add_mongoDb_cart(item, userdata)

        }
    }


    // minus one item from cart
    function removeOne(item) {
        if (userdata.success == true) {
            remove_item_mongoDb_cart(item, userdata)

        }

        if (item.quantity == 1) {
            // if the item quantity is 1 and user click Minus then is till delete/remove this item from cart
            dispatch(deleteItem(item))


            toast.success('removed from Cart!')

        } else {
            // on minus click it will remove one item only
            dispatch(remove_one_item(item))
            if (userdata.success == true) {
                remove_item_mongoDb_cart(item, userdata)
            }
        }

    }


    // remove complete selected item from cart 
    function remove_item(item) {
        if (userdata.success == true) {
            deleteitem_from_Mongodb(item, userdata)
        }
        dispatch(deleteItem(item))
        toast.success('removed from Cart!');
    }



    // handle login

    async function handleLogin() {


        if (loginStatus == true) {

            let data = { amount: totalPrice, order_data: product_array, email: userdata?.profile?.email, address: userdata?.profile?.address };
            data = JSON.stringify(data)

            // here we are checking address is present or not 
            if (userdata?.profile?.address !== 'undefined') {
                try {
                    // create order

                    const res = await fetch(process.env.PAYMENT_CHECKOUT, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        withCredntials: true,
                        credentials: 'include',
                        body: data
                    });
                    const json = await res.json()
                    console.log(json);
                    // fetch key from backend
                    const key_res = await fetch(process.env.PAYMENT_KEY, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                        withCredntials: true,
                        credentials: 'include',
                    });
                    const json_key = await key_res.json()
                    console.log(json_key)
                    const key = json_key.key
                    const options = {
                        key,
                        one_click_checkout: true,
                        amount: json.order.amount,
                        currency: 'INR',
                        name: "S-Kart PVT LTD",
                        order_id: json.order.id,
                        show_coupons: true,
                        callback_url: process.env.PAYMENT_VERIFICATION,
                        prefill: {
                            name: userdata.profile.name,
                            email: userdata.profile.email,
                            contact: userdata.profile.contact_no,
                            coupon_code: "COUPON50"
                        },
                        notes: {
                            address: userdata.profile.address,
                        },
                        theme: {
                            color: "#121212"
                        }
                    };

                    const razor = new window.Razorpay(options);
                    razor.open();


                } catch (error) {
                    console.log(error);
                }

            } else {
                // address not present
                setAddress_Component(true)
            }
        } else {
            // if user is not login 
            navigate('/login')
        }



    }


    useEffect(() => {
        getCurrentUserInfo();
    }, [updatetoggle])

    return (
        <section>
            {
                address_component == false ? <div>

                    <h1 className='text-[40px] mx-[10%]'>Cart {totalItems}</h1>

                    <section className='flex mx-[10%] justify-between mt-[30px] max-[900px]:flex-wrap'>

                        <div className='flex flex-col'>
                            {/* it will show items that are present in cart */}
                            {
                                cart_data.length > 0 ?
                                    cart_data.map((e, index) => {

                                        product_array.push({ product_id: e._id, quantity: e.quantity });

                                        return <div className='flex border rounded-md p-[30px] m-4 max-[1000px]:flex-col items-center' key={index}>
                                            <div>
                                                <img src={e.image.url} className='w-[400px] h-[200px]' />

                                            </div>
                                            <div className='ml-[30px] '>
                                                <h1 className='text-[20px] font-semibold'>{e.title}</h1>
                                                <p>{e.description}</p>
                                                <p>Price:{e.price}</p>
                                                <div className=' mt-8 flex max-[567px]:flex-wrap'>
                                                    <div className='flex items-center border rounded-sm  w-[max-content]'>
                                                        <button className='bg-slate px-4 py-2 ' onClick={() => removeOne(e)}>-</button>
                                                        <div className='bg-white px-4 py-2 '>{e.quantity}</div>
                                                        <button onClick={() => setdata_tocart(e)} className='bg-slate px-4 py-2 '
                                                        >+</button>
                                                    </div>
                                                    <button className='ml-[50px] max-[567px]:ml-[5px] max-[567px]:py-[8px] hover:bg-theme max-[567px]:mt-[20px] bg-theme text-t-theme px-4 rounded-lg' onClick={() => remove_item(e)}>Remove From Cart</button>

                                                </div>
                                            </div>
                                        </div>

                                    })
                                    : null

                            }
                        </div>

                        {/* it will show Payment Summary :*/}

                        {

                            cart_data.length > 0 ?
                                <div className='w-[40%] ml-8 mb-3 max-[900px]:w-[100%]  max-[900px]:ml-0  max-[900px]:p-4 max-[900px]:m-1 max-[900px]:border'>
                                    <h1 className='text-[40px] whitespace-nowrap max-[500px]:text-[20px] '>Payment Summary</h1>
                                    <div className='flex flex-col items-center justify-center'>
                                        <div className='flex flex-col w-[350px] max-[500px]:w-[max-content] mt-4 mb-8 '>

                                            <input type='text' className='border outline-none my-2 py-2 px-2 rounded-lg' placeholder='Enter Here' />
                                            <button className='bg-[#22c55e] rounded-xl text-t-theme py-[5px]'> Apply Coupan Code</button>

                                        </div>
                                        <table >
                                            <thead>

                                            </thead>
                                            <tbody>
                                                <tr className='flex justify-between w-[350px] max-[500px]:w-[200px] '>
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

                                                <tr className='flex justify-between border-t-1 '>
                                                    <td>Total</td>
                                                    <td>{totalPrice}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <button onClick={() => handleLogin()}
                                            className='bg-black max-[500px]:w-[200px]  text-t-theme px-4 w-[350px] mt-2 py-[5px]'
                                        >{loginStatus == true ? 'Place Order' : 'Login To Place Order'}</button>
                                    </div>
                                </div> : null
                        }


                    </section>

                    {/* if cart is empty this component will appear */}
                    {
                        cart_data.length == 0 ? <div className=' justify-center  flex flex-col items-center mb-[100px]'>

                            <div className='flex'>

                                <img src={cartbag} width={300} />

                            </div>
                            <h1>Your Cart is Empaty</h1>

                        </div> : null

                    }


                </div> : <div className='m-[20px]'>

                    <AdressCom setUpdateToggle={setUpdateToggle} updatetoggle={updatetoggle} setAddress_Component={setAddress_Component} />
                </div>
            }
        </section>
    )
}
