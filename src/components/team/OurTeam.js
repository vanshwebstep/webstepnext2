import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from 'next/image';
import { assetImage } from "@/lib/assets";
const dummyuser = assetImage("dummyuser.jpg");

const OurTeam = () => {
    // Array of team members
    const teamMembers = [
        {
            name: "John Doe",
            imageSrc: dummyuser,
            skills: "PHP Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {  
            name: "Jane Smith", 
            imageSrc: dummyuser,
            skills: "JavaScript Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        },
        {
            name: "Alex Johnson",
            imageSrc: dummyuser,
            skills: "Python Development",
            socialMedia: {
                facebook: "#",
                linkedin: "#",
                instagram: "#"
            }
        }
    ];

    return (
        <>
            <section className="team">
                <div className="col-full">
                    <div className="Latest">
                        <h1>Our Team</h1>
                        <h2>It&apos;s time to create the Perfect Team</h2>
                    </div>
                    <div className="grid-container">
                        {teamMembers.map((member, index) => (
                            <div className=" grid-item" key={index}>
                                <div className="beforebox">
                                    <div className="topimage">
                                        <Image src={member.imageSrc} alt={member.name} />
                                    </div>
                                    <div className="skills">
                                        <div className="Platform">
                                            <h6>{member.name}</h6>
                                            <span>{member.skills}</span>
                                            <ul>
                                                <li><a href={member.socialMedia.facebook}><FaFacebook /></a></li>
                                                <li><a href={member.socialMedia.linkedin}><FaLinkedinIn /></a></li>
                                                <li><a href={member.socialMedia.instagram}><FaInstagram /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="overlay-box">
                                    <div className="text-center">
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas nulla iure velit expedita nobis rerum, eveniet modi repellendus facere. Mollitia.</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurTeam;



