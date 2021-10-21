import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from "../src/api";
import {useHistory, useParams} from "react-router-dom";

const Show = () => {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetchPost();
    }, [])

    const fetchPost = () => {
        try {
            let isMounted = true;
            api.showPost(id).then(res => {
                const result = res.data;
                const post = result.data;
                if (isMounted) {
                    setTitle(post.title);
                    setContent(post.content);
                    setComments(post.comments);
                }
            });
        } catch(e){
            alert(e);
        } finally {

        }
    }

    const onSaveComment = async () => {
        setLoading(true);
        try {
            await api.saveComment(
                {
                    content: commentInput,
                }
                , id);
        } catch (e) {
            alert(e);
        } finally {
            setLoading (false)
            fetchPost();
            setCommentInput('');
        }
    };

    const onDeleteComment = async (comment_id) => {
        setLoading(true);

        try {
            await api.deleteComment(id, comment_id);
        } catch (e) {
            alert(e);
        } finally {
            setLoading (false)
            fetchPost();
        }
    };

    const renderComments = () => {
        return comments.map((comment) => (
                <li key={comment.id} className="list-group-item">
                    <b>  { comment.user.name } </b> : {comment.content}
                    <button className="btn btn-danger float-right"
                        onClick={e => onDeleteComment(comment.id)}
                    >Delete</button>
                </li>
            )
        )
    }

    return (
        <div>
            <div className="card">
                <div className="card-header">
                        {title}
                </div>
                <div className="card-body">
                        {content}
                </div>
                <ul className="list-group list-group-flush">
                    { renderComments() }
                </ul>
                <div className="card-body">
                    <div className="form-group">
                        <input type="text" placeholder="Write a comment" className="form-control"
                            value={commentInput}
                            onChange={e => setCommentInput(e.target.value)}
                        ></input>
                        <button className="mt-2 btn btn-success"
                            onClick={onSaveComment}
                            disabled={commentInput.length > 0 ? false : true}
                        >Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Show;
