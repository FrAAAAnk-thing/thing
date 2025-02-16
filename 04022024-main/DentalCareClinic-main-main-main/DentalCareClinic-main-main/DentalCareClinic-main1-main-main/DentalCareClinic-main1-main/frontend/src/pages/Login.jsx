import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const {backendURL, token, setToken} = useContext(AppContext)

  const navigate = useNavigate()

  const [state,setState] = useState('Sign Up')
  
  const [fname,setFName] = useState('')
  const [lname,setLName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async(event) => {
      event.preventDefault()
      console.log("Form data being submitted:", { fname, lname, email, password });

      try{
        if(state === 'Sign Up' ){
          const {data} = await axios.post(`${backendURL}/api/user/register`, {fname, lname, password, email});

          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
          }
          else{
            toast.error(data.message)
          }
        }
        else{
          const {data} = await axios.post(`${backendURL}/api/user/login`, {password, email});
          if(data.success){
            localStorage.setItem('token', data.token)
            setToken(data.token)
            console.log("Form data being submitted:", {email, password }, "log in successful");
          }
          else{
            toast.error(data.message)
          }
        }
      }
      catch(error){
        toast.error(error.message)
      }


  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-x1 text-zinc-600 text-sm shadow-lg'>
          <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login" }</p>
          <p>Please {state === 'Sign Up' ? "sign up" : "log in" } to book an appointment</p>
          {
            state === "Sign Up" && <div className='w-full'>
            <p>First Name</p>
            <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setFName(e.target.value)} value={fname} required/>
            </div>
          }
          {
            state === "Sign Up" && <div className='w-full'>
            <p>Last Name</p>
            <input type="text" className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setLName(e.target.value)} value={lname} required/>
            </div>
          }
          <div className='w-full'>
            <p>Email</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
          </div>
          <div className='w-full'>
            <p>Password</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
          </div>
          <button type='Submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login" }</button>
          {
            state === "Sign Up"
            ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here!</span></p>
            : <p>Don't have an account yet? <span onClick={()=>setState('Sign Up')}className='text-primary underline cursor-pointer'>Create account here!</span></p>
          }
        </div>
    </form>

  )
}

export default Login