import { useDispatch } from 'react-redux';
import { useState } from 'react';
import client from "../utils/client";
import { useParams } from 'react-router-dom';

import { ThreeCircles } from "react-loader-spinner";
import { FaTrash } from "react-icons/fa6";

import getImageFile from "../utils/getLocalFile";
import { deleteUnusedAssets } from '../utils/deleteUnusedAssets';
import { uploadNewImage } from '../features/imageSlice';

export default function UploadImage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [imageLoading, setImageLoading] = useState(false);
  const [imageAsset, setImageAsset] = useState(null);

  function imageUpload(event) {
    //take the file from the uploud event
    setImageLoading(true);
    if (getImageFile(event)) {
      //get image from the helper function
      const [{ name, type }, file] = getImageFile(event);
      //upload the image to assets repository
      client.assets
        .upload("image", file, {
          contentType: type,
          filename: name,
        })
        .then((imageFile) => {
          setImageAsset(imageFile);
          setImageLoading(false);
          //upload the image to the pin
          return imageFile
        }).then((imageFile) => {
          dispatch(uploadNewImage(imageFile._id));
        })
        .then(() => {
          setImageLoading(false);
        })
        .catch((error) => console.log(error));
      return
    }
    else return false;
  }

  return (
    <div className="pin-image--upload">
      {imageLoading ? (
        <ThreeCircles width={75} />
      ) : null}
      {!imageAsset ? (
        <label htmlFor="image">
          <input
            type="file"
            name="image"
            id="image"
            onChange={(event) => imageUpload(event)}
          />
        </label>
      ) : imageLoading ? (
        <ThreeCircles
          visible={true}
          height="75"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperClass=""
        />
      ) : (
        <div>
          <img
                src={imageAsset.url}
            alt="uploaded-pic"
          />
          <div className="btn-remove">
            <button
              className="image-upload remove"
              onClick={() => {
                setImageLoading(false);
                setImageAsset(null);
              }}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
