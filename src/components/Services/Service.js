import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Blogs from '../Blog/Blogs'
import Digital from './Digital'
import BlogReview from '../Blog/BlogReview'
import ServicesPage from '../ServicesPage'
const Service = () => {
  return (
    <>
    <Header/>
    <Blogs/>
    <ServicesPage/>
    <Digital/>
    {/* <BlogReview/> */}
    <Footer/>
    </>
  )
}

export default Service
