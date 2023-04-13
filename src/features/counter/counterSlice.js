import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: [ {
        key: '1',

    title: 'Demo1',
    duedate: 32,
        Description: 'New York No. 1 Lake Park',
        tag: "working",
        statuss: "finish",
        Timestamp:"4/12/2023 11:37:42 PM"
    },
    {
    key: '2',
    title: 'Demo2',
    duedate: 42,
        Description: 'London No. 1 Lake Park',
        status: "success",
        tag: "working",
        statuss: "finish",
        Timestamp:"5/12/2023 12:37:42 PM"
          }, {
    key: '3',
    title: 'lily Black',
    duedate: 32,
      Description: 'Sydney No. 1 Lake Park',
      tag: "working",
        statuss: "finish",
        Timestamp:"5/12/2023 12:37:42 PM"
    },
    {
    key: '4',
    title: 'Rohan singh',
    duedate: 42,
        Description: 'London No. 1 Lake Park',
        tag: "working",
        statuss: "finish",
        Timestamp:"5/12/2023 12:37:42 PM"
  },],
      value2: false,
      value3: -1,
      update_check:false,
      
  },
    reducers: {
        true_value: (state) => {
      state.value2 =true
        },
        
        false_value: (state) => {
        state.value2 =false
    },

    add_data: (state, action) => {
      state.value.push(action.payload)
      },
      
      value_delete: (state, action) => {
      state.value =action.payload
        },
        value_update: (state, action) =>
        {
            state.value =action.payload
        },
        value_index_delete: (state,action) =>
        {
            state.value3 =action.payload
        },
       
      checking_update :(state, action) =>
        {
            state.update_check =action.payload
        },
        
    
  },
})

export const {  add_data ,value_delete,true_value,false_value,value_index_delete,value_update,checking_update} = counterSlice.actions

export default counterSlice.reducer