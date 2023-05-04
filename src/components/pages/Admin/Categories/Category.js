// import React , {useRef , useState} from 'react';
// import { Button, Select, Form, Input, InputNumber  , Row , Col } from 'antd';
// import { ProductCategories } from '../../../../const/data';
// import CollapsData from '../../../elements/CollapsData';
// import { addProduct , editProduct , deleteProduct  } from '../../../../redux/actions';
// import { connect } from 'react-redux';
// import {
//     UnorderedListOutlined,
//   } from '@ant-design/icons';

// const {Option} = Select

// const Categories = ( { addProduct , editProduct , deleteProduct , products  } ) => {
//     const formRef = useRef(null);

//     const [id , setId] = useState(null)

//     const onFinish = (values) => {
//        if(id){
//             editProduct({
//                 ...values,
//                 id
//             })
//             setTimeout(() => {
//                 setId(null)
//             }, 500);
//        }
//        else{
//             let obj = {
//                 ...values,
//             }
//             console.log(obj)
//             addProduct(obj)
//        }
//        formRef.current.resetFields()
//     };
    

//     const editProd = (id) =>{

//         let product = products.find((f)=> f.id === id)

        
//         formRef.current.setFieldsValue({
//             ...product
//         })

//         setId(id)
//     }

//     const onFinishFailed = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//     };

//     return (
//         <div >

//             <Row gutter={[16,16]}>
//                 <Col xs={24}>
//                     <div className="border p-3 mt-0 bg-white">
//                         <div className=" d-flex align-items-center page-name">
//                             <UnorderedListOutlined className="me-2" />
//                             <span className="font-weight-bold">Categories</span>
//                         </div>
//                     </div>
//                 </Col>
//                 <Col md={12}>
//                      <CollapsData
//                         deleteProduct={deleteProduct}
//                         editProd={editProd}
//                      />                     
//                 </Col>
//                 <Col  md={12}>
//                     <div className='border pt-5 p-3'>
//                         <Form
//                             ref={formRef}
//                             name="basic"
//                             onFinish={onFinish}
//                             onFinishFailed={onFinishFailed}
//                             autoComplete="off"
//                         >
//                             <Form.Item
//                                 name="name"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Please input name!',
//                                     },
//                                 ]}
//                             >
//                             <Input placeholder='name' />
//                             </Form.Item>
                       
//                             <Form.Item
//                                 name="tags"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Please input your tags!',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     mode="multiple"
//                                     size={'md'}
//                                     placeholder="Please select tags"
//                                     style={{ width: '100%' }}
//                                 >
//                                     {ProductCategories.map((cat)=>{
//                                         return (
//                                             <Option value={cat}>{cat}</Option>
//                                         )
//                                     })}
//                                 </Select>
//                             </Form.Item>

//                         <div className='d-flex'>
//                                 <Form.Item
//                                 >
//                                     <Button type="primary" htmlType="submit">
//                                         {id ? 'Edit' : 'Add'}
//                                     </Button>
//                                 </Form.Item>

//                                 <Button onClick={()=>{
//                                     setId(null)
//                                     formRef.current.resetFields()
//                                 }} className='ms-3'>
//                                     Cancel
//                                 </Button>     
//                         </div>
//                         </Form>
//                     </div>
//                 </Col>
                
//             </Row>
            
//         </div>
//     )
// };



// const mapStateToProps = (state) => ({
//     products: state.products
// })


// export default connect(mapStateToProps  , { addProduct , editProduct , deleteProduct   })(Categories)

// import React, { useRef, useEffect, useState } from "react";
// import {
//   Button,
//   Form,
//   Card,
//   Row,
//   Col,
//   Input,
// } from "antd";
// import {
//   UnorderedListOutlined,
//   EditOutlined,
// } from "@ant-design/icons";
// import client from "../../../../api/api";
// const { TextArea } = Input;

