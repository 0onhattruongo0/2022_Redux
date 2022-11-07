import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions/index";

class TaskItem extends Component {
    // onUpdateStatus = () =>{
    //     console.log(this.props.task.id)
    // }
    onUpdateStatus(value){
        this.props.onUpdateStatus(value)
    }
    onDelete(value){
        this.props.onDelete(value)
    }
    onUpdate(value){
        this.props.onUpdate(value)
    }
    render() {
        var {task,index} =this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span onClick={()=>this.onUpdateStatus(task.id)} className={task.status === true ? "label  label-success" : "label  label-danger"}>
                        {task.status === true ? 'Kích Hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={()=>this.onUpdate(task.id)}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button onClick={()=>this.onDelete(task.id)} type="button" className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => {
    return {};
}
const mapDispatchToProps = (dispatch, props) =>{
    return {
        onUpdateStatus : (id) =>{
            dispatch(actions.updateStatus(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);