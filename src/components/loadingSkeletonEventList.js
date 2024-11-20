import React from "react";
import LoadingSkeletonEvent from "./loadingSkeletonEvent";

const LoadingSkeletonEventList = ({ skeletonNumber, isLoading }) => {
  return (
    <>
      {Array.from({ length: skeletonNumber }).map((_, index) => (
        <LoadingSkeletonEvent
          key={index}
          isLoading={isLoading}
          skeletonNumber={index}
        />
      ))}
    </>
  );
};

export default LoadingSkeletonEventList;
