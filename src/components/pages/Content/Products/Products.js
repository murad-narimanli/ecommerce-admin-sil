import React , {useRef , useState} from 'react';
import { Button, Select, Form, Input, InputNumber  , Row , Col } from 'antd';
import { ProductCategories } from '../../../../const/data';
import CollapsData from '../../../elements/CollapsData';
import { addProduct , editProduct , deleteProduct  } from '../../../../redux/actions';
import { connect } from 'react-redux';
import {
    UnorderedListOutlined,
  } from '@ant-design/icons';

const {Option} = Select

const Products = ( { addProduct , editProduct , deleteProduct , products  } ) => {
    const formRef = useRef(null);

    const [id , setId] = useState(null)

    const onFinish = (values) => {
       if(id){
            editProduct({
                ...values,
                id
            })
            setTimeout(() => {
                setId(null)
            }, 500);
       }
       else{
            let obj = {
                ...values,
            }
            console.log(obj)
            addProduct(obj)
       }
       formRef.current.resetFields()
    };
    

    const editProd = (id) =>{

        let product = products.find((f)=> f.id === id)

        
        formRef.current.setFieldsValue({
            ...product
        })

        setId(id)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div >

            <Row gutter={[16,16]}>
                <Col xs={24}>
                    <div className="border p-3 mt-0 bg-white">
                        <div className=" d-flex align-items-center page-name">
                            <UnorderedListOutlined className="me-2" />
                            <span className="font-weight-bold">Products</span>
                        </div>
                    </div>
                </Col>
                <Col md={12}>
                     <CollapsData
                        deleteProduct={deleteProduct}
                        editProd={editProd}
                     />                     
                </Col>
                <Col  md={12}>
                    <div className='border pt-5 p-3'>
                        <Form
                            ref={formRef}
                            name="basic"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input name!',
                                    },
                                ]}
                            >
                            <Input placeholder='name' />
                            </Form.Item>


                            <Form.Item
                                name="heading"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your heading!',
                                    },
                                ]}
                            >
                            <Input placeholder='heading' />
                            </Form.Item>

                            <Form.Item 
                                name="description"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your description!',
                                    },
                                ]}
                            >
                            <Input  placeholder='description' />
                            </Form.Item>

                            <Form.Item
                                name="link"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your link!',
                                    },
                                ]}
                            >
                            <Input placeholder='link' />
                            </Form.Item>

                            <Form.Item
                                name="local_rating"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input local rating!',
                                    },
                                ]}
                            >
                            <InputNumber placeholder='local_rating' className='w-100' />
                            </Form.Item>

                            <Form.Item
                                name="global_rating"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input global rating!',
                                    },
                                ]}
                            >
                                <InputNumber  placeholder='global_rating' className='w-100' />
                            </Form.Item>

                            <Form.Item
                                name="tags"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your tags!',
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    size={'md'}
                                    placeholder="Please select tags"
                                    style={{ width: '100%' }}
                                >
                                    {ProductCategories.map((cat)=>{
                                        return (
                                            <Option value={cat}>{cat}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>

                        <div className='d-flex'>
                                <Form.Item
                                >
                                    <Button type="primary" htmlType="submit">
                                        {id ? 'Edit' : 'Add'}
                                    </Button>
                                </Form.Item>

                                <Button onClick={()=>{
                                    setId(null)
                                    formRef.current.resetFields()
                                }} className='ms-3'>
                                    Cancel
                                </Button>     
                        </div>
                        </Form>
                    </div>
                </Col>
                
            </Row>
            
        </div>
    )
};



const mapStateToProps = (state) => ({
    products: state.products
})


export default connect(mapStateToProps  , { addProduct , editProduct , deleteProduct   })(Products)