import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AppContainer from './appContainer'
import GroupCallContainer from "./components/shares/call_screen/groupcall/rxGroupCallScreen"
import CallContainer from "./components/shares/call_screen/call/rxCallScreen"

class ViewManager extends Component {
  static Views() {
    return {
      app: <AppContainer/>,
      groupcall: <GroupCallContainer />,
      call: <CallContainer />
    }
  }

  static View(props) {
    try {
      let name = props.location.search.substr(1)
      let view = ViewManager.Views()[name]
      if (name && view) {
        return ViewManager.Views()[name]
      } else {
        return ViewManager.Views()['app']
      }
    } catch(e) {
      return ViewManager.Views()['app']
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ViewManager.View}/>
        </div>
      </Router>
    )
  }
}
export default ViewManager