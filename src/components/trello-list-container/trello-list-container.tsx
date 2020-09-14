import React from "react";
import TrelloListColumn from "../trello-list-column";
import DefineAddingElement from "../define-adding-element";
import { TypeOneTrelloColumn } from "../../reducers/dynamic-arrays";
import { connect } from "react-redux";
import { Droppable } from 'react-beautiful-dnd';


import './trello-list-container.scss';

type TypeTrelloListContainerProps = {
  arrayTrelloListColumn: Array<TypeOneTrelloColumn>
}

const TrelloListContainer: React.FC<TypeTrelloListContainerProps> = ({arrayTrelloListColumn}: TypeTrelloListContainerProps) => {
  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided) => {
        return (
          <div className="trello-list-container">
            <div
              ref={provided.innerRef}
              className="trello-list-droppable"
              {...provided.droppableProps}>
              {
                arrayTrelloListColumn.map(({id, title, cards}, index) => {
                  return (
                    <TrelloListColumn
                      index={index}
                      key={id.toString()}
                      title={title}
                      trelloColumnId={id}>
                      {cards}
                    </TrelloListColumn>
                  )
                })
              }
            </div>
            {provided.placeholder}
            <DefineAddingElement column={true} />
          </div>
        )
      }}
    </Droppable>
  )
};

type TypeTrelloListContainerMapState = {
  dynamicArrays: {
    arrayTrelloListColumn: Array<TypeOneTrelloColumn>
  }
}

const mapStateToProps = ({dynamicArrays: {arrayTrelloListColumn}}: TypeTrelloListContainerMapState) => {
  return {arrayTrelloListColumn};
}

export default connect(mapStateToProps)(TrelloListContainer);