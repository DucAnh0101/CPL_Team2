import React, { useEffect, useState } from 'react';
import Header from '../Header & footer/Header';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./userProfile.css";

const Profile = () => {
    const navigate = useNavigate();
    const [bio, setBio] = useState();
    const [userImage, setUserImage] = useState();
    const [articles, setArticles] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const [activeItem, setActiveItem] = useState('My Articles');
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const username = useParams().userName;
    const token = localStorage.getItem('token');

    useEffect(() => {
        getUser(username);
        setIsLogin(!!token);
    }, []);

    useEffect(() => {
        fetchArticles(activeItem, offset);
    }, [activeItem, offset]);

    const getUser = (username) => {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const config = {
            headers,
            method: 'get'
        };
        axios.get(`https://api.realworld.io/api/profiles/${username}`, config)
            .then((res) => {
                console.log(res);
                setBio(res.data.profile.bio);
                setUserImage(res.data.profile.image);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const fetchArticles = (activeItem, offset) => {
        let apiUrl = '';
        if (activeItem === 'My Articles') {
            apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}&author=${username}`;
        } else if (activeItem === 'Favorited Articles') {
            apiUrl = `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}&favorited=${username}`;
        }
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        axios.get(apiUrl, { headers })
            .then(res => {
                setArticles(res.data.articles);
                setTotalPages(Math.ceil(res.data.articlesCount / limit));
            })
            .catch(error => console.error('Error fetching articles:', error))
    };

    const handleActive = item => {
        setActiveItem(item);
        setOffset(0);
    };

    const handlePageChange = pageNumber => {
        setOffset((pageNumber - 1) * limit);
    };

    const handleEditProfile = () => {
        navigate('/editProfile');
    };

    const handleFavorite = (articleSlug, favorited) => {
        if (isLogin) {
            const apiUrl = `https://api.realworld.io/api/articles/${articleSlug}/favorite`;
            const method = favorited ? 'DELETE' : 'POST';

            axios({
                method: method,
                url: apiUrl,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    fetchArticles(activeItem, offset);
                }
            })
            .catch(error => {
                console.error('Error handling favorite:', error);
            });
        } else {
            navigate('/register');
        }
    };

    return (
        <>
            <Header className="sticky-top" />
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1 text-center">
                                <img className='user-image rounded-circle my-3' src={userImage} alt="User avatar" />
                                <h4 className='mb-3 fw-bold'>{username}</h4>
                                {bio && <p>{bio}</p>}
                                <div className='d-flex justify-content-end'>
                                    {isLogin &&
                                        <button className="bg-light btn btn-sm btn-outline-secondary action-btn text-end" onClick={handleEditProfile}>
                                            Edit Profile Settings
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
                                        <button className={`${activeItem === 'My Articles' ? 'active links' : 'nav-link'}`} onClick={() => handleActive('My Articles')}>
                                            My Articles
                                        </button>
                                    </li>
                                    <li className='nav-item'>
                                        <button className={`${activeItem === 'Favorited Articles' ? 'active links' : 'nav-link'}`} onClick={() => handleActive('Favorited Articles')}>
                                            Favorited Articles
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            {articles.length === 0 ?
                                <h4 className='text-center mt-5'>No articles are here... yet.</h4>
                                :
                                <div>
                                    {articles.map(article => (
                                        <div className='article-preview' key={article.slug}>
                                            <div className='article-meta'>
                                                <a href={`/profile/${article.author.username}`}>
                                                    <img src={article.author.image} alt='Author avatar' className='rounded-circle imgIcon' />
                                                </a>
                                                <div className='info'>
                                                    <a className='text-success h6 mx-2 author flex' href={`/profile/${article.author.username}`}>
                                                        {article.author.username}
                                                    </a>
                                                    <span className='text-secondary date'>
                                                        {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                                    </span>
                                                </div>
                                                <button className={`btn btn-outline-success floatr ${article.favorited ? 'favorited' : 'unfavorited'}`} onClick={() => handleFavorite(article.slug, article.favorited)}>
                                                    <i className='fa-solid fa-heart'></i>
                                                    {article.favoritesCount}
                                                </button>
                                            </div>
                                            <a className='preview-link' href={`/article/${article.slug}`}>
                                                <h1>{article.title}</h1>
                                                <p className='text-secondary'>{article.description}</p>
                                                <span className='text-secondary'>Read more...</span>
                                                <ul className='tag-list text-secondary floatr'>
                                                    {article.tagList.map(tag => (
                                                        <li className='tag-default tag-pill tag-outline' key={tag}>
                                                            {tag}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </a>
                                        </div>
                                    ))}
                                    <nav aria-label='Page navigation'>
                                        <ul className='pagination'>
                                            {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                                                <li key={pageNumber} className={`page-item ${offset / limit + 1 === pageNumber ? 'active' : ''}`}>
                                                    <button className='page-link' onClick={() => handlePageChange(pageNumber)}>
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

export default Profile;
