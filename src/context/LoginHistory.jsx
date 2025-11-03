// // src/components/LoginHistory.jsx
// import React, { useEffect, useState } from "react";

// const LoginHistory = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const storedHistory = JSON.parse(localStorage.getItem("loginHistory")) || [];
//     setHistory(storedHistory);
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Riwayat Login</h2>
//       {history.length === 0 ? (
//         <p>Belum ada riwayat login.</p>
//       ) : (
//         <ul>
//           {history.map((item, index) => (
//             <li key={index}>
//               <strong>{item.email}</strong> login pada {item.time}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default LoginHistory;
