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
import { Notification } from "./redux/actions";

class App extends Component {
  state = {
    loading: true,
    datacart: []
  };

  componentDidMount() {
    var id = localStorage.getItem("user");
    console.log("id", id);
    Axios.get(`${APIURL}users/${id}`)
      //ini maksud id nya tug gimana?
      .then(res => {
        this.props.LoginSuccessAction(res.data);
        Axios.get(`${APIURL}orders?_expand=movie&UserId=${this.props.userId}&bayar=false`)
          .then(res1 => {
            var datacart = res1.data;
            console.log(res1);
            this.setState({
              datacart: datacart,
              loading: false
            });
          })
          .catch(err1 => {
            console.log(err1);
          });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    {
      this.props.Notification(this.state.datacart.length);
    }
    console.log(this.props.Notification);
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
    AuthLog: state.Auth.login,
    userId: state.Auth.id
  };
};

export default connect(MapStateToProps, { LoginSuccessAction, Notification })(App);
