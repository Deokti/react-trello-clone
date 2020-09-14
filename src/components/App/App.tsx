import React from 'react';
import Header from "../header";

import './App.scss';
import { connect } from "react-redux";
import ToggleBackground from "../toggle-background";
import TrelloListContainer from "../trello-list-container/trello-list-container";

import { DragDropContext } from 'react-beautiful-dnd';
import { sortMoveCards } from '../../actions';


type TypeAppProps = {
  currentBackgroundColor: string
  sortMoveCards(
    droppableIdStart: any, droppableIdEnd: any,
    droppableIndexStart: any, droppableIndexEnd: any,
    droppableId: any,
    type: any
  ): void
}

const App: React.FC<TypeAppProps> = ({ currentBackgroundColor, sortMoveCards }: TypeAppProps) => {

// result - возвращает объект того элемента, который перетащили
// destination - объект, где говорится куда именно переместили элемент
// draggableId - возвращает id элемента, который перетащили
  const onDragEnd = ({ destination, source, draggableId, type }: any) => {
    if (!destination) return;
    sortMoveCards(source.droppableId, destination.droppableId, source.index, destination.index, draggableId, type)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <main className="app" style={{ backgroundColor: currentBackgroundColor }}>
        <Header />
        <ToggleBackground />


        <section className="app-content">
          <TrelloListContainer />
        </section>
      </main>
    </DragDropContext>
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

const mapDispatchToProps = { sortMoveCards }

export default connect(mapStateToProps, mapDispatchToProps)(App)