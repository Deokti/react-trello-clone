import React from 'react';
import Header from "../header";

import './App.scss';
import { connect } from "react-redux";
import ToggleBackground from "../toggle-background";

type TypeAppProps = {
  currentBackgroundColor: string
}

const App: React.FC<TypeAppProps> = ({ currentBackgroundColor }: TypeAppProps) => {

  return (
    <main className="app" style={{backgroundColor: currentBackgroundColor}}>
      <div className="app-top-header">
        <Header />
      </div>

      <ToggleBackground />
    </main>
  )
};


type TypeAppMapState = {
  currentStateApp: {
    currentBackgroundColor: string
  }
}

const mapStateToProps = ({ currentStateApp: { currentBackgroundColor } }: TypeAppMapState) => {
  return { currentBackgroundColor }
}

export default connect(mapStateToProps)(App)