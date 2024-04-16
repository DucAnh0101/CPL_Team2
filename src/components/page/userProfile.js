import React, { useEffect } from 'react';
import Header from '../Header & footer/Header'
import { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import "./userProfile.css";
const UserProfile = () => {
    const navigate = useNavigate();
    const username = useParams().userName;
    const [bio, setBio] = useState();
    const [userImage, setUserImage] = useState();
    const [following, setFollowing] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const [activeItem, setActiveItem] = useState('My Articles');
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const token = localStorage.getItem('token');


    useEffect(() => {
        getUser(username);
    }, []);
    const getUser = (username) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const config = {
            headers,
            method: 'get'
        }
        axios.get(`https://api.realworld.io/api/profiles/${username}`, config)
            .then((res) => {
                console.log(res);
                setBio(res.data.profile.bio);
                setUserImage(res.data.profile.image);
                setFollowing(res.data.profile.following);
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (token) {
            setIsLogin(true);
        }
        if (activeItem == "My Articles") {
            fetchArticles("My Articles", offset);
        }
        if (activeItem == "Favorited Articles") {
            fetchArticles("Favorited Articles", offset);
        }
    }, [offset])

    const fetchArticles = (activeItem, offset) => {
        let apiUrl = ''
        if (activeItem === 'My Articles') {
            apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}&author=${username}`
        } else if (activeItem === 'Favorited Articles') {
            apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}&favorited=${username}`
        }
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        fetch(apiUrl, {
            headers
        })
            .then(res => res.json())
            .then(res => {
                setArticles(res.articles)
                setTotalPages(Math.ceil(res.articlesCount / limit))
            })
            .catch(error => console.error('Error fetching articles:', error))
    }

    const handleActive = item => {
        if (item === 'My Articles') {
            setActiveItem('My Articles');
            fetchArticles('My Articles', 0);
        } else if (item === 'Favorited Articles') {
            setActiveItem('Favorited Articles');
            fetchArticles('Favorited Articles', 0);
        }
        setOffset(0)
        return
    }

    const handleFavorite = async (articleSlug, favorited) => {
        if (isLogin) {
            const apiUrl = `https://api.realworld.io/api/articles/${articleSlug}/favorite`
            const method = favorited ? 'DELETE' : 'POST'

            try {
                console.log("cho chay 0");
                const response = await fetch(apiUrl, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.ok) {
                    if (activeItem === 'My Articles') {
                        fetchArticles('My Articles', offset)
                    }
                    if (activeItem === "Favorited Articles") {
                        fetchArticles("Favorited Articles", offset)
                    }
                }
            } catch (error) {
                console.error('Error handling favorite:', error)
            }
        } else {
            navigate('/register')
        }
    }
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    )

    const handlePageChange = pageNumber => {
        setOffset((pageNumber - 1) * limit)
        return
    }

    function followControl(username, isFollow) {
        if (isLogin) {
            const headers = { Authorization: `Bearer ${token}` };
            let api = `https://api.realworld.io/api/profiles/${username}/follow`;
            let method = isFollow ? "DELETE" : "POST";

            axios({
                url: api,
                method: method,
                headers: headers
            })
                .then((res) => {
                    if (res.status == 200) {
                        getUser(username);
                    }
                })
                .catch((error) => {
                    console.log("Error in controlFollow function " + error);
                }
                )
        } else {
            navigate('/register');
        }
    }
    return (
        <>
            <Header />
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div class="col-xs-12 col-md-10 offset-md-1 text-center">
                                <img className='user-image rounded-circle my-3' src={userImage} />
                                <h4 className='mb-3 fw-bold'>{username}</h4>
                                {bio == null ? "" : <p> {bio} </p>}
                                <div className='flex-d justify-content-end'>
                                    {following ?
                                        <button className="bg-light btn btn-sm btn-outline-secondary action-btn"
                                            onClick={() => followControl(username, following)}
                                        >
                                            <b>+</b> Unfollow {username}
                                        </button>
                                        :
                                        <button className="bg-light btn btn-sm btn-outline-secondary action-btn"
                                            onClick={() => followControl(username, following)}
                                        >
                                            <b>+</b> Follow {username}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container page pagefix '>
                    <div className='row  d-flex justify-content-center'>
                        <div className='col-md-9'>
                            <div className='feed-toggle'>
                                <ul className='nav nav-pills outline-active' data-metatip='true'>
                                    <li className='nav-item'>
                                        <button
                                            className={` ${activeItem === 'My Articles' ? 'active links' : 'nav-link'
                                                }`}
                                            onClick={() => handleActive('My Articles')}
                                        >
                                            My Articles
                                        </button>
                                    </li>

                                    <li className='nav-item'>
                                        <button
                                            className={` ${activeItem === 'Favorited Articles' ? 'active links' : 'nav-link'
                                                }`}
                                            onClick={() => handleActive('Favorited Articles')}
                                        >
                                            Favorited Articles
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            {articles.length == 0 ?
                                <h4
                                className='text-center mt-5'
                                >No Article to display!</h4>
                                :
                                <div className=''>
                                    {articles.length > 0 &&
                                        articles.map(article => (
                                            <div className='article-preview' key={article.slug}>
                                                <div className='article-meta'>
                                                    <a href={`/profile/${article.author.username}`}>
                                                        <img
                                                            src={article.author.image}
                                                            alt='author-img'
                                                            className='rounded-circle imgIcon'
                                                        />
                                                    </a>
                                                    <div className='info'>
                                                        <a
                                                            className='text-success h6 mx-2 author flex'
                                                            href={`/profile/${article.author.username}`}
                                                        >
                                                            {article.author.username}
                                                        </a>
                                                        <span className='text-secondary date'>
                                                            {new Date(article.createdAt).toLocaleDateString(
                                                                'en-US',
                                                                {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                }
                                                            )}
                                                        </span>
                                                    </div>
                                                    <button
                                                        className={`btn btn-outline-success floatr ${article.favorited ? 'favorited' : 'unfavorited'
                                                            }`}
                                                        onClick={() => {
                                                            handleFavorite(article.slug, article.favorited)
                                                        }}
                                                    >
                                                        <i className='fa-solid fa-heart'></i>
                                                        {article.favoritesCount}
                                                    </button>{' '}
                                                </div>
                                                <a
                                                    className='preview-link'
                                                    href={'/article/' + article.slug}
                                                >
                                                    <h1>{article.title}</h1>
                                                    <p className='text-secondary'>{article.description}</p>
                                                    <span className='text-secondary'>Read more...</span>
                                                    <ul className='tag-list text-secondary floatr'>
                                                        {article.tagList.map(tag => (
                                                            <li
                                                                className='tag-default tag-pill tag-outline '
                                                                key={tag}
                                                            >
                                                                {' '}
                                                                {tag}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </a>
                                            </div>
                                        ))}
                                    <nav aria-label='Page navigation'>
                                        <ul className='pagination'>
                                            {pageNumbers.map(pageNumber => (
                                                <li
                                                    key={pageNumber}
                                                    className={`page-item ${offset / limit + 1 === pageNumber ? 'active' : ''
                                                        }`}
                                                >
                                                    <button
                                                        className='page-link'
                                                        onClick={() => handlePageChange(pageNumber)}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default UserProfile;