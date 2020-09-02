import React from 'react';
import Header from "../header";

import './App.scss';
import { connect } from "react-redux";
import ToggleBackground from "../toggle-background";
import TrelloListContainer from "../trello-list-container/trello-list-container";

type TypeAppProps = {
  currentBackgroundColor: string
}

const App: React.FC<TypeAppProps> = ({ currentBackgroundColor }: TypeAppProps) => {

  return (
    <main className="app" style={{backgroundColor: currentBackgroundColor}}>
      <Header />
      <ToggleBackground />

      <section className="app-content">
        <TrelloListContainer />
      </section>
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