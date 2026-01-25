'use client';
import { isValidPhoneNumber } from 'react-phone-number-input'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { set } from 'mongoose';

export default function SignupPage() {
    const [ID,setID]= useState('')
    const [joinDate, setjoinDate] = useState('')
    const [statsprojects, setstatsprojects] = useState('')
    const [statscontributions, setstatscontributions] = useState('')
    const [statsstreak, setstatsstreak] = useState('')
    const [role, setrole] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

     const fetchDetails = async () => {
        try {
            setLoading(true);
        // const response = await axios.get('/api/users/login');
        const response = await axios.post('/api/users/me',);
         console.log(response.data.user);
          setID(response.data.user.id);
        //  setUsername(response.data.user.username);
        } catch (error) {
            toast.error('Failed to fetch profile data');
        } finally {
            setLoading(false);
        }   
    };

    React.useEffect(() => {
        fetchDetails();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
    //    console.log(!/^\d{10}$/.test(PhoneNumber));
    //    alert(isValidPhoneNumber(PhoneNumber) ? "Valid Number" : "Invalid Number");

    //     if (!address) {
    //         setError('Please enter a address')
    //         return
    //     }


        setLoading(true)
        try {
            await axios.post('/api/users/save', {
              ID,
              statsstreak,
             joinDate,
              statsprojects,
              statscontributions,
             role
            })

            toast.success('Sales Details saved successfully!')
            router.push('/profile')
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) 
                ? err.response?.data?.message || err.message 
                : 'An error occurred'
            setError(errorMessage)
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
    <div>
        <div className="details-page">
          <div className="card">
            <h2>Enter Your Details</h2>
            <form encType="multipart/form-data"  onSubmit={handleSubmit }className="form">
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <input id="role" name="role"  value={role}
                        onChange={(e) => setrole(e.target.value)} type="text" placeholder='Enter Your Role
                        ' />
              </div>
             <div className="form-group">
                <label htmlFor="statsstreak">Streak</label>
                <input
                  id="statsstreak"
                  name="statsstreak"
                  type="number"
                 value={statsstreak}
                 onChange={(e) => setstatsstreak(e.target.value)}
                  placeholder="Enter Your Streak"
                />
              </div>
              <div className="form-group">
                <label htmlFor="joinDate">Enter Your Joining Date</label>
                <input id="joinDate" name="joinDate"  value={joinDate}
                        onChange={(e) => setjoinDate(e.target.value)} type="date" placeholder="Enter Your Sales" />
              </div>

              <div className="form-group">
                <label htmlFor="statsprojects">Total Projects</label>
                <input id="statsprojects" name="statsprojects" type="number" value={statsprojects}
                        onChange={(e) => setstatsprojects(e.target.value)} placeholder="Enter Your Total Projects  "/>
              </div>

              <div className="form-group">
                <label htmlFor="statscontributions">Total Contribution</label>
                <input id="statscontributions" name="statscontributions" type="number" value={statscontributions}
                        onChange={(e) => setstatscontributions(e.target.value)} placeholder="Enter Your Total Contribution "/>
              </div>

              <button type="submit" className="submit-btn" >Submit</button>

              <div className="small">We respect your privacy — your photo is used only for your profile.</div>
            </form>
          </div>

        <style>{`
          .details-page{
            min-height:100vh;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#000;
            color:#fff;
            font-family: Inter, Roboto, Arial, sans-serif;
            padding: 40px 16px;
          }

          .card{
            width: 380px;
            background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015));
            border: 1px solid rgba(255,255,255,0.06);
            box-shadow: 0 10px 30px rgba(0,0,0,0.6);
            padding: 28px;
            border-radius: 12px;
            backdrop-filter: blur(6px);
          }

          .card h2{
            margin: 0 0 18px 0;
            text-align:center;
            font-size:20px;
            letter-spacing:0.2px;
            color:#fff;
          }

          .form-group{
            display:flex;
            flex-direction:column;
            margin-bottom:12px;
          }

          label{
            font-size:13px;
            margin-bottom:6px;
            color:#cfcfcf;
          }

          input[type="text"],
          input[type="address"],
          input[type="PhoneNumber"],
          input[type="url"],
          input[type="file"]{
            padding:10px 12px;
            border-radius:8px;
            border: 1px solid rgba(255,255,255,0.08);
            background: rgba(255,255,255,0.02);
            color:#fff;
            outline:none;
            font-size:14px;
            transition: box-shadow .12s, border-color .12s, transform .08s;
          }

          input[type="file"]{
            padding:8px 10px;
          }

          input::placeholder{
            color: rgba(255,255,255,0.5);
          }

          input:focus{
            border-color: rgba(124,92,255,0.95);
            box-shadow: 0 6px 20px rgba(124,92,255,0.12);
          }

          .submit-btn{
            margin-top:4px;
            width:100%;
            padding:10px 12px;
            border-radius:8px;
            border:none;
            background: linear-gradient(90deg, #7c5cff 0%, #5bd6ff 100%);
            color:#061018;
            font-weight:700;
            cursor:pointer;
            font-size:15px;
            transition: transform .12s, box-shadow .12s;
          }

          .submit-btn:hover{
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(92,76,255,0.18);
          }

          .small{
            margin-top:12px;
            font-size:12px;
            color: #9aa3b2;
            text-align:center;
          }

          @media (max-width:420px){
            .card{ width:100%; padding:20px; border-radius:10px; }
          }
        `}</style>
      </div>
      </div>
    );
}
