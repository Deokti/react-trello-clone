import React from 'react';
import TrelloListCard from "../trello-list-card";
import DefineAddingElement from "../define-adding-element";
import { TypeOneTrelloCard } from "../../reducers/dynamic-arrays";
import { Droppable, Draggable } from 'react-beautiful-dnd';


import './trello-list-column.scss';
import { removeColumn } from "../../actions";
import { connect } from "react-redux";

type TypeTrelloListColumnProps = {
  title: string,
  children: Array<TypeOneTrelloCard>
  trelloColumnId: number
  removeColumn(id: number): void
  index: number
}

const TrelloListColumn: React.FC<TypeTrelloListColumnProps> = ({ title, children = [], trelloColumnId, removeColumn, index }: TypeTrelloListColumnProps) => {
  const onDeleteColumn = () => removeColumn(trelloColumnId);


  return (
    <Draggable draggableId={`column-${trelloColumnId.toString()}`} index={index}>
      {(provided )=> {
        return (
         <div ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}>
           <Droppable droppableId={trelloColumnId.toString()}>
             {(provided) => {
               return (
                 <div className={`trello-list-column`}>
                   <div className="trello-list-column__header">
                     <h3 className="trello-list-column__title">{title}</h3>
                   </div>
                   { children.length === 0 ? <button className="column-delete" onClick={onDeleteColumn} /> : null }

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
         </div>
        )
      }}
    </Draggable>
  );
};

const mapStateToDispatch = { removeColumn };

export default connect(null, mapStateToDispatch)(TrelloListColumn);