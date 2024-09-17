import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/client";
import { searchPin } from "../utils/queryStrings";

//create pin thunk
export const createPin = createAsyncThunk(
    "pin/createPin",
    async (pin, { getState }) => {
        const res = await client.createIfNotExists(pin);
        return res.data;
    }
);
//delet pin thunk
export const deletePin = createAsyncThunk(
    "pin/deletePin",
    async (pinID, { getState }) => {
        const res = await client.delete(pinID);
        return res.data;
    }
);
//uploadPinImage pin thunk
export const uploadPinImage = createAsyncThunk(
    "pin/uploadPinImage",
    async (image, { getState }) => {
        const res = await client.uploadImage(image);
        return res.data;
    }
);
export const fetchPins = createAsyncThunk(
    "pin/fetchPins",
    async (seachQuery) => {
        const res = await client.fetch(searchPin(seachQuery));
        return res.data;
    }
);

//create pin slice
export const pinSlice = createSlice({
    name: "pin",
    initialState: {
        pins: [],
        imageFile: {

            image: {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: "",
                },
            }
        },
        imageAdded: false,
        error: false,
        loading: false,
    },
    reducers: {
        //reducer for uploadImage
        uploadNewImage: (state, action) => {
            state.loading = false;
            state.imageFile.image.asset._ref = action.payload;
            state.imageAdded = true;
        },
        setPins: (state, action) => {
            state.pins = action.payload;
            state.loading = false;
        },
        createNewPin: (state) => {
            state.newPin = null;
        }
    },
    //add case
    // add builder callbacks
    extraReducers: (builder) => {
        builder
            .addCase(createPin.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPin.fulfilled, (state, action) => {
                state.loading = false;
                state.newPin = action.payload;
            })
            .addCase(createPin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deletePin.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePin.fulfilled, (state) => {
                state.loading = false;
                state.newPin = null;
            })
            .addCase(deletePin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(uploadPinImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(uploadPinImage.fulfilled, (state, action) => {
                state.loading = false;
                state.newPin = { ...state.newPin, image: action.payload };
            })
            .addCase(uploadPinImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchPins.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPins.fulfilled, (state, action) => {
                state.loading = false;
                state.pins = action.payload;
            })
            .addCase(fetchPins.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const { createNewPin, setPins, uploadNewImage } = pinSlice.actions;
export default pinSlice.reducer;


