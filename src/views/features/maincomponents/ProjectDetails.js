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
import CIcon from "@coreui/icons-react";

import {useHistory, useParams} from 'react-router-dom'

import { freeSet } from '@coreui/icons'


import axios from "axios";
import cookie from 'js-cookie'

const ProjectDetails = () => {

    
    const [targets, setTargets] = useState([])
    const {projectid} = useParams()
    const history = useHistory()


    function getColorfromStatus(status) {
        if (status === "SUCCESS") {
            return "success"
        }
        else {
            return "warning"
        }
    }

    function calculateUptime(success, failure) {
        console.log(success)
        console.log(failure)
        var result = Math.round(parseFloat(parseFloat(success) / (parseFloat(failure) + parseFloat(success))), 6)
        console.log(result)
        return result
    }
    
  useEffect(() => {
    var token = cookie.get('token')
    
    axios
      .all([
        // Get all details for the project
        axios.get(
            `http://127.0.0.1:5000/projects/${projectid}?token=${token}`
        ),

        // Get all targets for the project
        axios.get(
            `http://127.0.0.1:5000/projects/urls/${projectid}?token=${token}`
        )
      ])
      .then(
        axios.spread((project, targets) => {
            setTargets(targets.data);
            console.log(targets.data)
        })
      )
      .catch((err) => {
        history.push('/dashboard')
      });
  }, []);


    return (
        <>Project Details Page
        
        {targets.map((target) => 
        <>
            <div className='individualproject'>
                <div className='floatleft'>
                <h5>{target.link}
                </h5>
                </div>
                
                
                <div className='floatright'>
                    <h6 className='projectinfo'>{target.requesttype}
                        </h6>
                </div>
                <div className='floatright'>
                <div className='floatright'>
<h6 className='projectinfo'>{calculateUptime(target.numsuccess, target.numfailure)} <CIcon content={freeSet.cilChevronDoubleUp}></CIcon></h6>
                </div>
                <div className='floatright'>
                <CButton className='statusbutton' color={getColorfromStatus(target.mostrecentstatus)}>{target.mostrecentstatus}</CButton>

                </div>

</div>
                
               
                
            </div>
            </>
        )}
        
        </>

    );
};

export default ProjectDetails;
