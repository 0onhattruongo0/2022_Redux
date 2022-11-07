import * as types  from "../constants/ActionTypes"

 var s4=()=>{
    return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
  }
 var GenarateID=()=>{
    return s4() + s4()+ '-'+s4()+s4()+ '-'+s4() +s4();
  }
 var  findIndex = (tasks, id) =>{
    var result =-1;
    tasks.forEach((task,index)=>{
      if(task.id === id){
        result = index
      }
    })
    return result;
  }
var data = JSON.parse(localStorage.getItem('tasks'))
// var data = []
var initialState = data ? data : [];
var myReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.LIST_ALL: return state;
        case types.ADD_TASK: 
        // console.log(action); 
            var newTask = {
                id: GenarateID(),
                name: action.task.name,
                status: action.task.status === 'true' ? true :false
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS:
            console.log(action)
            var id = action.id;
            var index  =findIndex(state,id);
            // sai:
            // state[index].status = !state[index].status;  
            var cloneTask = {...state[index]};
            cloneTask.status = !cloneTask.status;
            // C1:
            // state.splice(index,1);
            // state.push(cloneTask);     
            // C2:
            // state[index] = cloneTask
            // C3:
            state[index] = {
                ...state[index],
                status : !state[index].status
            }
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state]
        default: return state;
    }
}

export default myReducer;