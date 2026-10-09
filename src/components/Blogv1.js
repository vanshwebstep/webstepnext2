import React from 'react'
import { FaFacebook, FaHeart, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image';
import { assetImage } from "@/lib/assets";
const blog1 = assetImage("image 1.png");

const Blogv1 = () => {
    const blogData = [
        {
            id: 0,
            img: blog1,
            title: 'Have a glance over the features of our web development tools:',
            description: 'Web Step solutions is most popular web development and designing agency committed to deliver latest and advanced services to skyrocket your business.',
            view: 0,
            like: 0,
            comments: 0,
        },
        {
            id: 1,
            img: blog1,
            title: 'Have a glance over the features of our web development tools:',
            description: 'Web Step solutions is most popular web development and designing agency committed to deliver latest and advanced services to skyrocket your business.',
            view: 0,
            like: 2,
            comments: 0,
        },
        {
            id: 2,
            img: blog1,
            title: 'Have a glance over the features of our web development tools:',
            description: 'Web Step solutions is most popular web development and designing agency committed to deliver latest and advanced services to skyrocket your business.',
            view: 4,
            like: 3,
            comments: 4,
        }
    ]
    return (
        <>
            <section className="blogv1">
                <div className="col-full">
                    <div className="beforeline"><h4 className="lining">our blogs</h4></div>

                    <div className="grid-container">
                        {blogData.map((curElm) => {
                            return (
                                <React.Fragment key={curElm.id}>
                                    <div className="grid-item">
                                        <div className="blogv1-inner">
                                            <div className="left-img">
                                                <Image src={curElm.img} alt="" />
                                            </div>
                                            <div className="right-content">
                                                <h4>Have a glance over the features of our web development tools:</h4>
                                                <p>Web Step solutions is most popular web development and designing agency committed to deliver latest and advanced services to skyrocket your business.</p>
                                                <div className="views"><p><span>{curElm.view} view</span><span>{curElm.comments} view</span></p>
                                                    <p>{curElm.like} <FaHeart /> </p>
                                                </div>
                                                <div className="social-icons">
                                                    <ul>
                                                        {/* <li><FaFacebook /></li> */}
                                                        {/* <li><FaWhatsapp /></li> */}
                                                        {/* <li><FaYoutube /></li> */}
                                                        {/* <li><FaInstagram /></li> */}
                                                        <li><FaLinkedin /></li>
                                                        <li><FaTwitter /></li>
                                                    </ul></div>
                                                <button className="btn-bgblue"><Link href='/singal'>read more</Link></button>
                                            </div>

                                        </div>

                                    </div>
                                </React.Fragment>
                            )
                        })}

                    </div>
                    <div className="read-more">
                        <button className="btn-bgblue">view more posts</button></div>
                </div>
            </section>
        </>
    )
}

export default Blogv1



