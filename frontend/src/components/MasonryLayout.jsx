import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const MasonryLayout = ({ pins }) => {
  const breakPointsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 4,
    1000: 3,
    670: 2,
  };
  const items = pins?.map((pin) => (
    <Pin key={pin._id} pins={pin} />
  ));
  return (
    <Masonry
      breakpointCols={breakPointsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items}
    </Masonry>
  );
};

export default MasonryLayout;
