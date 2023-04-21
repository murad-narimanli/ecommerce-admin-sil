import React from "react"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import {  Avatar , Popover  , Layout , Button } from 'antd';
import { connect } from "react-redux";
import { logOut } from "../../redux/actions";
const { Header  } = Layout;

const HeaderMain = ({ setCollapsed  , colorBgContainer , collapsed , user , logOut}) =>{

    const text = <span>{user.data.first_name + ' ' + user.data.last_name}</span>;
    const content = (
        <div className="d-flex justify-content-between">
            <Button onClick={()=>{logOut()}} className="me-2 d-flex align-items-center"> <SettingOutlined/>  Log Out</Button>
            <Button className="me-2 d-flex align-items-center" > <LogoutOutlined/> Settings</Button>
        </div>
    );

    return (
        <>
            <Header
                style={{
                padding: 0,
                background: colorBgContainer,
                }}
            >
                <div className='d-flex align-items-center justify-content-between'>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                    })}
                    <Popover placement="bottomRight" title={text} content={content} trigger="click">
                        <Avatar src={user.data.avatar} className='me-3 d-flex justify-content-center align-items-center' size={30} icon={<UserOutlined />} />
                    </Popover>
                </div>
            </Header>
        </>
    )
}


const mapStateToProps = ({user}) => ({
    user
})


export default connect(mapStateToProps  , { logOut })(HeaderMain)