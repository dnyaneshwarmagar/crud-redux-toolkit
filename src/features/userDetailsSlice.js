import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// create action for post async operation
export const createUser = createAsyncThunk("createUser",async(data,{rejectWithValue})=>{
    try{
        const response = await fetch("https://668d8f91099db4c579f35513.mockapi.io/users",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;

    }
    catch(error){
        console.log('error: ', error);
        return rejectWithValue(error)
    }
})

// read operation
export const getUsers = createAsyncThunk("getUsers",async(data,{rejectWithValue})=>{
    try{
        const response = await fetch("https://668d8f91099db4c579f35513.mockapi.io/users");
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

// delete operation
export const deleteUser = createAsyncThunk("deleteUser",async(id,{rejectWithValue})=>{
    try{
        const response = await fetch(`https://668d8f91099db4c579f35513.mockapi.io/users/${id}`,{
            method:"DELETE",

        });
        const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

// update operation
export const updateUser = createAsyncThunk("updateUser",async(data, { rejectWithValue })=>{
    try{
        const response = await fetch(`https://668d8f91099db4c579f35513.mockapi.io/users/${data.id}` , {
            method: "PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        });

        const result = await response.json();
        console.log('result: ', result);
        return result;
    }catch(error){
        return rejectWithValue(error)
    }
})

export const userDetailsSlice = createSlice({
    name:"userDetails",
    initialState:{
        users:[],
        loading:false,
        error:null,
        searchData:[]
    },
    reducers:{
        searchUser:(state,action)=>{
            state.searchData = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(createUser.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(createUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users.push(action.payload)
        })
        builder.addCase(createUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getUsers.pending,(state)=>{
            state.loading = true;
        });
        builder.addCase(getUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(getUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        });
        builder.addCase(deleteUser.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            const {id} = action.payload;

            state.users = state.users.filter((ele)=>ele.id !== id);
        });
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.loading= false;
            state.error = action.payload?.message
        });
        builder.addCase(updateUser.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.loading = false;
            console.log("payload",action.payload)
            state.users = state.users.map((user)=>(user.id === action.payload.id ? action.payload: user))
        });
        builder.addCase(updateUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload?.message;
        })
    }
})

export default userDetailsSlice.reducer;
export const {searchUser} = userDetailsSlice.actions;