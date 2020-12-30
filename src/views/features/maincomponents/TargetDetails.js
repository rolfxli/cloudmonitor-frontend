import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'
import cookie from "js-cookie";

const TargetDetails = () => {

  const initialTarget = {
    urlid: "",
    projectid: "",
    link: "",
    testtype: "",
    numsuccess: 0,
    numfailure: 0,
    mostrecentstatus: "",
    mostrecenterror: "",
    requestheaders: "",
    requestbody = "",
    requesttype = ""
  }
  const { projectid } = useParams();
  const hisory = useHistory();

  const [responseHistory, setResponseHistory] = useState([])

  useEffect(() => {
    const token = cookie.get('token')
    var url = `http://127.0.0.1:5000/targets/responses/${projectid}?token=${token}`

    axios.all(
      [
        axios.get(url)
      ]
    ).then(
      axios.spread((res) => {
        setResponseHistory(res.data)
      })
    ).catch((err) => {
      console.log(err)
    })
  }, [])

    return (
      <>Page working</>
    );
  };


  export default TargetDetails;
