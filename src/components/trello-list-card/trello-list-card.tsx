import React from "react";

import './trello-list-card.scss'

type TypeTrelloListCardProps = {
  label: string;
}

const TrelloListCard: React.FC<TypeTrelloListCardProps> = ({ label }: TypeTrelloListCardProps) => {
  return <span className="trello-list-card">{label}</span>
};

export default TrelloListCard;