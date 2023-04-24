// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import {Row , Col } from 'antd';
// import { addImage } from"../../../redux/actions/index";
//   import { Images } from "../../../const/data";
// import { connect } from "react-redux";
// import {
//   UnorderedListOutlined,
// } from '@ant-design/icons';


// function MainSlider() {
//   const [imageUrl, setImageUrl] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addImage(imageUrl));
//     setImageUrl("");
//   };

//   return (
//     <div>
//        <Row gutter={[16,16]}>
//                 <Col xs={24}>
//                     <div className="border p-3 mt-0 bg-white">
//                         <div className=" d-flex align-items-center page-name">
//                             <UnorderedListOutlined className="me-2" />
//                             <span className="font-weight-bold">Əsas Slider</span>
//                         </div>
//                     </div>
//                 </Col>
//                 <Col md ={12}>
//                 <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />
//         <button type="submit">Add Image</button>
//       </form>
//                 </Col>
//                 </Row>
     
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   Image: state.Image
// })


// export default connect(mapStateToProps  , { addImage})(MainSlider)

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { getImage, addImage } from "../../../redux/actions/mainactionslider";
import { connect } from "react-redux";
import { UnorderedListOutlined } from "@ant-design/icons";

function MainSlider() {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addImage(imageUrl));
    setImageUrl("");
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <div className="border p-3 mt-0 bg-white">
            <div className=" d-flex align-items-center page-name">
              <UnorderedListOutlined className="me-2" />
              <span className="font-weight-bold">Əsas Slider</span>
            </div>
          </div>
        </Col>
        <Col md={12}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value) }/>
            <button type="submit">Add Image</button>
          </form>
        </Col>
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => ({
  sliderimages: state.sliderimages,
  });
  
  export default connect(mapStateToProps, { getImage,addImage })(MainSlider);





