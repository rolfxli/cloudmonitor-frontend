import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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


const Login = () => {
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  function handleEvent(event) {
    setError("")
    setToken(event.target.value);
  }

  async function handleSubmit() {
    setError("")
    // setLoading(true)
    // if (token !== "") {
    //   const success = await util.handleLogin(token);
    //   if (success) {
    //     setRedirect(true);
    //   }
    //   else {
    //     setError("Invalid token, please try again");
    //   }
    // }

    setLoading(false)
    
  }

  if (redirect) {
    return <Redirect to="/#/dashboard"></Redirect>;
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
                        type="text"
                        placeholder="Your Client Token"
                        autoComplete="username"
                        onChange={handleEvent}
                        value={token}
                      />
                    </CInputGroup>
                    <CButton
                      onClick={handleSubmit}
                      disabled={token === "" || loading}
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
