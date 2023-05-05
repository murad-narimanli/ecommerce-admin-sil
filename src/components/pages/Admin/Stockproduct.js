
// // import axios from 'axios'
// // import React,{useEffect,useState} from 'react'
// // import { Link, useNavigate } from 'react-router-dom'

// // function Stockproduct() {
// //   const [columns,setColumns]=useState([])
// //   const [records,setRecords]=useState([])
// //   const navigate= useNavigate()

// //   useEffect(()=>{
// //     axios.get('http://localhost:3030/order')
// //       .then(res=>{
// //         console.log(res.data) // burada res.data'yı yazdırarak doğru verilerin alınıp alınmadığını kontrol edebilirsiniz
// //         setColumns(Object.keys(res.data[0]))
// //         setRecords(res.data)
// //       })
// //       .catch(err => console.log(err))
// //   },[])

// //   function handleSubmit(id){
// //     const conf= window.confirm("Do you want to delete?");
// //     if(conf){
// //       axios.delete('http://localhost:3030/order/'+id)
// //         .then(res=>{
// //           alert("product is deleted")
// //           setRecords(records.filter(record => record.id !== id)) // update the state of records array
// //         })
// //         .catch(err=>console.log(err))
// //     }
// //   }

// //   return (
// //     <div className='container-mt-5'>
// //       <div className='text-end'><Link to="/productcreate" className='btn btn-primary'>Add +</Link></div>
// //       <table className='table'>
// //         <thead>
// //           <tr>
// //           {
// //             columns.map((c,i)=>(
// //               <th key={i}>{c}</th>
// //             ))
// //           }
// //           <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {
// //             records.map((d,i)=>(
// //               <tr key={i}>
// //                 <td>{d.id}</td>
// //                 <td><img src={d.img} alt="product-img" style={{ maxWidth: "100px" }}/></td>
// //                 <td>{d.name}</td>
// //                 <td>{d.price}</td>
// //                 <td>
// //                   <Link to={`/productupdate/${d.id}`} className='btn btn-sm  btn-success'>Update</Link>
// //                   <button onClick={e=>handleSubmit(d.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
// //                 </td>
// //               </tr>
// //             ))
// //           }
// //         </tbody>
// //       </table>
// //     </div>
// //   )
// // }

// // export default Stockproduct


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Stockproduct() {
  const [columns, setColumns] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3030/order')
      .then(res => {
        console.log(res.data) // burada res.data'yı yazdırarak doğru verilerin alınıp alınmadığını kontrol edebilirsiniz
        const products = res.data.flatMap(order => order.products); // her siparişin tüm ürünleri alınır
        setColumns(Object.keys(products[0] || {}))
        setProducts(products)
      })
      .catch(err => console.log(err))
  }, [])

  function handleDelete(id) {
    const conf = window.confirm("Do you want to delete?")
    if (conf) {
      setProducts(products.filter(product => product.id !== id)) // ürünleri filtreleyerek güncelle
      axios.delete(`http://localhost:3030/order/${id}`)
        .then(res => {
          alert("Product is deleted")
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='container-mt-5'>
      <div className='text-end'><Link to="/orderinfo" className='btn btn-primary'>Address info</Link></div>

      <h1 className='text-center'>Sifaris etdiyiniz mehsullar</h1>
      <table className='table'>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>{product.id}</td>
              <td><img src={product.img} alt="product-img" style={{ maxWidth: "100px" }} /></td>

              <td>{product.name}</td>
              <td>{product.price}</td>
             
              <td>{product.count}</td>
              <td>
                <button onClick={() => handleDelete(product.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Stockproduct



