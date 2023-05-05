import React, { useRef, useEffect, useState } from "react";
import { Button, Form, Card, Row, Col, Input } from "antd";
import { UnorderedListOutlined, EditOutlined } from "@ant-design/icons";
import client from "../../../api/api";
const { TextArea } = Input;

const BlogDetail = () => {
  const [data, setData] = useState([]);
  const formRef = useRef(null);
  const [id, setId] = useState(null);
  const [date, setDate] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await client.get("blogdetail").then((res) => {
      if (res.data.length) {
        setData(res.data);
      }
    });
  };

  const onFinish = (values) => {
    if (id) {
      client.put(`blogdetail/${id}`, values).then(() => {
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
      client.post("blogdetail", values).then(() => {
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
    client.delete(`blogdetail/${id}`).then(() => {
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
                    type="subbit"
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
                
              <Button type="success" htmlType="submit" style={{ background: "green", color: "#fff" }}>
                {id ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default BlogDetail;
