// import axios from 'axios'
// import React,{useEffect,useState} from 'react'
// import { Link, useNavigate } from 'react-router-dom'


// function ProductView() {
//   const [columns,setColumns]=useState([])
//   const [records,setRecords]=useState([])
//   const navigate= useNavigate()

//   useEffect(()=>{
//     axios.get('http://localhost:3030/products')
//       .then(res=>{
//         console.log(res.data) // burada res.data'yı yazdırarak doğru verilerin alınıp alınmadığını kontrol edebilirsiniz
//         setColumns(Object.keys(res.data[0]))
//         setRecords(res.data)
//       })
//       .catch(err => console.log(err))
//   },[])

//   function handleSubmit(id){
//     const conf= window.confirm("Do you want to delete?");
//     if(conf){
//       axios.delete('http://localhost:3030/products/'+id)
//         .then(res=>{
//           alert("product is deleted")
//           setRecords(records.filter(record => record.id !== id)) // update the state of records array
//         })
//         .catch(err=>console.log(err))
//     }
//   }

//   return (
//     <div className='container-mt-5'>
//       <div className='text-end'><Link to="/productcreate" className='btn btn-primary'>Add +</Link></div>
//       <table className='table'>
//         <thead>
//           <tr>
//           {
//             columns.map((c,i)=>(
//               <th key={i}>{c}</th>
//             ))
//           }
//           <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {
//             records.map((d,i)=>(
//               <tr key={i}>
//                 <td>{d.id}</td>
//                 <td><img src={d.img} alt="product-img" style={{ maxWidth: "100px" }}/></td>
//                 <td>{d.name}</td>
//                 <td>{d.price}</td>
//                 <td>
//                   <Link to={`/productupdate/${d.id}`} className='btn btn-sm  btn-success'>Update</Link>
//                   <button onClick={e=>handleSubmit(d.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
                 
//                 </td>
//                 <td>toggle button </td>
//               </tr>
//             ))
//           }
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default ProductView
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function ProductView() {
//   const [columns, setColumns] = useState([]);
//   const [records, setRecords] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:3030/products')
//       .then((res) => {
//         console.log(res.data);
//         setColumns(Object.keys(res.data[0]));
//         setRecords(res.data.map((product) => ({ ...product, hidden: false })));
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   function handleSubmit(id) {
//     const conf = window.confirm('Do you want to delete?');
//     if (conf) {
//       axios
//         .delete(`http://localhost:3030/products/${id}`)
//         .then((res) => {
//           alert('Product is deleted');
//           setRecords(records.filter((record) => record.id !== id));
//         })
//         .catch((err) => console.log(err));
//     }
//   }

//   function handleToggle(id) {
//     const updatedRecords = records.map((record) => {
//       if (record.id === id) {
//         return { ...record, hidden: !record.hidden };
//       } else {
//         return record;
//       }
//     });
//     setRecords(updatedRecords);
//   }

//   function renderProductRow(product) {
//     return (
//       <React.Fragment key={product.id}>
//         <tr>
//           <td>{product.id}</td>
//           {!product.hidden && (
//             <>
//               <td>
//                 <img src={product.img} alt='product-img' style={{ maxWidth: '100px' }} />
//               </td>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//             </>
//           )}
//           <td>
//             <Link to={`/productupdate/${product.id}`} className='btn btn-sm btn-success'>
//               Update
//             </Link>
//             <button onClick={(e) => handleSubmit(product.id)} className='btn btn-sm ms-1 btn-danger'>
//               Delete
//             </button>
//             <button onClick={() => handleToggle(product.id)} className='btn btn-sm ms-1 btn-secondary'>
//               {product.hidden ? 'Show' : 'Hide'}
//             </button>
//           </td>
//         </tr>
//         {!product.hidden && (
//           <tr>
//             <td colSpan={4}>
//               <p>{product.description}</p>
//             </td>
//           </tr>
//         )}
//       </React.Fragment>
//     );
//   }

//   return (
  
//     <div className='container mt-5'>
//       <div className='text-end'>
//         <Link to='/productcreate' className='btn btn-primary'>
//           Add +
//         </Link>
//       </div>
//     <div className='container-mt-5'>
//       <div className='text-end'><Link to="/productcreate" className='btn btn-success'>Add +</Link></div>
//       <table className='table'>
//         <thead>
//           <tr>
//             {columns.map((column, index) => (
//               <th key={index}>{column}</th>
//             ))}
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>{records.map((product) => renderProductRow(product))}</tbody>
//       </table>
//     </div>
//     </div>
//   )}

// export default ProductView;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ProductView() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3030/products')
      .then((res) => {
        console.log(res.data);
        setColumns(Object.keys(res.data[0]));
        setRecords(res.data.map((product) => ({ ...product, hidden: false })));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(id) {
    const conf = window.confirm('Do you want to delete?');
    if (conf) {
      axios
        .delete(`http://localhost:3030/products/${id}`)
        .then((res) => {
          alert('Product is deleted');
          setRecords(records.filter((record) => record.id !== id));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleToggle(id) {
    const updatedRecords = records.map((record) => {
      if (record.id === id) {
        return { ...record, hidden: !record.hidden };
      } else {
        return record;
      }
    });
    setRecords(updatedRecords);
  }

  function renderProductRow(product) {
    return (
      <React.Fragment key={product.id}>
        <tr>
          <td>{product.id}</td>
          <td>{product.category}</td>
          {!product.hidden && (
            <>
              <td>
                <img src={product.img} alt='product-img' style={{ maxWidth: '100px' }} />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
            </>
          )}
          <td>
            <Link to={`/productupdate/${product.id}`} className='btn btn-sm btn-success'>
              Update
            </Link>
            <button onClick={(e) => handleSubmit(product.id)} className='btn btn-sm ms-1 btn-danger'>
              Delete
            </button>
            <button onClick={() => handleToggle(product.id)} className='btn btn-sm ms-1 btn-secondary'>
              {product.hidden ? 'Show' : 'Hide'}
            </button>
          </td>
        </tr>
        {!product.hidden && (
          <tr>
            <td colSpan={5}>
              <p>{product.description}</p>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  }

  return (
    <div className='container mt-5'>
      <div className='container-mt-5'>
        <div className='text-end'>
          <Link to='/productcreate' className='btn btn-success'>
            Add +
          </Link>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{records.map((product) => renderProductRow(product))}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductView;
