import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from "react-redux";
import * as actions from "./actions/index"
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // tasks : [],
      // isDisplayForm: false,
      taskEdit: null,
      filter: {
        name: '',
        status: -1
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 1
    }
  }
  // componentDidMount(){
  //   if(localStorage && localStorage.getItem('tasks')){
  //     var tasks = JSON.parse(localStorage.getItem('tasks'));
  //     this.setState({
  //       tasks : tasks
  //     })
  //   }
  // }
  GenarateData =()=>{
    var tasks = [
      {
        id : this.GenarateID(),
        name : 'Học lập trình',
        status: true
      },
      {
        id : this.GenarateID(),
        name : 'Đi bơi',
        status: false
      },
      {
        id : this.GenarateID(),
        name : 'Học lập trình',
        status: true
      }
    ];
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks',JSON.stringify(tasks))
    
  }
  // s4(){
  //   return Math.floor((1+Math.random())* 0x10000).toString(16).substring(1)
  // }
  // GenarateID(){
  //   return this.s4() + this.s4()+ '-'+this.s4()+this.s4()+ '-'+this.s4() +this.s4();
  // }
  // Thêm
  onToggleForm = () =>{
    // if(this.state.isDisplayForm === true && this.state.taskEdit !== null){
    //   this.setState({
    //     isDisplayForm:true,
    //     taskEdit: null
    //   })
    // }else{
    //   this.setState({
    //     isDisplayForm : !this.state.isDisplayForm,
    //     taskEdit: null
    //   })
    // }
    this.props.onToggleForm()

     
 
  }
  // onCloseForm = () =>{
  //   // this.setState({
  //   //   isDisplayForm : false
  //   // })
  //   this.props.onCloseForm()
  // }
  onShowForm=()=>{
    this.setState({
      isDisplayForm:true
    })
  }
  onSubmit=(data)=>{
    var tasks = this.state.tasks;
    if(data.id===''){
      data.id = this.GenarateID();
      tasks.push(data);
    }else{
      var index = this.findIndex(data.id)
      tasks[index] = data;
    }
    
    this.setState({
      tasks: tasks,
      isDisplayForm : false,
      taskEdit: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  // onUpdateStatus = (id)=>{
  //   var {tasks} = this.state;
  //   var index  =this.findIndex(id);
  //   if(index !== -1){
  //     tasks[index].status = !tasks[index].status
  //     this.setState({
  //       tasks : tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks))
  //   }
  // }
  findIndex = (id) =>{
    var {tasks} = this.state;
    var result =-1;
    tasks.forEach((task,index)=>{
      if(task.id === id){
        result = index
      }
    })
    return result;
  }
  // onDelete = (id) =>{
  //   var {tasks} = this.state;
  //   var index  =this.findIndex(id);
  //   if(index !== -1){
  //     tasks.splice(index,1);
  //     this.setState({
  //       tasks : tasks
  //     });
  //     localStorage.setItem('tasks', JSON.stringify(tasks));
  //     this.onCloseForm()
  //   }
  // }
  onUpdate =(id) =>{
    var{tasks} = this.state;
    var index = this.findIndex(id);
    if(index !== -1){
    var taskEdit = tasks[index]
    this.setState({
      taskEdit : taskEdit
    })
    this.onShowForm()
  }
   
  }

  onFilter = (filterName,filterStatus) =>{
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    })
  } 
  onSearch = (value) =>{
    this.setState({
      keyword : value
    })
  }
  onSort=(sortBy,sortValue)=>{
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    })
  }

  render() {
    var {
      // tasks,
      //  isDisplayForm,
        taskEdit, 
      //  filter,keyword,
       sortBy,sortValue} = this.state;
    // if(filter){
    //   if(filter.name){
    //     tasks = tasks.filter((task)=>{
    //       return task.name.indexOf(filter.name) !== -1;
    //     });
    //   }
    //   // tasks = tasks.filter((task)=>{
    //   //   if(filter.status === -1){
    //   //     return task;
    //   //   }else{
    //   //   return task.status === (filter.status === 1 ? true : false)       
    //   //   } 
    //   // })
    // }
    // if(keyword){
    //   tasks = tasks.filter((task)=>{
    //     return task.name.toLowerCase().indexOf(keyword) !== -1;
    //   })
    // }
    // if(sortBy==="name"){
    //   tasks.sort((a,b)=>{
    //     if(a.name.toLowerCase()>b.name.toLowerCase()){
    //       return sortValue;
    //     }else if(a.name.toLowerCase()<b.name.toLowerCase()){
    //       return -sortValue;
    //     }else{
    //       return 0;
    //     }
    //   })
    // }else{
    //   tasks.sort((a,b)=>{
    //     if(a.status>b.status){
    //       return -sortValue;
         
    //     }else if(a.status<b.status){
    //       return sortValue;
    //     }else{
    //       return 0;
    //     }
    //   })
    // }

    var {isDisplayForm} = this.props;

    // var elmTaskForm = isDisplayForm ===true ? <TaskForm onSubmit = {this.onSubmit} 
    // // onCloseForm = {this.onCloseForm}
    //  task={taskEdit} /> : '';
    return (
      <div>
          <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={isDisplayForm === true? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                    {/* {elmTaskForm} */}
                    <TaskForm onSubmit = {this.onSubmit} 
                    // onCloseForm = {this.onCloseForm}
                    task={taskEdit} />
                </div>
                <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                    <button type="button" className="btn btn-primary" 
                    onClick={this.onToggleForm}
                    >
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>
                    <button type="button" className="btn btn-danger" onClick={this.GenarateData}>
                        Genarate Data
                    </button>
                    <Control onSearch ={this.onSearch} onSort={this.onSort} sortBy ={sortBy} sortValue={sortValue} />
                    <TaskList 
                    // tasks = {tasks} 
                    // onUpdateStatus = {this.onUpdateStatus} 
                    // onDelete = {this.onDelete} 
                    // onUpdate= {this.onUpdate}
                    onFilter = {this.onFilter}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    isDisplayForm: state.isDisplayForm
  }
}
const mapDispatchToProps = (dispatch, props)=>{
  return {
    onToggleForm: ()=>{
      dispatch(actions.toggleForm())
    },
    // onCloseForm: ()=>{
    //   dispatch(actions.closeForm())
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
