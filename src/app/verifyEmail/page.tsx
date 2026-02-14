'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'mongoose';
import { useRouter } from 'next/router';

export default function VerifyEmailPage() {
    // const router=useRouter();
  const [token,settoken] = useState("");
  const[ verified,setverified]=useState(false)
  const [error,seterror]=useState(false);

  const verifyUseremail = async () =>{
    try{
    await axios.post('/api/users/verifyemail', { token })
    setverified(true)
  }catch(error:any){
    seterror(true)
    console.log(error.response.data);
  }
}

useEffect(()=>{
    const urlToken=window.location.search.split("=")[1]
    settoken(urlToken || "")

    // const {query}=router;
    // console.log(query); 
    // const urlToken = query.token as string;;
    // settoken(urlToken || "")
})

useEffect(()=>{
    if(token.length>0){
        verifyUseremail();
    }
},[token])

return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        {token ? (
        <div className="w-full max-w-md">
            <button onClick={verifyUseremail}>Confirm,its you</button>
            </div>):(<p>Loading...</p>
        )}
        {verified && <p className="text-green-500">Email verified successfully!</p>}
        {error && <p className="text-red-500">Verification failed. Please try again.</p>}
    </div>  

)
}
