import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from  './../actions/index'

class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name : '',
            status: false
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
            // console.log(value)
            // value = target.value !== 'true' ? false : true
            if(target.value !== 'true'){
                value = false
            }else{
                value = true
            }
        }
        this.setState ({
            [name] : value
        })
    }
    onSubmit=(event)=>{
        event.preventDefault();
        // this.props.onSubmit(this.state)
        this.props.onSaveTask(this.state);
        this.setState({
            id: '',
            name: '',
            status: false
        });
        this.props.onCloseForm();
        this.props.onClearTask({
            id : '',
            name : '',
            status : false
        })
    }
    onCancel = (event)=>{
        event.preventDefault();
        this.setState({
            name: '',
            status: false
        })
    }
    // componentDidMount(){
    //     if(!this.props.itemEditing && this.props.itemEditing.id!==null){
    //         console.log("vào")
    //         this.setState({
    //             id: this.props.itemEditting.id,
    //             name: this.props.itemEditting.name,
    //             status: this.props.itemEditting.status
    //         })
    //     }
    //     else{
    //         this.onClear()
    //     }
    // }
    
   componentWillReceiveProps(nextProps){
    console.log(nextProps)
    if(nextProps && nextProps.itemEditing !== ''){
        this.setState({
            id: nextProps.itemEditing.id,
            name: nextProps.itemEditing.name,
            status: nextProps.itemEditing.status
        })
    }else{
        this.setState({
            id: '',
            name: '',
            status: false
        })
    }
   }

   componentDidUpdate(prevProps, prevState) {
    // console.log('cccc') 
    if(prevProps.itemEditing!==this.props.itemEditing && this.props.itemEditing!==null){ 
        console.log('bbb') 
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status,
    });
    }else if(prevProps.itemEditing!==this.props.itemEditing && this.props.itemEditing ===null){
        this.setState({
            id: '',
            name: '',
            status: false,
        });
    }
   }

   onClear = () => {
    this.setState({
        id: '',
        name: '',
        status: false
    })
   }
    
   

       
    render() {
        var {id} = this.state
        // console.log(id)
        // console.log(this.props.isDisplayForm)
        if(!this.props.isDisplayForm) return null;
        else{
            return (
                    <div className="panel panel-warning">
                            <div className="panel-heading">
                                <h3 className="panel-title">{  id !== ''? 'Cập Nhật Công Việc':'Thêm công việc' }<span className='fa fa-times-circle text-right' onClick={this.onCloseForm}></span></h3>
                                
                            </div>
                            <div className="panel-body">
                                <form onSubmit= {this.onSubmit}>
                                    <div className="form-group">
                                        <label>Tên :</label>
                                        <input type="text" className="form-control" name ='name' 
                                        onChange={this.onChange} 
                                        value={this.state.name}/>
                                    </div>
                                    <label>Trạng Thái :</label>
                                    <select className="form-control" required="required" name ='status' onChange={this.onChange} value={this.state.status}>
                                        <option value={false}>Ẩn</option>
                                        <option value={true}>Kích Hoạt</option>
                                        
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
}
const mapStateToProp = state => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing : state.itemEditing
    }
}
const mapDispatchToProps = (dispatch,props) =>{
    return {
        onSaveTask : (task)=>{
            dispatch(action.saveTask(task))
        },
        onClearTask: (task) =>{
            dispatch(action.editTask(task))
        },
        onCloseForm : ()=>{
            dispatch(action.closeForm())
        }
    }
}

export default connect(mapStateToProp,  mapDispatchToProps) (TaskForm);