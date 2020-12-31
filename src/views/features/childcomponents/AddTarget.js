import React, { useState } from "react";
import {
  CInput,
  CButton,
  CLabel,
  CSelect,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";

import cookie from "js-cookie";
import axios from "axios";
import JSONInput from "react-json-editor-ajrm";

const AddTarget = ({ visible, projectid, closemodal, addnewtarget }) => {
  const initialnewtarget = {
    link: "",
    testtype: "",
    headers: "",
    body: "",
    requesttype: "GET",
  };

  var requesttypes = [
    { name: "GET", value: "GET" },
    { name: "POST", value: "POST" },
    { name: "PUT", value: "PUT" },
    { name: "DELETE", value: "DELETE" },
  ];

  var initvalidity = {
    link: false,
    headers: true,
    body: true,
  };

  const [newtarget, setNewtarget] = useState(initialnewtarget);
  const [validity, setValidity] = useState(initvalidity);

  function handleEventHeaders(event) {
    setValidity((preState) => ({
      ...preState,
      headers: false,
    }));

    if (event.error === false) {
      setNewtarget((preState) => ({
        ...preState,
        headers: event.json,
      }));
      setValidity((preState) => ({
        ...preState,
        headers: true,
      }));
    }
  }

  function handleEventBody(event) {
    setValidity((preState) => ({
      ...preState,
      body: false,
    }));

    if (event.error === false) {
      setNewtarget((preState) => ({
        ...preState,
        body: event.json,
      }));
      setValidity((preState) => ({
        ...preState,
        body: true,
      }));
    }
  }

  function handleEvent(event) {
    let { name, value } = event.target;

    setNewtarget((preState) => ({
      ...preState,
      [name]: value,
    }));

    if (value === null || value === "") {
      setValidity((preState) => ({
        ...preState,
        link: false,
      }));
    } else {
      setValidity((preState) => ({
        ...preState,
        link: true,
      }));
    }
  }

  async function handleSubmit() {
    const token = cookie.get("token");
    if (token) {
      const url = `http://127.0.0.1:5000/projects/${projectid}/targets?token=${token}`;
      const payload = {
        link: newtarget.link,
        testtype: "API Test",
        requestheaders: JSON.stringify(newtarget.headers),
        requestbody: JSON.stringify(newtarget.body),
        requesttype: newtarget.requesttype,
      };
      console.log("POAYLOD")
      console.log(payload)
      try {
        let newtarget = (await axios.post(url, payload)).data;
        addnewtarget(newtarget);
      } catch (err) {
        console.error(err);
      } finally {
        closemodal();
      }
    }
  }

  return (
    <>
      <CModal onClose={() => closemodal()} color="primary" show={visible}>
        <CModalHeader>Add New Target</CModalHeader>
        <CModalBody>
          <CLabel>Url Link</CLabel>
          <CInput
            type="text"
            name="link"
            onChange={handleEvent}
            value={newtarget.link}
            placeholder="Eg. https://reqres.in/api/products/4"
          />

          <CLabel>Request Type</CLabel>
          <CSelect
            onChange={handleEvent}
            value={newtarget.requesttype}
            type="select"
            name="requesttype"
          >
            {requesttypes.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </CSelect>

          <CLabel>Headers (Enter a valid JSON object)</CLabel>
          <JSONInput
            value={newtarget.headers}
            onChange={handleEventHeaders}
            id="a_unique_id"
            height="100px"
          />

          {newtarget.requesttype !== "GET" && (
            <>
              <CLabel>Request Body (Enter a valid JSON object)</CLabel>
              <JSONInput
                value={newtarget.body}
                onChange={handleEventBody}
                id="a_unique_id"
                height="100px"
              />
            </>
          )}

          <CButton
            onClick={() => handleSubmit()}
            disabled={!(validity.link && validity.headers && validity.body)}
            color="success"
          >
            Create
          </CButton>
        </CModalBody>
      </CModal>
    </>
  );
};

export default AddTarget;
