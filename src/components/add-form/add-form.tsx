import React, { useCallback, useEffect } from 'react';

import './add-form.scss';
import { hideNotClickingElement } from "../../utils";

type TypeAddFormProps = {
  column?: boolean
  onHideForm(currentState: boolean): void
}

const AddForm: React.FC<TypeAddFormProps> = ({ column, onHideForm }: TypeAddFormProps) => {
  const formRef = React.createRef<HTMLFormElement>();

  const columnButtonTitle = column ? 'Добавить новую колонку' : '';
  const textareaPlaceholder = column ? 'Введите название колонки' : 'Введите название карточки';
  const cardButtonTitle = !columnButtonTitle ? 'Добавить новую карточку' : '';

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }
  const onCloseForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onHideForm(false);
  }

  // Закрытие формы при клике не по ней или её потомкам
  const clickOutsideTheElement = useCallback((event: any) => {
    hideNotClickingElement(event, formRef, onHideForm);
  }, [formRef, onHideForm]);
  useEffect(() => {
    document.body.addEventListener('click', clickOutsideTheElement);
    return () => document.body.removeEventListener('click', clickOutsideTheElement);
  }, [clickOutsideTheElement]);

  return (
    <form ref={formRef} className='form' id="form" onSubmit={onSubmit}>
      <div className="form-container">
        <textarea className="form-textarea" placeholder={textareaPlaceholder} />

        <div className="form-buttons">
          <button className="form-button form-add">
            {columnButtonTitle || cardButtonTitle}
          </button>
          <button className="form-button form-close" onClick={onCloseForm}>
            <svg width="15" fill="#6B808C" height="15" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg">
              <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddForm;