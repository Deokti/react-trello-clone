import React from 'react';
import TrelloListCard from "../trello-list-card";

import './trello-list-column.scss';

type TypeTrelloListColumnProps = {
  title: string,
  cards: any[]
}

const TrelloListColumn: React.FC<TypeTrelloListColumnProps> = ({ title, cards }: TypeTrelloListColumnProps) => {

  const templateCard = cards.map(({ id, label }) => {
    return (
      <li key={id} className="trello-list-column__item">
        <TrelloListCard label={label} />
      </li>
    );
  });

  return (
    <div className="trello-list-column">
      <div className="trello-list-column__header">
        <h3 className="trello-list-column__title">{title}</h3>
      </div>

      <ul className="trello-list-column__list">
        {templateCard}
      </ul>
    </div>
  );
};

export default TrelloListColumn;