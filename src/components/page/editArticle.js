import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header & footer/Header'
import { useNavigate } from 'react-router-dom'

const EditArticle = () => {
  const { slug } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch article data based on the slug
  useEffect(() => {
    fetchArticleDetails()
  }, [slug, token])
  const fetchArticleDetails = async () => {
    try {
      const apiUrl = `https://api.realworld.io/api/articles/${slug}`
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
        setTitle(data.article.title);
        setDescription(data.article.description);
        setBody(data.article.body);
        setTag(data.article.tagList.join(', '));
      } else {
        console.error('Failed to fetch article details')
      }
    } catch (error) {
      console.error('Error fetching article details:', error)
    } finally {
      setLoading(false) // Set loading to false regardless of success or failure
    }
  }
  const handleEdit = async (oldSlug) => {
    try {
      const apiUrl = `https://api.realworld.io/api/articles/${oldSlug}`
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body
          }
        })
      })
  
      if (response.ok) {
        const data = await response.json()
        // If the update is successful, navigate to the updated article page
        console.log('Article updated successfully:', data.article)
        navigate(`/article/${data.article.slug}`) // Navigate to the updated article's page with the new slug
      } else {
        console.error('Failed to update article')
        // Handle error scenarios here
      }
    } catch (error) {
      console.error('Error updating article:', error)
      // Handle error scenarios here
    }
  }
  
  

  if (loading) {
    return <div>Loading...</div> // Render a loading indicator while fetching data
  }

  return (
    <>
      <Header />
      {article && (
        <div className='container text-center w-50 mt-3'>
          <input
            className='form-control form-control-lg'
            placeholder='Article Title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className='form-control my-3'
            placeholder="What's this article about?"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <textarea
            className='form-control'
            placeholder='Write your article (in markdown)'
            style={{ height: '20vh' }}
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <input
            className='form-control my-3'
            placeholder='Enter tags'
            value={tag}
            onChange={e => setTag(e.target.value)}
            readOnly={true}
          />
          <div className=' d-flex justify-content-end'>
            <button
              className='btn btn-success py-2 px-3'
              onClick={()=>handleEdit(slug)}
            >
              Publish Article
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default EditArticle
