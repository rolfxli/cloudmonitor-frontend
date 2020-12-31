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
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import {handleLogin} from '../../../utils/auth'


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
      const url = 'http://127.0.0.1:5000/users/login'
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
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h2>Login to view Dashboard</h2>
                    <br></br>
                    Client Token
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleEvent}
                        value={logininfo.email}
                      />

                    </CInputGroup>
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
  );
};

export default Login;
