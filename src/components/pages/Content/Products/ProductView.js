import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ProductView() {
  const [columns,setColumns]=useState([])
  const [records,setRecords]=useState([])
  const navigate= useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:3030/products')
      .then(res=>{
        console.log(res.data) // burada res.data'yı yazdırarak doğru verilerin alınıp alınmadığını kontrol edebilirsiniz
        setColumns(Object.keys(res.data[0]))
        setRecords(res.data)
      })
      .catch(err => console.log(err))
  },[])

  return (
    <div className='container-mt-5'>
      <div className='text-end'><Link to="/productcreate" className='btn btn-primary'>Add +</Link></div>
      <table className='table'>
        <thead>
          <tr>
          {
            columns.map((c,i)=>(
              <th key={i}>{c}</th>
            ))
          }
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((d,i)=>(
              <tr key={i}>
                <td>{d.id}</td>
                <td><img src={d.img} alt="product-img" style={{ maxWidth: "100px" }}/></td>
                <td>{d.name}</td>
                <td>{d.price}</td>
                <td>
                  <Link to={`/productupdate/${d.id}`} className='btn btn-sm  btn-success'>Update</Link>
                  <button onClick={e=>handleSubmit(d.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )

  function handleSubmit(id){
    const conf= window.confirm("Do you want to delete?");
    if(conf){
      axios.delete('http://localhost:3030/products/'+id)
        .then(res=>{
          alert("product is deleted")
          navigate('/productview')
        })
        .catch(err=>console.log(err))
    }
  }
}

export default ProductView
