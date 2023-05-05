// import React, { useRef, useEffect, useState } from "react";
// import {
//   Button,
//   Form,
//   Card,
//   Row,
//   Col,
//   Input
// } from "antd";
// import {
//   UnorderedListOutlined,
//   EditOutlined,
//  } from "@ant-design/icons";
// import client from "../../../api/api";
// const {TextArea } = Input

// const Blog = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     await client.get("blog").then((res) => {
//       if (res.data.length) {
//         setData(res.data);
//       }
//     });
//   };

//   const formRef = useRef(null);

//   const [id, setId] = useState(null);

//   const onFinish = (values) => {
//     client.put(`blog/1`, values).then((res) => {
//       console.log("OK");
//       getData();
//     });
//     formRef.current.resetFields();
//   };

//   const editData = (data) => {
//     setId(data.id);
//     const obj = {
//       blog: data.blog,
//     };
//     formRef.current.setFieldsValue(obj);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   return (
//     <div>
//       <Row gutter={[16, 16]}>
//         <Col xs={24}>
//           <div className="border p-3 mt-0 bg-white">
//             <div className=" d-flex align-items-center page-name">
//               <UnorderedListOutlined className="me-2" />
//               <span className="font-weight-bold">Haqqımızda</span>
//             </div>
//           </div>
//         </Col>
//         <Col md={12}>
//           {data.map((d) => {
//             return (
//               <Card
//                 style={{ width: "100%" }}
//                 actions={[
//                   <EditOutlined
//                     onClick={() => {
//                       editData(d);
//                     }}
//                     key="edit"
//                   />,
//                 ]}
//               >

//                  {data.map((d) => (
//                   <div>
//                     <h6>Haqqımızda</h6>
//                     <p> {d[`blog`]} </p>
//                   </div>
//                 ))}

//               </Card>

//             );

//           })}

//         </Col>
//         <Col md={12}>
//           <div className="border pt-5 p-3">
//             <Form
//               ref={formRef}
//               name="basic"
//               onFinish={onFinish}
//               onFinishFailed={onFinishFailed}
//               autoComplete="off"
//             >
//               <Form.Item
//                 label={"Mətn"}
//                 name="blog"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input content!",
//                   },
//                 ]}
//               >
//             <TextArea placeholder='Title' />

//               </Form.Item>

//               <div className="d-flex">
//                 <Form.Item>
//                   <Button type="primary" htmlType="submit">
//                     {id ? "Edit" : "Add"}
//                   </Button>
//                 </Form.Item>

//                 <Button
//                   onClick={() => {
//                     setId(null);
//                     formRef.current.resetFields();
//                   }}
//                   className="ms-3"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </Form>
//           </div>
//         </Col>

//       </Row>
//     </div>
//   );
// };

// export default Blog;

import React, { useRef, useEffect, useState } from "react";
import { Button, Form, Card, Row, Col, Input } from "antd";
import { UnorderedListOutlined, EditOutlined } from "@ant-design/icons";
import client from "../../../api/api";
const { TextArea } = Input;

const Blog = () => {
  const [data, setData] = useState([]);
  const formRef = useRef(null);
  const [id, setId] = useState(null);
  const [date, setDate] = useState(null);

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

  const onFinish = (values) => {
    if (id) {
      client.put(`blog/${id}`, values).then(() => {
        console.log("Data updated successfully");
        getData();
      });
    } else {
      const newData = [
        ...data,
        {
          id: data.length + 1,
          date: date,
          ...values,
        },
      ];
      client.post("blog", values).then(() => {
        console.log("Data added successfully");
        getData();
      });
      setData(newData);
    }
    setId(null);
    setDate(null);

    formRef.current.resetFields();
  };

  const editData = (data) => {
    setId(data.id);
    setDate(data.date);
    const obj = {
      title: data.title,
      image: data.image,
      text: data.text,
    };
    formRef.current.setFieldsValue(obj);
  };

  const deleteData = (id) => {
    client.delete(`blog/${id}`).then(() => {
      console.log("Data deleted successfully");
      getData();
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <div className="border p-3 mt-0 bg-white">
            <div className=" d-flex align-items-center page-name">
              <UnorderedListOutlined className="me-2" />
              <span className="font-weight-bold">Data</span>
            </div>
          </div>
        </Col>
        <Col md={12}>
          {data.map((d) => {
            return (
              <Card
                key={d.id}
                style={{ width: "70%" }}
                actions={[
                  <EditOutlined
                    onClick={() => {
                      editData(d);
                    }}
                    key="edit"
                    style={{ color: "#fff" }}
                  />,
                  <Button
                    onClick={() => {
                      deleteData(d.id);
                    }}
                    key="delete"
                    type="success"
                    style={{ color: "#fff" }}
                  >
                    Delete
                  </Button>,
                ]}
              >
                <div className="mb-2">
                  <img
                    src={d.image}
                    alt={d.title}
                    style={{ maxWidth: "100%" }}
                  />
                </div>
                <h2>{d.title}</h2>
                <p>{d.text}</p>
                <p>{d.date}</p>
              </Card>
            );
          })}
        </Col>
        <Col md={12}>
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            ref={formRef}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Image URL"
              name="image"
              rules={[{ required: true, message: "Please input image URL!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Text"
              name="text"
              rules={[{ required: true, message: "Please input text!" }]}
            >
              <TextArea />
            </Form.Item>
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                type="success"
                htmlType="submit"
                style={{ background: "green", color: "#fff" }}
              >
                {id ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Blog;
