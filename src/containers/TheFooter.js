import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Cloudmonitor</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
