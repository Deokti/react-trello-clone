import React, { useEffect, useState } from 'react';
import TrelloListCard from "../trello-list-card";
import AddNewElement from "../add-new-element";
import { TypeOneTrelloCard } from "../../reducers/dynamic-arrays";

import './trello-list-column.scss';

type TypeTrelloListColumnProps = {
  title: string,
  cards: Array<TypeOneTrelloCard>
  trelloColumnId?: number
}

const TrelloListColumn: React.FC<TypeTrelloListColumnProps> = ({ title, cards, trelloColumnId }: TypeTrelloListColumnProps) => {
  const [maxHeightColumn, setMaxHeightColumn] = useState(0);

  useEffect(() => {
    const calculateHeight = document.documentElement.clientHeight - 215;
    setMaxHeightColumn(calculateHeight);
  }, [maxHeightColumn]);

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

      <ul className="trello-list-column__list" style={{maxHeight: maxHeightColumn}}>
        {templateCard}
      </ul>

      <div className="trello-list-column__bottom">
        <AddNewElement column={false} trelloColumnId={trelloColumnId} />
      </div>
    </div>
  );
};

export default TrelloListColumn;