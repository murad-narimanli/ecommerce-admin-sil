import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import NoPage from "../elements/NoPage";
import Category from "../pages/Admin/Categories/Category";
import MainSlider from "../pages/Slider/MainSlider";
import Blog from "../pages/Blog/Blog";
import Discountnews from "../pages/Blog/Discountnew";
import Title from "../pages/Content/About/Title";
import Vision from "../pages/Content/About/Vision"
import Mission from "../pages/Content/About/Mission";
import Aboutstore from "../pages/Content/About/Aboutstore";
import BlogDetail from "../pages/Blog/BlogDetails"
import ProductView from "../pages/Content/Products/ProductView";
import ProductCreate from "../pages/Content/Products/ProductCreate";
import ProductEdit from "../pages/Content/Products/ProductEdit";
import Stockproduct from "../pages/Admin/Stockproduct"
import OrderInfo from "../pages/Admin/OrderInfo";
const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category/>} />
            <Route path="/productview" element={<ProductView />} />
            <Route path="/mainslider" element={<MainSlider />} />
            <Route path="/title" element={<Title />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/aboutstore" element={<Aboutstore />} />
            <Route path="/blogdetail/:id" element={<BlogDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/discountnews" element={<Discountnews />} />
            <Route path="productcreate" element={<ProductCreate/>}/>
            <Route path="productupdate/:id" element={<ProductEdit/>}/>
            <Route path="productstock" element={<Stockproduct/>}/>
            <Route path="orderinfo" element={<OrderInfo/>}/>






            

            {/* <Route path="/results/:id" element={<Detail />} /> */}
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default Routing;