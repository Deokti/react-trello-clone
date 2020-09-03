const toggleCurrentStateForPopupChangingBackground = (toggleState: boolean) => {
  return {
    type: 'CURRENT_STATE_FOR_POPUP_CHANGING_BACKGROUND',
    payload: toggleState
  }
}

export default toggleCurrentStateForPopupChangingBackground;