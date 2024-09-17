import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import client, { urlFor } from "../utils/client";
import  {showPinById}  from "../utils/queryStrings";
import { v4 as uuidv4 } from "uuid";
import { ThreeCircles } from "react-loader-spinner";
import { FaThumbsUp } from "react-icons/fa6";
import { useSelector } from "react-redux";


const PinDetail = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user)
  const { pinID } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const [userComment, setUserComment] = useState(null);
  let [likes, setLikes] = useState(0);

  //get all comments
  const comment = pins?.comments?.map((comm, index) => (
    <div className="comments" key={index}>
      <div className="user-info">
        <img
          src={`${comm.postedBy?.image?.asset?.url}`}
          alt=""
        />
        <div className="details">
          <p>{comm?.postedBy?.firstName}</p>
          <p>{comm?.address?.city}</p>
        </div>
      </div>
      <span>{comm.comment}</span>

      <FaThumbsUp className="likes" />
    </div>
  ));
  const postComment = () => {
    setisLoading(true);
    const commentData = {
      _key: uuidv4(),
      comment: userComment,
      likes,
      postedBy: {
        _type: "postedBy",
        _ref: user[0]?._id,
      },
    };
    client
      .patch(pinID)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [commentData])
      .commit()
      .then(() => setisLoading(false));
  };
  function likeComments() {
    client
      .patch(pinID)
      .set({ likes: `${likes}` })
      .commit();

    isLiked ? setIsLiked(false) : setIsLiked(true);
  }
  const fetchPins = () => {
    setisLoading(true);
    let query = showPinById(pinID);
    if (query) {
      client.fetch(query).then((pindata) => {
        setPins(pindata[0]);
        setisLoading(false);
      });
    }
  };
  //populate default pins as window loads
  useEffect(() => {
    fetchPins();
  }, [pinID]);

  return isLoading ? (
    <ThreeCircles width={75} />
  ) : (
    <div className="pin-container">
      <img
        src={`${pins?.image && urlFor(pins?.image).url()}`}
        alt=""
      />
      <div className="pin-details">
        <div className="status">
          <div className="likes">
            <span>
              <FaThumbsUp
                className="likes"
                onClick={() => {
                  isLiked
                    ? setLikes(likes - 1)
                    : setLikes(likes + 1);
                  likeComments();
                }}
              />
              <p>{pins?.likes}</p>
            </span>
          </div>
          <div className="pin-status">
            <span>Created</span>
            <span>Saved</span>
          </div>
        </div>
        <p className="title">{pins && pins.category}</p>
        <p className="sub-title">{pins && pins.about}</p>
        <div className="pin-comment">
          <textarea
            className="comment"
            name="comment"
            cols={40}
            rows={3}
            onChange={(event) =>
              setUserComment(event.target.value)
            }
            id="comment"
            placeholder="Write your comment...."
            maxLength={150}
          ></textarea>
          <div className="post-comment">
              <button disabled={!isLoggedIn} onClick={postComment}>Post</button>
          </div>
        </div>
        {comment}
      </div>
    </div>
  );
};

export default PinDetail;
