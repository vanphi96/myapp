var initialState = {
    profile: null,
  };
const userInfoReducers = (state = initialState, action ) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return {profile: action.payload}
        default:
            return state;
    }
}
export default userInfoReducers;