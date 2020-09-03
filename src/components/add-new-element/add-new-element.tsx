import React, { useState } from "react";
import AddForm from "../add-form";

import './add-new-element.scss';
import AddButton from "../add-button/add-button";

type TypeAddNewElementProps = {
  column?: boolean
  trelloColumnId?: number
}

const AddNewElement: React.FC<TypeAddNewElementProps> = ({ column, trelloColumnId }: TypeAddNewElementProps) => {
  const [showForm, setShowForm] = useState(false);

  const onShowForm = () => setShowForm(true);
  const onHideForm = () => setShowForm(false);

  const button = !showForm ? <AddButton column={column} onShowForm={onShowForm} /> : null
  const form = !button ? <AddForm column={column} onHideForm={onHideForm} trelloColumnId={trelloColumnId} /> : null;
  return (
    <React.Fragment>
      {button}
      {form}
    </React.Fragment>
  )
};

export default AddNewElement;