import {
  FundOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const MenuItems = () => {
  const [openKeys, setOpenKeys] = useState([]);

  const rootSubmenuKeys = ["10", "21", "31", "41", "51", "61"];

  const onOpenChange = (openKeysList) => {
    const latestOpenKey = openKeysList.find(
      (key) => openKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(openKeysList);
    } else {
      const opens = latestOpenKey ? [latestOpenKey] : [];
      setOpenKeys(opens);
    }
  };

  return (
    <>
      <div className="logo">Bravo </div>
      <Menu
        openKeys={openKeys}
        mode="inline"
        theme="dark"
        onOpenChange={onOpenChange}
        className="menu-ul"
      >
        <SubMenu
          key="10"
          title={
            <span>
              <UserOutlined />
              <span>Admin</span>
            </span>
          }
        >
          <Menu.Item key="11">
            <Link className="text-decoration-none" to={`/category`}>
              <span> Categories </span>
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          key="20"
          title={
            <span>
              <FundOutlined />
              <span>Content</span>
            </span>
          }
        >
          <Menu.Item key="21">
            <Link className="text-decoration-none" to={`/productview`}>
              <span> Products </span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="30"
          title={
            <span>
              <FundOutlined />
              <span>About</span>
            </span>
          }
        >
          <Menu.Item key="31">
            <Link className="text-decoration-none" to={`/title`}>
              <span> Başlıq </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="32">
            <Link className="text-decoration-none" to={`/vision`}>
              <span> Viziyonumuz </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="33">
            <Link className="text-decoration-none" to={`/mission`}>
              <span> Missiyamız </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="34">
            <Link className="text-decoration-none" to={`/aboutstore`}>
              <span> Haqqımızda </span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="40"
          title={
            <span>
              <FundOutlined />
              <span>Slider</span>
            </span>
          }
        >
          <Menu.Item key="41">
            <Link className="text-decoration-none" to={`/mainslider`}>
              <span> Əsas Slider </span>
            </Link>
          </Menu.Item>
         
        </SubMenu>
        <SubMenu
          key="50"
          title={
            <span>
              <FundOutlined />
              <span>Blog</span>
            </span>
          }
        >
          <Menu.Item key="51">
            <Link className="text-decoration-none" to={`/blog`}>
              <span>Blog </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="52">
            <Link className="text-decoration-none" to={`/blogdetail/id`}>
              <span>BlogDetail </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="53">
            <Link className="text-decoration-none" to={`/discountnews`}>
              <span>Endirim xeberleri </span>
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="60"
          title={
            <span>
              <FundOutlined />
              <span>Stock product</span>
            </span>
          }
        >
          {" "}
          <Menu.Item key="53">
            <Link className="text-decoration-none" to={`/productstock`}>
              <span>Stock products </span>
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
};

export default MenuItems;
