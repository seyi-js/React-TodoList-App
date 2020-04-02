import React from 'react';

import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import Header from './components/layout/Header';
import About from './components/pages/About';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

import './App.css';

class App extends React.Component {

  state = {
    todos: []
  }
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res => 
      this.setState({ todos: res.data})
      )
      .catch(function (error) {
        console.log(error.response);
   });
  }
  //Toggle Complete
  markComplete = (id) =>{
    this.setState({todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
    }

    //Delete Todo
    delTodo = (id)=>{
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => {
        this.setState({todos: [...this.state.todos.filter(todo =>(
          todo.id !== id
        ))]})
      })
     
    }

    //AddTodo
    addTodo = (title) =>{
      axios.post('https://jsonplaceholder.typicode.com/todos', {title, comleted:false})
      .then(res =>
        this.setState({ todos: [...this.state.todos, res.data]})).catch(err => {
          console.log(err)
        })
      
    }
  render(){
    
    return (
      <Router>
      <div className="App">
      <div className="container-fluid">

      <Header />
      
      <Route exact path="/" render={props =>(
        <React.Fragment>
        <AddTodo addTodo={this.addTodo}/>
        <Todos  todos={this.state.todos} markComplete={this.markComplete}  delTodo={this.delTodo}/>
        </React.Fragment>
      )} />
          <Route path="/about" component={About} />
      </div>
          
      </div>
      </Router>
      
    );
  }
  
}

export default App;
