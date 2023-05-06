import React , {useEffect , useState} from "react";
import '../../assets/css/Home.scss'
import Image from '../../assets/img/image'


const Home = (props) => {

    return (
      <div className="full">
        <div className="container-fluid d-flex justify-content-center align-items-center p-5 bravo ">
        <img src={Image.shopping} alt="" className="text-center"/>
        </div>
        <h1 className="text-center p-5 bravo-text">BRAVO MARKET </h1>
        </div>
    );
};
export default Home;