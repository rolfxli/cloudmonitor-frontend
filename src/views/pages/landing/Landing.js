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

import Home from '../../Home'

import Header from '../../../components/layout/Header'

const Landing = () => {

  return (
    <>
    <Header></Header>
        <Home></Home>
    </>
  );
};

export default Landing;
