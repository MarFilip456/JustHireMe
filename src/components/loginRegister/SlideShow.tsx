import React, { useEffect, Fragment, useRef, useState } from 'react';
import classes from './SlideShow.module.css';

const slideImages = [
  {
    id: 0,
    url: 'https://as1.ftcdn.net/v2/jpg/03/01/70/16/1000_F_301701619_I7tuZjCIeb5erP72AJgY7Up29h8fHLLP.jpg'
  },
  {
    id: 1,
    url: 'https://as2.ftcdn.net/v2/jpg/02/50/03/65/1000_F_250036555_n0A78Ay2uxKKwvOGapp6lThP1n5ZWrE9.jpg'
  },
  {
    id: 2,
    url: 'https://as2.ftcdn.net/v2/jpg/01/67/78/13/1000_F_167781326_35nW03G4kUYMHjAylzmCTWaEIVEjOAqH.jpg'
  },
  {
    id: 3,
    url: 'https://as2.ftcdn.net/v2/jpg/03/05/81/31/1000_F_305813154_jHP8Y0m7y9bAgZ1r4UOcl0t3W1yf3Yac.jpg'
  }
];

const SlideShow = () => {
  const image0Ref = useRef<HTMLInputElement>(null);
  const image1Ref = useRef<HTMLInputElement>(null);
  const image2Ref = useRef<HTMLInputElement>(null);
  const image3Ref = useRef<HTMLInputElement>(null);

  const [slideIndex, setSlideIndex] = useState(0);

  const incrementHandler = () => {
    if (slideIndex === 3) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };
  const decrementHandler = () => {
    if (slideIndex === 0) {
      setSlideIndex(3);
    } else {
      setSlideIndex(slideIndex - 1);
    }
  };
  const pointClickhandler = (event: React.MouseEvent) => {
    setSlideIndex(Number(event.currentTarget.id));
  };

  useEffect(() => {
    if (slideIndex === 0) {
      image0Ref.current!.checked = true;
    } else if (slideIndex === 1) {
      image1Ref.current!.checked = true;
    } else if (slideIndex === 2) {
      image2Ref.current!.checked = true;
    } else if (slideIndex === 3) {
      image3Ref.current!.checked = true;
    }
  }, [slideIndex]);

  return (
    <Fragment>
      <div className={classes.slideShow_split}>
        <div className={classes.slideShow_slideShow}>
          <button
            className={classes.slideShow_button}
            onClick={decrementHandler}
          >
            <img
              alt="arrow_back"
              src="https://cdn-icons-png.flaticon.com/512/271/271218.png"
            />
          </button>
          <div className={classes.slideShow_img}>
            <img
              alt="figure something smart"
              src={slideImages[slideIndex].url}
            />
          </div>
          <button
            className={classes.slideShow_button}
            onClick={incrementHandler}
          >
            <img
              alt="arrow_right"
              src="https://cdn-icons-png.flaticon.com/512/959/959158.png"
            />
          </button>
        </div>
        <div className={classes.slideShow_pointContainer}>
          <div className={classes.slideShow_pointContainer_one}>
            <input
              ref={image0Ref}
              type="radio"
              name="image"
              defaultChecked
            />
            <span id="0"
              onClick={pointClickhandler} />
          </div>
          <div className={classes.slideShow_pointContainer_one}>
            <input
              ref={image1Ref}
              type="radio"
              name="image"
            />
            <span id="1"
              onClick={pointClickhandler} />
          </div>
          <div className={classes.slideShow_pointContainer_one}>
            <input
              ref={image2Ref}
              type="radio"
              name="image"
            />
            <span id="2"
              onClick={pointClickhandler} />
          </div>
          <div className={classes.slideShow_pointContainer_one}>
            <input
              ref={image3Ref}
              type="radio"
              name="image"
            />
            <span id="3"
              onClick={pointClickhandler} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SlideShow;
