import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../support/ApiUrl";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom'

class Moviedetail extends Component {
  state = {
    datadetailfilm: {},
    traileropen: false,
    notloginyet: false,
    kelogin: false,
    belitiketok: false
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    Axios.get(`${APIURL}movies/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ datadetailfilm: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onBeliTicketClick = () => {
    if (this.props.AuthLog) {
      this.setState({ belitiketok: true });
    } else {
      this.setState({ notloginyet: true });
    }
  };

  render() {
    console.log(this.props.match.params); //ini object id
    // console.log(this.props.match.params.id)//ini buat dapeting angka id nya
    console.log("ini render");

    if (this.state.kelogin) {
      return <Redirect to={"/login"} />;
    }
    if (this.state.belitiketok) {
      return <Redirect to={"/belitiket"} />;
    }
    return (
      <div>
        <Modal isOpen={this.state.traileropen} size="lg" toggle={() => this.setState({ traileropen: false })} contentClassName="trailer">
          <ModalBody className="p-0 bg-transparent trailer">
            <iframe
              width="100%"
              height="100%"
              title={this.state.datadetailfilm.title}
              src={this.state.datadetailfilm.trailer}
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.notloginyet} toggle={() => this.setState({ notloginyet: false })}>
          <ModalBody>Antum belum loghin</ModalBody>
          <ModalFooter>
            <button className="btn btn-danger">
              <Link to={'/login'}>
              Login
              </Link>
            </button>
          </ModalFooter>
        </Modal>
        <div className="row p-3 mx-3 my-4">
          <div className="col-md-3">
            <img src={this.state.datadetailfilm.image} height="500" alt="film" />
            <div className="mt-3" style={{ fontSize: "30px" }}>
              {this.state.datadetailfilm.title}
            </div>
          </div>
          <div className="col-md-1">
            <div className="mt-1">
              Title <span>:</span>
            </div>
            <div className="mt-1">
              Sionpsis <span>:</span>
            </div>
          </div>

          <div className="col-md-8">
            <div className="mt-1">{this.state.datadetailfilm.title}</div>
            <div className="mt-1">{this.state.datadetailfilm.sinopsis}</div>
            <div className="mt-3">
              <button className="mr-3 btn btn-primary" onClick={this.onBeliTicketClick}>
                Beli tiket
              </button>
              <button className="mr-3 btn btn-warning" onClick={() => this.setState({ traileropen: true })}>
                Trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    AuthLog: state.Auth.login
  };
};

export default connect(MapStateToProps)(Moviedetail);
