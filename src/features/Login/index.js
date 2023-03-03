import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import COLORS from "../../constants/colors";
import { CssBaseline } from "@material-ui/core";
import store from "../../app/store";
import { checkTokenStatus, login } from "../../app/authen/authenSlice";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import paths from "../../configs/paths";
import { clientID, scopes } from "configs";
import GoogleLogin from "react-google-login";
import { fetchMyProfile } from "app/user/userSlice";

const useStyles = makeStyles({
  login: {
    display: "grid",
    placeItems: "center",
    height: "100vh",
    backgroundColor: "black",

    "& img": {
      width: "50%",
    },

    "& button": {
      padding: "20px",
      borderRadius: "99px",
      backgroundColor: COLORS.Green,
      fontWeight: 600,
      color: COLORS.White,
      textDecoration: "none",
    },

    "& button:hover": {
      backgroundColor: COLORS.White,
      borderColor: COLORS.Green,
      color: COLORS.Green,
    },
  },
});

const Login = ({ isValidAuthentication }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (isValidAuthentication) {
      window.location.href = paths.BASE;
    }
    store.dispatch(checkTokenStatus());
    return () => {};
  }, []);

  const onLoginSuccess = (response) => {
    console.log(response);
    if (response) {
      store.dispatch(login({ token: response.accessToken }));
      store.dispatch(fetchMyProfile({ profileObj: response.profileObj }));
      history.push(paths.BASE);
    }
  };

  const onLoginFailed = (response) => {
    console.log("Failed to login: ", response);
  };

  return (
    <>
      <CssBaseline />
      <form>
        <div className={classes.login}>
          <img
            src="https://cdn.cultofmac.com/wp-content/uploads/2018/01/YouTube-dark.jpg"
            alt="Youtube-Logo"
          />
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            scope={scopes.join(" ")}
            buttonText="Login"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailed}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  const isValidAuthentication = state.authen.isValidAuthentication;
  return {
    isValidAuthentication,
  };
};

export default connect(mapStateToProps)(Login);
