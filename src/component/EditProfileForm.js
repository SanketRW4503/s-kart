import { useEffect, useState } from "react"
import { useSelector, useStore } from "react-redux"
import store from "../utility/store"
import { toast } from "react-toastify"

export default function EditProfileForm(props) {



    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [gender, setGender] = useState('')
    const [number, setNumber] = useState('')
    
    const userStore = useSelector(store => store.user.userdata)


    function validateData(e) {

        e.preventDefault()
        toast.loading('Updating....')
        let userData = { firstname: fname, lastname: lname, gender: gender, contact_no: number, email: userStore?.profile?.email }


        userData = JSON.stringify(userData);
        updateData(userData);

    }

    async function updateData(updateData) {

        try {
            const res = await fetch(process.env.UPDATE_USER_DATA, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, withCredntials: true,
                credentials: 'include',
                body: updateData
            })

            const json = await res.json()
            if(json.success==true){
                toast.dismiss()
                toast.success(json.message)
                props.setUpdateToggle(!props.updatetoggle);
            
            }else{
                toast.dismiss()
                toast.error(json.message)
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {

        setFname(userStore?.profile?.firstname)
        setLname(userStore?.profile?.lastname)
        setGender(userStore?.profile?.gender)
        setNumber(userStore?.profile?.contact_no)
        if (gender) {
            document.getElementById(gender).checked = true

        }
    }, [userStore])
    return (

        <form className="mt-[30px] bg-lightslate h-full p-[10px] rounded-lg ">
            <input
                value={fname}
                onChange={(e) => { setFname(e.target.value) }}
                type="text"
                className="block border  border-grey-light w-full p-3 rounded mb-4"
                name="fname"
                placeholder="First Name" />
            <input
                value={lname}
                onChange={(e) => { setLname(e.target.value) }}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="lname"
                placeholder="Last Name" />

            <input
                value={number}
                onChange={(e) => { setNumber(e.target.value) }}
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="number"
                placeholder="Mobile Number" />
            <div className='flex justify-center my-[10px] '>
                <input
                    className='ml-[20px]'
                    id="male"
                    value='male'
                    type="radio"
                    name="gender"
                    onClick={(e) => {
                        setGender(e.target.value)
                    }}
                /> Male
                <input
                    id="female"
                    className='ml-[20px]'
                    value='female'
                    type="radio"
                    name="gender"
                    onClick={(e) => {
                        setGender(e.target.value)
                    }}
                />Female
                <input
                    id="others"
                    className='ml-[20px]'
                    value='others'
                    type="radio"
                    name="gender"
                    onClick={(e) => {
                        setGender(e.target.value)
                    }}
                />Others
            </div>
            <button onClick={(e) => validateData(e)}
                className="bg-theme hover:bg-darktheme text-t-theme px-[30px] rounded-md py-1">Save</button>
        </form>

    )
}
