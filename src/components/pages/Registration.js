// import React, { useState } from "react";
// import "../../assets/scss/Form.scss";
// import { useNavigate } from "react-router-dom";
// import db from "../../db.json" 


// const Registration = () => {
//   const navigate = useNavigate();
//   const users = db.users;

//   const registration = () => {
//     navigate("/login");
//   };

//   const [username, setUsername]=useState("");
//   const [password, setPassword]=useState("");
//   const [email, setEmail]=useState("");

//   const handleRegistration = (username, password,email) => {
//       users.push({
//         "id": Math.floor(Math.random * 100),
//         "username": username,
//         "email": email,
//         "password": password,
//         "isAdmin": false
//       })
//       navigate("/login");
//   }

//   return (
//     <div className="container">
//       <div className="registration pb-5">
//         <div class="box">
//           <span class="borderLine"></span>
//           <form action="">
//             <h2>Qeydiyyat</h2>
//             <div class="inputBox">
//             <input onChange={(e) => setUsername(e.target.value)} type="text" required="required" />
//               <span>İstifadəçi adı </span>
//               <i></i>
//             </div>
//             <div class="inputBox">
//               <input type="password" required="required" />
//               <input onChange={(e) => setPassword(e.target.value)} type="password" required="required" />
//               <span>Şifrə</span>
//               <i></i>
//             </div>
//             <div class="inputBox">
//               <input onChange={(e) => setPassword(e.target.value)} type="password" required="required" />
//               <span>Şifrənin təsdiqi</span>
//               <i></i>
//             </div>
//             <div class="inputBox">
//             <input onChange={(e) => setEmail(e.target.value)} type="email" required="required" />
//               <span>E-Mail</span>
//               <i></i>
//             </div>
//             <div class="links">
//               <a href="#">Hesabınız var?</a>
//               <a onClick={registration} href="#">
//                 Daxil ol
//               </a>
//             </div>
//             <button onClick={() => handleRegistration(username,password,email)}>
//             Qeydiyyat
//             </button>
            
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Registration;
