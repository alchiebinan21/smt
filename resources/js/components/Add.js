import React, {useState} from 'react';
import AppContainer from './AppContainer';
import { useHistory } from "react-router-dom";
import api from '../src/api';

const Add = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try {
            await api.addPost(
                {
                    title,content,
                }
            )
            history.push('/');
        } catch {
            alert();
        } finally {
            setLoading (false)
        }
    };

    return (
        <AppContainer
            title="Add Post">

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
                    onClick={onAddSubmit}
                    disabled={loading}
                >
                    { loading ? 'Loading ....' : 'Save'}
                </button>
        </AppContainer>
    );
};

export default Add;
