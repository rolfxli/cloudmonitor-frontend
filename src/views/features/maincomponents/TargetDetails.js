import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom";
import { 
  CChart,
  CChartLine } from '@coreui/react-chartjs'
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
    requestbody: "",
    requesttype: ""
  }
  const { targetid } = useParams();
  const hisory = useHistory();

  const [responseHistory, setResponseHistory] = useState([])
  const [responses, setResponses] = useState([])

  useEffect(() => {
    const token = cookie.get('token')
    //console.log(targetid)
    var url = `http://127.0.0.1:5000/targets/responses/${targetid}?token=${token}`

    axios.all(
      [
        axios.get(url)
      ]
    ).then(
      axios.spread((res) => {
        setResponseHistory(res.data)
        console.log(res.data)
        console.log(responseHistory)
        filterResponseTimes()
        //console.log(responses)
      })
    ).catch((err) => {
      console.log(err)
    })
  }, [])

  // set the ping times
  function filterResponseTimes() {
    var responseCount = responseHistory.length;
    console.log(responseHistory)
    var res = [];
    for (let i = 0; i < responseCount; ++i) {
      //console.log(responseHistory[i]['responsetime'])
      res.append(responseHistory[i]['responsetime']);
    }
    setResponses(res);
  }

  const options = {
    // tooltips: {
    //   enabled: false,
    //   custom: customTooltips
    // },
    maintainAspectRatio: false
  }

  const responseTimes = {
    labels: [],
    datasets: [
      {
        label: 'Response Times',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: responses,
      },
    ],
  };

    return (
      <>
       <div className="col-md-6">
        <h4>Response History</h4>
        <div className="chart-wrapper">
          <CChart type="line" datasets={responseTimes.datasets} options={options} />
        </div>
        <hr />
      </div>
      </>
    );
  };


  export default TargetDetails;
