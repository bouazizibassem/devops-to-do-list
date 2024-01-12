import React from 'react';
import {AiFillDelete,AiOutlineCheck,AiOutlineClose} from 'react-icons/ai'

class Todo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleComplete = async () => {
        let status = false;
        this.props.todo.completed ? status = false : status = true
        const url = `${process.env.REACT_APP_API}/api/items?name=${this.props.todo.name}&completed=${status}`
        const options = {
            method : 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }

        const response = await fetch(url,options)
        this.props.getTodos()
        
            
        
    }

    handleDelete = async () => {
        const url = `http://localhost:5000/api/items?name=${this.props.todo.name}`
        const options = {
            method : 'delete',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        const response = await fetch(url,options);
        this.props.getTodos()
    }
    


    render() {

        
        return (
            <div className="todo">
            <span><span className="index">{this.props.index + 1 + ". "}</span>{this.props.todo.completed ? <span className="strike">{this.props.todo.name}</span> : <span>{this.props.todo.name}</span> }</span>
                <div className="btns">
                    <AiFillDelete className="btn" id="delete" onClick={this.handleDelete}/>
                    {this.props.todo.completed ? <AiOutlineClose className="btn" id="incomplete" onClick={this.handleComplete}/> : <AiOutlineCheck className="btn" id="complete" onClick={this.handleComplete}/>}
                </div>
            </div>
        );
    }
}


export default Todo;