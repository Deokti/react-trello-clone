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
    arrayTrelloListColumn: Array<TypeOneTrelloColumn | null>
  }
}

type ReturnUpdateDynamicArrays = {
  arrayTrelloListColumn: Array<TypeOneTrelloColumn | null>
}

const updateCardItem = (prevItem: TypeOneTrelloColumn | null, label: string) => {
  const newCard = { id: Date.now(), label: label };
  if (prevItem) {
    return {
      ...prevItem,
      cards: [ ...prevItem.cards, newCard ]
    }
  }
}

const updateColumnItem = (columnList: Array<TypeOneTrelloColumn | null | undefined>, item: any, index: number) => {
  return [
    ...columnList.slice(0, index),
    item,
    ...columnList.slice(index + 1),
  ]

}

const deleteCardItem = (columnList: Array<TypeOneTrelloColumn | null | undefined | any>, indexColumn: number, indexCard: number) => {
  const columnIndex = columnList.findIndex(item => item?.id === indexColumn);
  const column = columnList[columnIndex];
  const cardIndex = column?.cards.findIndex((item: any) => item.id === indexCard);

  const newOneColumn = {
    ...column, cards: [
      ...column?.cards.slice(0, cardIndex),
      ...column?.cards.slice(cardIndex + 1),
    ]
  }

  return updateColumnItem(columnList, newOneColumn, columnIndex)
};

const draggingColumn = (columnList: Array<TypeOneTrelloColumn | null | undefined>, droppableIndexStart: number | string, droppableIndexEnd: number | string) => {
  const newState = [ ...columnList ];
  if (typeof droppableIndexStart === 'number' && typeof droppableIndexEnd === 'number') {
    const list = newState.splice(droppableIndexStart, 1);
    newState.splice(droppableIndexEnd, 0, ...list);
  }
  return newState;
}

const draggingCardInSameColumn = (
  columnList: Array<TypeOneTrelloColumn | null | undefined>,
  droppableIdStart: number | string, droppableIdEnd: number | string,
  droppableIndexStart: number | string, droppableIndexEnd: number | string
) => {
  const columnIndex = columnList.findIndex(item => item?.id === Number(droppableIdStart));
  const column = columnList[columnIndex];

  if (column) {
    // Копируем в отдельный массив все объекты карточек
    const copiedCard = [ ...column.cards ];
    // Меняет местоположение, исходя из того, как мы передвинули
    const removed = copiedCard.splice(Number(droppableIndexStart), 1);
    copiedCard.splice(Number(droppableIndexEnd), 0, ...removed);

    // Возвращаем все колонки до индекса нужной колонки
    // Передаём объект с этой колонкой и изменённым положением карточек
    // Возвращаем все остальные колонки, идущие после нужной
    return [
      ...columnList.slice(0, columnIndex),
      { ...column, cards: copiedCard },
      ...columnList.slice(columnIndex + 1)
    ];
  }
};

const updateDynamicArrays = (state: GetUpdateDynamicArrays, { type, payload }: ActionsType): ReturnUpdateDynamicArrays => {
  if (state === undefined) {
    return {
      arrayTrelloListColumn: [
        {
          id: 0,
          title: 'Название списка дел',
          cards: [
            { id: 1, label: 'Пройти курс по React' },
            { id: 2, label: 'Сделать бекенд своего сайта на node.js' },
            { id: 3, label: 'Записаться на курсы английского языка' },
          ]
        },
        {
          id: 1,
          title: 'Добавить новое дело',
          cards: [
            { id: 5, label: 'Забронировать тир на субботу' },
            { id: 6, label: 'Накидать тем для статей в блог' },
          ]
        },
      ],
    }
  }

  switch (type) {
    case 'TRELLO_LIST':
      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: payload
      }

    case "ADD_NEW_COLUMN":
      const column = {
        id: Date.now(),
        title: payload,
        cards: [],
      };

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: [
          ...state.dynamicArrays.arrayTrelloListColumn,
          column
        ]
      }

    case "ADD_NEW_CARD":
      const { id, label } = payload;
      const indexCard = state.dynamicArrays.arrayTrelloListColumn.findIndex((item) => item?.id === id);
      const getCard = state.dynamicArrays.arrayTrelloListColumn[indexCard];

      const newCard = updateCardItem(getCard, label);

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: updateColumnItem(state.dynamicArrays.arrayTrelloListColumn, newCard, indexCard)
      }

    case "REMOVE_CARD":
      const { trelloColumnId, trelloCardId } = payload;

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: deleteCardItem(state.dynamicArrays.arrayTrelloListColumn, trelloColumnId, trelloCardId)
      }

    case "REMOVE_COLUMN":
      const columnIndex = state.dynamicArrays.arrayTrelloListColumn.findIndex(item => item?.id === payload);

      return {
        ...state.dynamicArrays,
        arrayTrelloListColumn: [
          ...state.dynamicArrays.arrayTrelloListColumn.splice(0, columnIndex),
          ...state.dynamicArrays.arrayTrelloListColumn.splice(columnIndex + 1),
        ]
      }

    case "SORT_MOVE_CARDS":
      // Получаем все аргументы, которые передавались в функцию actions
      const {
        droppableIdEnd, droppableIdStart,
        droppableIndexEnd, droppableIndexStart, type
      } = payload;

      // Перетаскивание колонки
      if (type === 'column') {
        return {
          ...state.dynamicArrays,
          arrayTrelloListColumn: draggingColumn(state.dynamicArrays.arrayTrelloListColumn, droppableIndexStart, droppableIndexEnd)
        } as ReturnUpdateDynamicArrays
      }

      // Сравниваем. Если перетаскивание началось и завершилось в той же самой колонке, то
      if (droppableIdStart === droppableIdEnd) {
        return {
          ...state.dynamicArrays,
          arrayTrelloListColumn: draggingCardInSameColumn(state.dynamicArrays.arrayTrelloListColumn, droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd)
        } as ReturnUpdateDynamicArrays
      }

      // Если перетаскивание началось в одной колонке, а закончилось в другой
      if (droppableIdStart !== droppableIdEnd) {
        const newState = [...state.dynamicArrays.arrayTrelloListColumn];

        // Находим колонки с которой вытащили карточки, и колонку в которую положили
        const listDroppableStart = newState.find(item => item?.id === Number(droppableIdStart));
        const listDroppableEnd = newState.find(item => item?.id === Number(droppableIdEnd))

        // Получаем саму карточку
        if (listDroppableStart && listDroppableEnd) {
          if (typeof droppableIndexStart === "number" && typeof droppableIndexEnd === "number") {

            const card = listDroppableStart.cards.splice(droppableIndexStart, 1);
            listDroppableEnd.cards.splice(droppableIndexEnd, 0, ...card);
          }
        }
      }

      return { ...state.dynamicArrays }

    default:
      return state.dynamicArrays
  }
}

export { updateDynamicArrays }
