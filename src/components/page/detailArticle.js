import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../Header & footer/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DetailArticle = () => {
  const [commentText, setCommentText] = useState('')
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [isLogin, setIsLogin] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [comments, setComments] = useState([])
  const [user, setUser] = useState([])

  const getUser = () => {
    axios
      .get('https://api.realworld.io/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setUser(res.data.user)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (token) {
      getUser()
      setIsLogin(true)

      fetchComments()
    }
    fetchArticleDetails()
  }, [slug, isLogin])
  const fetchArticleDetails = async () => {
    try {
      let apiUrl = `https://api.realworld.io/api/articles/${slug}`
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      })

      if (response.ok) {
        const data = await response.json()
        setArticle(data.article)
      } else {
        console.error('Failed to fetch article details')
      }
    } catch (error) {
      console.error('Error fetching article details:', error)
    }
  }

  const handleFavorite = async (articleSlug, favorited) => {
    if (isLogin) {
      const apiUrl = `https://api.realworld.io/api/articles/${articleSlug}/favorite`
      const method = favorited ? 'DELETE' : 'POST'
      try {
        const response = await fetch(apiUrl, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (response.ok) {
          fetchArticleDetails()
        } else {
          console.error('Error handling favorite:', response.statusText)
        }
      } catch (error) {
        console.error('Error handling favorite:', error)
      }
    } else {
      navigate('/register')
    }
  }
  const fetchComments = async () => {
    try {
      let apiUrl = `https://api.realworld.io/api/articles/${slug}/comments`
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setComments(data.comments)
      } else {
        console.error('Failed to fetch comments')
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
    }
  }
  const handleComment = async () => {
    if (!commentText.trim()) {
      return
    }

    try {
      const apiUrl = `https://api.realworld.io/api/articles/${slug}/comments`
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          comment: {
            body: commentText
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        setComments([...comments, data.comment])
        setCommentText('')
      } else {
        console.error('Failed to post comment:', response.statusText)
      }
    } catch (error) {
      console.error('Error posting comment:', error)
    }
  }
  const handleCommentDelete = async commentId => {
    try {
      const apiUrl = `https://api.realworld.io/api/articles/${slug}/comments/${commentId}`
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        fetchComments() 
      } else {
        console.error('Failed to delete comment:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article?')) {
      return
    }

    try {
      const apiUrl = `https://api.realworld.io/api/articles/${article.slug}`
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
<<<<<<< HEAD
        navigate('/');
=======
        navigate('/')
>>>>>>> 4c0d8776d9f47cec91ecedbf0b26add6fdfb116a
      } else {
        console.error('Failed to delete article:', response.statusText)
      }
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  const handleEdit = slug => {
    navigate('/newArticle/' + slug)
  }
  return (
    <div>
      <Header />
      {article && (
        <div>
          <div className='article-page bg-dark'>
            <div className='banner'>
              <div className='container text-white '>
                <div className='head'>
                  <div className=''>
                    <p className='title'>{article.title}</p>
                  </div>
                  <div className='article-meta text-white name'>
                    <Link to={`/profile/${article.author.username}`}>
                      <img
                        src={article.author.image}
                        className='rounded-circle imgIcon'
                        alt={`Author ${article.author.username}`}
                      />
                    </Link>
                    <div className='info'>
                      <span className='author'>{article.author.username}</span>
                      <span className='date'>
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
                    &nbsp;
                    {isLogin && article.author.username === user.username ? (
                      <>
                        <button
                          className='btn btn-sm btn-outline-secondary me-2 rounded'
                          onClick={() => handleEdit(article.slug)}
                        >
                        <i class="fa-solid fa-pen"></i> Edit Article
                        </button>
                        <button
                          className='btn btn-sm btn-outline-danger rounded'
                          onClick={handleDelete}
                        >
                        <i class="fa-solid fa-trash"></i> Delete Article
                        </button>
                      </>
                    ) : (
                      <button
                        className={`btn btn-sm btn-primary ${article.favorited ? 'favorited' : 'unfavorite'
                          }`}
                        onClick={() => {
                          handleFavorite(article.slug, article.favorited)
                        }}
                      >
                        <i className='fa-solid fa-heart'></i>{' '}
                        {article.favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
                        <span className='counter'>
                          ({article.favoritesCount})
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container page articleContent'>
            <div className='row article-content'>
              <div className='col-xs-12'>
                <p>{article.description}</p>
                <div>
                  <p>{article.body}</p>
                </div>
              </div>
            </div>
            <ul className='tag-list text-secondary '>
              {article.tagList.map(tag => (
                <li className='tag-default tag-pill tag-outline ' key={tag}>
                  {' '}
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <hr />
          <div className='row'>
            {isLogin ? (
              <div>
                <div className='show-comment'>
                  {/* Display comments here */}
                  {comments.map(comment => (
                    <div key={comment.id} className='comment'>
                      <div className='comment-content'>
                        <p>{comment.body}</p>
                        <p>Posted by: {comment.author.username}</p>
                      </div>
                      <div className='comment-actions cardf'>
                        <div className='centerr'>
                          <img
                            src={comment.author.image}
                            className='rounded-circle imgIcon cred'
                          />
                          {isLogin &&
                            comment.author.username === user.username && (
                              <button
                                className='btn btn-sm trash'
                                onClick={() => {
                                  handleCommentDelete(comment.id)
                                }}
                              >
                                <i className='fa-solid fa-trash'></i>
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='col-xs-12 col-md-8 offset-md-2'>
                  <textarea
                    className='card comment-form cardfix'
                    placeholder='Write your comment here...'
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                  ></textarea>{' '}
                  <div className='cardf'>
                    <div className='centerr'>
                      <img
                        src={user.image}
                        className='rounded-circle imgIcon cred'
                      />
                      <button
                        type='submit'
                        className='btn btn-sm btn-success floatr'
                        onClick={handleComment}
                      >
                        Post Comment
                      </button>
                    </div>{' '}
                  </div>
                </div>
              </div>
            ) : (
              <div className='col-xs-12 col-md-8 offset-md-2'>
                <p>
                  <Link to='/login'>Sign in</Link>&nbsp; or &nbsp;
                  <Link to='/register'>Sign up</Link>&nbsp; to add comments on
                  this article.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailArticle
