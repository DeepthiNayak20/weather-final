import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// const favItem = JSON.parse(localStorage.getItem('fav') || '[]')

export interface CounterState {
  value: any
  favalues: any
}

const initialState: CounterState = {
  value: [],
  favalues: JSON.parse(localStorage.getItem('fav') || '[]'),
}

export const weatherSlice = createSlice({
  name: 'weatherData',
  initialState,
  reducers: {
    weather: (state, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    addFavalue: (state, { payload }) => {
      // if (state.favalues.location.woeid !== payload.location.woeid) {

      // }

      state.favalues.push(payload)

      localStorage.setItem('fav', JSON.stringify(state.favalues))
      window.location.reload()
    },
    // removeSlice: (state: any, { payload }: any) => {
    //   console.log('fav', state)

    //   const removeItem = state.favalues.filter((item: any) => {
    //     console.log('data', item.location.woeid, payload.location.woeid)

    //     if (item.location.woeid === payload.location.woeid) {
    //       alert('found')
    //     }

    //     return item.location.woeid !== payload.location.woeid
    //   })
    //   console.log(payload.location.woeid)

    //   state.favalues = removeItem
    //   console.log('removeItem', removeItem)

    //   localStorage.setItem('fav', JSON.stringify(state.favalues))
    //   window.location.reload()
    // },
  },
})

// Action creators are generated for each case reducer function
export const { weather, addFavalue } = weatherSlice.actions

export default weatherSlice
