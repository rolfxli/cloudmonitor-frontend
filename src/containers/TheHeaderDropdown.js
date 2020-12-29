import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownMenu className="pt-0" placement="bottom-end">
        
        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
