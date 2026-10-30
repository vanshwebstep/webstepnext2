"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleDown } from 'react-icons/fa';
import {
    FiCode, FiSmartphone, FiTrendingUp, FiSearch,
    FiMail, FiPenTool, FiShoppingCart, FiMonitor,
    FiBriefcase, FiBookOpen, FiLayers,
    FiLayout, FiFilm, FiCpu, FiZap, FiMessageSquare, FiArrowRight
} from 'react-icons/fi';

// ─── Submenu Data ─────────────────────────────────────────────────────────────

const submenus = {
    services: {
        featured: {
            label: "New",
            text: "AI-Powered Websites",
            href: "/services/ai-powered-websites",
        },
        groups: [
            {
                heading: "Web & E-Commerce",
                items: [
                    { name: "Web Development",        href: "/services/web-development",  icon: FiCode,         desc: "Custom Next.js & React sites"  },
                    { name: "WordPress Development",  href: "/services/wordpress",        icon: FiLayers,       desc: "Custom themes & plugins"  },
                    { name: "Shopify Development",    href: "/services/shopify",          icon: FiShoppingCart, desc: "Liquid themes & private apps"  },
                    { name: "WooCommerce Development",href: "/services/woocommerce",      icon: FiShoppingCart, desc: "Custom online stores"  },
                    { name: "Laravel Development",    href: "/services/laravel",          icon: FiCode,         desc: "Custom PHP web apps"  },
                    { name: "Full Stack Development", href: "/fullstack",                 icon: FiCode,         desc: "Node.js, Vue & APIs"  },
                ],
            },
            {
                heading: "AI & Modern Solutions",
                items: [
                    { name: "AI Websites",            href: "/services/ai-powered-websites", icon: FiCpu,           desc: "Next.js & LLM web apps"  },
                    { name: "AI Automation",          href: "/services/ai-automation",       icon: FiZap,           desc: "Autonomous workflows"    },
                    { name: "AI Chatbots",            href: "/services/ai-chatbots",         icon: FiMessageSquare, desc: "24/7 Smart assistants"   },
                    { name: "Website Maintenance",    href: "/services/website-maintenance", icon: FiLayers,        desc: "Updates, speed & security" },
                ],
            },
            {
                heading: "Design & Apps",
                items: [
                    { name: "UI/UX Design",           href: "/services/ui-ux",            icon: FiLayout,       desc: "User-first interfaces"    },
                    { name: "App Development",        href: "/services/app-development",  icon: FiSmartphone,   desc: "iOS & Android apps"       },
                    { name: "SEO Services",           href: "/services/seo",              icon: FiSearch,       desc: "Rank higher, grow faster" },
                    { name: "Brand Design",           href: "/services/brand-design",     icon: FiPenTool,      desc: "Logos & brand identity"   },
                ],
            },
        ],
    },

    portfolio: {
        featured: { label: "Latest", text: "Work & Real Results" },
        groups: [
            {
                heading: "Our Work",
                items: [
                    { name: "Our Work",     href: "/works",      icon: FiLayers,       desc: "Full portfolio" },
                    { name: "Case Studies", href: "/case-study", icon: FiShoppingCart, desc: "Client success stories" },
                    { name: "For Agencies", href: "/b2b-sales",  icon: FiTrendingUp,   desc: "Development partner" },
                ],
            },
        ],
    },
};

// ─── Mega Menu Panel ───────────────────────────────────────────────────────────

