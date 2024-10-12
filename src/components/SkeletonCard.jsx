import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ComponenteSkeleton() {
  const skeletons = Array(6).fill(null); // Array con 6 elementos vacíos

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="row justify-content-evenly d-flex">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="card col-3 m-2 d-flex align-items-sm-center"
          >
            <div className="image" style={{ width: "100%", height: "200px" }}>
              <Skeleton width={"100%"} height={"100%"} />
            </div>
            <div className="info align-items-sm-center d-flex flex-column">
              <h2>
                <Skeleton width={150} height={30} />
              </h2>
              <p className="price">
                <Skeleton width={100} height={20} />
              </p>
              <p className="price">
                <Skeleton width={100} height={20} />
              </p>
              <Skeleton width={200} height={20} />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}
