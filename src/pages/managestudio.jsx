import React, { Component } from "react";
import Axios from "axios";
import { Table, TableBody, TableHead, TableCell, TableRow } from "@material-ui/core";
import { APIURL } from "../support/ApiUrl";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Fade from "react-reveal";
import { MdLibraryAdd } from "react-icons/md";
import { FiEdit, FiPlusSquare } from "react-icons/fi";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Managestudio extends Component {
  state = {
    modalstudio: false,
    datastudio: [],
    loading: true
  };

  componentDidMount = () => {
    Axios.get(`${APIURL}studios`)
      .then(res => {
        var data = res.data;
        this.setState({ datastudio: data, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSaveAddClick=()=>{
      var nama=this.refs.namastudio.value
      var jumlahKursi=this.refs.jmlkursi.value
      var databaru={
          nama,jumlahKursi
      }
      Axios.post(`${APIURL}studios`,databaru)
      .then(()=>{
        Axios.get(`${APIURL}studios`)
        .then(res1=>{
            this.setState({datastudio:res1.data,modalstudio:false})
        })
        .catch(err1=>{
            console.log(err1)
        })
      }).catch(err=>{
          console.log(err)
      })
      this.setState({modalstudio:false})
  }

  renderStudio = () => {
    return this.state.datastudio.map((val, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{val.nama}</TableCell>
          <TableCell>{val.jumlahKursi}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
      if(this.state.loading){
          return<div>laoding...</div>
      }
    return (
      <div>
        <Modal isOpen={this.state.modalstudio} toggle={() => this.setState({ modalstudio: false })}>
          <ModalHeader>
            add Studio
            <FiPlusSquare className="mb-2 ml-1" />{" "}
          </ModalHeader>
          <ModalBody>
            <input type="text" ref="namastudio" placeholder="nama studio" className="form-control mt-3" />
            <input type="number" ref="jmlkursi" placeholder="jumlah kursi" className="form-control mt-3" />
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={this.onSaveAddClick}>
              Save
            </button>
            <button className="btn btn-danger" onClick={() => this.setState({ modalstudio: false })}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
        <Fade>
          <button className="btn btn-success mt-2" onClick={() => this.setState({ modalstudio: true })}>
            <MdLibraryAdd style={{ fontSize: 20 }} /> &nbsp; Add Studio
          </button>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Nama Studio</TableCell>
                <TableCell>Jumlah Kursi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.renderStudio()}</TableBody>
          </Table>
        </Fade>
      </div>
    );
  }
}

export default Managestudio;
