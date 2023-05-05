import { Button, Checkbox, Form, Input, message } from "antd";
import { logInUser } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import "../../assets/css/Login.scss";
import image from "../../assets/img/login.jpg"

const Login = (props) => {
  let { logInUser, notify, isLoggedIn } = props;

  const onFinish = async (values) => {
    let { username, password, remember } = values;
    await logInUser(username, password, remember);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (props.message.trim().length !== 0) {
      message.warning(props.message);
    }
  }, [props.message, notify]);

  return (
    <div className="loginContainer">
      <img src={image} alt=""/>
      <div className="p-5 mt-5 login-form">
        <Form
          className="form"
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}

          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h4 className="text">Bravo Login</h4>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input className="input-login" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password className="input-login" />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            // wrapperCol={{
            //   offset: 8,
            //   span: 16,
            // }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
          // wrapperCol={{
          //   offset: 8,
          //   span: 16,
          // }}
          >
            <Button type="primary" htmlType="submit" className="btnLogin">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedIn: user.isLoggedIn,
  message: user.message,
  notify: user.notify,
});

export default connect(mapStateToProps, { logInUser })(Login);
