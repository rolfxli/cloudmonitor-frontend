import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CAlert,
  CInput,
  CInputGroup,
  CRow,
  CSpinner,
} from "@coreui/react";
import axios from "axios";
import {handleLogin} from '../../../utils/auth'

import Header from '../../../components/layout/Header'
import '../../../assets/scss/style.scss'


const Login = () => {
  
  const history = useHistory();
  
  let initiallogin = {
    email: "",
    password: ""
  }
  const [logininfo, setLogininfo] = useState(initiallogin)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  function handleEvent(event) {
    setError("")
    const { name, value } = event.target
    setLogininfo((preState) => ({
      ...preState,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    setError("")
    setLoading(true)
    if (logininfo.email !== "" && logininfo.password !== "") {
      const url = `${process.env.REACT_APP_BASEURL}users/login`
      const payload = {
        "email": logininfo.email,
        "password": logininfo.password
      }
      try {
        var result = (await axios.post(url, payload)).data
        handleLogin(result.token, result.userid, result.email)
        history.push('/dashboard')
      }
      catch(err) {
        setError("Invalid username/password")
      }
      finally {
        setLoading(false)
      }
    }

  }
  return (
    <>
    <Header></Header>
    <br></br>
    <div className="hero section center-content illustration-section-01r" style={{marginTop: "15%"}}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard>
                <CCardBody>
                  <CForm>
                    <h2>Login to view Dashboard</h2>
                    <br></br>
                    <h6 color='white'>Email
                      </h6>
                    <CInputGroup className="mb-3">
                      <CInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleEvent}
                        value={logininfo.email}
                      />

                    </CInputGroup>
                    <h6 color='white'>Password
                      </h6> 
                    <CInputGroup>
               
                      <CInput
                        type="password"
                        name = "password"
                        placeholder="Password"
                        autoComplete="username"
                        onChange={handleEvent}
                        value={logininfo.password}
                      />
                    </CInputGroup>
                    <br></br>
                    <CButton
                      onClick={handleSubmit}
                      color="primary"
                      className="px-4"
                    >
                      Login
                    </CButton>
                    <br></br><br></br>
                    {error && (
                      <>
                        <CAlert color="danger" closeButton>
                          {error}
                        </CAlert>
                      </>
                    )}
                    {loading && 
                    <center>
                     <CSpinner
                     style={{width:'4rem', height:'4rem', marginTop: "20px", marginBottom: "20px"}}
                     color="success"
                     variant="grow"
                   />
                   </center>
                    }
                   
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    </>
  );
};

export default Login;
