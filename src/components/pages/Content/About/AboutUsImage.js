import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import {mainAboutusimage} from "../../../../const/data";
import { connect } from 'react-redux';
import { addAbout  , getAbout } from "../../../../redux/actions/index";
import {
  UnorderedListOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const Aboutusimage = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const aboutusimage = useSelector(state => state.aboutusimage.Aboutusimage  || []);


  const handleAdd = () => {
    dispatch(addAbout(text));
    setText("");
  };

  useEffect(()=>{
    dispatch(getAbout(text));
  },[])

  return (
    <div>
      {/* {aboutusimage[0]?.text} */}
   
                    <div className="border p-3 mt-0 bg-white">
                        <div className=" d-flex align-items-center page-name">
                            <UnorderedListOutlined className="me-2" />
                            <span className="font-weight-bold">About</span>
                        </div>
                    </div>
      
      <Form.Item className="mt-5" label="TextArea">
        <TextArea rows={4} value={text} onChange={(e) => setText(e.target.value)} />
      </Form.Item>
      <Button icon={<PlusOutlined />} onClick={handleAdd}>
        Add
      </Button>
      <ul>
        {mainAboutusimage.map((item, index) => (
          <li key={index}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  Aboutusimage: state.Aboutusimage
})


export default connect(mapStateToProps  , { addAbout})(Aboutusimage)