import { Fragment } from "react/cjs/react.production.min";
import { useState } from "react";
import classes from "./SlideShow.module.css";

const slideImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWIQtvI4R2veBQody_-coonotC4wtVntt5QCH-ACKXtMnfF5zy7vgqKj-84TGT3GoCD_o&usqp=CAU",
  "https://lh3.googleusercontent.com/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc=w600",
  "https://i.kym-cdn.com/photos/images/newsfeed/000/861/427/802.png",
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/02e446dc-561f-4630-b580-19cb62fddf93/d6eyce0-ef53d98d-5320-4a32-a124-019317ad9c41.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyZTQ0NmRjLTU2MWYtNDYzMC1iNTgwLTE5Y2I2MmZkZGY5M1wvZDZleWNlMC1lZjUzZDk4ZC01MzIwLTRhMzItYTEyNC0wMTkzMTdhZDljNDEuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.uHI5eT_Zpy8duEYpHbbTNCioRpNujZZWhiBKOtodHWM",
];

const SlideShow = () => {
  const [slideImage, setSlideImage] = useState(slideImages[0]);

 /*  const slideShowHandler = (props) => {
    if ({props.action}="right") {
        setSlideImage(slideImages[1])
    }
} */

  return (
    <Fragment>
      <div className={classes.slideShow_split}>
        <div className={classes.slideShow_slideShow}>
          <button className={classes.slideShow_button}>
            <img
              className={classes.try}
              alt="arrow_back"
              src="https://cdn-icons-png.flaticon.com/512/271/271218.png"
            />
          </button>
          <img
            className={classes.slideShow_img}
            alt="figure something smart"
            src={slideImage}
          />
          <button className={classes.slideShow_button}>
            <img
              className={classes.try}
              alt="arrow_right"
              src="https://cdn-icons-png.flaticon.com/512/959/959158.png"
            />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default SlideShow;
