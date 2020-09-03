import React from 'react';

import './add-button.scss';

type TypeAddNewElementProps = {
  column?: boolean
  onShowForm(currentState: boolean): void
}

const AddButton: React.FC<TypeAddNewElementProps> = ({ column, onShowForm }: TypeAddNewElementProps) => {
  const addNewColumn = column ? 'add-new-list' : '';
  const addNewCart = !addNewColumn ? 'add-new-card' : '';

  const columnTitle = addNewColumn ? 'Добавить ещё одну колонку' : '';
  const cardTitle = addNewCart ? 'Добавить еще одну карточку' : ''

  return (
    <button
      onClick={() => onShowForm(true)}
      className={`button add-new-element ${addNewColumn || addNewCart}`}>
      <span className="button-icon">
        <svg fill="#6B808C" viewBox="0 0 448 448" width="15" height="15" xmlns="http://www.w3.org/2000/svg">
          <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
        </svg>
      </span>
      <span className="button-text">
        {columnTitle || cardTitle}
      </span>
    </button>
  )
};

export default AddButton;