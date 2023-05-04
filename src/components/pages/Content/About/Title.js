import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Select,
  Form,
  Input,
  Card,
  Row,
  Col,
  Popconfirm,
  message,
} from "antd";
import JoditEditor from "jodit-react";
import {
  UnorderedListOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import client from "../../../../api/api";

const Title = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await client.get("title").then((res) => {
      if (res.data.length) {
        setData(res.data);
      }
    });
  };

  const formRef = useRef(null);

  const [id, setId] = useState(null);

  const onFinish = (values) => {
    client.put(`title/1`, values).then((res) => {
      console.log("OK");
      getData();
    });
    formRef.current.resetFields();
  };

  const editData = (data) => {
    setId(data.id);
    const obj = {
      title: data.title,
    };
    formRef.current.setFieldsValue(obj);
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
              <span className="font-weight-bold">Haqqımızda</span>
            </div>
          </div>
        </Col>
        <Col md={24}>
          {data.map((d) => {
            return (
              <Card
                style={{ width: "100%" }}
                actions={[
                  <EditOutlined
                    onClick={() => {
                      editData(d);
                    }}
                    key="edit"
                    style={{color:"#fff"}}
                  />,
                ]}
              >
                {data.map((d) => (
                  <div>
                    <h6>Başlıq</h6>
                    <div dangerouslySetInnerHTML={{ __html: d[`title`] }} />
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
                label={"Başlıq"}
                name="title"
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
                  <Button
                    htmlType="submit"
                    style={{ background: "green", color: "#fff" }}
                  >
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

export default Title;
