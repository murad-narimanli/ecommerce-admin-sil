import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function OrderInfo() {
  const [columns, setColumns] = useState([])
  const [infos, setinfos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3030/order')
      .then(res => {
        console.log(res.data) // burada res.data'yı yazdırarak doğru verilerin alınıp alınmadığını kontrol edebilirsiniz
        const infos = res.data.flatMap(order => order.infos); // her siparişin tüm ürünleri alınır
        setColumns(Object.keys(infos[0] || {}))
        setinfos(infos)
      })
      .catch(err => console.log(err))
  }, [])

  function handleDelete(id) {
    const conf = window.confirm("Do you want to delete?")
    if (conf) {
      setinfos(infos.filter(info => info.id !== id)) // ürünleri filtreleyerek güncelle
      axios.delete(`http://localhost:3030/order/${id}`)
        .then(res => {
          alert("info is deleted")
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='container-mt-5'>
      <div className='text-end'><Link to="/orderinfo" className='btn btn-primary'>Address info</Link></div>

      <h1 className='text-center'>Adres melumatlariniz</h1>
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
          {infos.map((info, i) => (
            <tr key={i}>
              <td>{info.id}</td>
              <td>{info.fullName}</td>
              <td>{info.email}</td>
              <td>{info.phone}</td>
              <td>{info.card}</td>
              <td>{info.card}</td>
              <td>{info.address}</td>
              <td>{info.note}</td>
              <td>
                <button onClick={() => handleDelete(info.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderInfo



