import React, { useState } from "react";
import {
  CRow,
  CCol,
  CContainer,
  CInput,
  CButton,
  CForm,
  CSpinner,
  CInputGroup,
  CInputGroupAppend,
  CLabel,
  CSelect,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

import axios from "axios";
import JSONInput from "react-json-editor-ajrm";

const AddTarget = ({ visible }) => {
  const initialnewtarget = {
    link: "",
    testtype: "",
  };

  var requesttypes = [
    { name: "GET", value: "GET" },
    { name: "POST", value: "POST" },
    { name: "PUT", value: "PUT" },
    { name: "DELETE", value: "DELETE" },
  ];

  const [newtarget, setNewtarget] = useState(initialnewtarget);

  return (
    <>
      <CModal color="primary" show={visible}>
        <CModalHeader>Add New Target</CModalHeader>
        <CModalBody>
          <CLabel>Url Link</CLabel>
          <CInput
            type="text"
            name="link"
            value={newtarget.link}
            placeholder="Eg. https://reqres.in/api/products/4"
          />

          <CLabel>Request Type</CLabel>
          <CSelect type="select" name="requesttype">
            {requesttypes.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </CSelect>

          <CLabel>Headers (Enter a valid JSON object)</CLabel>
          <JSONInput id="a_unique_id" height="250px" />

          <CLabel>Request Body (Enter a valid JSON object)</CLabel>
          <JSONInput id="a_unique_id" height="250px" />

          <CButton color="success">Create</CButton>
        </CModalBody>
      </CModal>
    </>
  );
};

export default AddTarget;
