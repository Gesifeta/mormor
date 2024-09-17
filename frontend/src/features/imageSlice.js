import { createSlice } from "@reduxjs/toolkit";


export const imageSlice = createSlice({
    name: "image",
    initialState: {
        imageFile: {
            image: {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: ""
                }
            }
        },
    },
    reducers: {
        uploadNewImage: (state, action) => {
            state.imageFile.image.asset._ref = action.payload;
        },
    },
});
export const { uploadNewImage } = imageSlice.actions;
export default imageSlice.reducer;