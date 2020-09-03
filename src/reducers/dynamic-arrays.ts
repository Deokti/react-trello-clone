import { ActionsType } from "./reducers";

export type TypeOneTrelloColumn = {
  id: number,
  title: string,
  cards: Array<TypeOneTrelloCard>
};

export type TypeOneTrelloCard = {
  id: number,
  label: string,
}

type GetUpdateDynamicArrays = {
  dynamicArrays: {
    arrayTrelloListColumn: Array<TypeOneTrelloColumn>
  }
}

type ReturnUpdateDynamicArrays = {
  arrayTrelloListColumn: Array<TypeOneTrelloColumn>
}

const updateDynamicArrays = (state: GetUpdateDynamicArrays, { type, payload }: ActionsType): ReturnUpdateDynamicArrays => {
  if (state === undefined) {
    return {
      arrayTrelloListColumn: [
        {
          id: 0,
          title: 'Название списка дел',
          cards: [
            { id: 0, label: 'Пройти курс по React' },
            { id: 1, label: 'Сделать бекенд своего сайта на node.js' },
            { id: 2, label: 'Записаться на курсы английского языка' },
            { id: 3, label: 'Пройти курс по React' },
          ]
        },
        {
          id: 1,
          title: 'Добавить новое дело',
          cards: [
            {id: 0, label: 'Забронировать тир на субботу'},
            {id: 1, label: 'Накидать тем для статей в блог'},
          ]
        },
      ]
    }
  }

  switch (type) {
    case 'TRELLO_LIST':
      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: payload
      }

    default:
      return state.dynamicArrays
  }
}

export { updateDynamicArrays }
