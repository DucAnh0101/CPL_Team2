import { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function Home() {

    const [article, setArticle] = useState([]);
    const [tag, setTags] = useState([]);

    useEffect(() => {
        fetch('https://api.realworld.io/api/articles')
            .then(res => res.json())
            .then(res => setArticle(res.articles))
    }, [])

    useEffect(() => {
        fetch('https://api.realworld.io/api/tags')
            .then(res => res.json())
            .then(res => setTags(res.tags))
    }, [])

    const gFeed = document.getElementsByClassName('global')[0];
    const tags = document.getElementsByClassName('tags')[0];

    const handleTags = (e) => {
        let value = e.target.value;
        tags.innerHTML = `#${value}`;
        // gFeed.
    }

    return (
        <>
            <Header />
            <div className="container-fluid bg-success text-center text-white">
                <div className="py-4">
                    <h1 className="mb-3">CONDUIT</h1>
                    <p>A place to share your knowledge</p>
                </div>
            </div>
            <div className="container ">
                <div className="border-bottom mt-5 text-success">
                    <span className="global">Global Feed</span>
                    <span className="tags p-3"></span>
                </div>
                <p>Popular Tags</p>
                <div className="d-flex justify-content-between mb-2">
                    {
                        tag?.length > 0 && tag?.map(tag => {
                            return (

                                <button className="btn btn-secondary rounded px-2 border-0 text-decoration-none text-white" key={tag} value={tag} onClick={(e) => handleTags(e)}>
                                    {tag}
                                </button>
                            )
                        }
                        )
                    }
                </div>
                <div className="mt-5 ">
                    {
                        article?.length > 0 && article?.map(a => {
                            return (
                                <div className="my-5">
                                    <div className="container my-3 d-flex justify-content-between">
                                        <div>
                                            <img src={a.author.image} alt="author-img" className="rounded-circle" />
                                            <span className="text-success h6 mx-2">{a.author.username}</span>
                                            <span className="text-secondary">{a.createdAt}</span>
                                        </div>
                                        <Link className="btn btn-outline-success" to="">
                                            <i class="fa-solid fa-heart"></i>
                                            {a.favoritesCount}
                                        </Link>
                                    </div>
                                    <p className="h4">
                                        {a.title}
                                    </p>
                                    <p className="text-secondary">
                                        {a.description}
                                    </p>
                                    <div className="d-flex justify-content-between text-secondary">
                                        <span>Read more...</span>
                                        <div>
                                            {
                                                a.tagList.map(tl => {
                                                    return (
                                                        <span className="border border-secondary rounded px-2 m-1">{tl}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div >
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </>
    )
}