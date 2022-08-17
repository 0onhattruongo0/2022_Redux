import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from  './../actions/index'

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name : '',
            status: true
        }
    }
    onCloseForm = () =>{
        this.props.onCloseForm()
    } 
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false
        }
        this.setState ({
            [name] : value
        })
    }
    onSubmit=(event)=>{
        event.preventDefault();
        // this.props.onSubmit(this.state)
        this.props.onAddTask(this.state);
    }
    onCancel = (event)=>{
        event.preventDefault();
        this.setState({
            name: '',
            status: true
        })
    }
    componentDidMount(){
        if(this.props.task!==null){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }
    
//    componentWillReceiveProps(nextProps){
//     if(nextProps && nextProps.task){
//         this.setState({
//             id: nextProps.task.id,
//             name: nextProps.task.name,
//             status: nextProps.status
//         })
//     }else if(!nextProps.task){
//         this.setState({
//             id: '',
//             name: '',
//             status: true
//         })
//     }
//    }

   componentDidUpdate(prevProps, prevState) {
    // console.log('cccc') 
    if(prevProps.task!==this.props.task && this.props.task!==null){ 
        console.log('bbb') 
      this.setState({
        id: this.props.task.id,
        name: this.props.task.name,
        status: this.props.task.status,
    });
    }else if(prevProps.task!==this.props.task && this.props.task ===null){
        this.setState({
            id: '',
            name: '',
            status: false,
        });
    }
   }
    
   

       
    render() {
        var {id} = this.state
        return (
                <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3 className="panel-title">{id !== ''? 'Cập Nhật Công Việc':'Thêm công việc' }<span className='fa fa-times-circle text-right' onClick={this.onCloseForm}></span></h3>
                            
                        </div>
                        <div className="panel-body">
                            <form onSubmit= {this.onSubmit}>
                                <div className="form-group">
                                    <label>Tên :</label>
                                    <input type="text" className="form-control" name ='name' onChange={this.onChange} value={this.state.name}/>
                                </div>
                                <label>Trạng Thái :</label>
                                <select className="form-control" required="required" name ='status' onChange={this.onChange} value={this.state.status}>
                                    <option value={true}>Kích Hoạt</option>
                                    <option value={false}>Ẩn</option>
                                </select>
                                <br/>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning">{id !== ''? 'Sửa':'Thêm' }</button>&nbsp;
                                    <button type="submit" className="btn btn-danger" onClick={this.onCancel}>Hủy Bỏ</button>
                                </div>
                            </form>
                        </div>
                    </div>
        );
    }
}
const mapStateToProp = state => {
    return {

    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {
        onAddTask : (task)=>{
            dispatch(action.addTask(task))
        }
    }
}

export default connect(mapStateToProp,  mapDispatchToProps) (TaskForm);