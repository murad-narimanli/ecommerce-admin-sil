import { useEffect } from 'react';
import { SettingOutlined , DeleteFilled , EditFilled } from '@ant-design/icons';
import { Collapse, Select ,  Button , Tag , Popconfirm} from 'antd';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getProduct } from '../../redux/actions';
const { Panel } = Collapse;
const { Option } = Select;



const CollapsData = ({getProduct , products , deleteProduct , editProd}) => {
  const [expandIconPosition, setExpandIconPosition] = useState('start');
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };

  useEffect(()=>{
    getProduct()
  } , [])

  const genExtra = (id) => (
    <div className='d-flex align-items-center'>
      <Popconfirm
        placement="topLeft"
        title={'Are you sure for delete?'}
        onConfirm={()=>{deleteProduct(id)}}
        okText="Yes"
        cancelText="No"
      >
        <Button className='d-flex justify-content-center align-items-center' shape='circle'>
            <DeleteFilled/>
        </Button>
      </Popconfirm>


        <Button onClick={()=>{editProd(id)}} className='d-flex me-2 justify-content-center align-items-center' shape='circle'>
            <EditFilled/>
        </Button>
       
    </div>  
  );


  
  return (
    <>
      <Collapse
        onChange={onChange}
        expandIconPosition={expandIconPosition}
      >
        {products.map(( { name , link  , heading , description , local_rating , global_rating , tags , id} , index)=>{
            return (
              <Panel header={`${name} - ${heading}`} key={`collapse-${index+1}`} extra={genExtra(id)}>
                <div><b>Link</b> {link}</div>
                <div><b>Description</b> {description}</div>
                <div> <b>Global Raiting;</b> {global_rating}</div>
                <div><b>Local Raiting:</b> {local_rating}</div>

                <h6 className='mt-2'>Tags</h6>
                <div>
                    {tags.map((tag)=>(
                        <Tag>{tag}</Tag>
                    ))}
                </div>
                
              </Panel>
            )
        })}
       
      </Collapse>
    </>
  );
};



const mapStateToProps = (state) => ({
    products: state.products
})


export default connect(mapStateToProps  , {getProduct})(CollapsData)
