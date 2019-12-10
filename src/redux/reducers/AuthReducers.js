const Initial_State={
    id:'',
    username:'',
    password:'',
    login:false,
}

export default (state=Initial_State,action)=>{
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state,...action.payload,login:true}
        default:
            return state
    }
}