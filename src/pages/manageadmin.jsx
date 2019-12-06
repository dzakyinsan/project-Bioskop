import React, { Component } from "react";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import Axios from "axios";
import { APIURL } from "../support/ApiUrl";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Fade from "react-reveal";

class ManageAdmin extends Component {
  state = {
    dataFilm: [],
    readmoreselected: -1,
    modalad: false,
  };
  componentDidMount() {

    Axios.get(`${APIURL}movies`)
      .then(res => {
        this.setState({ dataFilm: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  splitini=(a='')=>{
      var b=a.split('').filter((val,index)=>index<=50)
      return b
  }
  onSaveAddClick = () => {
    var jadwaltempelate = [12, 14, 16, 18, 20];
    var jadwal = [];
    for (var i = 0; i < jadwaltempelate.length; i++) {
      if (this.refs[`jadwal${i}`].checked) {
        jadwal.push(jadwaltempelate[i]);
      }
    }
    var iniref = this.refs;
    var title = iniref.title.value;
    var image = iniref.image.value;
    var sinopsis = iniref.sinopsis.value;
    var sutradara = iniref.sutradara.value;
    var genre = iniref.genre.value;
    var durasi = iniref.durasi.value;
    var produksi = "RANS";
    var data = {
      title: title,
      image,
      sinopsis,
      sutradara,
      genre,
      durasi,
      produksi,
      jadwal
    };
    Axios.post(`${APIURL}movies`, data)
      .then(() => {
        // console.log(res.data);
        Axios.get(`${APIURL}movies`)
          .then(res => {
            this.setState({ dataFilm: res.data });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderMovies = () => {
    return this.state.dataFilm.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.title}</TableCell>
          <TableCell>
            <img src={val.image} alt={"gambar"} height="200px" />
          </TableCell>
          {this.state.readmoreselected === index ? 
            <TableCell>
              {val.sinopsis}
              <span style={{ color: "red" }} onClick={() => this.setState({ readmoreselected: -1 })}>
                (Read Less)
              </span>
            </TableCell>
           : 
            <TableCell>
              {this.splitini(val.sinopsis)}
              <span onClick={() => this.setState({ readmoreselected: index })}> (Read more)</span>
            </TableCell>
          }
          <TableCell>{val.jadwal}</TableCell>
          <TableCell>{val.sutradara}</TableCell>
          <TableCell>{val.genre}</TableCell>
          <TableCell>{val.durasi}</TableCell>
          <TableCell>
            <button className="btn btn-outline-primary">Edit</button>
            <button className="btn btn-outline-danger">Delete</button>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div className="mx-3">
        <Modal isOpen={this.state.modaladd} toggle={() => this.setState({ modaladd: false })}>
          <ModalHeader>add data</ModalHeader>
          <ModalBody>
            <input type="text" ref="title" placeholder="title" className="form-control" />
            <input type="text" ref="image" placeholder="image" className="form-control" />
            <input type="text" ref="sinopsis" placeholder="sinopsis" className="form-control" />
            Jadwal:
            <input type="checkbox" ref="jadwal0" />
            12.00
            <input type="checkbox" ref="jadwal1" />
            14.00
            <input type="checkbox" ref="jadwal2" />
            16.00
            <input type="checkbox" ref="jadwal3" />
            18.00
            <input type="checkbox" ref="jadwal4" />
            20.00
            <input type="text" ref="sutradara" placeholder="sutradara" className="form-control" />
            <input type="number" ref="durasi" placeholder="durasi" className="form-control" />
            <input type="text" ref="genre" placeholder="genre" className="form-control" />
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.onSaveAddClick}>
              Save
            </button>
            <button className="btn btn-danger" onClick={() => this.setState({ modaladd: false })}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        <Fade>
          <button className="btn btn-success" onClick={() => this.setState({ modaladd: true })}>
            {" "}
            Add data
          </button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Judul</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Sinopsis</TableCell>
                <TableCell>Jadwal</TableCell>
                <TableCell>Sutradara</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Durasi</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderMovies()}</TableBody>
          </Table>
        </Fade>
      </div>
    );
  }
}

export default ManageAdmin;
