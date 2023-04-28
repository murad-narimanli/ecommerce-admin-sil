import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Form,
  Card,
  Row,
  Col,
} from "antd";
import JoditEditor from "jodit-react";
import {
  UnorderedListOutlined,
  EditOutlined,DeleteOutlined
} from "@ant-design/icons";
import client from '../../../api/api'
import axios from "axios";


const Blog = () => {
  const [data, setData] = useState([]);
  const [file, setFile] = useState({});
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState([]);
 const getBase64 = (file) => {
    console.log(file, "base64");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      console.log(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
    const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };
  const onChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
    if (newFileList.length <= 0) {
      setFile(null);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await client.get("blog").then((res) => {
      if (res.data.length) {
        setData(res.data);
      }
    });
  };

 



  const deleteData = (data) => {
    client
      .delete(`blog/${data.id}`)
      .then((res) => {
        console.log("Data deleted successfully");
        getData();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };
  const formRef = useRef(null);

  const [id, setId] = useState(null);

  const onFinish = (values) => {
    client.put(`blog/1`, values).then((res) => {
      console.log("OK");
      getData();
    });
    formRef.current.resetFields();
  };

  const editData = (data) => {
    setId(data.id);
    const obj = {
      blog: data.blog,
    };
    formRef.current.setFieldsValue(obj);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
   const setUploadFile = ({ onSuccess, onError, file }) => {
    console.log(file);
    let form_data = new FormData();
    const filename = Math.random(1, 999999) + Date.now() + file.name;
    form_data.append("image", file, filename);
    axios
      .post("https://dev-layf.vac.az/api/Upload/Image", form_data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setFile(res.data);
        onSuccess(null, file);
      })
      .catch((err) => onError());
  };

  

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <div className="border p-3 mt-0 bg-white">
            <div className=" d-flex align-items-center page-name">
              <UnorderedListOutlined className="me-2" />
              <span className="font-weight-bold"></span>
            </div>
          </div>
        </Col>
        <Col md={24}>
          {data.map((d) => {
            return (
              <Card
              cover={
                <img className="border w-100" alt="example" src={d.blogimage} />
              }
                style={{ width: "100%" }}
                actions={[
                  <EditOutlined
                    onClick={() => {
                      editData(d);
                    }}
                    key="edit"
                  />,
                  <DeleteOutlined
                    onClick={() => {
                      deleteData(d);
                    }}
                    key="delete"
                  />
                ]}
              >
                
    
                 {data.map((d) => (
                  <div>
                    
                    <div dangerouslySetInnerHTML={{ __html:  d[`blog`] }} />
                  </div>
                ))}
          
              </Card>
             
            );
           
          })}
                 
        </Col>
        <Col md={24}>
          <div className="border pt-5 p-3">
            <Form
              ref={formRef}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label={"Mətn"}
                name="blog"
                rules={[
                  {
                    required: true,
                    message: "Please input content!",
                  },
                ]}
              >
                <JoditEditor />
              </Form.Item>

              <div className="d-flex">
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {id ? "Edit" : "Add"}
                  </Button>
                </Form.Item>

                <Button
                  onClick={() => {
                    setId(null);
                    formRef.current.resetFields();
                  }}
                  className="ms-3"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      
      </Row>
    </div>
  );
};

export default Blog;