// const Category = () => {
//   const [data, setData] = useState([]);
//   const formRef = useRef(null);
//   const [id, setId] = useState(null);
//   const [date, setDate] = useState(null);


//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     await client.get("category").then((res) => {
//       if (res.data.length) {
//         setData(res.data);
//       }
//     });
//   };

//   const onFinish = (values) => {
//     if (id) {
//       client.put(`category/${id}`, values).then(() => {
//         console.log("Data updated successfully");
//         getData();
//       });
//     } else {
//       const newData = [
//         ...data,
//         {
//           id: data.length + 1,
//           date: date,
//           ...values,
//         },
//       ];
//       client.post("category", values).then(() => {
//         console.log("Data added successfully");
//         getData();
//       });
//       setData(newData);
//     }
//     setId(null);
//     setDate(null);

//     formRef.current.resetFields();
//   };

//   const editData = (data) => {
//     setId(data.id);
//     setDate(data.date);
//     const obj = {
//       text: data.text,
//       image: data.image,
//       text: data.text,
//     };
//     formRef.current.setFieldsValue(obj);
//   };

//   const deleteData = (id) => {
//     client.delete(`category/${id}`).then(() => {
//       console.log("Data deleted successfully");
//       getData();
//     });
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
//               <span className="font-weight-bold">Data</span>
//             </div>
//           </div>
//         </Col>
//         <Col md={12}>
//           {data.map((d) => {
//             return (
//               <Card
//                 key={d.id}
//                 style={{ width: "100%" }}
//                 actions={[
//                   <EditOutlined
//                     onClick={() => {
//                       editData(d);
//                     }}
//                     key="edit"
//                   />,
//                   <Button
//                     onClick={() => {
//                       deleteData(d.id);
//                     }}
//                     key="delete"
//                   >
//                     Delete
//                   </Button>,
//                 ]}
//               >
//                           <div className="mb-2">
              
//           </div>
          
//           <p>{d.text}</p>
         

//           </Card>
//         );
//       })}
 

//     </Col>
//     <Col md={12}>
//       <Form
//         name="basic"
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         ref={formRef}
//       >
      

       

//         <Form.Item
//           label="Text"
//           name="text"
//           rules={[{ required: true, message: "Please input text!" }]}
//         >
//           <TextArea />
//         </Form.Item>
       

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             {id ? "Update" : "Submit"}
//           </Button>
//         </Form.Item>
//       </Form>
//     </Col>
//   </Row>
// </div>
// );
// };

// export default Category;

import React, { useState, useEffect, useRef } from "react";
import client from "../../../../api/api"

function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null);
  const formRef = useRef (null)



  

  useEffect(() => {
        getData();
      }, []);
    
      const getData = async () => {
        await client.get("category").then((res) => {
          if (res.data.length) {
            setCategories(res.data);
          }
        });
      };



      const onFinish = (values) => {
        if (id) {
          client.put(`category/${id}`, values).then(() => {
            console.log("Data updated successfully");
            getData();
          });
        } else {
          const newData = [
            ...categories,
            {
              id: categories.length + 1,
              category: Category,
              ...values,
            },
          ];
          client.post("category", values).then(() => {
            console.log("Data added successfully");
            getData();
          });
      setCategories(newData);
        }
        setId(null);
    
        formRef.current.resetFields();
      };
    

  const handleSubmit = (e) => {
    e.preventDefault();
    setCategories([
      ...categories,
      { name: categoryName, description: categoryDescription },
    ]);
    setCategoryName("");
    setCategoryDescription("");
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category-name">Category Name</label>
        <input
          type="text"
          id="category-name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <label htmlFor="category-description">Category Description</label>
        <textarea
          id="category-description"
          value={categoryDescription}
          onChange={(e) => setCategoryDescription(e.target.value)}
        />

        <button type="submit">Add Category</button>
      </form>

      {categories.length > 0 && (
        <ul>
          {categories.map((category, index) => (
            <li key={index}>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Category;

