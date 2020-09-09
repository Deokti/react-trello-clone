import React from 'react';
import TrelloListCard from "../trello-list-card";
import DefineAddingElement from "../define-adding-element";
import { TypeOneTrelloCard } from "../../reducers/dynamic-arrays";
import { Droppable } from 'react-beautiful-dnd';

import './trello-list-column.scss';

type TypeTrelloListColumnProps = {
  title: string,
  children: Array<TypeOneTrelloCard>
  trelloColumnId: number
}

const TrelloListColumn: React.FC<TypeTrelloListColumnProps> = ({ title, children, trelloColumnId }: TypeTrelloListColumnProps) => {
  // const templateCard =

  return (
    <Droppable droppableId={trelloColumnId.toString()}>
      {(provided: any) => {
        return (
          <div className="trello-list-column">
            <div className="trello-list-column__header">
              <h3 className="trello-list-column__title">{title}</h3>
            </div>

            <ul ref={provided.innerRef}
                className="trello-list-column__list"
                {...provided.droppableProps}>
              {
                children.map(({ id, label }, index) => {
                  return (
                    <li key={id} className="trello-list-column__item">
                      <TrelloListCard
                        index={index}
                        label={label}
                        trelloCardId={id}
                        trelloColumnId={trelloColumnId} />
                    </li>
                  );
                })
              }
            </ul>
            {provided.placeholder}
            <div className="trello-list-column__bottom">
              <DefineAddingElement column={false} trelloColumnId={trelloColumnId} />
            </div>
          </div>
        )
      }}
    </Droppable>
  );
};

export default TrelloListColumn;