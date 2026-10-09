import React from 'react'
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube,FaLinkedinIn,FaTwitter } from 'react-icons/fa'
const BlogSidebar = () => {
    return (
        <>
            <div className="blog-sidebar">
                <div className="box-shadow">
                    <h6>follow us </h6>
                    <div className="follow-us-box ">
                        <ul className='devider'>
                            {/* <li className='bg-blue'><FaFacebook />facebook</li> */}
                            {/* <li className='bg-gradient'><FaInstagram />instagram</li> */}
                            {/* <li className='bg-red'><FaYoutube />youtube</li> */}
                            {/* <li className='bg-green'><FaWhatsapp />whatsapp</li> */}
                            <li className='bg-blue'><FaLinkedinIn />linkedin</li>
                            <li className='bg-blue'><FaTwitter />twitter</li>
                        </ul>
                    </div>
                </div>
                <div className="box-shadow">
                    <h6>Popular Posts</h6>
                    <div className="follow-us-box">
                        <ul>
                            <li><Image src={sidebarimg} alt="" />Google Correlate: The Best SEO Research Tool You Aren’t Using</li>
                            <li><Image src={sidebarimg} alt="" />Google Correlate: The Best SEO Research Tool You Aren’t Using</li>
                            <li><Image src={sidebarimg} alt="" />Google Correlate: The Best SEO Research Tool You Aren’t Using</li>
                        </ul>
                    </div>
                </div>
                <div className="box-shadow">
                    <h6>Comments</h6>
                    <div className="follow-us-box">
                        <div className="comment-box">
                            <div className="img-box"><Image src="" alt="" /></div>
                            <div className="content-box"><span>Anonymous</span>
                                <p>The generated Lorem Ipsum is therefore always free..</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box-shadow">
                    <h6>Categories</h6>
                    <div className="follow-us-box">
                        <div className="comment-box">
                            <ul>
                                <li>Editor&apos;s Picks<span>(20)</span></li>
                                <li>Editor&apos;s Picks<span>(10)</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogSidebar



import { assetImage } from "@/lib/assets";
const sidebarimg = assetImage("list.png");
