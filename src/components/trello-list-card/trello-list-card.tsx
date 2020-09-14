import React from "react";
import { removeCard } from '../../actions';
import { connect } from "react-redux";
import { Draggable } from 'react-beautiful-dnd';

import './trello-list-card.scss'

type TypeTrelloListCardProps = {
  label: string
  removeCard(trelloColumnId: number, trelloCardId: number): void
  trelloCardId: number
  trelloColumnId: number
  index: number
}

/**
 * label: string
 * removeCard(trelloColumnId: number, trelloCardId: number): void - удаляет одну карточку. Принимает в себя два аргумента.Первый это Id колонки для её дальнейшего нахождения и второй id - для карточки и её нахождения в колонке, которая будет найдена исходя из переданного первым аргументом Id для колонки
 * trelloCardId: number
 * trelloColumnId: number
 * index: number - нужен для Draggable из react-beautiful-dnd
 * */

const TrelloListCard: React.FC<TypeTrelloListCardProps> = ({ label, removeCard, trelloCardId, trelloColumnId, index }: TypeTrelloListCardProps) => {
  const onDeleteCard = () => removeCard(trelloColumnId, trelloCardId)

  return (
    <Draggable draggableId={trelloCardId.toString()} index={index}>
      {(provided) => {
        return (
          <span
            ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="trello-list-card">
            <span className="trello-list-card--label">{label}</span>
            <span className='trello-list-card--delete' onClick={onDeleteCard} title="Удалить карточку">
              <svg width="8" fill="#000" height="8" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
              </svg>
            </span>
          </span>
        )
      }}
    </Draggable>
  )
};

const mapDispatchToProps = { removeCard }

export default connect(null, mapDispatchToProps)(TrelloListCard);