// // src/pages/profile/ProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// // import { fetchUserProfile } from "../../logic/ProfileLogic";
// import "./profile.css";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const { user, logout } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadProfile = async () => {
//       if (user) {
//         const data = await fetchUserProfile(user.id);
//         if (data) setProfile(data);
//       }
//     };
//     loadProfile();
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   if (!profile)
//     return (
//       <div className="loading-screen">
//         <p>Memuat data pengguna...</p>
//       </div>
//     );

//   return (
//     <div className="profile-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo-section">
//           <h2 className="logo">☕ Nova Cafe</h2>
//         </div>

//         <nav className="sidebar-nav">
//           <button onClick={() => navigate("/menu")}>
//             <ArrowLeft size={18} /> Back to menu
//           </button>

//           <button>
//             <Clock size={18} /> Riwayat Pesanan
//           </button>

//           <button>
//             <Heart size={18} /> Transaksi
//           </button>
//         </nav>

//         <button className="logout-btn" onClick={handleLogout}>
//           <LogOut size={18} /> Log Out
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="profile-content">
//         <header className="profile-header">
//           <div className="user-avatar">
//             <img src={profile.avatar || "/images/default-avatar.jpg"} alt="User Avatar" />
//           </div>
//           <h2>User Profile</h2>
//         </header>

//         <section className="profile-info">
//           <h3>Informasi Pribadi</h3>

//           <div className="info-card">
//             <User className="icon" />
//             <div>
//               <p className="label">Nama Lengkap</p>
//               <p className="value">{profile.name}</p>
//             </div>
//           </div>

//           <div className="info-card">
//             <Mail className="icon" />
//             <div>
//               <p className="label">Email</p>
//               <p className="value">{profile.email}</p>
//             </div>
//           </div>

//           <div className="info-card">
//             <Phone className="icon" />
//             <div>
//               <p className="label">Nomor Telepon</p>
//               <p className="value">{profile.phone}</p>
//             </div>
//           </div>

//           <div className="info-card">
//             <Calendar className="icon" />
//             <div>
//               <p className="label">Tanggal Lahir</p>
//               <p className="value">{profile.birthDate}</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default ProfilePage;
