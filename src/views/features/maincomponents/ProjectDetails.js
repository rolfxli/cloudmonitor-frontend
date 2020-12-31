import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CContainer,
  CButton,
  CWidgetSimple,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import AddTarget from "../childcomponents/AddTarget";

import { useHistory, useParams } from "react-router-dom";

import { freeSet } from "@coreui/icons";

import axios from "axios";
import cookie from "js-cookie";

const ProjectDetails = () => {
  const initialproject = {
    projectname: "",
    numberurls: 0,
    userid: 0,
    projectid: 0,
    uptime: 0,
  };

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(initialproject);
  const [targets, setTargets] = useState([]);
  const [failures, setFailures] = useState(0);
  const [total, setTotal] = useState(0);

  const [visible, setVisible] = useState(false);

  const { projectid } = useParams();
  const history = useHistory();

  function getColorfromStatus(status) {
    if (status === null) {
      return "warning";
    } else if (status === "SUCCESS") {
      return "success";
    } else {
      return "danger";
    }
  }

  function calculateUptime(success, failure) {
    if (success === 0 && failure === 0) {
      return 0;
    }
    var uptime =
      parseFloat(success) / (parseFloat(failure) + parseFloat(success));
    uptime = uptime.toFixed(2) * 100;
    return uptime;
  }

  function calculateAverageUptime(targets) {
    if (targets.length === 0) {
      return 0;
    }
    let sumUptime = 0;
    for (let i = 0; i < targets.length; i++) {
      sumUptime += calculateUptime(
        targets[i].numsuccess,
        targets[i].numfailure
      );
    }
    return parseInt(sumUptime / targets.length);
  }

  function deleteTarget(event, urlid) {
    const token = cookie.get("token");
    // Get all details for the project
    axios
      .delete(
        `http://127.0.0.1:5000/projects/${projectid}/targets/${urlid}?token=${token}`
      )
      .then(
        setTargets(
          targets.filter(function (target) {
            return target.urlid !== urlid;
          })
        )
      )
      .catch((err) => {
        console.error(err);
      });
      event.stopPropagation()
  }

  function closemodal() {
    setVisible(false);
  }

  function addnewtarget(newtarget) {
    let newtargetarray = [...targets, newtarget];
    newtargetarray.sort(function (a, b) {
      return (
        calculateUptime(a.numsuccess, a.numfailure) -
        calculateUptime(b.numsuccess, b.numfailure)
      );
    });

    setTargets(newtargetarray);
    console.log(total)
  }

  useEffect(() => {
    var token = cookie.get("token");

    axios
      .all([
        // Get all details for the project
        axios.get(`http://127.0.0.1:5000/projects/${projectid}?token=${token}`),

        // Get all targets for the project
        axios.get(
          `http://127.0.0.1:5000/projects/${projectid}/targets?token=${token}`
        ),
      ])
      .then(
        axios.spread((project, res) => {
          setProject(project.data);
          let targets = res.data;

          var total_fail = 0;
          var total = 0;
          for (let i = 0; i < targets.length; i++) {
            total += 1;
            if (targets[i].mostrecentstatus === "FAIL") {
              total_fail += 1;
            }
          }
          targets.sort(function (a, b) {
            return (
              calculateUptime(a.numsuccess, a.numfailure) -
              calculateUptime(b.numsuccess, b.numfailure)
            );
          });
          setTargets(targets);
          setFailures(total_fail);
          setTotal(total);
          setLoading(false);
        })
      )
      .catch((err) => {
        history.push("/dashboard");
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        <CContainer style={{ marginBottom: "30px" }}>
          <div>
            <AddTarget
              visible={visible}
              projectid={projectid}
              closemodal={closemodal}
              addnewtarget={addnewtarget}
            ></AddTarget>
          </div>
          <center>
            <h2>Details for {project.projectname}</h2>
            <br></br>
          </center>

          <CRow alignHorizontal="center">
            <CCol sm="4" lg="3">
              <CWidgetSimple
                header="Average Uptime"
                text={calculateAverageUptime(targets).toString() + "%"}
              ></CWidgetSimple>
            </CCol>
            <CCol sm="4" lg="3">
              <CWidgetSimple
                header="Number of Targets"
                text={targets.length.toString()}
              ></CWidgetSimple>
            </CCol>
            <CCol sm="4" lg="3">
              <CWidgetSimple
                header="Targets With Errors"
                text={failures.toString()}
              ></CWidgetSimple>
            </CCol>
          </CRow>

          <div style={{ paddingBottom: "30px" }}>
            <div className="headerleft">
              <h3>Showing All APIs</h3>
            </div>
            <div className="headerright">
              <CButton onClick={() => setVisible(true)} color="primary">
                <b>Create Target</b>
              </CButton>
            </div>
          </div>

          {targets.map((target) => (
            <div
              className="individualproject"
              onClick={() => history.push(`/targets/${project.projectid}/${target.urlid}`)}
            >
              <div className="floatleft">
                <h5>{target.link}</h5>
              </div>

              <div className="floatright">
                <CButton
                  onClick={(e) => deleteTarget(e, target.urlid)}
                  shape="pill"
                  variant="outline"
                  color="warning"
                >
                  <CIcon
                    style={{ color: "red", marginBottom: "4px" }}
                    content={freeSet.cilTrash}
                  ></CIcon>
                </CButton>
              </div>
              <div className="floatright">
                <h6 className="projectinfo">{target.requesttype}</h6>
              </div>
              <div className="floatright">
                <div className="floatright">
                  <h6 className="projectinfo">
                    {calculateUptime(target.numsuccess, target.numfailure) +
                      "% UPTIME"}
                    <CIcon
                      style={{ marginBottom: "4px", marginLeft: "2px" }}
                      content={freeSet.cilChevronDoubleUp}
                    ></CIcon>
                  </h6>
                </div>
                <div className="floatright">
                  <CButton
                    className="statusbutton"
                    color={getColorfromStatus(target.mostrecentstatus)}
                  >
                    {target.mostrecentstatus === null
                      ? "NONE"
                      : target.mostrecentstatus}
                  </CButton>
                </div>
              </div>
            </div>
          ))}
        </CContainer>
      )}
    </>
  );
};

export default ProjectDetails;
