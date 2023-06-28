import { validate } from 'email-validator';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { setLoginStatus } from '../utility/loginSlice';
import { useDispatch } from 'react-redux';





export default function LoginPage() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()
    let dispatch = useDispatch()



    function ValidateData(e) {
        e.preventDefault();
        let userData = { email: email, password: password };
        if (!validate(email)) {
            toast.error('INVALID EMAIL')
        } else if (password.length < 8) {
            toast.error('PASSWORD LENGTH SHOULD BE GREATER THAN 8')
        } else {

            userData = JSON.stringify(userData)
            console.log(userData)
            loginUser(userData)

        }


    }

    async function loginUser(userData) {
        let res = await fetch('https://s-kart-backend.onrender.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, withCredntials: true,
            credentials: 'include',
            body: userData
        })
        let json = await res.json()
        if (json.success) {
            dispatch(setLoginStatus(true));
            navigate('/');
            toast.success('' + json.message);
        } else {
            dispatch(setLoginStatus(false));
            toast.error(json.message);
        }

    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8  ">

            <ToastContainer />
            <div className=" sm:mx-auto sm:w-full sm:max-w-sm bg-slate-100 p-8 rounded-md">
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>

                <form className="space-y-6" >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input onChange={(e) => setEmail(e.target.value)} value={email}
                                id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input onChange={(e) => setPassword(e.target.value)} value={password}
                                id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={(e) => ValidateData(e)}
                            type="submit" className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                    </div>

                    <div className="text-grey-dark mt-6">
                        Dont have an account?
                        <Link className="no-underline border-b border-blue text-blue" to={'/signup'}>
                            Create Account Now !
                        </Link>.
                    </div>
                </form>


            </div>
        </div>
    )
}
