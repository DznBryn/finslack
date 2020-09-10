import { START_PRIVATE_MESSAGE_FAIL, START_PRIVATE_MESSAGE } from "./constants"

/*
    - Start Private Channel with a user
    - 
*/

export const startPrivateChannel = (receiverId)=> dispatch => {
    try {
        dispatch({
            type: START_PRIVATE_MESSAGE,
            payload: receiverId 
        })
        
    } catch (error) {
        dispatch({
            type: START_PRIVATE_MESSAGE_FAIL
        })
    }
}

