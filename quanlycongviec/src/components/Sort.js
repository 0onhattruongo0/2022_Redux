import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions"


class Sort extends Component {
    onClick = (sortBy,sortValue) =>{
    //    this.props.onSort(sortBy,sortValue)
    this.props.onSort({
        by: sortBy,
        value : sortValue
    })
    }
    // componentDidUpdate(prevProps,prevState){
    //     console.log(prevProps)
    // }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=>this.onClick('name', 1)}>
                          
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z
                                </span>
                           
                        </li>
                        <li onClick={()=>this.onClick('name', -1)}>
                           
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A
                                </span>
                         
                        </li>
                        <li className="divider"></li>
                        <li onClick={()=>this.onClick('status', 1)}>Trạng Thái Kích Hoạt</li>
                        <li onClick={()=>this.onClick('status', -1)}>Trạng Thái Ẩn</li>
                    </ul>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return {
        sort : state.sort
    }
  }
  const mapDispatchToProps = (dispatch, props)=>{
    return {
      onSort: (sort)=>{
        dispatch(actions.sort(sort))
      },
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Sort);