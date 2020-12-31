import React, { useEffect, useState } from 'react'
import {
  CCol,
  CSpinner,
  CRow,
  CModal,
  CButton,
  CModalBody,
  CInput,
  CForm,
  CInputGroup
} from '@coreui/react'
import axios from 'axios'
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
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false)
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
          `${process.env.REACT_APP_BASEURL}users/${userid}/projects?token=${token}`
        )
      ])
      .then(
        axios.spread((info) => {
          setProjects(info.data)
          setLoading(false)
        })
      )
      .catch((errors) => {
        console.error(errors);
        setLoading(false)
      });
  }

  async function addProject() {
    console.log(newProjectName)
    var token = cookie.get('token')
    var userid = cookie.get('userid')
    if (newProjectName !== "") {
      const url = `${process.env.REACT_APP_BASEURL}users/${userid}/projects?token=${token}`
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

  function deleteProject(event, projectid) {
    const token = cookie.get('token')
    // delete the project
    axios.delete(`${process.env.REACT_APP_BASEURL}projects/${projectid}?token=${token}`)
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
    event.stopPropagation()
  }

  function handleEvent(event) {
    const { value } = event.target
    setNewProjectName(value)
    console.log(newProjectName)
  }
  
  return (
    <>
    {loading ? (
        <center>
          {" "}
          <CSpinner
            className="loadingspinner"
            style={{
              width: "4rem",
              height: "4rem",
              marginTop: "20%",
              marginBottom: "20%",
            }}
            color="success"
            variant="grow"
          />
        </center>
      ) : (
      <div style={{marginBottom: "30px"}}>
        <div className='projectDashboardHeader'>
          <div className='floatright'>
            <CButton
              onClick={toggle}
              color="primary"
            ><b>Create Project</b></CButton>

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
              <div className='individualprojectdashboard' onClick={() => history.push(`/projects/${project.projectid}`)}>
                <div className='floatleft'>
                  <h5>{project.projectname}</h5>
                  <h6 className='projectinfodesc'>Number of APIs: {project.numberurls}</h6>
                </div>
                <div className="floatright">
                    
                    <CButton onClick={(e) => deleteProject(e, project.projectid)} shape='pill' variant='outline' color='warning'>
                      <CIcon style={{ color:"red",marginBottom: "4px"}} content={freeSet.cilTrash}></CIcon>
                    </CButton>
                </div>
                                                
              </div>
            </>
          )}
        </div>

      </div>
      )}
    </>

  );
};

export default Dashboard
