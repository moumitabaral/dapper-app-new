import React from 'react'
import { StoreContext } from '../App'
import BarbarTab from '../navigators/tab/BarberTab'
import CustomerTab from '../navigators/tab/CustomerTab'

const MainScreen = ({ navigation }) => {
    const {state, setState} = React.useContext(StoreContext)

    return (
        <>
          {state.user!=null && state.user.role == "BARBAR" && <BarbarTab />}
          {state.user!=null && state.user.role == "CUSTOMER" && <CustomerTab />}
        </>
      )
}

export default MainScreen