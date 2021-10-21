import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppContainer from './AppContainer';
import api from "../src/api";
import {useHistory, useParams} from "react-router-dom";

const Edit = () => {
    const history = useHistory();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const onEditSubmit = async () => {
        setLoading(true);
        try {
            await api.updatePost(
                {
                    title,content,
                }
                , id);
            history.push('/');
        } catch (e) {
            alert(id);
        } finally {
            setLoading (false)
        }


    };

    useEffect(() => {
        api.getPost(id).then(res => {
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setContent(post.content);
        })
    }, [])

    return (
        <AppContainer
            title="Edit Post">
            <div className="form-group">
                <label>Title</label>
                <input
                    className="form-control"
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control"
                          value={content}
                          onChange={e => setContent(e.target.value)}/>
            </div>
            <button className="btn btn-success"
                    onClick={onEditSubmit}
                    disabled={loading}
            >
                { loading ? 'Loading ....' : 'Save'}
            </button>
        </AppContainer>
    );
};

export default Edit;
