import React from "react";
import { toggleCurrentStateForPopupChangingBackground } from "../../actions";
import { connect } from "react-redux";

import './header.scss';

type TypeHeaderProps = {
  currentStateForPopupChangingBackground: boolean
  toggleCurrentStateForPopupChangingBackground(toggleState: boolean): void
}

const Header: React.FC<TypeHeaderProps> = (
  { currentStateForPopupChangingBackground,
    toggleCurrentStateForPopupChangingBackground }: TypeHeaderProps) => {

  const onTogglePopupBackgroundColor = () => {
    toggleCurrentStateForPopupChangingBackground(!currentStateForPopupChangingBackground)
  }

  return (
    <header className="header">
      <h1 className="header-title">Trello Clone</h1>
      {
        !currentStateForPopupChangingBackground &&
        <button onClick={onTogglePopupBackgroundColor}
          className="header-background">Изменить Фон</button>
      }
    </header>
  );
};

type TypeHeaderMapState = {
  currentStateApp: {
    currentStateForPopupChangingBackground: boolean
  }
}

const mapStateToProps = ({ currentStateApp: { currentStateForPopupChangingBackground } }: TypeHeaderMapState) => {
  return { currentStateForPopupChangingBackground }
}

const mapDispatchToProps = { toggleCurrentStateForPopupChangingBackground }

export default connect(mapStateToProps, mapDispatchToProps)(Header);