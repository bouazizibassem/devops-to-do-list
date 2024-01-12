import React from 'react';
import './App.css';
import {AiOutlinePlusCircle} from 'react-icons/ai'
import {MdDeleteForever} from 'react-icons/md'
import NavBar from './components/NavBar'
import Todo from './components/Todo'
class App extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    todos : [],
    input : ''
  }

  componentDidMount() {
    this.getTodos()
  }

  handleChange = (e) => {
    this.setState({
      input : e.target.value
    })
  }

  getTodos = () => {
    fetch(`${process.env.REACT_APP_API}/api/items`)
    .then(response => response.json())
    .then(todos => this.setState({
      todos : todos.items
    }))
    .catch(err => {
      alert(err)
    })
  }

  resetInputs = () => {
    this.setState({
      input : ''
    })
  }

  postTodo = () => {
    const {input} = this.state
    const options = {
      method : 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        name : input
      })  
    }
    fetch(`${process.env.REACT_APP_API}/api/new`,options)
    .then(response => response.json())
    .then(() => {
      this.resetInputs();
      this.getTodos()
  })
    
    .catch(err => console.log(err)) 
  }

  deleteTodos = () => {
    const options = {
      method : 'delete'
    }
    fetch(`${process.env.REACT_APP_API}/api/items`,options)
    .then(() => {
      this.resetInputs();
      this.getTodos()
    })
  }

 

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="input">
          <input type="text" placeholder="Enter task..." value ={this.state.input} onChange={this.handleChange}/>
          <AiOutlinePlusCircle className="addBtn" onClick={this.postTodo} />
          <MdDeleteForever className="delBtn" onClick={this.deleteTodos} />
        </div>

        {this.state.todos.map((todo, key) => {
        return (
          <Todo todo={todo} key={key} index={key} getTodos={this.getTodos}/>
        )
      })}
      </div>
    );
  }

}
  


export default App;
