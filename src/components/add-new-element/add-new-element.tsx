import React, { useState } from "react";
import AddForm from "../add-form";

import './add-new-element.scss';
import AddButton from "../add-button/add-button";

type TypeAddNewElementProps = {
  column?: boolean
}

const AddNewElement: React.FC<TypeAddNewElementProps> = ({ column }: TypeAddNewElementProps) => {
  const [showForm, setShowForm] = useState(false);

  const onShowForm = () => setShowForm(true);
  const onHideForm = () => setShowForm(false);

  const button = !showForm ? <AddButton column={column} onShowForm={onShowForm} /> : null
  const form = !button ? <AddForm column={column} onHideForm={onHideForm} /> : null;
  return (
    <React.Fragment>
      {button}
      {form}
    </React.Fragment>
  )
};

export default AddNewElement;