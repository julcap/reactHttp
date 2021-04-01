import React, {Component} from 'react';
import axios from "axios";

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null,
        error: false
    }

    componentDidUpdate() {
        if (this.props.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    }).catch(err=>{
                        this.setState({error:true})
                })
            }
        }
    }

    postDeleteHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.state.loadedPost.id)
            .then(response=>console.log(response));
    }

    render() {
        if (this.state.error) return <p style={{textAlign:'center'}}>Something went wrong !</p>
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading... !</p>
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.postDeleteHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;