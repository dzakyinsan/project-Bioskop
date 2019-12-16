import React, { Component } from "react";
import Axios from "axios";
import { APIURL } from "../support/ApiUrl";
import { connect } from "react-redux";
import { Table, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Notification } from "./../redux/actions";

class Cart extends Component {
  state = {
    datacart: null //berisi berapa kali order film
  };

  componentDidMount() {
      console.log(this.props.userId)
    Axios.get(`${APIURL}orders?_expand=movie&UserId=${this.props.userId}&bayar=false`)//apiurl dari orders yg memiliki userId(...) ditambah movienya, dan yg bayarnya = false
      .then(res => {
        if(res.data.length){
        }
        var datacart=res.data
        var qtyArr=[]//berisi jumlah tiket per orderId
        console.log('cart res.data',res.data)
        console.log('cart res',res)
        res.data.forEach((element)=>{
            qtyArr.push(Axios.get(`${APIURL}ordersDetails?orderId=${element.id}`))
        })
        var qtyArrFinal=[]
        Axios.all(qtyArr)
        .then((res1)=>{
            res1.forEach((val)=>{
            qtyArrFinal.push(val.data)
            })
            // console.log(qtyArrFinal)
            var datafinal=[]
            datacart.forEach((val,index)=>{
            datafinal.push({...val,qty:qtyArrFinal[index]})
          })
            console.log(datafinal)
            this.setState({datacart:datafinal})
            // this.props.Notification(datafinal)
          }).catch((err)=>{

        })
      }).catch(err => {
        console.log(err);
      });
  }

  renderCart = () => {
    if (this.state.datacart !== null) {
      {this.props.Notification(this.state.datacart.length)}
        if(this.state.datacart.length===0){
            return(
                <tr>
                    <td>Belum ada pesanan di Cart</td>
                </tr>
            )
        }
      return this.state.datacart.map((val, index) => {
        return (
          <tr key={index}>
            <td style={{ width: 100 }}>{index + 1}</td>
            <td style={{ width: 300 }}>{val.movie.title}</td>
            <td style={{ width: 100 }}>{val.jadwal}</td>
            <td style={{ width: 100 }}>{val.qty.length}</td>
            <td style={{ width: 100 }}>
              <button>Detail</button>
            </td>
          </tr>
        );
      });
    }
  };

  render() {
    console.log('datacart',this.state.datacart)
    if(this.props.userId){
          return(
            <div>
        <center>
          <Table style={{ width: 600 }}>
            <thead>
              <tr>
                <th style={{ width: 100 }}>No.</th>
                <th style={{ width: 300 }}>Title</th>
                <th style={{ width: 100 }}>Jadwal</th>
                <th style={{width:100}}> quantity</th>
                <th style={{ width: 100 }}>Detail</th>
              </tr>
            </thead>
            <tbody>{this.renderCart()}</tbody>
            <tfoot>
                <button>Checkbox</button>
            </tfoot>
          </Table>
        </center>
      </div>
          )}
          return (
            <div>
            404 not found
        </div>
    );
  }
}

const MapStateToProps=(state)=>{
    return{
        AuthLog:state.Auth.login,
        userId:state.Auth.id
    }
}

export default connect (MapStateToProps,{Notification}) (Cart);
