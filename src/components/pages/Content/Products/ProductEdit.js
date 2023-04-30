import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
function ProductEdit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .get('http://localhost:3030/products/' + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    axios.put('http://localhost:3030/products/' + id,data)
    .then(res=>{
        alert("data update successfully!")
        navigate('/productview')
    })
  }
  return (
    <div className="d-flex w-100 h-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Id:</label>
            <input
              disabled
              type="text"
              name="name"
              className="form-control"
              value={data.id}
              
            ></input>
          </div>
          <div>
            <label htmlFor="name">Poduct Image:</label>
            <input
              type="text"
              name="img"
              className="form-control"
              value={data.img}
              onChange={(e) => setData({ ...data, img: e.target.value })}
            ></input>
          </div>
          <div>
            <label htmlFor="name">Poduct Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            ></input>
          </div>
          <div>
            <label htmlFor="price">Poduct Price:</label>
            <input
              type="number"
              name="price"
              className="form-control"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            ></input>
          </div>
          <br />
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
