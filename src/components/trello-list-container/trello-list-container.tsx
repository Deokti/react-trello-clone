import React from "react";
import TrelloListColumn from "../trello-list-column";
import { TypeOneTrelloColumn } from "../../reducers/dynamic-arrays";
import { connect } from "react-redux";

import './trello-list-container.scss';
import AddNewElement from "../add-new-element";

type TypeTrelloListContainerProps = {
  arrayTrelloListColumn: Array<TypeOneTrelloColumn>
}

const TrelloListContainer: React.FC<TypeTrelloListContainerProps> = ({ arrayTrelloListColumn }: TypeTrelloListContainerProps) => {

  const templateTrelloList = arrayTrelloListColumn.map(({ id, title, cards }) => {
    return <TrelloListColumn
      trelloColumnId={id}
      key={id}
      title={title}
      cards={cards} />
  })

  return (
    <div className="trello-list-container">
      {templateTrelloList}
      <AddNewElement column={true} />
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