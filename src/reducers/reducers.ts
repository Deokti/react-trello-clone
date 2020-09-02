// Храниться текущее состояние приложения, открыто или закрыто окно изменения фона, какой сейчас цвет фона.
import { updateCurrentStateApp } from "./current-state-app";

// Храниться массивы, которые не будут изменяться извне.
import { staticArrays } from "./static-arrays";

// Находятся массивы, которые будут изменяться
import { updateDynamicArrays } from './dynamic-arrays';

export type ActionsType = {
  type: string,
  payload: any
}

const reducers = (store: any, actions: ActionsType) => {
  return {
    currentStateApp: updateCurrentStateApp(store, actions),
    staticArrays: staticArrays(store, actions),
    dynamicArrays: updateDynamicArrays(store, actions)
  }
}

export default reducers;