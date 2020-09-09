import React from "react";
import TrelloListColumn from "../trello-list-column";
import DefineAddingElement from "../define-adding-element";
import { TypeOneTrelloColumn } from "../../reducers/dynamic-arrays";
import { connect } from "react-redux";

import './trello-list-container.scss';

type TypeTrelloListContainerProps = {
  arrayTrelloListColumn: Array<TypeOneTrelloColumn>
}

const TrelloListContainer: React.FC<TypeTrelloListContainerProps> = ({ arrayTrelloListColumn }: TypeTrelloListContainerProps) => {

  const templateTrelloList = arrayTrelloListColumn.map(({ id, title, cards }) => {
    return (
      <TrelloListColumn
        key={id.toString()}
        title={title}
        trelloColumnId={id}>
        {cards}
      </TrelloListColumn>
    )
  })

  return (
    <div className="trello-list-container">
      {templateTrelloList}
      <DefineAddingElement column={true} />
    </div>
  )
};

type TypeTrelloListContainerMapState = {
  dynamicArrays: {
    arrayTrelloListColumn: Array<TypeOneTrelloColumn>
  }
}

const mapStateToProps = ({ dynamicArrays: { arrayTrelloListColumn } }: TypeTrelloListContainerMapState) => {
  return { arrayTrelloListColumn };
}

export default connect(mapStateToProps)(TrelloListContainer);