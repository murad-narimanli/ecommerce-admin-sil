import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Avatar, Popover } from "antd";
import React, { useState } from "react";
import MenuItems from "../elements/MenuItems";
import HeaderMain from "./Header";

const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="main-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <MenuItems />
      </Sider>
      <Layout className="site-layout">
        <HeaderMain
          colorBgContainer={colorBgContainer}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "80vh",
            background: colorBgContainer,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
