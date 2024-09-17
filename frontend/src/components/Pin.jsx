import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaInfo } from "react-icons/fa6";
import { urlFor } from "../utils/client";
const Pin = ({
  pins: { image, about, postedBy, _id, destination },
}) => {
  const navigate = useNavigate();
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <div className="pin">
      <img
        src={image && urlFor(image)?.width(300).url()}
        alt="pic"
        style={{ position: "relative" }}
      />
      <div
        className="pin-operations"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        {mouseEnter ? (
          <div
            className="pin-operations"
            onClick={() => {
              navigate(`/home/pin-detail/${_id}`, {
                replace: true,
              });
            }}
          >
            <div className="pin-header">
              <a
                className="pin-task download"
                href={`${urlFor(image)?.url()}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
              >
                <FaDownload />
              </a>
              {
                <div className="pin-task save">
                  <button>Save</button>
                </div>
              }
            </div>
            <div className="pin-footer">
              <a
                href={`${urlFor(image)?.url()}`}
                className="pin-task info"
              >
                <FaInfo />
              </a>

              {urlFor(image).url().slice(12, 37)}
            </div>
          </div>
        ) : null}
      </div>
      <div className="post-detail-user">
        <img
          src={postedBy?.image?.asset?.url}
          alt="profile"
          width={20}
          height={20}
        />
        <p className="sub-heading">
          {postedBy?.firstName} {postedBy?.lastName}
          {postedBy?.address?.city}
        </p>
      </div>
    </div>
  );
};

export default Pin;
