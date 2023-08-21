import React from 'react'
import { StoreContext } from '../App'
import BarbarTab from '../navigators/tab/BarberTab'

const MainScreen = () => {
    const {state, setState} = React.useContext(StoreContext)
    
    if(state.user.role == "BARBAR") {
        return <BarbarTab />
    }
}

export default MainScreen