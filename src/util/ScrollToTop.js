import React, { useEffect, Fragment } from "react"
import { useNavigate } from "react-router-dom"

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const history = useNavigate()

    return <Component history={history} {...props} />
  }

  return Wrapper
}

function ScrollToTop({ history, children }) {
  return <Fragment>{children}</Fragment>
}

export default withRouter(ScrollToTop)
