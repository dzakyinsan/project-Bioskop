import React, { Component } from "react";
import "./App.css";
import Header from "./components/header";
import Home from "./pages/home";
import { Switch, Route } from "react-router-dom";
import ManageAdmin from "./pages/manageadmin";
import Moviedetail from "./pages/movie-detail";
import Login from "./pages/login";
import { connect } from "react-redux";
import { LoginSuccessAction } from "./redux/actions";
import Axios from "axios";
import { APIURL } from "./support/ApiUrl";
import Belitiket from "./pages/belitiket";
import Register from "./pages/register";
import Cart from "./pages/cart";
// import Slide from "./components/slide";

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    var id = localStorage.getItem("user");
    console.log("id", id);
    Axios.get(`${APIURL}users/${id}`)
      //ini maksud id nya tug gimana?
      .then(res => {
        this.props.LoginSuccessAction(res.data);
        this.setState({ loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Header />
        <Switch>
          <Route path={"/"} exact>
            {/* <Slide /> */}
            <Home />
          </Route>
          <Route path={"/manageadmin"} exact component={ManageAdmin} />
          <Route path={"/moviedetail/:id"} exact component={Moviedetail} />
          <Route path={"/belitiket"} component={Belitiket} />
          <Route path={"/login"} exact component={Login} />
          <Route path={"/register"} exact component={Register} />
          <Route path={"/cart"} component={Cart} />
        </Switch>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    AuthLog: state.Auth.login
  };
};

export default connect(MapStateToProps, { LoginSuccessAction })(App);
