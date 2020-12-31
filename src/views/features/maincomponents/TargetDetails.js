import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CChartLine } from "@coreui/react-chartjs";
import axios from "axios";
import cookie from "js-cookie";

import { CContainer, CLabel, CSpinner, CInput, CSelect, CButton } from "@coreui/react";

import JSONInput from "react-json-editor-ajrm";

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
    requesttype: "",
  };
  const { projectid, targetid } = useParams();

  var requesttypes = [
    { name: "GET", value: "GET" },
    { name: "POST", value: "POST" },
    { name: "PUT", value: "PUT" },
    { name: "DELETE", value: "DELETE" },
  ];

  var initvalidity = {
    link: true,
    headers: true,
    body: true,
  };

  const [responses, setResponses] = useState([]);
  const [timeStamps, setTimeStamps] = useState([]);
  const [target, setTarget] = useState(initialTarget);
  const [validity, setValidity] = useState(initvalidity);
  const [loading, setLoading] = useState(true)
  const [header, setHeader] = useState({});
  const [body, setBody] = useState({});

  useEffect(() => {
    const token = cookie.get("token");

    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_BASEURL}targets/responses/${targetid}?token=${token}`
        ),
        axios.get(
          `${process.env.REACT_APP_BASEURL}projects/${projectid}/targets/${targetid}?token=${token}`
        ),
      ])
      .then(
        axios.spread((res, targetinfo) => {

            console.log(res.data)
          setTarget(targetinfo.data);
          filterResponseTimes(res.data);
        
          var requestheaderjson = targetinfo.data.requestheaders
          if (requestheaderjson !== "" && requestheaderjson !== null) {
            setHeader(JSON.parse(JSON.parse(requestheaderjson)));
            setTarget((preState) => ({
                ...preState,
                requestheaders: JSON.parse(requestheaderjson),
              }));
        }
          
          var requestbodyjson = targetinfo.data.requestbody
          if (requestbodyjson !== "" && requestbodyjson !== null) {
            setBody(JSON.parse(JSON.parse(requestbodyjson)));
            setTarget((preState) => ({
                ...preState,
                requestbody: JSON.parse(requestbodyjson),
              }));
          }

          setLoading(false)
        })
      )
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // set the ping times
  function filterResponseTimes(data) {
    var responseCount = data.length;
    var res = [];
    var timeStamps = [];
    for (let i = 0; i < responseCount; ++i) {
      res.push(data[i]["responsetime"]);
      timeStamps.push(data[i]["timestamp"]);
    }
    setResponses(res);
    setTimeStamps(timeStamps);
  }

  const options = {
    maintainAspectRatio: false,
    animation: {
        duration: 0
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
          },
          gridLines: {
            display: true
          }
        }]
      },
      elements: {
          
        line: { tension: 0.00001 },
        point: {
          radius: 100,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
  };

  const responseTimes = {
    labels: timeStamps,
    datasets: [
      {
        label: "Response Time (ms)",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: responses,
      },
    ],
  };

  function handleEventHeaders(event) {
    setValidity((preState) => ({
      ...preState,
      headers: false,
    }));

    if (event.error === false) {
      setTarget((preState) => ({
        ...preState,
        requestheaders: event.json,
      }));
      console.log(event.json)
      console.log(typeof(event.json))
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

    console.log(event)

    if (event.error === false || event.error === null || typeof(event.error) === "undefined") {
      setTarget((preState) => ({
        ...preState,
        requestbody: event.json,
      }));
      setValidity((preState) => ({
        ...preState,
        body: true,
      }));
    }
  }

  function handleEvent(event) {
    let { name, value } = event.target;

    setTarget((preState) => ({
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
      const url = `${process.env.REACT_APP_BASEURL}projects/${projectid}/targets/${targetid}?token=${token}`;
      const payload = {
        link: target.link,
        testtype: "API Test",
        requesttype: target.requesttype,
      };

      if (target.requestheaders !== "" && target.requestheaders !== null) {
        payload.requestheaders = JSON.stringify(target.requestheaders);
      }

      if (target.requestbody !== "" || target.requestbody !== null) {
        payload.requestbody = JSON.stringify(target.requestbody);
      }


      console.log(target)
      console.log(payload)

      try {
        await axios.put(url, payload);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }
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
      <div>
        <h4>Response History</h4>
        {/* <CChart type="line" datasets={responseTimes.datasets} options={options} /> */}
        <CChartLine
          datasets={responseTimes.datasets}
          options={options}
          labels={timeStamps}
        />

        <div className="chart-wrapper mt-1">
          <CContainer>
            <div className="row">
              <div className="col-md-6" style={{paddingTop: "30px"}}>
                <CLabel>Url Link</CLabel>
                <CInput
                  type="text"
                  name="link"
                  onChange={handleEvent}
                  value={target.link}
                  placeholder="Eg. https://reqres.in/api/products/4"
                />
              </div>
              <div className="col-md-6" style={{paddingTop: "30px"}}>
                <CLabel>Request Type</CLabel>
                <CSelect
                  onChange={handleEvent}
                  value={target.requesttype}
                  type="select"
                  name="requesttype"
                >
                  {requesttypes.map((option) => (
                    <option value={option.value}>{option.name}</option>
                  ))}
                </CSelect>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6" >
                <CLabel>Headers (Enter a valid JSON object)</CLabel>
                <JSONInput
                  placeholder={header}
                  onChange={handleEventHeaders}
                  id="a_unique_id"
                  height="200px"
                  width="100%"
                />
              </div>
              <div className="col-md-6">
                {target.requesttype !== "GET" && (
                  <>
                    <CLabel>Request Body (Enter a valid JSON object)</CLabel>
                    <JSONInput
                      placeholder={body}
                      onChange={handleEventBody}
                      id="a_unique_id"
                      width="100%"
                      height="200px"
                    />
                  </>
                )}
              </div>
            </div>

            <center>
              <br></br>

              <CButton
                onClick={() => handleSubmit()}
                disabled={!(validity.link && validity.headers && validity.body)}
                color="success"
              >
                Update Target
              </CButton>
            </center>
            <br></br>
          </CContainer>
        </div>
        <hr />
      </div>
      )}
    </>
  );
};

export default TargetDetails;
