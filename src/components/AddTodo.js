import React, { Component } from 'react'

export class AddTodo extends Component {
    state = {
        title: ''
    }
    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.props.addTodo(this.state.title);
        this.setState({title: ''});
    }
    render() {
        return (
            <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input type="text" name="title" style={{flex: '10',padding:'5px'}} placeholder="Add todo" value={this.state.title} 
                onChange={this.onChange}/>
                
            <button className="btn btn-info" type="submit" value="submit" style={{flex: '1'}}>submit</button>
            </form>

        )
    }
}

export default AddTodo