const MegaPanel = ({ data, mobile, closeMenu, pathname }) => {
    const isItemActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

    return (
    <div className={mobile ? "mt-2" : ""}>
        {data.featured && (
            data.featured.href ? (
                <Link
                    href={data.featured.href}
                    onClick={closeMenu}
                    className={`group/featured flex items-center justify-between px-3 py-2.5 mb-4 rounded-xl border border-pink-100 bg-gradient-to-r from-pink-50/90 via-purple-50/50 to-sky-50/40 hover:from-pink-100 hover:via-purple-100/70 hover:to-sky-100/60 hover:border-[#FF1F8E]/40 hover:shadow-[0_4px_16px_rgba(255,31,142,0.12)] transition-all duration-200 cursor-pointer ${mobile ? "mx-1" : ""}`}
                >
                    <div className="flex items-center gap-2.5">
                        <span className="bg-[#FF1F8E] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-[0_2px_8px_rgba(255,31,142,0.35)] group-hover/featured:scale-105 transition-transform duration-200">
                            {data.featured.label}
                        </span>
                        <span className="text-[12px] font-bold text-slate-800 group-hover/featured:text-[#FF1F8E] transition-colors flex items-center gap-1.5">
                            {data.featured.text}
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF1F8E] animate-ping" />
                        </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-[#FF1F8E] group-hover/featured:translate-x-1 transition-transform duration-200">
                        <span className="hidden sm:inline">Explore</span>
                        <FiArrowRight size={13} />
                    </div>
                </Link>
            ) : (
                <div className={`flex items-center gap-2 mb-4 ${mobile ? "px-1" : ""}`}>
                    <span className="bg-[#FF1F8E] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">
                        {data.featured.label}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">{data.featured.text}</span>
                </div>
            )
        )}
        <div className={`flex ${mobile ? "flex-col gap-4" : "gap-8"}`}>
            {data.groups.map((group, gi) => (
                <div key={gi} className={mobile ? "" : "min-w-[180px]"}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-3 px-1">
                        {group.heading}
                    </p>
                    <ul className="flex flex-col gap-1">
                        {group.items.map((item, ii) => {
                            const itemActive = isItemActive(item.href);

                            return (
                            <li key={ii}>
                                <Link
                                    href={item.href}
                                    onClick={closeMenu}
                                    aria-current={itemActive ? "page" : undefined}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl group/item transition-all duration-200 ${
                                        itemActive
                                            ? "bg-[#FF1F8E]/10 text-[#FF1F8E]"
                                            : "hover:bg-slate-50"
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center group-hover/item:bg-[#FF1F8E]/10 group-hover/item:text-[#FF1F8E] transition-all duration-200 shrink-0 ${
                                        itemActive ? "bg-[#FF1F8E] text-white" : "bg-slate-100 text-slate-500"
                                    }`}>
                                        <item.icon size={14} />
                                    </div>
                                    <div className="flex flex-col leading-tight">
                                        <span className={`text-[12px] font-semibold group-hover/item:text-[#FF1F8E] transition-colors ${
                                            itemActive ? "text-[#FF1F8E]" : "text-slate-800"
                                        }`}>
                                            {item.name}
                                        </span>
                                        {!mobile && item.desc && (
                                            <span className="text-[10px] text-slate-400">{item.desc}</span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    </div>
    );
};

// ─── Main Menu ─────────────────────────────────────────────────────────────────

const Menu = ({ mobile = false, closeMenu, scrolled = false }) => {
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const timeoutRef = React.useRef(null);
    const pathname = usePathname();

    const handleMouseEnter = (key) => {
        if (mobile) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveSubmenu(key);
    };

    const handleMouseLeave = () => {
        if (mobile) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setActiveSubmenu(null);
        }, 150);
    };

    const navLinks = [
        { name: "Home",      href: "/"          },
        {
            name: "Services",
            href: "/services",
            submenuKey: "services",
            activePaths: [
                "/services", "/php", "/fullstack", "/laravel", "/uiux",
                "/wordpress", "/mobileApp", "/nodejs", "/softwaretesting",
                "/seo", "/marketing", "/shopify", "/woocommerce",
                "/ai-powered-websites", "/ai-automation", "/ai-chatbots",
                "/website-maintenance", "/ecommerce",
            ],
        },
        { name: "Hire Developers", href: "/hire-dedicated-developers" },
        {
            name: "Portfolio",
            href: "/works",
            submenuKey: "portfolio",
            activePaths: ["/works", "/case-study", "/projects", "/b2b-sales"],
        },
        { name: "About",     href: "/about"     },
        { name: "Blog",      href: "/blog"      },
        { name: "Packages",  href: "/packages"  },
        { name: "Contact",   href: "/contactus" },
    ];

    const isLinkActive = (link) => {
        if (link.href === "/") return pathname === "/";

        const paths = link.activePaths || [link.href];
        return paths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
    };

    const getLinkClasses = (active) => mobile
        ? `flex items-center justify-between w-full py-4 font-semibold text-[14px] tracking-wide uppercase border-b border-slate-100 transition-all ${
            active ? "text-[#FF1F8E]" : "text-slate-700 hover:text-[#FF1F8E]"
        }`
        : `relative px-2 lg:px-3 xl:px-4 py-2 font-semibold text-[10px] lg:text-[11px] xl:text-[12px] tracking-[0.08em] lg:tracking-[0.12em] xl:tracking-[0.18em] uppercase transition-all duration-300 ${
            active ? "text-[#FF1F8E]" : `${scrolled ? "text-slate-900" : "text-slate-600"} hover:text-[#FF1F8E]`
        }`;

    return (
        <nav className={`w-full ${mobile ? "block" : "flex items-center justify-center font-roboto"}`}>
            <ul className={`${mobile ? "flex flex-col" : "flex items-center gap-0.5 lg:gap-1 xl:gap-2 whitespace-nowrap"}`}>
                {navLinks.map((link, idx) => {
                    const active = isLinkActive(link);

                    return (
                    <li key={idx} className={mobile ? "w-full" : "relative group/menu py-1"}>

                        {link.submenuKey ? (
                            mobile ? (
                                <div className="relative w-full">
                                    <button
                                        onClick={() => setActiveSubmenu(activeSubmenu === link.submenuKey ? null : link.submenuKey)}
                                        aria-current={active ? "page" : undefined}
                                        className={`${getLinkClasses(active)} flex items-center justify-between w-full`}
                                    >
                                        <span>{link.name}</span>
                                        <FaAngleDown
                                            className={`text-[10px] shrink-0 transition-transform duration-300 ${activeSubmenu === link.submenuKey ? "rotate-180 text-[#FF1F8E]" : "opacity-50"}`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {activeSubmenu === link.submenuKey && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="bg-slate-50 rounded-xl mt-1 p-4 overflow-hidden"
                                            >
                                                <MegaPanel
                                                    data={submenus[link.submenuKey]}
                                                    mobile={true}
                                                    pathname={pathname}
                                                    closeMenu={() => {
                                                        setActiveSubmenu(null);
                                                        if (closeMenu) closeMenu();
                                                    }}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        href={link.href === "#" ? (link.submenuKey === "portfolio" ? "/works" : "/services") : link.href}
                                        className={`${getLinkClasses(active)} flex items-center gap-1.5 whitespace-nowrap`}
                                    >
                                        {link.name}
                                        <FaAngleDown
                                            className={`text-[10px] shrink-0 transition-transform duration-300 group-hover/menu:rotate-180 ${active ? "text-[#FF1F8E]" : "opacity-50 group-hover/menu:opacity-100 group-hover/menu:text-[#FF1F8E]"}`}
                                        />
                                        <span className={`absolute left-0 bottom-0 h-[2px] bg-[#FF1F8E] transition-all duration-300 ${
                                            active ? "w-full" : "w-0 group-hover/menu:w-full"
                                        }`} />
                                    </Link>

                                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible pointer-events-none group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:pointer-events-auto transition-all duration-200 z-[100]">
                                        <div className={`bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 p-5 ${link.submenuKey === 'services' ? 'min-w-[380px] lg:min-w-[620px]' : 'min-w-[380px]'}`}>
                                            <MegaPanel
                                                data={submenus[link.submenuKey]}
                                                mobile={false}
                                                pathname={pathname}
                                                closeMenu={() => {}}
                                            />
                                        </div>
                                    </div>
                                </>
                            )

                        ) : (
                            <Link
                                href={link.href}
                                className={getLinkClasses(active)}
                                aria-current={active ? "page" : undefined}
                                onClick={mobile ? closeMenu : undefined}
                            >
                                {link.name}
                                {!mobile && (
                                    <span className={`absolute left-0 bottom-0 h-[2px] bg-[#FF1F8E] transition-all duration-300 ${
                                        active ? "w-full" : "w-0 group-hover:w-full"
                                    }`} />
                                )}
                            </Link>
                        )}

                    </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Menu;
