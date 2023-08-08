import { RefObject, useEffect, useRef } from "react";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

export const Body = () => {
  const animatedElementRef: RefObject<HTMLDivElement> = useRef(null);
  let isAnimating = false;

  function checkScrollPosition() {
    const scrollPosition = window.scrollY;

    if (scrollPosition === 0 && !isAnimating) {
      animatedElementRef.current?.classList.add("slide-in");
      isAnimating = true;
    } else if (
      scrollPosition > 0 &&
      isAnimating &&
      animatedElementRef.current
    ) {
      animatedElementRef.current?.classList.remove("slide-in");
      isAnimating = false;
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    return () => {
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  return (
    <div className="pt-[100px] px-[100px] pb-[20px]">
      <div ref={animatedElementRef} className="slide-in font-bold">
        <div className="text-[50px] text-[white] handjet">
          {/* title */}
          <h1>
            <span>
              <VideogameAssetIcon sx={{ fontSize: "40px" }} />
            </span>{" "}
            Amazing GG Shop
          </h1>
        </div>
        <div>
          {/* small details */}
          <p className="content w-[600px]">
            Welcome to Amazing GG Shop, your one-stop destination for all your
            gaming gift needs. Find the perfect presents for gamers of all ages
            and experience levels. Level up your gift-giving game with our
            incredible selection of gaming merchandise and accessories.
          </p>
        </div>
      </div>
    </div>
  );
};
