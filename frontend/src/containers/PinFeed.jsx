import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import  {useParams}  from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

import client from "../utils/client";
import { showAllPins, searchPin } from "../utils/queryStrings";
import MasonryLayout from "../components/MasonryLayout";
import { setPins } from '../features/pinSlice';

const PinFeed = () => {
  const dispatch = useDispatch();
  //get pins from redux store
  const { pins } = useSelector((state) => state.pin);
  let { categoryID } = useParams();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    client
      .fetch(
        categoryID !==undefined? searchPin(categoryID) : showAllPins()
      )
      .then((data) => {
       dispatch(setPins(data));
        setPageLoading(false);
      });
  }, [categoryID]);

  return (
    <section className="feeds">
      {pageLoading ? (
        <ThreeCircles width={75} />
      ) : pins?.length <= 0 ? (
        <div>
          Oops!, Image not available for {categoryID}
        </div>
      ) : (
        <MasonryLayout pins={pins} />
      )}
    </section>
  );
};

export default PinFeed;
