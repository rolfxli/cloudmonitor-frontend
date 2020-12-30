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
  CDropdownToggle,
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CInput,
  CForm,
  CInputGroup
} from '@coreui/react'
import axios from 'axios'
import MainChartExample from '../charts/MainChartExample.js'
import cookie from 'js-cookie'

import CIcon from '@coreui/icons-react'
import { freeSet } from "@coreui/icons";
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
  // initial state with array of project information
  let initialProjects = [];
  let initialNewProjectName = "";

  const history = useHistory()

  // initialize state variables to be empty array of projects
  // projects: array of {'name', 'mostRecentStatus'}
  const [projects, setProjects] = useState(initialProjects)

  const [modal, setModal] = useState(false)
  const [error, setError] = useState("");
  const [newProjectName, setNewProjectName] = useState(initialNewProjectName)

  const toggle = () => {
    setModal(!modal)
    setNewProjectName("")
  }

  
  useEffect(() => {
    getProjects();
  }, []);

  async function getProjects() {
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
  }

  async function addProject() {
    console.log(newProjectName)
    var token = cookie.get('token')
    var userid = cookie.get('userid')
    if (newProjectName != "") {
      const url = `http://127.0.0.1:5000/users/${userid}/projects?token=${token}`
      const payload = {
        "projectname": newProjectName
      }
      axios
        .all([
          axios.post(url, payload)
        ])
        .then(
          axios.spread(() => {
            getProjects()
          }),
        )
        .catch((err) => {
          console.log(err)
        })
        .finally(
          toggle()
        )
    }
  }

  function deleteProject(projectid) {
    const token = cookie.get('token')
    // delete the project
    axios.delete(`http://127.0.0.1:5000/projects/${projectid}?token=${token}`)
    .then(
      setProjects(projects.filter(
          function(project) { 
              return project.projectid !== projectid 
          }
      ))
    )
    .catch((err) => {
      console.error(err)
    });
  }

  function expandProject(projectid) {

  }

  function handleEvent(event) {
    setError("")
    const { value } = event.target
    setNewProjectName(value)
    console.log(newProjectName)
  }
  
  return (
    <>
      <div>
        <div className='projectDashboardHeader'>
          <div className='floatright'>
            <CButton
              onClick={toggle}
              color="primary"
              className="px-4"
            >Add Project</CButton>

            <CModal
              show={modal}
              onClose={toggle}
            >
              <CModalBody>
                <CForm>
                  <h2>Create a New Project</h2>
                  <br></br>
                  <CRow>
                    <CCol sm="12">
                      <h6>Project Name</h6>
                      <CInputGroup>
                        <CInput
                          label="Project Name"
                          placeholder="Enter Project Name"
                          onChange={handleEvent}
                          value={newProjectName}
                        />
                      </CInputGroup>
                      <br></br>
                      <div className='floatright'>
                        <CButton 
                          color="primary"
                          onClick={addProject}
                        >Add Project</CButton>{'  '}
                        <CButton
                          color="secondary"
                          onClick={toggle}
                        >Cancel</CButton>
                      </div>
                    </CCol>
                  </CRow>
                </CForm>
              </CModalBody>
            </CModal>
          </div>
          <h1>Projects</h1>
        </div>
          
        <div className='projectDashboardList'>
          {projects.map((project) => 
          <>
              <div className='individualproject' onClick={() => history.push(`/projects/${project.projectid}`)}>
                <div className='floatleft'>
                  <h5>{project.projectname}</h5>
                  <h6 className='projectinfodesc'>Number of APIs: {project.numberurls}</h6>
                </div>
                <div className="floatright">
                    <CButton onClick={() => expandProject(project.projectid)} shape='pill' variant='outline' color='warning'>
                    </CButton>
                    {'   '}
                    <CButton onClick={() => deleteProject(project.projectid)} shape='pill' variant='outline' color='warning'>
                      <CIcon style={{ color:"red",marginBottom: "4px"}} content={freeSet.cilTrash}></CIcon>
                    </CButton>
                </div>
                                                
              </div>
            </>
          )}
        </div>

      </div>
    </>

  );
};

export default Dashboard
