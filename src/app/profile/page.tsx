'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'wouter';
import { toast } from 'react-hot-toast';
import { User, MapPin, Phone, Mail, LogOut, Activity, Award, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    // const [_, setLocation] = useLocation();
    const [data, setdata] = useState<any>(null);
    const [loading, setLoading] = useState(false);
const router=useRouter();
    // Mock data for charts
    const activityData = [
        { name: 'Mon', activity: 40 },
        { name: 'Tue', activity: 30 },
        { name: 'Wed', activity: 20 },
        { name: 'Thu', activity: 27 },
        { name: 'Fri', activity: 18 },
        { name: 'Sat', activity: 23 },
        { name: 'Sun', activity: 34 },
    ];

    const performanceData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
    ];

    const fetchProfile = async () => {
        try {
            setLoading(true);
            // Simulating API call since backend is not available in mockup mode
            // await new Promise(resolve => setTimeout(resolve, 800));
            
            // const mockUser = {
            //     username: "johndoe",
            //     fullName: "John Doe",
            //     email: "john@example.com",
            //     phone: "+1 (555) 123-4567",
            //     address: "123 Innovation Drive, Tech City, CA",
            //     photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            //     role: "Senior Developer",
            //     joinDate: "January 2024",
            //     stats: {
            //         projects: 12,
            //         contributions: 1450,
            //         streak: 15
            //     }
            // };
            
            // setdata(mockUser);
            // Original logic preserved but commented out for mockup
            const response = await axios.post('/api/users/me');
            console.log("response",response.data.user);
            setdata(response.data.user);
        } catch (error) {
            toast.error('Failed to fetch profile data');
        } finally {
            setLoading(false);
        }   
    }

    React.useEffect(() => {
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            setLoading(true);
            // await axios.get('/api/users/logout');
            await new Promise(resolve => setTimeout(resolve, 500));
            toast.success('Logged out successfully');
          router.push('/login');
        } catch (error) {
            toast.error('Failed to logout');
        } finally {
            setLoading(false);
        }
    };
    
