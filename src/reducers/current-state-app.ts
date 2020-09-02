import { ActionsType } from "./reducers";

export type GetUpdateCurrentAppType = {
  currentStateApp: {
    currentBackgroundColor: string
    currentStateForPopupChangingBackground: boolean
  }
}

type ReturnUpdateCurrentAppType = {
  currentBackgroundColor: string
  currentStateForPopupChangingBackground: boolean
}


const updateCurrentStateApp = (state: GetUpdateCurrentAppType, { type, payload }: ActionsType): ReturnUpdateCurrentAppType => {
  if (state === undefined) {
    return {
      currentBackgroundColor: '#0079bf',
      currentStateForPopupChangingBackground: false
    }
  }

  switch (type) {
    case 'CURRENT_BACKGROUND_COLOR':
      return {
        ...state.currentStateApp,
        currentBackgroundColor: payload
      }
    case 'CURRENT_STATE_FOR_POPUP_CHANGING_BACKGROUND':
      return {
        ...state.currentStateApp,
        currentStateForPopupChangingBackground: payload
      }

    default:
      return state.currentStateApp
  }
}

export { updateCurrentStateApp };