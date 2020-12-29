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
import axios from 'axios'
import MainChartExample from '../charts/MainChartExample.js'
import cookie from 'js-cookie'

import CIcon from '@coreui/icons-react'
import CDataTable from '@coreui/icons-react'

const Dashboard = () => {
  // initial state with array of project information
  let initialProjects = [];

  // initialize state variables to be empty array of projects
  // projects: array of {'name', 'mostRecentStatus'}
  const [projects, setProjects] = useState(initialProjects)

  const displayProjectFields = [
    { key: 'projectname', _style: { width: '80%'} },
    { key: 'numberurls', _style: { width: '20%'} }
  ]

  
  useEffect(() => {
    var token = cookie.get('token')
    var userid = cookie.get('userid')
    
    axios
      .all([
        // retrieve all projects for the user
        axios.get(
          `http://127.0.0.1:5000/users/${userid}/projects?token=${token}`
        )
      ])
      .then(
        axios.spread((info) => {
          console.log(info.data)
          setProjects(info.data)
        })
      )
      .catch((errors) => {
        console.error(errors);
      });
  }, []);
  
  return (
    <><h1>Projects</h1>
        
      {projects.map((project) => 
      <>
          <div className='individualproject'>
            <div className='floatleft'>
              <h5>{project.projectname}</h5>
            </div>

            <div className='floatright'>
              <h6 className='projectinfodesc'>URL Count</h6>
              <h6 align='right'>{project.numberurls}</h6>
            </div>
            
            <div className='floatright'>
              <div className='floatright'></div>
              <div className='floatright'></div>
            </div>                                  
          </div>
        </>
      )}
    </>

  );
};

export default Dashboard
