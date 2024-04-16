import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header & footer/Header'

export default function NewArticle () {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [body, setBody] = useState('')
  const [tag, setTag] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const addArticle = async () => {
    try {
      const apiUrl = `https://api.realworld.io/api/articles`
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      console.log(headers)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: [tag]
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        navigate('/')

        console.log('Article updated successfully:', data.article)
        navigate(`/article/${data.article.slug}`)
      } else {
        console.log("failed")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Header />
      <div className='container text-center w-50 mt-3'>
        <input
          className='form-control form-control-lg'
          placeholder='Article Title'
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className='form-control my-3'
          placeholder="What's this article about?"
          onChange={e => setDescription(e.target.value)}
        />
        <textarea
          className='form-control'
          placeholder='Write your article (in markdown)'
          style={{ height: '20vh' }}
          onChange={e => setBody(e.target.value)}
        />
        <input
          className='form-control my-3'
          placeholder='Enter tags'
          onChange={e => setTag(e.target.value)}
        />
        <div className=' d-flex justify-content-end'>
          <button className='btn btn-success py-2 px-3' onClick={addArticle}>
            Publish Article
          </button>
        </div>
      </div>
    </>
  )
}
