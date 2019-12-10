import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

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
      <div className="mx-5">
        <div className="container-carousel">
          <div className="aa mb-5">
            <h1>Coming Soon</h1>
          </div>
          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157492651970791_287x421.jpg" alt="First slide" />
                <div className="carousel-caption d-none d-md-block" style={{ color: "black" }}>
                  <h2>IP MAN 4: THE FINALE</h2>
                  <h5>2 January 2020</h5>
                  <p>
                    <br />
                    Ip Man (Donnie Yen) datang ke Amerika Serikat untuk membantu muridnya, Bruce Lee (Kwok-Kwan Chan) yang mendapat diskriminasi rasial karena membuka sekolah seni bela diri Wing Chun
                    di negeri Paman Sam tersebut.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://media.21cineplex.com/webcontent/gallery/pictures/156932222788961_287x421.jpg" alt="Second slide" />
                <div className="carousel-caption d-none d-md-block" style={{ color: "black" }}>
                  <h2>A Score to Settle </h2>
                  <h5>16 January 2020</h5>
                  <p>
                    <br />
                    Frank Carver (Nicolas Cage) adalah mantan gangster yang berusaha membalas dendam kepada kelompoknya. Ia dipenjara 19 tahun akibat menanggung dosa yang tidak ia perbuat. Walau telah
                    mendapatkan uang banyak dari hasil tutup mulut, Frank tetap mendatangi satu per satu kelompoknya untuk membalas dendam dan menyamakan skor.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://media.21cineplex.com/webcontent/gallery/pictures/157416306567553_287x421.jpg" alt="Third slide" />
                <div className="carousel-caption d-none d-md-block" style={{ color: "black" }}>
                  <h2>STARWARS: The Rise of Sky Walker</h2>
                  <h5>20 February 2020</h5>
                  <p>
                    <br />
                    Resistance yang selamat sekali lagi akan menghadapi First Order dalam sebuah saga final yang akan menentukan nasib mereka.
                  </p>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>

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
