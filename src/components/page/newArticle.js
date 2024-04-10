import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header & footer/Header";

export default function NewArticle() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tag, setTag] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const addArticle = () => {
        axios.post('https://api.realworld.io/api/articles', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            article: {
                title: title,
                description: description,
                body: body,
                tagList: [
                    tag
                ]
            }
        })
        .then((res) =>{
            navigate('/');
        })
        .catch(err =>{
            console.log(err);
        })
}

return (
    <>
        <Header />
        <div className="container text-center w-50 mt-3">
            <input
                className="form-control form-control-lg"
                placeholder="Article Title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="form-control my-3"
                placeholder="What's this article about?"
                onChange={(e) => setDescription(e.target.value)}
            />
            <textarea
                className="form-control"
                placeholder="Write your article (in markdown)"
                style={{ height: '20vh' }}
                onChange={(e) => setBody(e.target.value)}
            />
            <input
                className="form-control my-3"
                placeholder="Enter tags"
                onChange={(e) => setTag(e.target.value)}
            />
            <div className=" d-flex justify-content-end">
                <button className="btn btn-success py-2 px-3" onClick={addArticle}>
                    Publish Article
                </button>
            </div>
        </div>
    </>
)
}