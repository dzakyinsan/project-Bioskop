import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../support/ApiUrl";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core";
import { Notification } from "./../redux/actions";

class Cart extends Component {
  state = {
    datacart: null,
    modaldetail: false,
    indexdetail: 0,
    datacheckout: [],
    modaldelete: false,
    datadelete: {},
    modalcheckout: false,
    hargacheckout: 0,
    loading: true
  };

  componentDidMount() {
    console.log(this.props.userId);
    Axios.get(`${APIURL}orders?_expand=movie&UserId=${this.props.userId}&bayar=false`) //apiurl dari orders yg memiliki userId(...) ditambah movienya, dan yg bayarnya = false
      .then(res => {
        var datacart = res.data;
        var qtyArr = []; //berisi jumlah tiket per orderId
        res.data.forEach(element => {
          qtyArr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`));
        });
        var qtyArrFinal = [];
        Axios.all(qtyArr)
          .then(res1 => {
            res1.forEach(val => {
              qtyArrFinal.push(val.data);
            });
            // console.log(qtyArrFinal)
            var datafinal = [];
            datacart.forEach((val, index) => {
              datafinal.push({ ...val, qty: qtyArrFinal[index] });
            });
            console.log(datafinal);
            this.setState({ datacart: datafinal });
            // this.props.Notification(datafinal.length)
          })
          .catch(err => {});
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderCart = () => {
    if (this.state.datacart !== null) {
      // this.props.Notification(this.state.datacart.length);
      if (this.state.datacart.length === 0) {
        return (
          <tr>
            <td>Belum ada pesanan di Cart</td>
          </tr>
        );
      }

      return this.state.datacart.map((val, index) => {
        return (
          <tr key={index} scope="row">
            <td style={{ width: 100 }}>{index + 1}</td>
            <td style={{ width: 300 }}>{val.movie.title}</td>
            <td style={{ width: 100 }}>{val.jadwal}</td>
            <td style={{ width: 100 }}>{val.qty.length}</td>
            <td style={{ width: 100 }}>
              <button className="btn btn-outline-secondary" onClick={() => this.setState({ modaldetail: true, indexdetail: index })}>
                Detail
              </button>
              <button className="mt-2 mb-2 btn btn-danger" onClick={() => this.setState({ modaldelete: true, datadelete: val })}>
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
  };

  totalcheckout = () => {
    var pesanan = this.state.datacart;
    for (var i = 0; i < pesanan.length; i++) {
      this.state.hargacheckout += pesanan[i].totalharga;
    }
    return this.state.hargacheckout;
  };

  bayarcheckout = () => {
    var pesanan = this.state.datacart;
    for (var i = 0; i < pesanan.length; i++) {
      var data = {
        userId: pesanan[i].userId,
        movieId: pesanan[i].movieId,
        jadwal: pesanan[i].jadwal,
        totalharga: pesanan[i].totalharga,
        bayar: true,
        id: pesanan[i].id
      };
      var id = data.id;
      // console.log(data)
      Axios.put(`${APIURL}orders/${id}`, data)
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
    this.setState({ modalcheckout: false });
  };

  renderCart = () => {
    console.log('datacart',this.state.datacart)
    if (this.state.datacart !== null) {
      if (this.state.datacart.length === 0) {
        // console.log('rendercart')
        return (
          <tr>
            <td>belum ada barang di Cart </td>
          </tr>
        );
      }

      return this.state.datacart.map((val, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1} </TableCell>
            <TableCell>{val.movie.title} </TableCell>
            <TableCell>{val.jadwal} </TableCell>
            <TableCell>{val.qty.length} </TableCell>
            <TableCell>Rp. {val.totalharga} </TableCell>
            <TableCell>
              <button className="mt-2 mb-2 mr-2 btn btn-info" onClick={() => this.setState({ modaldetail: true, modalindex: index })}>
                Detail
              </button>
            </TableCell>
          </TableRow>
        );
      });
    }
  };

  render() {
    console.log("datacart", this.state.datacart);
    if (this.props.userId) {
      return (
        <div>
          <Modal
            isOpen={this.state.modaldetail}
            toggle={() => {
              this.setState({ modaldetail: false });
            }}
          >
            <ModalHeader>Details</ModalHeader>
            <ModalBody>
              <Table>
                <tbody>
                  <tr>
                    <th>No.</th>
                    <th>Bangku</th>
                  </tr>
                </tbody>
                <tbody>
                  {this.state.datacart !== null && this.state.datacart.length !== 0
                    ? this.state.datacart[this.state.indexdetail].qty.map((val, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{"abcdefghijklmnopqrstuvwxyz".toUpperCase()[val.row] + [val.seat + 1]}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </Table>
            </ModalBody>
          </Modal>
          <Modal isOpen={this.state.modalcheckout} toggle={() => this.setState({ modalcheckout: false, hargacheckout: 0 })} size="sm">
            {
            this.state.modalcheckout ? 
            <ModalBody>Jumlah pesanan {this.state.datacart.length} Tiket, Total Harga Rp. {this.totalcheckout()}</ModalBody>
             : 
             null
             }

            <ModalFooter>
              <button className="mt-2 mb-2 btn btn-primary" onClick={this.bayarcheckout}>
                Bayar 
              </button>
            </ModalFooter>
          </Modal>
          <center>
            <Table className="table" style={{ width: 1500 }}>
              <thead className="thead-light">
                <tr>
                  <th scope="col" style={{ width: 100 }}>
                    No.
                  </th>
                  <th scope="col" style={{ width: 300 }}>
                    Title
                  </th>
                  <th scope="col" style={{ width: 100 }}>
                    Jadwal
                  </th>
                  <th scope="col" style={{ width: 100 }}>
                    {" "}
                    Quantity
                  </th>
                  <th scope="col" style={{ width: 100 }}>
                    {" "}
                    Harga
                  </th>
                  <th scope="col" style={{ width: 100 }}>
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody>{this.renderCart()}</tbody>
              <tfoot>
                <button className="btn btn-success" onClick={() => this.setState({ modalcheckout: true })}>
                  Checkout
                </button>
              </tfoot>
            </Table>
          </center>
        </div>
      );
    }
    return <div>404 not found</div>;
  }
}

const MapStateToProps = state => {
  return {
    AuthLog: state.Auth.login,
    userId: state.Auth.id
  };
};

export default connect(MapStateToProps, { Notification })(Cart);
