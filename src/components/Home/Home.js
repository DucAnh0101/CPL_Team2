import React, { useEffect, useState } from 'react'
import Header from '../Header & footer/Header'
import './Home.css'
import { useNavigate } from 'react-router-dom'

export default function Home () {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [tags, setTags] = useState([])
  const [selectedTag, setSelectedTag] = useState(null) // State to store the selected tag
  const [activeItem, setActiveItem] = useState('Global Feed')
  const [offset, setOffset] = useState(0) // Thêm state offset
  const [isLogin, setIsLogin] = useState(false) // State to store the selected tag
  const limit = 10
  const [totalPages, setTotalPages] = useState(0)
  const [firstLogin, setFirstLogin] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTags()
    if (token) {
      setIsLogin(true)
      if (!firstLogin) {
        setFirstLogin(true)
        setActiveItem('log')
        fetchArticles('log', offset)
        return
      }
      if (activeItem === selectedTag) {
        fetchArticles(selectedTag, offset)
      } else if (activeItem === 'log') {
        fetchArticles('log', offset)
        return
      } else {
        fetchArticles('', offset)
      }
    } else {
      if (activeItem === selectedTag) {
        fetchArticles(selectedTag, offset)
      } else fetchArticles('', offset)
    }
  }, [selectedTag, offset])

  const fetchTags = () => {
    fetch('https://api.realworld.io/api/tags')
      .then(res => res.json())
      .then(res => setTags(res.tags))
      .catch(error => console.error('Error fetching tags:', error))
  }

  const fetchArticles = (tag, offset) => {
    let apiUrl = ''
    if (tag === 'log') {
      apiUrl = `https://api.realworld.io/api/articles/feed?offset=${offset}&limit=${limit}`
    } else {
      apiUrl = tag
        ? `https://api.realworld.io/api/articles?tag=${tag}&offset=${offset}&limit=${limit}`
        : `https://api.realworld.io/api/articles?offset=${offset}&limit=${limit}`
    }

    const headers = token ? { Authorization: `Bearer ${token}` } : {} // Kiểm tra token có tồn tại không

    fetch(apiUrl, {
      headers
    })
      .then(res => res.json())
      .then(res => {
        setArticles(res.articles)
        setActiveItem(tag ? tag : 'Global Feed')
        setTotalPages(Math.ceil(res.articlesCount / limit))
      })
      .catch(error => console.error('Error fetching articles:', error))
  }

  const handleTags = tag => {
    setActiveItem(tag)
    setSelectedTag(tag)
    setOffset(0)
    return
  }
  const handleActive = item => {
    if (item === 'log') {
      setActiveItem('log')
      fetchArticles('log', 0)
    } else if (item === 'Global Feed') {
      setActiveItem('Global Feed')
      fetchArticles('', 0)
    } else {
      fetchArticles(item, 0)
    }
    setOffset(0)
    return
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
          if (activeItem === 'log') {
            console.log(activeItem)
            fetchArticles('log', offset)
          } else if (activeItem === selectedTag) {
            fetchArticles(selectedTag, offset)
          } else {
            fetchArticles('', offset)
          }
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

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  )

  const handlePageChange = pageNumber => {
    setOffset((pageNumber - 1) * limit)

    return
  }
  return (
    <>
      <Header />
      <div className='container-fluid bg-success text-center text-white'>
        <div className='py-4'>
          <h1 className='mb-3'>CONDUIT</h1>
          <p>A place to share your knowledge</p>
        </div>
      </div>
      <div className='container page pagefix'>
        <div className='row'>
          <div className='col-md-9'>
            <div className='feed-toggle'>
              <ul className='nav nav-pills outline-active' data-metatip='true'>
                {isLogin && (
                  <li className='nav-item'>
                    <button
                      className={` ${
                        activeItem === 'log' ? 'active links' : 'nav-link'
                      }`}
                      onClick={() => handleActive('log')}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className='nav-item'>
                  <button
                    className={` ${
                      activeItem === 'Global Feed' ? 'active links' : 'nav-link'
                    }`}
                    onClick={() => handleActive('Global Feed')}
                  >
                    Global Feed
                  </button>
                </li>
                {/* Render the selected tag as a new navigation item */}
                {selectedTag && (
                  <li className='nav-item'>
                    <button
                      className={` ${
                        activeItem === selectedTag ? 'active links' : 'nav-link'
                      }`}
                      onClick={() => handleActive(selectedTag)}
                    >
                      #{selectedTag}
                    </button>
                  </li>
                )}
              </ul>
            </div>
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
                        className={`btn btn-outline-success floatr ${
                          article.favorited ? 'favorited' : ''
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
            </div>
          </div>
          <div className='col-md-3 '>
            <div className='sidebar tagPlace'>
              <p>Popular Tags</p>
              <div className='tag-list'>
                {tags.length > 0 &&
                  tags.map(tag => (
                    <button
                      className='tag tag-pill tag-default tagfix'
                      key={tag}
                      onClick={() => handleTags(tag)}
                    >
                      {tag}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <nav aria-label='Page navigation'>
          <ul className='pagination'>
            {pageNumbers.map(pageNumber => (
              <li
                key={pageNumber}
                className={`page-item ${
                  offset / limit + 1 === pageNumber ? 'active' : ''
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
    </>
  )
}
