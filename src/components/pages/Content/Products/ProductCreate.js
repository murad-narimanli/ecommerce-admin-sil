import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCreate() {
    const [inputData,setInputData]=useState({name:'',price:'',img:null})
    const navigate =useNavigate()
    function handleSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:3030/products',inputData)
        .then(res=>{
            alert("Data Added Successfully!")
            navigate('/')
            .catch(err=>console.log(err))
        })
    }
  return (
    <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
    <form onSubmit={handleSubmit}>
    <div>
            <label htmlFor='name' >Poduct Image:</label>
            <input type='text' name='img' className='form-control' onChange={e=>setInputData({...inputData,img:e.target.value})}></input>
        </div>
        <div>
            <label htmlFor='name' >Poduct Name:</label>
            <input type='text' name='name' className='form-control' onChange={e=>setInputData({...inputData,name:e.target.value})}></input>
        </div>
        <div>
            <label htmlFor='price'>Poduct Price:</label>
          <input type='text' name='price' className='form-control' onChange={e=>setInputData({...inputData,price:e.target.value})}></input>
        </div><br/>
       <button className='btn btn-info'>Submit</button>
       </form>
      </div>
    </div>
  )
}

export default ProductCreate
