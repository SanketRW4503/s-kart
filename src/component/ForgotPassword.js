import { validate } from "email-validator";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";



export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [passStatus, setPassStatus] = useState(false);
    const [passchange, setPassChange] = useState(false)
    const [linkstatus, setLinkStatus] = useState(false)

    const params = useParams()

    function valdiate_email() {

        if (!validate(email)) {
            toast.error('INVALID EMAIL ');
        } else {
            toast.loading('Proccessing...')
            let userdata = { email: email }
            userdata = JSON.stringify(userdata);
            console.log(userdata)
            applyfor_link(userdata)
        }

    }

    function validate_pass() {

        if (password !== confirmpassword) {
            toast.error('Confirm Password & New Password Mismatch !');

        } else if (password.length < 8) {
            toast.error('Password Length Should be gretter than 8');
        } else {
            toast.loading('Processing...');
            let userdata = { newpassword: password }
            userdata = JSON.stringify(userdata);
            changepassword(userdata)
        }

    }
    // this will contact server and  validates the data and change the user password to new password
    async function changepassword(userdata) {
        const res = await fetch(process.env.CHANGE_PASSWORD + params?.id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, withCredntials: true,
            credentials: 'include',
            body: userdata
        });
        const json = await res.json()
        if (json.success == true) {
            toast.dismiss()
            setPassChange(true);
        } else {
            toast.dismiss()
            toast.error(json.message)

        }

    }

    // this function will ask to server to sent forgot password link to user email address
    async function applyfor_link(userdata) {

        const res = await fetch(process.env.MAIL_FORGOT_PASSWORD_LINK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, withCredntials: true,
            credentials: 'include',
            body: userdata
        });
        const json = await res.json()

        console.log(json)
        if (json.success == true) {
            setLinkStatus(true);
            toast.dismiss()
            toast.success('Password Reset Link sent to your email address !')
        } else {
            setLinkStatus(false);

            toast.dismiss()
        }

    }

    useEffect(() => {
        if (params?.id == undefined) {
            setPassStatus(false)
        } else {
            setPassStatus(true)
        }
    }, [])

    if (passStatus == true) {
        return (

            // new password component

            <div className="h-[500px] flex items-center flex-col">

                {
                    passchange == true ? <div className="my-[50px] flex flex-col justify-center items-center bg-lightslate p-[20px] rounded-md">
                        <div className="font-semibold ">Password Changed Successfully !</div>
                        <Link to={'/login'} ><button className="bg-theme text-t-theme px-[10px] py-1 rounded-md">Login Now</button></Link>
                    </div> : null
                }
                <div className='flex flex-col rounded-md my-[20px]  p-[10px] items-center justify-center m-[auto] border w-[80%] bg-lightslate'>
                    <div className='font-semibold'>New Password</div>
                    <input type='password'
                        className="border my-[5px] w-[80%]"
                        required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className='font-semibold'>Confirm New Password</div>

                    <input type='password'
                        className="border my-[5px] w-[80%]"
                        required value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button onClick={validate_pass}
                        className="bg-theme w-[80%] text-t-theme px-[20px] py-1 ">submit</button>
                </div>
            </div>)

    } else {


        // apply for password link 
        return (


            <div className="h-[500px] flex items-center flex-col">

                {
                    linkstatus == true ? <div className="my-[50px] flex flex-col justify-center items-center bg-lightslate p-[20px] rounded-md">
                        <div className="font-semibold ">Password Reset Link is sent to your Email Id</div>
                        <p>Check Your Mail Indox</p>
                    </div> : null
                }
                <div className='flex flex-col rounded-md my-[20px]  p-[10px] items-center justify-center m-[auto] border w-[80%] bg-lightslate'>
                    <div className='font-semibold'>Enter Your S-Kart Account Email ID</div>
                    <input type='email'
                        className="border my-[5px] w-[80%]"
                        required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={valdiate_email}
                        className="bg-theme w-[80%] text-t-theme px-[20px] py-1 ">submit</button>
                </div>
            </div>
        )

    }
}
