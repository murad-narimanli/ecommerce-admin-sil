import { Button, Checkbox, Form, Input, Row , Col  , message} from 'antd';
import { logInUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Login = (props) => {

    let {logInUser  , notify , isLoggedIn} = props

    const onFinish =  async (values) => {
       let {username , password , remember } = values
       await logInUser(username , password , remember)
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
      
    };

    useEffect(() => {
        if (props.message.trim().length !== 0) {
          message.warning(props.message);
        }
    }, [props.message, notify]);
    
    

    return (
        <div>
                <div className='p-5 mt-5 bg-white'>
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                        marginTop:'50px',
                    maxWidth: 1000,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
    
                    <h4 className='text-center mb-5'>Domain Finder Login</h4>
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
    
                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
    
                    <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
    
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
                </div>
        </div>
    );

}


const mapStateToProps = ({user}) => ({
    loggedIn: user.isLoggedIn,
    message: user.message,
    notify: user.notify,
})


export default connect(mapStateToProps  , { logInUser })(Login)
// import React from "react";
// import "../../assets/scss/Form.scss";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import db from "../../db.json" 
// const Login = () => {
  
//   const navigate = useNavigate();
//   const users = db.users;

//   const registration = () => {
//     navigate("/registration");
//   };

//   const [username, setUsername]=useState("");
//   const [password, setPassword]=useState("");

//   const handleLogin = (username, password) => {
//       const user = users.find((obj) => obj.username === username && obj.password === password);
//       if(user){
//         navigate("/");
//         console.log("user",user);
//       }
//   }

//   return (
//     <div className="container login">
//       <div class="box">
//         <span class="borderLine"></span>
//         <form action="">
//           <h2>Daxil Ol</h2>
//           <div class="inputBox">
//             <input onChange={(e) => setUsername(e.target.value)} type="text" required="required" />
//             <span>İstifadəçi adı </span>
//             <i></i>
//           </div>
//           <div class="inputBox">
//             <input onChange={(e) => setPassword(e.target.value)} type="password" required="required" />
//             <span>Şifrə</span>
//             <i></i>
//           </div>
//           <div class="links">
//             <a href="#">Şifrəni unutmusunuz?</a>
//             <a onClick={registration} href="#">
//               Qeydiyyat
//             </a>
//           </div>
//           <button onClick={() => handleLogin(username,password)}>Daxil Ol</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;