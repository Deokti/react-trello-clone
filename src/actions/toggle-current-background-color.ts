const toggleCurrentBackgroundColor = (currentState: string) => {
  return {
    type: 'CURRENT_BACKGROUND_COLOR',
    payload: currentState
  }
}

export { toggleCurrentBackgroundColor };