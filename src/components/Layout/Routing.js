import {Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import NoPage from "../elements/NoPage";
import Categories from "../pages/Admin/Categories/Categories";
import MainSlider from "../pages/Slider/MainSlider";
import Seasonaloffers from "../pages/Slider/Seasonaloffers"
import Chooseyouslider from "../pages/Slider/Chooseyouslider";
import Weekoffers from "../pages/Slider/Weekoffers";
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
const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/productview" element={<ProductView />} />
            <Route path="/mainslider" element={<MainSlider />} />
            <Route path="/title" element={<Title />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/aboutstore" element={<Aboutstore />} />
            <Route path="/blogdetail/:id" element={<BlogDetail />} />
            <Route path="/seasonaloffers" element={<Seasonaloffers />} />
            <Route path="/chooseyouslider" element={<Chooseyouslider />} />
            <Route path="/weekoffers" element={<Weekoffers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/discountnews" element={<Discountnews />} />

            <Route path="productcreate" element={<ProductCreate/>}/>
            <Route path="productupdate/:id" element={<ProductEdit/>}/>








            

            {/* <Route path="/results/:id" element={<Detail />} /> */}
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default Routing;