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
        sortBy : 'name',
        sortValue : 1
    }
  }

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

  onToggleForm = () =>{
    var {itemEditing} = this.props;
    if(itemEditing&&itemEditing.id!==''){

    }else{
      this.props.onToggleForm();
     
    }
    this.props.onClearTask({
      id : '',
      name : '',
      status : false
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
       sortBy,sortValue} = this.state;
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
    return (
      <div>
          <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
                <hr/>
            </div>
            <div className="row">
                <div className={isDisplayForm === true? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ''}>
                    <TaskForm onSubmit = {this.onSubmit} 
                     />
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
                    <Control
                     onSort={this.onSort} sortBy ={sortBy} sortValue={sortValue} />
                    <TaskList />
                </div>
            </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    isDisplayForm: state.isDisplayForm,
    itemEditing: state.itemEditing
  }
}
const mapDispatchToProps = (dispatch, props)=>{
  return {
    onToggleForm: ()=>{
      dispatch(actions.toggleForm())
    },
    onClearTask: (task) =>{
      dispatch(actions.editTask(task))
    },
    onOpenForm : () => {
      dispatch(actions.openForm())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
