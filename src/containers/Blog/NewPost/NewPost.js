import React, {Component} from 'react';
import axios from "axios";

import './NewPost.css';
import {Redirect} from "react-router";

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        //auth: false
        // redirect: false
    }

    // componentDidMount() {
    //     // Guard against unauthenticated access
    //     let redirect = this.state.auth ? null : this.props.history.replace('/posts');
    // }


    submitPostHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author

        }
        axios.post('/posts', data)
            .then(response => {
                //this.props.history.push('/posts'); // Preserves history
                this.props.history.replace('/posts'); // Doesn't preserve history
                //this.setState({redirect:true});
                // console.log(response)
            });
    }

    render() {
        // Conditional redirect
        // let redirect = this.state.redirect ? <Redirect to='/posts'/> : null; // Doesn't preserve history
        return (
            <div className="NewPost">
                {/*{redirect}*/}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title}
                       onChange={(event) => this.setState({title: event.target.value})}/>
                <label>Content</label>
                <textarea rows="4" value={this.state.content}
                          onChange={(event) => this.setState({content: event.target.value})}/>
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.submitPostHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;