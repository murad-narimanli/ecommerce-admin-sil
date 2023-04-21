import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addImage } from"../../../redux/actions/index";
import { connect } from "react-redux";

function MainSlider() {
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addImage(imageUrl));
    setImageUrl("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  Image: state.Image
})


export default connect(mapStateToProps  , { addImage})(MainSlider)