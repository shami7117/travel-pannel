import Link from 'next/link'
import React from 'react'
import {BiSolidUser} from 'react-icons/bi'
import {MdEmail} from 'react-icons/md'
import {BsFillLockFill} from 'react-icons/bs'


const index = () => {
  return (
   <div className='flex justify-center items-center'>
    
    <div className="px-4 py-6 bg-white border rounded-md w-80">
      <h3 className="text-xl font-semibold ">User Registraion</h3>
      <form className="px-4 py-8">
      <div className="flex flex-col items-start justify-start mb-4 w-full">
          <label htmlFor="Username" className="text-base font-light flex items-center gap-2"><BiSolidUser /> Username</label>
          <input type="text" placeholder="Username" required className="border w-full px-2 py-2 rounded-md outline-none" />
        </div>
        <div className="flex flex-col items-start justify-start mb-4 w-full">
          <label htmlFor="Email" className="text-base font-light flex items-center gap-2"><MdEmail /> Email</label>
          <input type="email" placeholder="Email" required className="border w-full px-2 py-2 rounded-md outline-none" />
        </div>
        <div className="flex flex-col items-start justify-start mb-4 w-full">
          <label htmlFor="Password" className="text-base font-light flex items-center gap-2"><BsFillLockFill /> Password</label>
          <input type="password" placeholder="Password" required className="border w-full px-2 py-2 rounded-md outline-none"/>
        </div>
        <div className="flex flex-col items-start justify-start mb-4 w-full">
          <label htmlFor="Confirm Password" className="text-base font-light flex items-center gap-2"><BsFillLockFill /> Confirm Password</label>
          <input type="password" placeholder="Confirm Password" required className="border w-full px-2 py-2 rounded-md outline-none"/>
        </div>
        <div className="flex flex-col items-start justify-start mb-4 w-full">
          <input type="submit" value="Sign up" className="bg-blue-400 text-white px-2 py-2 rounded-md "/>
        </div>
        <div className="flex items-center justify-between mb-4 w-full gap-4">
          <Link href="/login" className="text-xs text-blue-600">Already have an Account?</Link>
        </div>
      </form>
    </div>
   </div>


  )
}

export default index