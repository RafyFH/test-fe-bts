import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
    dataChecklist: [
        {
            "id": 3,
            "name": "test",
            "items": null,
            "checklistCompletionStatus": false
        },
        {
            "id": 4,
            "name": "test1",
            "items": null,
            "checklistCompletionStatus": false
        },
        {
            "id": 5,
            "name": "test34",
            "items": null,
            "checklistCompletionStatus": false
        }
    ],
    dataChecklistItemById: [],
    dataChecklistItem: [],
    isLoadingChecklist: false,
    isOpenDetail: false,
    idChecklist: 0,
}
export const getChecklistItemList = createAsyncThunk('checklist/list/item', async (param, thunkAPI) => {
    const respone = await fetch(`http://94.74.86.174:8080/api/checklist/${param.idChecklist}/item`, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      }),
    })
    const responeResult = await respone.json()
    return responeResult
})
export const getChecklistList = createAsyncThunk('checklist/list', async (param, thunkAPI) => {
    const respone = await fetch(`http://94.74.86.174:8080/api/checklist`, {
      method: 'get',
      headers: new Headers({
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      }),
    })
    const responeResult = await respone.json()
    return responeResult
})
export const postChecklist = createAsyncThunk('checklist/post', async (param, thunkAPI) => {
    try {
        const response = await axios.post('http://94.74.86.174:8080/api/checklist', 
          {
              name: param.name,
          },
          {
            headers: {
                Authorization: 'Bearer ' + param.token,
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
          }
        );
    
        if (response.status === 200) {
          console.log(response.status);
          const responseJson = response.data;
          
          thunkAPI.dispatch(getChecklistList(param))
          return responseJson;
        }
      } catch (error) {
        console.error('Login failed', error);
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
      }
  })
  export const postChecklistItem = createAsyncThunk('checklist/post/item', async (param, thunkAPI) => {
    try {
        const response = await axios.post(`http://94.74.86.174:8080/api/checklist/${param.id}/item`, 
          {
            itemName: param.name,
          },
          {
            headers: {
                Authorization: 'Bearer ' + param.token,
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
            },
          }
        );
    
        if (response.status === 200) {
          console.log(response.status);
          const responseJson = response.data;
          
          thunkAPI.dispatch(getChecklistList(param))
          return responseJson;
        }
      } catch (error) {
        console.error('Login failed', error);
        return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
      }
  })
  export const editStatusChecklistItem = createAsyncThunk('checklist/item/status', async (param, thunkAPI) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
    let response = await fetch(`http://94.74.86.174:8080/api/checklist/${param.idChecklist}/item/rename/${param.idChecklistItem}`, requestOptions)
    if (response.status === 200) {
      thunkAPI.dispatch(getChecklistList(param))
    }
  })
  export const renameChecklistItem = createAsyncThunk('checklist/item/rename', async (param, thunkAPI) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({itemName: param.name}),
    }
    let response = await fetch(`http://94.74.86.174:8080/api/checklist/${param.idChecklist}/item/rename/${param.idChecklistItem}`, requestOptions)
    if (response.status === 200) {
      thunkAPI.dispatch(getChecklistItemList(param))
    }
  })
  export const deleteChecklistItem = createAsyncThunk('checklist/delete/item', async (param, thunkAPI) => {
    const requestOptions = {
      method: 'Delete',
      headers: {
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
    let response = await fetch(`http://94.74.86.174:8080/api/checklist/${param.idChecklist}/item/${param.idChecklistItem}`, requestOptions)
    if (response.status === 200) {
      const responseJson = await response.json()
  
      thunkAPI.dispatch(getChecklistItemList(param))
      return responseJson
    }
  })
  export const deleteChecklist = createAsyncThunk('checklist/delete', async (param, thunkAPI) => {
    const requestOptions = {
      method: 'Delete',
      headers: {
        Authorization: 'Bearer ' + param.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    }
    let response = await fetch(`http://94.74.86.174:8080/api/checklist/${param.idChecklist}`, requestOptions)
    if (response.status === 200) {
      const responseJson = await response.json()
  
      thunkAPI.dispatch(getChecklistList(param))
      return responseJson
    }
  })
  
const checklistSlice = createSlice({
    name: 'checklist',
    initialState,
    reducers: {
        openDetail: (state, action) => {
            console.log(action)
            state.isOpenDetail = action.payload.isOpen;
            state.dataChecklistItemById = action.payload.data;
            state.idChecklist = action.payload.idChecklist;
        },
    }, 
    extraReducers: (builder) => {
        builder
          .addCase(getChecklistList.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(getChecklistList.fulfilled, (state, action) => {
            state.dataChecklist = action.payload.data;
            state.isLoadingChecklist = false;
          })
          .addCase(getChecklistList.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          })
          .addCase(postChecklist.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(postChecklist.fulfilled, (state, action) => {
            state.isLoadingChecklist = false;
          })
          .addCase(postChecklist.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          })
          
          .addCase(postChecklistItem.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(postChecklistItem.fulfilled, (state, action) => {
            state.isLoadingChecklist = false;
          })
          .addCase(postChecklistItem.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          })
          .addCase(renameChecklistItem.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(renameChecklistItem.fulfilled, (state, action) => {
            state.isLoadingChecklist = false;
          })
          .addCase(renameChecklistItem.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          })
          .addCase(deleteChecklistItem.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(deleteChecklistItem.fulfilled, (state, action) => {
            state.isLoadingChecklist = false;
          })
          .addCase(deleteChecklistItem.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          })
          .addCase(deleteChecklist.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(deleteChecklist.fulfilled, (state, action) => {
            state.isLoadingChecklist = false;
          })
          .addCase(deleteChecklist.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          })
          .addCase(editStatusChecklistItem.pending, (state) => {
            state.isLoadingChecklist = true;
            state.error = null;
          })
          .addCase(editStatusChecklistItem.fulfilled, (state, action) => {
            state.isLoadingChecklist = false;
          })
          .addCase(editStatusChecklistItem.rejected, (state, action) => {
            state.isLoadingChecklist = false;
            state.error = action.payload;
          });
      },
});

export const { openDetail } = checklistSlice.actions;
export default checklistSlice.reducer;