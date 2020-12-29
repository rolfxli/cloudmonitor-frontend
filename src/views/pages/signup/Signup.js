import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
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


const Signup = () => {
  
  const history = useHistory();
  
  let initiallogin = {
    email: "",
    password: ""
  }
  const [signupinfo, setsignupinfo] = useState(initiallogin)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  function handleEvent(event) {
    setError("")
    const { name, value } = event.target
    setsignupinfo((preState) => ({
      ...preState,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    setError("")
    setLoading(true)
    if (signupinfo.email !== "" && signupinfo.password != "") {
      const url = 'http://127.0.0.1:5000/users/signup'
      const payload = {
        "email": signupinfo.email,
        "password": signupinfo.password
      }
      try {
        var result = (await axios.post(url, payload)).data
        handleLogin(result.token)
        history.push('/dashboard')
      }
      catch(err) {
        setError("Account already exists")
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
                    <h2>Sign Up for an Account</h2>
                    <br></br>
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
                        value={signupinfo.email}
                      />

                    </CInputGroup>
                    <CInputGroup>
                    <CInput
                        type="password"
                        name = "password"
                        placeholder="Password"
                        autoComplete="username"
                        onChange={handleEvent}
                        value={signupinfo.password}
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

export default Signup;
