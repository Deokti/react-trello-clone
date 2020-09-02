// Храниться текущее состояние приложения, открыто или закрыто окно изменения фона, какой сейчас цвет фона.
import { updateCurrentStateApp } from "./current-state-app";
import { staticArrays } from "./static-arrays";


export type ActionsType = {
  type: string,
  payload: any
}

const reducers = (store: any, actions: ActionsType) => {
  return {
    currentStateApp: updateCurrentStateApp(store, actions),
    staticArrays: staticArrays(store, actions)
  }
}

export default reducers;