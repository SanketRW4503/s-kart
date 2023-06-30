import { useSelector } from 'react-redux'
import edit_icon from '../../assets/images/edit.png'
import store from '../utility/store'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AdressCom(props) {

    let userStore = useSelector(store => store.user.userdata)
    const [adress_line_1, setAddress_line_1] = useState('')
    const [adress_line_2, setAddress_line_2] = useState('')
    const [city_or_village, setCity_or_village] = useState('')
    const [landmark, setLandmark] = useState('')
    const [statename, setStateName] = useState('')
    const [pincode, setPincode] = useState('')
    const [country, setCountry] = useState('')

    const [addformstatus, setAddFormStatus] = useState(false)


    function vadlidate_Address(e) {
        e.preventDefault()
        if (adress_line_1.length == 0) {
            toast.error('Enter Address Line 1 ')
        } else if (adress_line_2.length == 0) {
            toast.error('Enter Address Line 2 ')
        } else if (city_or_village.length == 0) {
            toast.error('Enter Your City Or Village Name')
        } else if (landmark.length == 0) {
            toast.error('Enter Landmark')
        } else if (pincode.length == 0) {
            toast.error('Enter Your City Pin-Code')
        } else if (pincode.length > 6 && pincode.length < 6) {
            toast.error('Enter Valid Pin Code')
        } else if (statename.length == 0) {
            toast.error('Enter Your State Name')
        } else if (country.length == 0) {
            toString.error('Enter Your Country Name')
        } else {
            // good to go
            toast.loading('Adding Address...')
            let addressdata = {
                email: userStore?.profile?.email
                , address: adress_line_1 + ',' + adress_line_2 + ',' + landmark + ',' + city_or_village + ',' + statename + ',' + country + '-' + pincode
            }
            addressdata = JSON.stringify(addressdata);
            add_to_db(addressdata)
        }

        // this will add the address to the user model(Mongodb)
        async function add_to_db(addressdata) {

            try {
                const res = await fetch('https://s-kart-backend.onrender.com/user/add-address', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }, withCredntials: true,
                    credentials: 'include',
                    body: addressdata
                });
                const json = await res.json()
                if (json.success == true) {
                    toast.dismiss()
                    toast.success(json.message)
                    setAddFormStatus(!addformstatus)
                    props.setUpdateToggle(!props.updatetoggle);
                    props.setAddress_Component(false)
                } else {
                    toast.dismiss()
                    toast.success(json.message)
                }

            } catch (error) {
                toast.dismiss()
                toast.error('Something Went Wrong ..Login Again & Try')
            }
        }

    }




    useEffect(() => {

        if (userStore?.profile?.address !== undefined) {
            const add = userStore.profile.address.replace('-', ',')
            let d = add.split(',');
            setAddress_line_1(d[0]);
            setAddress_line_2(d[1]);
            setLandmark(d[2]);
            setCity_or_village(d[3]);
            setStateName(d[4]);
            setPincode(d[5]);
            setCountry(d[6]);

        }

    }, [userStore])
    return (
        <div className='relative w-[400px] m-[auto] p-[20px] bg-lightslate h-[auto] rounded-md '>
            {
                addformstatus !== true ? <section className='flex justify-center'>
                    {
                        userStore?.profile?.address == 'undefined' ?
                            < span className='w-[200px] whitespace-none whitespace-wrap flex flex-col items-center justify-center '>
                                <p>No Adress Found ! Please Add Your Address</p>
                                <button onClick={() => setAddFormStatus(!addformstatus)}
                                    className='bg-theme m-[auto] hover:bg-darktheme text-white rounded-md px-[10px]'>Add Address</button>
                            </span> :
                            < span className='w-[200px] whitespace-none whitespace-wrap flex flex-col items-center justify-center '>
                                <p>{userStore?.profile?.address}</p>
                                <button onClick={() => setAddFormStatus(!addformstatus)}
                                    className='bg-theme m-[auto]] hover:bg-darktheme text-white rounded-md px-[10px]'>Update Address</button>
                            </span>

                    }
                </section> : <form className='mt-[40px]'>
                    <button onClick={() => setAddFormStatus(!addformstatus)}
                        className=' rounded-md px-[10px] absolute top-[20px]'>&#8592; Back</button>
                    <input
                        value={adress_line_1}
                        onChange={(e) => { setAddress_line_1(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fname"
                        placeholder="Address Line 1" />
                    <input
                        value={adress_line_2}
                        onChange={(e) => { setAddress_line_2(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="Address line 2" />

                    <input
                        value={landmark}
                        onChange={(e) => { setLandmark(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="Landmark" />
                    <input
                        value={city_or_village}
                        onChange={(e) => { setCity_or_village(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="City/Village" />

                    <input
                        value={statename}
                        onChange={(e) => { setStateName(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="State" />
                    <input
                        value={pincode}
                        onChange={(e) => { setPincode(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="pin code" />
                    <input
                        value={country}
                        onChange={(e) => { setCountry(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="Country" />

                    <button onClick={(e) => vadlidate_Address(e)}
                        className='bg-theme mx-[auto] hover:bg-darktheme text-white rounded-md px-[10px] absolute right-[10px] bottom-1'>
                        {
                            userStore?.profile?.address == 'undefined' ? 'Add Address' : 'Update Address'
                        }
                    </button>
                </form>

            }
        </div>

    )
}
