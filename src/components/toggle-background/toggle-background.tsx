import React, { useCallback, useEffect } from "react";
import { toggleCurrentBackgroundColor, toggleCurrentStateForPopupChangingBackground } from "../../actions";
import { hideNotClickingElement } from '../../utils';
import { connect } from "react-redux";

import './toggle-background.scss';
import { TypeOneItemBackgroundColor } from "../../reducers/static-arrays";

type TypeToggleBackgroundLogicProps = {
  backgroundColorItems: Array<TypeOneItemBackgroundColor>
  currentStateForPopupChangingBackground: boolean
  toggleCurrentBackgroundColor(currentState: string): void
  toggleCurrentStateForPopupChangingBackground(currentState: boolean): void
}
type TypeToggleBackgroundTemplateProps = {
  backgroundActive: string,
  templateBackgroundItem: React.ReactNode,
  backgroundColorRef: any
}


const ToggleBackgroundLogic: React.FC<TypeToggleBackgroundLogicProps> = (
  { toggleCurrentBackgroundColor, backgroundColorItems,
    currentStateForPopupChangingBackground, toggleCurrentStateForPopupChangingBackground}: TypeToggleBackgroundLogicProps) => {

  const backgroundColorRef = React.createRef<HTMLDivElement>();

  // Если произошёл клик не на окна выбора темы, то окно закроется
  const clickOutsideTheElement = useCallback((event: any) => {
    hideNotClickingElement(event, backgroundColorRef, toggleCurrentStateForPopupChangingBackground);
  }, [toggleCurrentStateForPopupChangingBackground, backgroundColorRef]);
  useEffect(() => {
    document.body.addEventListener('click', clickOutsideTheElement);
    return () => document.body.removeEventListener('click', clickOutsideTheElement);
  }, [backgroundColorRef, clickOutsideTheElement]);

  // Передаём дата атрибут с записанным цветом
  // окно закрывается
  const onToggleBackgroundColor = (event: React.MouseEvent<HTMLLIElement>) => {
    toggleCurrentBackgroundColor(event.currentTarget.dataset.backgroundColor as string);
    toggleCurrentStateForPopupChangingBackground(false);
  }


  const templateBackgroundItem = backgroundColorItems.map(({ id, backgroundColor }) => {
    return (
      <li key={id}
          style={{backgroundColor}}
          data-background-color={backgroundColor}
          onClick={onToggleBackgroundColor}
          className="toggle-background__item">
        <span>{backgroundColor}</span>
      </li>
    )
  });
  const backgroundActive = currentStateForPopupChangingBackground ? 'toggle-background-active' : '';

  return <ToggleBackgroundTemplate
    backgroundColorRef={backgroundColorRef}
    backgroundActive={backgroundActive}
    templateBackgroundItem={templateBackgroundItem} />
}

const ToggleBackgroundTemplate: React.FC<TypeToggleBackgroundTemplateProps> = (
  {backgroundActive, templateBackgroundItem, backgroundColorRef}: TypeToggleBackgroundTemplateProps) => {
  return (
    <div ref={backgroundColorRef} className={`toggle-background ${backgroundActive}`}>
      <div className="toggle-background__header">
        <h2 className="toggle-background__title">Изменить Фон</h2>
      </div>

      <ul className="toggle-background__list">
        {templateBackgroundItem}
      </ul>

    </div>
  );
}

type TypeToggleBackgroundMapState = {
  staticArrays: {
    backgroundColorItems: Array<TypeOneItemBackgroundColor>
  }
  currentStateApp: {
    currentStateForPopupChangingBackground: boolean
  }
}

const mapStateToProps = ({ staticArrays: { backgroundColorItems },
                           currentStateApp: { currentStateForPopupChangingBackground } }: TypeToggleBackgroundMapState) => {
  return { backgroundColorItems, currentStateForPopupChangingBackground }
}

const mapDispatchToProps = {toggleCurrentBackgroundColor, toggleCurrentStateForPopupChangingBackground}

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBackgroundLogic);