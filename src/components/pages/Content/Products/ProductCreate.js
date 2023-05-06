// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function ProductCreate() {
//     const [inputData,setInputData]=useState({name:'',price:'',img:null})
//     const navigate =useNavigate()
//     function handleSubmit(event){
//         event.preventDefault()
//         axios.post('http://localhost:3030/products',inputData)
//         .then(res=>{
//             alert("Data Added Successfully!")
//             navigate('/productview')
//             .catch(err=>console.log(err))
//         })
//     }
//   return (
//     <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
//       <div className='w-50 border bg-light p-5'>
//     <form onSubmit={handleSubmit}>
//     <div>
//             <label htmlFor='name' >Product Image:</label>
//             <input type='text' name='img' className='form-control' onChange={e=>setInputData({...inputData,img:e.target.value})}></input>
//         </div>
//         <div>
//             <label htmlFor='name' >Poduct Name:</label>
//             <input type='text' name='name' className='form-control' onChange={e=>setInputData({...inputData,name:e.target.value})}></input>
//         </div>
//         <div>
//             <label htmlFor='price'>Poduct Price:</label>
//           <input type='number' name='price' className='form-control' step='0.01' onChange={e=>setInputData({...inputData,price:e.target.value})}></input>

//         </div><br/>
//        <button className='btn btn-info'>Submit</button>
//        </form>
//       </div>
//     </div>
//   )
// }

// export default ProductCreate
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCreate() {
    const [inputData,setInputData]=useState({name:'',price:'',img:null, category:''})
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate =useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3030/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function handleSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:3030/products',inputData)
        .then(res=>{
            alert("Data Added Successfully!")
            navigate('/productview')
            .catch(err=>console.log(err))
        })
    }

    function handleCategoryChange(event) {
        const categoryId = event.target.value;
        axios.get(`http://localhost:3030/categories/${categoryId}/products`)
            .then(res => {
                setProducts(res.data);
                setInputData({...inputData, category: categoryId});
            })
            .catch(err => console.log(err));
    }

  return (
    <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='category'>Select Category:</label>
                <select name='category' className='form-control' onChange={handleCategoryChange}>
                    <option value=''>Select a category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.category}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='name' >Product Image:</label>
                <input type='text' name='img' className='form-control' onChange={e=>setInputData({...inputData,img:e.target.value})}></input>
            </div>
            <div>
                <label htmlFor='name' >Poduct Name:</label>
                <input type='text' name='name' className='form-control' onChange={e=>setInputData({...inputData,name:e.target.value})}></input>
            </div>
            <div>
                <label htmlFor='price'>Poduct Price:</label>
                <input type='number' name='price' className='form-control' step='0.01' onChange={e=>setInputData({...inputData,price:e.target.value})}></input>
            </div><br/>
            <button className='btn btn-info'>Submit</button>
        </form>
        {/* <div>
            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <img src={product.img} alt={product.name} />
                        <p>{product.name}</p>
                        <span>{product.price}</span>
                    </li>
                ))}
            </ul>
        </div> */}
      </div>
    </div>
  )
}

export default ProductCreate
