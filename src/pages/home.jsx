import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Slide from "../components/slide";


const url = "http://localhost:2000/";

class Home extends Component {
  state = {
    dataMovies: [],
    readMore: -1
  };
  componentDidMount() {
    Axios.get(`${url}Movies`)
      .then(res => {
        this.setState({ dataMovies: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  splitini = (a = "") => {
    var b = a.split("").filter((val, index) => index <= 48);
    return b;
  };

  renderMovies = () => {
    return this.state.dataMovies.map((val, index) => {
      return (
        <div key={index} className="col-md-2 py-5 pr-3 pl-1 ">
          <div className="card kartu " style={{ width: "100%" }}>
            <div className="gambaar1">
              <Link to={"/moviedetail/" + val.id}>
                <img src={val.image} className="card-img-top kartu gambar" alt="..." />
              </Link>
            </div>
            <div className="card-body">
              <h5 className="card-title">{val.title}</h5>

              {this.state.readMore === index ? (
                <p className="readmore card-text">
                  {val.sinopsis}
                  <span onClick={() => this.setState({ readMore: -1 })}> Read Less</span>
                </p>
              ) : (
                <p className=" readmore card-text">
                  {this.splitini(val.sinopsis)}
                  <span onClick={() => this.setState({ readMore: index })}> Read More</span>
                </p>
              )}
              <a href="/deskripsifilm" className="btn btn-info btncard">
                Description
              </a>
              <a href="#" className="btn btn-warning btncard">
                Buy Ticket
              </a>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className=" home">
        <Slide />
        <div className="aa mt-5">
          <h1>Now Playing</h1>
        </div>
        <div className="row " style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}

export default Home;
