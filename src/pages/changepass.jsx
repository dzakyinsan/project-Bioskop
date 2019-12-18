import React, { Component } from 'react';
import {Gantipassword} from './../redux/actions'
import Swal from 'sweetalert2'
import { Redirect } from "react-router-dom";
import { APIURL } from "./../support/ApiUrl";
import { connect } from "react-redux";
import Axios from "axios";
import Loader from "react-loader-spinner";

class Gantipass extends Component {
    state = {
        error:'',
        loading:false,
        backtohome:false
      }

      onGantipassClick=()=>{
          var passlama=this.refs.passlama.value
          var passbaru=this.refs.passbaru.value
          var password=this.refs.confpassbaru.value
          var objpass={password}
          this.setState({ loading: true });
          if(passlama===""||passbaru===""||password===""){
              this.setState({error:'password tiadk boleh kosong'})
              console.log('res data1',passlama,passbaru,password)
          }else if(passlama==passbaru){
              this.setState({error:'password tidak boleh sama dengan yang lama'})
              console.log('res data2')
          }else if(passlama!==this.props.passuser){
            this.setState({error:'password lama anda salah'})
            console.log('res data3')
          }else if(passbaru!==password){
            this.setState({error:'konfirmasi password salah'})
            console.log('res data4')
          }else{
            Axios.patch(`${APIURL}users/${this.props.userId}`, objpass)//axios.patch menggantikan isi objek, harus dalam bentuk obj juga penggantinya
            .then(res=>{
              console.log('userId',this.props.userId)
                Swal.fire({
                    title: "Yakin ganti password?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    cancelButtonText: "No",
                    confirmButtonText: "Yes"
                  }).then(result => {
                    if (result.value) {
                      this.props.Gantipassword(res.data);
                      // console.log('res data',res.data)
                      this.setState({ backtohome: true });
                      Swal.fire({
                        icon: "success",
                        title: "Password berhasil diganti",
                        showConfirmButton: false,
                        timer: 1500
                      });
                    }
                  });
                })
                .catch(err => {
                  console.log(err);
                  this.setState({ loading: false });
                });
          }
          this.setState({ loading: false });

      }

    render() { 
        if(this.state.backtohome || this.props.login==false){
            return <Redirect to={"/"} />
        }

        return (
            <div className="mt-3 d-flex justify-content-center">
                <div style={{ width: "500px", border: "1px solid black" }} className="rounded p-2">
            <h1>Change Password</h1>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input type="text" className="password" style={{ border: "transparent", width: "100%", fontSize: "20px" }} ref="passlama" placeholder="password lama" />
            </div>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input type="text" className="password" style={{ border: "transparent", width: "100%", fontSize: "20px" }} ref="passbaru" placeholder="Password baru" />
            </div>
            <div className="p-1" style={{ borderBottom: "1px solid black" }}>
              <input type="text" className="password" style={{ border: "transparent", width: "100%", fontSize: "20px" }} ref="confpassbaru" placeholder="Confirmasi Password Baru" />
            </div>
            {this.state.error === "" ? null : (
              <div className="alert alert-danger mt-2">
                {this.state.error}
                <span onClick={() => this.setState({ error: "" })} className="float-right font-weight-bold">
                  X
                </span>
              </div>
            )}
            <div className="mt-4">
              {this.state.loading ? (
                <Loader
                  type="Ball Triangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              ) : (
                <button className="btn btn-primary" onClick={this.onGantipassClick}>
                  Submit
                </button>
              )}
            </div>
            
            </div>
            </div>
          );
    }
}
const MapstateToprops = state => {
    return {
      passuser: state.Auth.password,
      login:state.Auth.login,
      userId: state.Auth.id
      
    }
}
 
export default connect(MapstateToprops,{Gantipassword})(Gantipass);