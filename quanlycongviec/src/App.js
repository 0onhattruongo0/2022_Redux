import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from "react-redux";
import * as actions from "./actions/index"
class App extends Component {
  
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
      console.log('avo')
    }else{
      this.props.onToggleForm();
     
    }
    this.props.onClearTask({
      id : '',
      name : '',
      status : false
    })
  }

  render() {
    
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
                    <Control />
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
