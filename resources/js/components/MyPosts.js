import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from '../src/api';

const MyPosts = (props) => {
    const [posts, setPosts] = useState(null);

    const fetchPost = () => {
        try {
            let isMounted = true;
                axios.get('/me/posts', {
                    header: { Authorization: 'Bearer ' + sessionStorage.getItem('token') }
                }).then(res => {
                    const result = res.data;
                    if (isMounted) setPosts(result.data);
                });
        } catch(e){
            alert(e);
        } finally {
        }
    }

    const deletePost = async (id) => {
        try {
            await api.deletePost(id);
        } catch {
            alert();
        } finally {
            fetchPost();
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const renderPosts = () => {
        if(!posts) {
            return (
                <tr>
                    <td colSpan="4">
                        Loading posts..
                    </td>
                </tr>
            );
        }
        if(posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">
                        There is no post yet.
                    </td>
                </tr>
            );
        }

        return posts.map((post) => (
                <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>
                        <Link
                            className="btn btn-secondary"
                            to={`/posts/show/${post.id}`}
                        >
                            View
                        </Link>
                        <Link
                            className="btn btn-warning"
                            to={`/posts/${post.id}`}
                        >
                            Edit
                        </Link>
                        <button type="button" className="btn btn-danger"
                                onClick={() => deletePost(post.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            )
        )
    }


    return (
        <AppContainer
            title="My Posts">
            <Link to="/posts" className="btn btn-primary">Add Post</Link>
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { renderPosts()}
                    </tbody>
                </table>
            </div>
        </AppContainer>
    );
};

export default MyPosts;