console.log("data outside",data);
    if(data) {
        return (
            <div className="bg-light min-vh-100">
                {/* Navigation */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
                    <div className="container">
                        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
                            <div className="d-flex align-items-center gap-2">
                                <div className="bg-primary rounded p-1 d-flex align-items-center justify-content-center">
                                    <Activity className="text-white" size={20} />
                                </div>
                                <span>DevProfile</span>
                            </div>
                        </a>
                        <div className="d-flex gap-3 align-items-center">
                            <a href="/" className="text-decoration-none text-secondary">Home</a>
                             <a href="/add-details" className="text-decoration-none text-dark fw-bold">Update Profile</a>
                            <a href="/profile" className="text-decoration-none text-dark fw-bold">Profile</a>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                            >
                                {loading ? 'Logging out...' : <><LogOut size={16} /> Logout</>}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container pt-5 mt-5 pb-5">
                    <div className="row g-4">
                        {/* Left Sidebar - Profile Info */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body text-center pt-5 pb-4">
                                    <div className="position-relative d-inline-block mb-4">
                                        <img 
                                            src={data.photo} 
                                            alt={data.username} 
                                            className="rounded-circle border border-4 border-white shadow"
                                            style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                        />
                                        <span className="position-absolute bottom-0 end-0 bg-success p-2 rounded-circle border border-2 border-white"></span>
                                    </div>
                                    <h3 className="h4 fw-bold mb-1">{data.fullName}</h3>
                                    <p className="text-muted mb-4">@{data.username}</p>
                                    
                                    <div className="d-flex justify-content-center gap-2 mb-4">
                                        <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                            {data.role}
                                        </span>
                                        <span className="badge bg-secondary-subtle text-secondary px-3 py-2 rounded-pill d-flex align-items-center gap-1">
                                            <Calendar size={12} /> Joined {data.joinDate}
                                        </span>
                                    </div>

                                    <hr className="my-4" />

                                    <div className="text-start px-3">
                                        <div className="d-flex align-items-center gap-3 mb-3 text-secondary">
                                            <Mail size={18} />
                                            <span>{data.email}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 mb-3 text-secondary">
                                            <Phone size={18} />
                                            <span>{data.phone}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-3 text-secondary">
                                            <MapPin size={18} />
                                            <span>{data.address}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Stats & Charts */}
                        <div className="col-lg-8">
                            <div className="row g-4 mb-4">
                                <div className="col-md-4">
                                    <div className="card border-0 shadow-sm bg-primary text-white h-100">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="mb-1 opacity-75">Projects</p>
                                                    <h3 className="fw-bold mb-0">{data.statsprojects}</h3>
                                                </div>
                                                <div className="bg-white bg-opacity-25 p-2 rounded">
                                                    <Award size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="text-muted mb-1">Contributions</p>
                                                    <h3 className="fw-bold mb-0 text-dark">{data.statscontributions}</h3>
                                                </div>
                                                <div className="bg-success-subtle p-2 rounded text-success">
                                                    <Activity size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <p className="text-muted mb-1">Current Streak</p>
                                                    <h3 className="fw-bold mb-0 text-dark">{data.statsstreak} Days</h3>
                                                </div>
                                                <div className="bg-warning-subtle p-2 rounded text-warning">
                                                    <User size={24} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-4">
                                <div className="col-md-7">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                                            <h5 className="fw-bold mb-0">Weekly Activity</h5>
                                        </div>
                                        <div className="card-body px-2">
                                            <div style={{ width: '100%', height: 300 }}>
                                                <ResponsiveContainer>
                                                    <AreaChart data={activityData}>
                                                        <defs>
                                                            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                                                <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8}/>
                                                                <stop offset="95%" stopColor="#0d6efd" stopOpacity={0}/>
                                                            </linearGradient>
                                                        </defs>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                        <XAxis 
                                                            dataKey="name" 
                                                            axisLine={false} 
                                                            tickLine={false} 
                                                            tick={{fill: '#6c757d', fontSize: 12}}
                                                            dy={10}
                                                        />
                                                        <YAxis 
                                                            axisLine={false} 
                                                            tickLine={false} 
                                                            tick={{fill: '#6c757d', fontSize: 12}}
                                                        />
                                                        <Tooltip 
                                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                        />
                                                        <Area 
                                                            type="monotone" 
                                                            dataKey="activity" 
                                                            stroke="#0d6efd" 
                                                            strokeWidth={3}
                                                            fillOpacity={1} 
                                                            fill="url(#colorActivity)" 
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-white border-0 px-4 pb-4">
                                            <button
                                                onClick={() => router.push('/daily-update')}
                                                className="btn btn-primary w-100"
                                            >
                                                Update contribution
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="card border-0 shadow-sm h-100">
                                        <div className="card-header bg-white border-0 pt-4 px-4 pb-0">
                                            <h5 className="fw-bold mb-0">Performance</h5>
                                        </div>
                                        <div className="card-body px-2">
                                            <div style={{ width: '100%', height: 300 }}>
                                                <ResponsiveContainer>
                                                    <BarChart data={performanceData}>
                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                                        <XAxis 
                                                            dataKey="name" 
                                                            axisLine={false} 
                                                            tickLine={false}
                                                            tick={{fill: '#6c757d', fontSize: 12}}
                                                            dy={10}
                                                        />
                                                        <Tooltip 
                                                            cursor={{fill: 'rgba(0,0,0,0.05)'}}
                                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                                        />
                                                        <Bar 
                                                            dataKey="value" 
                                                            fill="#20c997" 
                                                            radius={[4, 4, 0, 0]}
                                                        />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="min-vh-100 bg-light">
                      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
                    <div className="container">
                        <a className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/">
                            <div className="d-flex align-items-center gap-2">
                                <div className="bg-primary rounded p-1 d-flex align-items-center justify-content-center">
                                    <Activity className="text-white" size={20} />
                                </div>
                                <span>DevProfile</span>
                            </div>
                        </a>
                        <div className="d-flex gap-3 align-items-center">
                            <a href="/" className="text-decoration-none text-secondary">Home</a>
                             <a href="/add-details" className="text-decoration-none text-dark fw-bold">Update Profile</a>
                            <a href="/profile" className="text-decoration-none text-dark fw-bold">Profile</a>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="btn btn-danger btn-sm d-flex align-items-center gap-2"
                            >
                                {loading ? 'Logging out...' : <><LogOut size={16} /> Logout</>}
                            </button>
                        </div>
                    </div>
                </nav>
                <div className="d-flex align-items-center justify-content-center min-vh-100">
                    <div className="card border-0 shadow p-5 text-center" style={{ maxWidth: '400px' }}>
                        <div className="mb-4 text-muted">
                            <User size={48} className="mx-auto" />
                        </div>
                        <h2 className="h4 font-weight-bold mb-4">No Profile Data</h2>
                        {loading ? (
                            <div className="spinner-border text-primary mx-auto" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <button 
                                onClick={fetchProfile}
                                className="btn btn-primary w-100 py-2"
                            >
                                Retry Connection
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}



// 'use client';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import React, { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'react-hot-toast'
// import axios from 'axios'

// export default function ProfilePage() {
//     const router = useRouter();
//     const [data, setdata] = useState();
// //   const [username, setUsername] = useState('')
// //       const [PhoneNumber, setPhoneNumber] = useState('')
// //       const [photo, setphoto] = useState('')
// //       const [address, setaddress] = useState('')
//     const [loading, setLoading] = useState(false);

//     const fetchProfile = async () => {
//         try {
//             setLoading(true);
//         // const response = await axios.get('/api/users/login');
//         const response = await axios.post('/api/users/me',);
//         // setUsername(response.data.user.username);
//         const data=response.data.user;
//         setdata(data);
//         } catch (error) {
//             toast.error('Failed to fetch profile data');
//         } finally {
//             setLoading(false);
//         }   
//     }

//     React.useEffect(() => {
//         fetchProfile();
//     }, []);

// console.log("data outside",data);
//     const handleLogout = async () => {
//         try {
//             setLoading(true);
//             const response = await axios.get('/api/users/logout');
//             toast.success('Logged out successfully');
//             router.push('/login');
//         } catch (error) {
//             toast.error('Failed to logout');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if(data) {
//     return (
//         <>
//              <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-16">
//                 <div className="font-bold text-lg">Logo</div>
//                 <div className="flex gap-4 items-center">
//                     <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
//                     <a href="/profile" className="text-gray-700 hover:text-gray-900">Profile</a>
//                     <button
//                     onClick={handleLogout}
//                     disabled={loading}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
//                     >
//                     {loading ? 'Logging out...' : 'Logout'}
//                     </button>
//                 </div>
//                 </div>
//             </div>
//             </nav>
//                     </>
//     )}else{
//         return (
//             <>
//             <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between items-center h-16">
//                 <div className="font-bold text-lg">Logo</div>
//                 <div className="flex gap-4 items-center">
//                     <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
//                     <a href="/profile" className="text-gray-700 hover:text-gray-900">Profile</a>
//                     <button
//                     onClick={handleLogout}
//                     disabled={loading}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
//                     >
//                     {loading ? 'Logging out...' : 'Logout'}
//                     </button>
//                 </div>
//                 </div>
//             </div>
//             </nav>
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
//                     <h1 className="text-2xl font-bold mb-6 text-center">No Profile Data</h1>
//                     <a href="/add-details" className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//                         Add Your Details
//                     </a>
//                 </div>
//             </div>
//             </>
//         )
//     }
//     }
