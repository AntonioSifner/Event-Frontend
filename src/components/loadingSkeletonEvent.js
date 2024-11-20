import React from "react";
import { eventCardStyle } from "@/app/styles";

const LoadingSkeletonEvent = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div
          className="border border-gray-300 shadow rounded-md p-8 m-6 w-3/4 mx-auto opacity-50"
          style={eventCardStyle}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-md bg-slate-700 h-20 w-20"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingSkeletonEvent;

