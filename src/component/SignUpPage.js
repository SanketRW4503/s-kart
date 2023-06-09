import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { validate } from 'email-validator'
import showpass from '../../assets/images/show.png'
import hidepass from '../../assets/images/hide.png'

export default function SignUpPage() {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [passtype,setPasstype]= useState('password')
    const [showpassword,setShowpassword]= useState(false)
    const [confirmpassword, setConfirmpassword] = useState('')
    const [imagetoggle,setImagetoggle]= useState(hidepass)
    let navigate = useNavigate()

    async function validateData(e) {
        e.preventDefault()
        let userData = { confirmpassword: confirmpassword, firstname: fname, lastname: lname, gender: gender, contact_no: number, email: email, password: password }

        if (confirmpassword !== password) {
            toast.error('Confirm Password & password Mismatch !');

        } else if (fname.length == 0) {
            toast.error('Enter Your First Name !')

        } else if (lname.length == 0) {
            toast.error('Enter Your Last Name !')

        } else if (gender.length == 0) {
            toast.error('Select Your Gender')

        } else if (number.length == 0) {
            toast.error('Enter Your Mobile Number')

        } else if (number.length > 10) {
            toast.error('Enter Valid Mobile Number')

        }
        else if (password.length < 8) {
            toast.error('Password Length Should be greater than 8');

        } else if (!validate(email)) {
            toast.error('INVALID EMAIL');
        } else {
            userData = JSON.stringify(userData);
            createAC(userData);
        }





    }


    async function createAC(userData) {

        toast.loading('Processing...')

        const res = await fetch(process.env.SIGN_UP_USER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, withCredntials: true,
            credentials: 'include',
            body: userData
        }

        );
        const json = await res.json()
        console.log(json)
        if (json.success) {
            navigate('/verification');
        
        } else {
            toast.dismiss()
            toast.error(json.message)
        }
    }


    function handle_showpassword(){

        setShowpassword(!showpassword)
        if(showpassword==true){
            setImagetoggle(showpass)
            setPasstype('text')

        }else{
            setImagetoggle(hidepass)
            setPasstype('password');

        }
    }

    return (

        <div className="bg-grey-lighter min-h-screen flex flex-col shadow-[2px 2px 2px 2px] mb-8 ">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-lightslate px-6 py-8 shadow-md text-black w-full rounded-md">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input
                        value={fname}
                        onChange={(e) => { setFname(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="fname"
                        placeholder="First Name" />
                    <input
                        value={lname}
                        onChange={(e) => { setLname(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lname"
                        placeholder="Last Name" />

                    <div className='flex justify-center my-[10px] '>
                        <input
                            className='ml-[20px]'
                            value='male'
                            type="radio"
                            name="gender"
                            onClick={(e) => {
                                setGender(e.target.value)
                            }}
                        /> Male
                        <input
                            className='ml-[20px]'
                            value='female'
                            type="radio"
                            name="gender"
                            onClick={(e) => {
                                setGender(e.target.value)
                            }}
                        />Female
                        <input
                            className='ml-[20px]'
                            value='others'
                            type="radio"
                            name="gender"
                            onClick={(e) => {
                                setGender(e.target.value)
                            }}
                        />Others
                    </div>

                    <input
                        value={number}
                        onChange={(e) => { setNumber(e.target.value) }}
                        type="number"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="number"
                        placeholder="Mobile Number" />

                    <input
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email" />
                    <div className='relative border rounded-md p-[35px]  my-4'>
                    <img src={imagetoggle} className='absolute right-1 top-1  cursor-pointer' onClick={handle_showpassword} width={25}/>

                    <input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        type={passtype}
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                  
                      
                    <input
                        value={confirmpassword}
                        onChange={(e) => { setConfirmpassword(e.target.value) }}
                        type={passtype}
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
  </div>
                    <button
                        onClick={(e) => validateData(e)}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-theme  text-t-theme hover:bg-darktheme focus:outline-none my-1"
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link className="no-underline border-b border-blue text-blue" to='/login'>
                        Log in
                    </Link>.
                </div>
            </div>


                        <ToastContainer/>
        </div>
    )
}
