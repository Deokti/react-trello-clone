import { ActionsType } from "./reducers";

export type TypeOneItemBackgroundColor = {
  id: number,
  backgroundColor: string
}

type GetStaticArrays = {
  staticArrays: {
    backgroundColorItems: Array<TypeOneItemBackgroundColor>
  }
}

type ReturnStaticArrays = {
  backgroundColorItems: Array<TypeOneItemBackgroundColor>
}

const staticArrays = (state: GetStaticArrays, { type, payload }: ActionsType): ReturnStaticArrays => {
  if (state === undefined) {
    return {
      backgroundColorItems: [
        { id: 0, backgroundColor: '#0079BF' },
        { id: 1, backgroundColor: '#D29034' },
        { id: 2, backgroundColor: '#519839' },
        { id: 3, backgroundColor: '#B04632' },
        { id: 4, backgroundColor: '#838C91' },
        { id: 5, backgroundColor: '#89609E' },
      ],
    }
  }

  switch (type) {
    case 'BACKGROUND_COLOR_ITEMS':
      return {
        ...state.staticArrays,
        backgroundColorItems: payload,
      }

    default:
      return state.staticArrays
  }
}

export { staticArrays }