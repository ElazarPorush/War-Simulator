import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attacksState, DataStatus } from "../../types/redux";
import { IAttack } from "../../types/attack";

const initialState: attacksState = {
    error: null,
    status: DataStatus.IDLE,
    attacks: []
}

export const fetchAttacks = createAsyncThunk('attacks/list',
    async (_, thunkApi) => {
        try {
            const res = await fetch("http://localhost:8200/api/attacks/", {
                headers:{
                    "authorization": JSON.parse(localStorage.getItem("authorization")!)
                }
            })
            if (!res.ok) {
                thunkApi.rejectWithValue("Can't get the list, please try again")
            }
            const data = await res.json()
            // thunkApi.fulfillWithValue(data)
            return data
        } catch (err) {
            thunkApi.rejectWithValue(err)
        }
    }
)

const attacksSlice = createSlice({
    name: "attacks",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<attacksState>) => {
        builder.addCase(fetchAttacks.pending, (state) => {
            state.status = DataStatus.LOADING
            state.error = null
            // state.candidates = []
        }).addCase(fetchAttacks.fulfilled, (state, action) => {
            state.status = DataStatus.SUCCESS
            state.error = null
            state.attacks = action.payload as unknown as IAttack[]
        }).addCase(fetchAttacks.rejected, (state, action) => {
            state.status = DataStatus.LOADING
            state.error = action.error as string
            state.attacks = null
        })
    }
})

export default attacksSlice