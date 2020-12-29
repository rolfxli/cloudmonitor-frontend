import React, { Suspense, useState, useSelector, useEffect } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer } from '@coreui/react'

import axios from 'axios'
// routes config
import routes from '../routes'

import {validate_token} from '../utils/auth'
import cookie from 'js-cookie'
  
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)





const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)  
  useEffect(() => {
    let token = cookie.get('token')
    let userid = cookie.get('userid')
        if(token){

          axios
          .all([
            axios.get(
              `http://127.0.0.1:5000/users/get_user_by_token?token=${token}`
            )
          ])
          .then(
            axios.spread((info) => {
              console.log(info.data)
              if (parseInt(info.data.userid) !== parseInt(userid)) {
                setIsAuthenticated(false)
              }
              setIsAuthenticated(true)
            })
          )
          .catch((errors) => {
            setIsAuthenticated(false)
          });
        }
        else {
          setIsAuthenticated(false)
        }
    // eslint-disable-next-line
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};



const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <PrivateRoute
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component} />
              )
            })}
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
