import Button from './Button';
import classes from './SideMenu.module.css';
import { useAppSelector, useAppDispatch } from '../store/redux-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { uiActions } from '../store/ui-slice';
import React from 'react';

const SideMenu: React.FC<{ styles: React.CSSProperties }> = (props) => {
  const isLogged = useAppSelector((state) => state.ui.isLoggedIn);
  const isDev = useAppSelector((state) => state.ui.isDev);
  const isSideVisible = useAppSelector((state) => state.ui.visibleSide);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickWorkingLinkHandler = () => {
    dispatch(uiActions.changeVisSide());
  };

  const clickNotWorkingLinkHandler = () => {
    dispatch(uiActions.changeInformationPopup());
    dispatch(uiActions.setInformationError());
    dispatch(uiActions.showInformation('Sorry, feature not working yet...'));
  };

  const logoutHandler = () => {
    navigate('/');
    dispatch(uiActions.loggingInOut());
    localStorage.removeItem('justHireMeDate');
    localStorage.removeItem('justHireMeToken');
    if (isDev) {
      localStorage.removeItem('justHireMeDev');
      dispatch(uiActions.setIsDev());
    }
    if (isSideVisible) {
      dispatch(uiActions.changeVisSide());
    }
  };

  return (
    <div className={`${classes.sideMenu} && ${props.styles}`}>
      <div className={classes.sideMenu_header}>
        MENU
        <button
          className={classes.sideMenu_close}
          onClick={clickWorkingLinkHandler}
        >
          <span>
            <svg
              width="20px"
              height="20px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M0 0h24v24H0V0z" fill="none"></path>
              <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
            </svg>
          </span>
        </button>
      </div>
      {isLogged && (
        <>
          <ul className={classes.link_container}>
            <Link
              to={isDev ? '/dev/profile' : '/empl/profile'}
              onClick={clickWorkingLinkHandler}
              className={classes.link_container__item}
            >
              <div className={classes.link_container__item_image} >
                <svg
                  width="24px"
                  height="24px"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              My profile
            </Link>
            {!isDev && (
              <Link
                to={'/empl/addOffer'}
                onClick={clickWorkingLinkHandler}
                className={classes.link_container__item}
              >
                <div className={classes.link_container__item_image}>
                  <svg
                    width="24px"
                    height="24px"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8zm0 3h4v2h-4zm0-6h8v2h-8z"></path>
                  </svg>
                </div>
                Add offer
              </Link>
            )}
            <Link
              to={'/offers'}
              onClick={clickNotWorkingLinkHandler}
              className={classes.link_container__item}
            >
              <div className={classes.link_container__item_image}>
                <svg
                  width="24px"
                  height="24px"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M5.90909091,17.0909091 C6.31127273,17.0909091 6.63636364,17.416 6.63636364,17.8181818 L6.63636364,17.8181818 L6.63636364,19.2727273 C6.63636364,19.6749091 6.31127273,20 5.90909091,20 C5.50690909,20 5.18181818,19.6749091 5.18181818,19.2727273 L5.18181818,19.2727273 L5.18181818,17.8181818 C5.18181818,17.416 5.50690909,17.0909091 5.90909091,17.0909091 Z M19,9.81818182 C19.4021818,9.81818182 19.7272727,10.1432727 19.7272727,10.5454545 L19.7272727,10.5454545 L19.7272727,19.2727273 C19.7272727,19.6749091 19.4021818,20 19,20 C18.5978182,20 18.2727273,19.6749091 18.2727273,19.2727273 L18.2727273,19.2727273 L18.2727273,10.5454545 C18.2727273,10.1432727 18.5978182,9.81818182 19,9.81818182 Z M14.6363636,11.2727273 C15.0385455,11.2727273 15.3636364,11.5978182 15.3636364,12 C15.3636364,12.4021818 15.0385455,12.7272727 14.6363636,12.7272727 L14.6363636,12.7272727 L13.1818182,12.7272727 L13.1818182,19.2727273 C13.1818182,19.6749091 12.8567273,20 12.4545455,20 C12.0523636,20 11.7272727,19.6749091 11.7272727,19.2727273 L11.7272727,19.2727273 L11.7272727,12.7272727 L10.2727273,12.7272727 C9.87054545,12.7272727 9.54545455,12.4021818 9.54545455,12 C9.54545455,11.5978182 9.87054545,11.2727273 10.2727273,11.2727273 L10.2727273,11.2727273 Z M5.90909091,4 C6.31127273,4 6.63636364,4.32509091 6.63636364,4.72727273 L6.63636364,4.72727273 L6.63636364,14.1818182 L8.09090909,14.1818182 C8.49309091,14.1818182 8.81818182,14.5069091 8.81818182,14.9090909 C8.81818182,15.3112727 8.49309091,15.6363636 8.09090909,15.6363636 L8.09090909,15.6363636 L3.72727273,15.6363636 C3.32509091,15.6363636 3,15.3112727 3,14.9090909 C3,14.5069091 3.32509091,14.1818182 3.72727273,14.1818182 L3.72727273,14.1818182 L5.18181818,14.1818182 L5.18181818,4.72727273 C5.18181818,4.32509091 5.50690909,4 5.90909091,4 Z M12.4545455,4 C12.8567273,4 13.1818182,4.32509091 13.1818182,4.72727273 L13.1818182,4.72727273 L13.1818182,9.09090909 C13.1818182,9.49309091 12.8567273,9.81818182 12.4545455,9.81818182 C12.0523636,9.81818182 11.7272727,9.49309091 11.7272727,9.09090909 L11.7272727,9.09090909 L11.7272727,4.72727273 C11.7272727,4.32509091 12.0523636,4 12.4545455,4 Z M19,4 C19.4021818,4 19.7272727,4.32509091 19.7272727,4.72727273 L19.7272727,4.72727273 L19.7272727,6.90909091 L21.1818182,6.90909091 C21.584,6.90909091 21.9090909,7.23418182 21.9090909,7.63636364 C21.9090909,8.03854545 21.584,8.36363636 21.1818182,8.36363636 L21.1818182,8.36363636 L16.8181818,8.36363636 C16.416,8.36363636 16.0909091,8.03854545 16.0909091,7.63636364 C16.0909091,7.23418182 16.416,6.90909091 16.8181818,6.90909091 L16.8181818,6.90909091 L18.2727273,6.90909091 L18.2727273,4.72727273 C18.2727273,4.32509091 18.5978182,4 19,4 Z"
                    id="path-3"
                  ></path>
                </svg>
              </div>
              Preferences
            </Link>
            <Link
              to={'/offers'}
              onClick={clickNotWorkingLinkHandler}
              className={classes.link_container__item}
            >
              <div className={classes.link_container__item_image}>
                <svg
                  width="24px"
                  height="24px"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
                </svg>
              </div>
              Settings
            </Link>
          </ul>
          <div className={classes.sideMenu_spacing} />
        </>
      )}
      <ul className={classes.link_container}>
        <Link
          to={'/offers'}
          onClick={clickWorkingLinkHandler}
          className={classes.link_container__item}
        >
          <div className={classes.link_container__item_image}>
            <svg
              width="24px"
              height="24px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M14.368 6.79V4.894h-3.79v1.894h3.79zM4.895 8.683v10.421h15.158V8.685H4.895zM20.053 6.79c1.051 0 1.894.844 1.894 1.895v10.421A1.888 1.888 0 0120.053 21H4.895A1.888 1.888 0 013 19.105l.01-10.42a1.88 1.88 0 011.885-1.896h3.79V4.895C8.684 3.843 9.526 3 10.578 3h3.79c1.051 0 1.894.843 1.894 1.895v1.894h3.79z"
                id="a"
              ></path>
            </svg>
          </div>
          Offers
        </Link>
        <Link
          to={'/offers'}
          onClick={clickNotWorkingLinkHandler}
          className={classes.link_container__item}
        >
          <div className={classes.link_container__item_image}>
            <svg
              width="24px"
              height="24px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
                id="a"
              ></path>
            </svg>
          </div>
          Brand Stories
        </Link>
        <Link
          to={'/offers'}
          onClick={clickNotWorkingLinkHandler}
          className={classes.link_container__item}
        >
          <div className={classes.link_container__item_image}>
            <svg
              width="24px"
              height="24px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M7 13h10v-2H7v2zm0-4h5V7H7v2zm0 8h10v-2H7v2zm12 2H5V5h10v4h4v10zM16 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8l-5-5z"
                id="a"
              ></path>
            </svg>
          </div>
          Geek
        </Link>
        <Link
          to={'/offers'}
          onClick={clickNotWorkingLinkHandler}
          className={classes.link_container__item}
        >
          <div className={classes.link_container__item_image}>
            <svg
              width="24px"
              height="24px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M9.47368 6.1579V4.57894h-3.1579v1.57894h3.1579zM1.57895 7.73683v8.68421h12.63158v-8.6842H1.57895zM14.21053 6.1579c.87631 0 1.57894.70264 1.57894 1.57895v8.68421c0 .87632-.70263 1.57895-1.57894 1.57895H1.57895C.70263 18 0 17.29737 0 16.42105l.0079-8.6842c0-.87632.69473-1.57896 1.57105-1.57896h3.1579V4.57895C4.73684 3.70263 5.43946 3 6.31578 3h3.1579c.87631 0 1.57894.70263 1.57894 1.57895v1.57894h3.1579z"
                id="a"
              ></path>
              <path
                d="M10.33126 1.57895l-.01208-.00555-1.58223-.01318C8.74687.69264 9.44572 0 10.31579 0h3.1579c.87631 0 1.57894.70263 1.57894 1.57895v1.57894h3.1579c.87631 0 1.57894.70264 1.57894 1.57895v8.68421c0 .87632-.70263 1.57895-1.57894 1.57895H15l-.23697-1.57895h3.4475v-8.6842h-4.7439l-.00226-1.57896h.00931V1.57895h-3.14242z"
                id="b"
              ></path>
            </svg>
          </div>
          Matchmaking
        </Link>
      </ul>
      <div className={classes.sideMenu_spacing} />
      {!isLogged && (
        <>
          <Link
            to="/login"
            onClick={clickWorkingLinkHandler}
            className={classes.link_container__sign}
            style={{ textDecoration: 'none' }}
          >
            <Button styles={classes.login_button}>
              <svg
                className={classes.login_button__signIn}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10.25 13c0 .69-.56 1.25-1.25 1.25S7.75 13.69 7.75 13s.56-1.25 1.25-1.25 1.25.56 1.25 1.25zM15 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm7 .25c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zM10.66 4.12C12.06 6.44 14.6 8 17.5 8c.46 0 .91-.05 1.34-.12C17.44 5.56 14.9 4 12 4c-.46 0-.91.05-1.34.12zM4.42 9.47c1.71-.97 3.03-2.55 3.66-4.44C6.37 6 5.05 7.58 4.42 9.47zM20 12c0-.78-.12-1.53-.33-2.24-.7.15-1.42.24-2.17.24-3.13 0-5.92-1.44-7.76-3.69C8.69 8.87 6.6 10.88 4 11.86c.01.04 0 .09 0 .14 0 4.41 3.59 8 8 8s8-3.59 8-8z"></path>
              </svg>
              <p>Sign in</p>
            </Button>
          </Link>
          <Link
            to="/devregister"
            onClick={clickWorkingLinkHandler}
            className={classes.link_container__sign}
            style={{ textDecoration: 'none' }}
          >
            <Button styles={classes.login_button}>
              <svg
                className={classes.login_button__signUp}
                width="20px"
                height="20px"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2l.01-11c0-1.11.88-2 1.99-2h4V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h4z"></path>
              </svg>
              <p>Register</p>
            </Button>
          </Link>
        </>
      )}
      {isLogged && (
        <Link
          to="/offers"
          onClick={logoutHandler}
          className={classes.link_container__item}
        >
          <div className={classes.link_container__item_image}>
            <svg
              width="20px"
              height="20px"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"></path>
            </svg>
          </div>
          Log out
        </Link>
      )}
    </div>
  );
};

export default SideMenu;
