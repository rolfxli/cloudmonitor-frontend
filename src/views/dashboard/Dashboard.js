import React, { useEffect, Component, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CSpinner,
  CRow,
  CWidgetDropdown,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import MainChartExample from '../charts/MainChartExample.js'
import cookie from 'js-cookie'

const Dashboard = () => {
  const initialproject ={
    projectname: "",
    numberurls: 0,
    userid: 0,
    projectid: 0,
    uptime: 0
  }
  const [project, setProject] = useState(initialproject)

  
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
    <>Main Page<br></br>
    {project.projectname}
    </>
    
  );
};

export default Dashboard
