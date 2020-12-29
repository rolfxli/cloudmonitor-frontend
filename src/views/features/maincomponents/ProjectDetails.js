import React, { useState, useEffect } from "react";
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
} from "@coreui/react";

import axios from "axios";
import cookie from 'js-cookie'

const ProjectDetails = () => {
    const [targets, setTargets] = useState([])

    
  useEffect(() => {
    var token = cookie.get('token')
    
    axios
      .all([
        axios.get(
          `http://127.0.0.1:5000/projects/1?token=${token}`
        ),
        axios.get(
          `http://127.0.0.1:5000/projects/2?token=${token}`
        ),
      ])
      .then(
        axios.spread((info, info2) => {
          console.log(info.data)
          console.log(info2.data)
          setProject(info.data)
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, []);


    return (
        <>Page working</>

    );
};

export default ProjectDetails;
