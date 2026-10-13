"use client";
// Updated CustomizePackage.jsx
// Now loads itemsData dynamically from PHP backend via fetchCustomOptions()
// Falls back to hardcoded data if API is unavailable

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  FaLaptopCode, FaShoppingCart, FaBriefcase, FaPaintBrush,
  FaSearch, FaPenNib, FaCreditCard, FaShareAlt,
  FaCheckCircle, FaTrash, FaGripVertical, FaPlus, FaMinus, FaUser, FaPhoneAlt, FaPaperPlane
} from 'react-icons/fa';
import { LuClock } from 'react-icons/lu';
import { motion, AnimatePresence } from "framer-motion";
import { fetchCustomOptions, submitLead, submitPlanInquiry } from '@/lib/contentApi';
import { THANK_YOU_ROUTE } from '@/lib/routes';

// ─── Icon map (add more here if you add icons in admin) ───────────────────────
const ICON_MAP = {
  FaShoppingCart: <FaShoppingCart />,
  FaBriefcase:    <FaBriefcase />,
  FaLaptopCode:   <FaLaptopCode />,
  FaPaintBrush:   <FaPaintBrush />,
  FaSearch:       <FaSearch />,
  FaPenNib:       <FaPenNib />,
  FaCreditCard:   <FaCreditCard />,
  FaShareAlt:     <FaShareAlt />,
};

// ─── Fallback static data (used if API is down) ───────────────────────────────
const FALLBACK_ITEMS = {
  websiteType: [
    { id: 'ecommerce', title: 'E-Commerce',   iconName: 'FaShoppingCart', price: 500 },
    { id: 'corporate', title: 'Corporate',    iconName: 'FaBriefcase',    price: 300 },
    { id: 'portfolio', title: 'Portfolio',    iconName: 'FaLaptopCode',   price: 200 },
    { id: 'landing',   title: 'Landing Page', iconName: 'FaPaintBrush',   price: 100 },
  ],
  pages: [
    { id: '1-5',   title: '1 - 5 Pages',   price: 0   },
    { id: '5-10',  title: '5 - 10 Pages',  price: 100 },
    { id: '10-20', title: '10 - 20 Pages', price: 250 },
    { id: '20+',   title: '20+ Pages',     price: 500 },
  ],
  design: [
    { id: 'template', title: 'Template Based', desc: 'Standard pre-made design',          price: 0   },
    { id: 'custom',   title: 'Custom Design',  desc: 'Tailored to your brand',            price: 300 },
    { id: 'premium',  title: 'Premium UI/UX',  desc: 'High-end interactions & animations', price: 600 },
  ],
  features: [
    { id: 'seo',     title: 'SEO Setup',                iconName: 'FaSearch',      price: 150 },
    { id: 'content', title: 'Content Writing',          iconName: 'FaPenNib',      price: 200 },
    { id: 'payment', title: 'Payment Gateway',          iconName: 'FaCreditCard',  price: 100 },
    { id: 'social',  title: 'Social Media Integrations',iconName: 'FaShareAlt',   price: 50  },
  ],
};

// Attach React icon elements to item objects
function hydrateIcons(items) {
  return Object.fromEntries(
    Object.entries(items).map(([cat, arr]) => [
      cat,
      arr.map(item => ({
        ...item,
        icon: item.iconName ? ICON_MAP[item.iconName] || null : null,
      })),
    ])
  );
}

export default function CustomizePackage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itemsData, setItemsData] = useState(hydrateIcons(FALLBACK_ITEMS));
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [selections, setSelections] = useState({
    websiteType: null, pages: null, design: null, features: []
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', message: '' });
  const [planContactInfo, setPlanContactInfo] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [planSubmitStatus, setPlanSubmitStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [planSubmitting, setPlanSubmitting] = useState(false);

  // ─── Load options from PHP API ─────────────────────────────────────────────
  useEffect(() => {
    fetchCustomOptions().then(data => {
      if (data) setItemsData(hydrateIcons(data));
    }).finally(() => setLoadingOptions(false));
  }, []);

  useEffect(() => {
    const planName = searchParams.get('plan');
    if (!planName || typeof window === 'undefined') {
      setSelectedPlan(null);
      return;
    }

    try {
      const storedPlan = JSON.parse(window.sessionStorage.getItem('selectedPackageInquiry') || 'null');
      setSelectedPlan(storedPlan?.title === planName ? storedPlan : { title: planName });
    } catch (error) {
      setSelectedPlan({ title: planName });
    }
  }, [searchParams]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };
  const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
  const itemAnim = { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 } };
  const itemHover = { whileHover: { scale: 1.04, y: -4 } };

  const calculateTotal = () => {
    let total = 0;
    if (selections.websiteType) total += selections.websiteType.price;
    if (selections.pages)       total += selections.pages.price;
    if (selections.design)      total += selections.design.price;
    selections.features.forEach(f => total += f.price);
    return total;
  };

const planPrice = selectedPlan?.price != null
    ? `${selectedPlan.symbol === '$' || !selectedPlan.symbol ? 'USD ' : selectedPlan.symbol}${selectedPlan.price}`
    : '';

  const handlePlanInquirySubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setPlanSubmitting(true);
    setPlanSubmitStatus({ type: '', message: '' });

    const selectedFeatures = Array.isArray(selectedPlan.features) && selectedPlan.features.length
      ? `\nFeatures: ${selectedPlan.features.join(', ')}`
      : '';
    const planSummary = [
      `Selected plan: ${selectedPlan.title}`,
      selectedPlan.category ? `Category: ${selectedPlan.category}` : '',
      planPrice ? `Price: ${planPrice}` : '',
      selectedPlan.description ? `Description: ${selectedPlan.description}` : '',
    ].filter(Boolean).join('\n');

    try {
      await submitPlanInquiry({
        package_id: selectedPlan.id || selectedPlan.package_id || 0,
        package_title: selectedPlan.title || '',
        name: planContactInfo.name,
        email: planContactInfo.email,
        phone: planContactInfo.phone,
        message: `${planSummary}${selectedFeatures}${planContactInfo.message ? `\n\nNotes: ${planContactInfo.message}` : ''}`,
      });

      setPlanContactInfo({ name: '', email: '', phone: '', message: '' });
      if (typeof window !== 'undefined') window.sessionStorage.removeItem('selectedPackageInquiry');
      router.push(THANK_YOU_ROUTE);
    } catch (error) {
      setPlanSubmitStatus({ type: 'error', message: error.message });
    } finally {
      setPlanSubmitting(false);
    }
  };

  const handleMobileTap = (item, category) => {
    if (category === 'features') {
      setSelections(prev => {
        const exists = prev.features.some(f => f.id === item.id);
        return { ...prev, features: exists ? prev.features.filter(f => f.id !== item.id) : [...prev.features, item] };
      });
    } else {
      setSelections(prev => ({ ...prev, [category]: prev[category]?.id === item.id ? null : item }));
    }
  };

  const isSelected = (item, category) => {
    if (category === 'features') return selections.features.some(f => f.id === item.id);
    return selections[category]?.id === item.id;
  };

  const handleDragStart = (e, item, category) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ itemId: item.id, category }));
    e.dataTransfer.effectAllowed = 'copyMove';
    setTimeout(() => { e.target.style.opacity = '0.5'; }, 0);
  };
  const handleDragEnd   = (e) => { e.target.style.opacity = '1'; setIsDraggingOver(false); };
  const handleDragOver  = (e) => { e.preventDefault(); setIsDraggingOver(true); e.dataTransfer.dropEffect = 'copy'; };
  const handleDragLeave = () => setIsDraggingOver(false);
  const handleDrop = (e) => {
    e.preventDefault(); setIsDraggingOver(false);
    try {
      const { itemId, category } = JSON.parse(e.dataTransfer.getData('application/json'));
      const fullItem = itemsData[category]?.find(i => i.id === itemId);
      if (!fullItem) return;
      setSelections(prev => {
        if (category === 'features') {
          if (!prev.features.some(f => f.id === fullItem.id)) return { ...prev, features: [...prev.features, fullItem] };
          return prev;
        }
        return { ...prev, [category]: fullItem };
      });
    } catch (err) { console.error("Drop failed", err); }
  };

  const removeSelection = (category, itemId = null) => {
    setSelections(prev => {
      if (category === 'features') return { ...prev, features: prev.features.filter(f => f.id !== itemId) };
      return { ...prev, [category]: null };
    });
  };

  const handleSubmit = () => {
    if (!selections.websiteType || !selections.pages || !selections.design) {
      alert("Please select at least a Website Type, Pages count, and Design type.");
      return;
    }
    setShowForm(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      await submitLead({
        source: 'custom-package',
        ...contactInfo,
        package: {
          total:       calculateTotal(),
          websiteType: selections.websiteType,
          pages:       selections.pages,
          design:      selections.design,
          features:    selections.features,
        },
        message: contactInfo.message || `Custom package request. Estimated total: $${calculateTotal()}`,
      });

      setContactInfo({ name: '', email: '', phone: '', message: '' });
      setSelections({ websiteType: null, pages: null, design: null, features: [] });
      setShowForm(false);
      router.push(THANK_YOU_ROUTE);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── Reusable Item Card ────────────────────────────────────────────────────
  const ItemCard = ({ item, category, gripClass }) => {
    const selected = isSelected(item, category);
    return (
      <motion.div
        key={item.id}
        draggable={!isMobile}
        onDragStart={!isMobile ? (e) => handleDragStart(e, item, category) : undefined}
        onDragEnd={!isMobile ? handleDragEnd : undefined}
        onClick={isMobile ? () => handleMobileTap(item, category) : undefined}
        {...(!isMobile ? itemHover : {})}
        whileTap={isMobile ? { scale: 0.97 } : {}}
        className={`group relative bg-white/80 backdrop-blur-md p-4 rounded-xl border transition-all duration-300 overflow-hidden
          ${isMobile ? 'cursor-pointer select-none' : 'cursor-grab active:cursor-grabbing'}
          ${selected ? 'border-pink-400 shadow-lg ring-2 ring-pink-300' : 'border-slate-200 shadow-md hover:shadow-xl'}`}
      >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ${selected ? 'opacity-100' : ''} bg-gradient-to-r from-pink-500/10 via-orange-400/10 to-purple-500/10`} />
        {isMobile && selected && <span className="absolute top-2 right-2 text-pink-500 text-xs"><FaCheckCircle /></span>}
        <div className="relative flex items-center gap-3">
          {isMobile ? (
            <div className={`text-sm ${selected ? 'text-pink-500' : 'text-slate-400'} transition`}>
              {selected ? <FaMinus /> : <FaPlus />}
            </div>
          ) : (
            <div className={`${gripClass} transition`}><FaGripVertical /></div>
          )}
          {item.icon && (
            <div className={`text-xl ${selected ? 'text-pink-600 scale-110' : 'text-pink-600 group-hover:scale-110'} transition`}>
              {item.icon}
            </div>
          )}
          <div>
            <h3 className="font-medium text-sm text-slate-800">{item.title}</h3>
            {item.desc && <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>}
            {item.price > 0 && <p className="text-xs font-semibold text-pink-600 mt-0.5">+${item.price}</p>}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="pt-28 sm:pt-36 pb-12 sm:pb-24 text-slate-900 min-h-screen px-3 sm:px-8 bg-slate-50">
      <div className="container mx-auto">
        {selectedPlan ? (
          <div className="max-w-5xl mx-auto">
            <div className="text-center my-6 sm:my-12">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[0.95] tracking-[-0.03em] text-slate-900"
              >
                Plan Inquiry
                <br />
                <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {selectedPlan.title}
                </span>
              </motion.h2>
              <p className="text-slate-500 text-sm sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto">
                Share your contact details and we will get back to you about this plan.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-8">
              <motion.div
                variants={fadeIn}
                initial="initial"
                animate="animate"
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between bg-white backdrop-blur-xl transition-all duration-300 ${
                  selectedPlan.isPopular
                    ? "border-2 border-[#ff0066] shadow-[0_12px_35px_rgba(255,0,102,0.18)]"
                    : "border border-slate-200/90 shadow-xl"
                }`}
              >
                {/* Most Popular Badge */}
                {selectedPlan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff0066] text-white text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                    {selectedPlan.popularBadge || "MOST POPULAR"}
                  </div>
                )}

                <div>
                  {/* Top Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <FaUser className="text-xl text-pink-500" />
                  </div>

                  {/* Title & Tagline/Category */}
                  <div className="text-center mb-5">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-pink-600 bg-pink-50 px-3 py-1 rounded-full inline-block mb-2">
                      {selectedPlan.category || 'SELECTED PACKAGE'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide uppercase mt-1">
                      {selectedPlan.title}
                    </h3>
                    {(selectedPlan.des || selectedPlan.tagline || selectedPlan.description) && (
                      <p className="text-pink-600 text-xs sm:text-sm font-semibold mt-1.5 max-w-xs mx-auto leading-snug">
                        {selectedPlan.des || selectedPlan.tagline || selectedPlan.description}
                      </p>
                    )}
                  </div>

                  {/* Price Section */}
                  <div className="text-center border-y border-slate-100 py-4 mb-5 bg-slate-50/60 rounded-2xl">
                    <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                      Plan Price
                    </span>
                    {selectedPlan.pricedes ? (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                          {selectedPlan.symbol ? `${selectedPlan.symbol}${selectedPlan.price}` : (planPrice || selectedPlan.price)}
                        </span>
                        <span className="text-slate-400 font-medium text-xs sm:text-sm">
                          {selectedPlan.pricedes}
                        </span>
                      </div>
                    ) : (
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight block">
                        {planPrice || selectedPlan.price || '$0'}
                      </span>
                    )}
                  </div>

                  {/* Hours / Plan pill box */}
                  <div
                    className={`rounded-2xl p-3 text-center mb-6 border ${
                      selectedPlan.hoursType === "pink"
                        ? "bg-[#fff0f5] border-pink-100 text-pink-950"
                        : selectedPlan.hoursType === "green"
                        ? "bg-[#ecfdf5] border-emerald-100 text-emerald-950"
                        : "bg-[#edf2fe] border-blue-100 text-blue-950"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm ${
                        selectedPlan.hoursType === "pink"
                          ? "text-pink-900"
                          : selectedPlan.hoursType === "green"
                          ? "text-emerald-900"
                          : "text-blue-900"
                      }`}
                    >
                      <LuClock
                        className={
                          selectedPlan.hoursType === "pink"
                            ? "text-pink-500"
                            : selectedPlan.hoursType === "green"
                            ? "text-emerald-600"
                            : "text-blue-600"
                        }
                      />
                      <span>{selectedPlan.hoursText || `${selectedPlan.title || 'Selected'} Plan`}</span>
                    </div>
                    {selectedPlan.hoursSubtext && (
                      <div
                        className={`text-[10px] sm:text-[11px] font-medium mt-0.5 ${
                          selectedPlan.hoursType === "pink"
                            ? "text-pink-600/80"
                            : selectedPlan.hoursType === "green"
                            ? "text-emerald-600/80"
                            : "text-slate-500"
                        }`}
                      >
                        {selectedPlan.hoursSubtext}
                      </div>
                    )}
                  </div>

                  {/* Features list */}
                  {(() => {
                    const featuresList = Array.isArray(selectedPlan.events) && selectedPlan.events.length > 0
                      ? selectedPlan.events
                      : (Array.isArray(selectedPlan.features) ? selectedPlan.features : []);

                    if (featuresList.length === 0) return null;

                    return (
                      <div className="space-y-3">
                        <ul className="space-y-2.5">
                          {featuresList.map((feature, idx) => {
                            const rawText = typeof feature === 'object' && feature !== null ? (feature.title || feature.name || JSON.stringify(feature)) : String(feature);
                            const featText = rawText.replace(/^OK\s*[:-]?\s*/i, '');
                            return (
                              <li key={`plan-feat-${idx}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                <FaCheckCircle className="text-pink-500 mt-0.5 shrink-0 text-sm" />
                                <span>{featText}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              </motion.div>

              <motion.div variants={fadeIn} initial="initial" animate="animate" className="relative p-[1px] rounded-3xl bg-gradient-to-br from-[#E879F9] to-[#38BDF8]">
                <div className="bg-white/85 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/40">
                  <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-4 sm:pb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Your Details</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Name and email are required.</p>
                  </div>
                  <form onSubmit={handlePlanInquirySubmit} className="space-y-4 sm:space-y-5">
                    {["name", "email", "phone"].map(field => (
                      <div key={field}>
                        <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1 capitalize">{field}</label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          required={field !== "phone"}
                          value={planContactInfo[field]}
                          onChange={e => setPlanContactInfo({ ...planContactInfo, [field]: e.target.value })}
                          className="w-full bg-white/70 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1">Project Notes</label>
                      <textarea
                        rows="4"
                        placeholder="Tell us anything important about your project..."
                        value={planContactInfo.message}
                        onChange={e => setPlanContactInfo({ ...planContactInfo, message: e.target.value })}
                        className="w-full bg-white/70 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition"
                      />
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={planSubmitting}
                      className="mt-4 group relative flex items-center justify-center gap-2 sm:gap-3 w-full px-6 sm:px-10 py-3.5 sm:py-5 bg-gradient-to-r from-[#FF1F8E] to-[#FF0055] rounded-full text-white text-xs sm:text-sm font-bold tracking-[0.16em] uppercase overflow-hidden shadow-[0_15px_35px_rgba(255,31,142,0.3)] hover:shadow-[0_20px_40px_rgba(255,31,142,0.4)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                      {planSubmitting ? 'Submitting...' : 'Submit Inquiry'} <FaCheckCircle className="inline ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity z-0" />
                    </motion.button>
                    {planSubmitStatus.message && (
                      <p className={`text-xs sm:text-sm font-semibold ${planSubmitStatus.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {planSubmitStatus.message}
                      </p>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
        <>
        <div className="text-center my-6 sm:my-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] sm:leading-[0.95] tracking-[-0.03em] text-slate-900"
          >
            Build Your
            <br />
            <span style={{ background: "linear-gradient(135deg, #E879F9 0%, #A855F7 40%, #38BDF8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Custom Package
            </span>
          </motion.h2>
          <p className="text-slate-500 text-sm sm:text-lg md:text-xl mt-4 sm:mt-6 max-w-2xl mx-auto">
            {isMobile ? "Tap the options below to add them to your package." : "Drag and drop the features you need into your package box to get an instant estimate."}
          </p>
          {loadingOptions && <p className="text-slate-400 text-xs sm:text-sm mt-3">Loading options...</p>}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
          <div className="lg:w-1/2 space-y-6 sm:space-y-10">

            {/* Website Type */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="relative p-[1px] rounded-2xl">
              <div className="bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/40 shadow-xl">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3 text-slate-900 tracking-tight">
                  <span className="bg-gradient-to-br from-pink-600 to-orange-500 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm shadow-lg">1</span>
                  Website Type
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {itemsData.websiteType.map(item => <ItemCard key={item.id} item={item} category="websiteType" gripClass="text-slate-400 group-hover:text-pink-500" />)}
                </div>
              </div>
            </motion.div>

            {/* Pages */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="relative p-[1px] rounded-2xl">
              <div className="bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/40 shadow-xl">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3 text-slate-900 tracking-tight">
                  <span className="bg-gradient-to-br from-blue-600 to-indigo-500 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm shadow-lg">2</span>
                  Number of Pages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {itemsData.pages.map(item => <ItemCard key={item.id} item={item} category="pages" gripClass="text-slate-400 group-hover:text-blue-500" />)}
                </div>
              </div>
            </motion.div>

            {/* Design */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="relative p-[1px] rounded-2xl">
              <div className="bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/40 shadow-xl">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3 text-slate-900 tracking-tight">
                  <span className="bg-gradient-to-br from-purple-600 to-pink-500 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm shadow-lg">3</span>
                  Design Quality
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {itemsData.design.map(item => <ItemCard key={item.id} item={item} category="design" gripClass="text-slate-400 group-hover:text-purple-500" />)}
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div variants={cardVariants} initial="initial" animate="animate" className="relative p-[1px] rounded-2xl">
              <div className="bg-white/70 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-white/40 shadow-xl">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 flex items-center gap-2.5 sm:gap-3 text-slate-900 tracking-tight">
                  <span className="bg-gradient-to-br from-green-600 to-teal-500 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm shadow-lg">4</span>
                  Additional Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {itemsData.features.map(item => <ItemCard key={item.id} item={item} category="features" gripClass="text-slate-400 group-hover:text-green-500" />)}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Package summary */}
          <div className="lg:w-1/2">
            <div className="sticky top-28">
              {!showForm ? (
                <motion.div
                  variants={fadeIn} initial="initial" animate="animate"
                  onDrop={!isMobile ? handleDrop : undefined}
                  onDragOver={!isMobile ? handleDragOver : undefined}
                  onDragLeave={!isMobile ? handleDragLeave : undefined}
                  className={`relative p-[1px] rounded-3xl transition-all duration-300 ${isDraggingOver ? "bg-gradient-to-r from-[#E879F9] to-[#38BDF8] scale-[1.02]" : "bg-gradient-to-br from-slate-200 to-slate-300"}`}
                >
                  <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/40 min-h-[500px] sm:min-h-[600px] flex flex-col">
                    <div className="flex justify-between items-end mb-6 sm:mb-8 border-b border-slate-100 pb-4 sm:pb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Your Package</h2>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">{isMobile ? "Tap items on the left to build" : "Drag & build your custom setup"}</p>
                      </div>
                      <div className="text-right">
                        <span className="block text-slate-600 text-[10px] sm:text-xs uppercase tracking-wider mb-1">Estimated Total</span>
                        <motion.span key={calculateTotal()} initial={{ scale: 0.9 }} animate={{ scale: 1 }}
                          className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                          ${calculateTotal()}
                        </motion.span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4 sm:space-y-5">
                      {[
                        { key: "websiteType", label: "Website Type",  render: (val) => <div className="flex items-center gap-2.5 sm:gap-3"><span className="text-pink-600">{val.icon}</span><span>{val.title}</span></div> },
                        { key: "pages",       label: "Pages",         render: (val) => <span>{val.title}</span> },
                        { key: "design",      label: "Design Level",  render: (val) => <span>{val.title}</span> },
                      ].map((block) => (
                        <div key={block.key} className="bg-white/60 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-slate-200">
                          <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-1.5 sm:mb-2 uppercase">{block.label}</div>
                          <AnimatePresence mode="wait">
                            {selections[block.key] ? (
                              <motion.div key="filled" variants={itemAnim} initial="initial" animate="animate" exit="exit"
                                className="flex justify-between items-center bg-white p-2.5 sm:p-3 rounded-lg border border-pink-200 shadow-sm hover:shadow-md transition">
                                <div className="font-medium text-xs sm:text-sm text-slate-800">{block.render(selections[block.key])}</div>
                                <button onClick={() => removeSelection(block.key)} className="text-slate-400 hover:text-red-500 transition text-xs sm:text-sm"><FaTrash /></button>
                              </motion.div>
                            ) : (
                              <motion.div key="empty" variants={itemAnim} initial="initial" animate="animate" exit="exit"
                                className="text-slate-400 text-xs sm:text-sm italic py-2.5 sm:py-3 flex items-center justify-center border-2 border-dashed border-slate-300 rounded-lg bg-white">
                                {isMobile ? `Tap to select ${block.label}` : `Drag ${block.label} here`}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}

                      <div className="bg-white/60 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-slate-200 flex-1">
                        <div className="text-[10px] font-bold tracking-widest text-slate-400 mb-1.5 sm:mb-2 uppercase">Extra Features</div>
                        <AnimatePresence>
                          {selections.features.length > 0 ? (
                            <motion.div className="space-y-2">
                              {selections.features.map(f => (
                                <motion.div key={f.id} variants={itemAnim} initial="initial" animate="animate" exit="exit"
                                  className="flex justify-between items-center bg-white p-2.5 sm:p-3 rounded-lg border border-pink-200 shadow-sm hover:shadow-md transition">
                                  <div className="flex items-center gap-2.5 sm:gap-3">
                                    <span className="text-pink-600">{f.icon}</span>
                                    <span className="text-xs sm:text-sm font-medium text-slate-800">{f.title}</span>
                                  </div>
                                  <button onClick={() => removeSelection("features", f.id)} className="text-slate-400 hover:text-red-500 transition text-xs sm:text-sm"><FaTrash /></button>
                                </motion.div>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div variants={itemAnim} initial="initial" animate="animate"
                              className="text-slate-400 text-xs sm:text-sm italic py-4 sm:py-6 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg bg-white">
                              <span>{isMobile ? "Tap Features to add" : "Drag Features here"}</span>
                              <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">(Optional)</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                      className="mt-6 sm:mt-8 group relative flex items-center justify-center gap-2 sm:gap-3 w-full px-6 sm:px-10 py-3.5 sm:py-5 bg-gradient-to-r from-[#FF1F8E] to-[#FF0055] rounded-full text-white text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase overflow-hidden shadow-[0_15px_35px_rgba(255,31,142,0.3)] hover:shadow-[0_20px_40px_rgba(255,31,142,0.4)] hover:-translate-y-1 transition-all duration-300">
                      Complete My Package <FaCheckCircle className="inline ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity z-0" />
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div variants={fadeIn} initial="initial" animate="animate"
                  className="relative p-[1px] rounded-3xl bg-gradient-to-br from-[#E879F9] to-[#38BDF8]">
                  <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/40 min-h-[500px] sm:min-h-[600px] flex flex-col">
                    <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-4 sm:pb-6 flex justify-between">
                      <div><h2 className="text-xl sm:text-2xl font-semibold text-slate-900">Finalize Request</h2><p className="text-xs sm:text-sm text-slate-500 mt-1">Enter your details</p></div>
                      <button onClick={() => setShowForm(false)} className="text-xs sm:text-sm text-pink-600 hover:text-pink-500">← Edit</button>
                    </div>
                    <form onSubmit={handleFinalSubmit} className="space-y-4 sm:space-y-5 flex-1">
                      {["name", "email", "phone"].map(field => (
                        <div key={field}>
                          <label className="block text-xs sm:text-sm font-medium text-slate-600 mb-1 capitalize">{field}</label>
                          <input type={field === "email" ? "email" : "text"} required={field !== "phone"}
                            value={contactInfo[field]} onChange={e => setContactInfo({ ...contactInfo, [field]: e.target.value })}
                            className="w-full bg-white/70 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition" />
                        </div>
                      ))}
                      <textarea rows="4" placeholder="Additional notes..." value={contactInfo.message}
                        onChange={e => setContactInfo({ ...contactInfo, message: e.target.value })}
                        className="w-full bg-white/70 border border-slate-200 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition" />
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={submitting}
                        className="mt-4 group relative flex items-center justify-center gap-2 sm:gap-3 w-full px-6 sm:px-10 py-3.5 sm:py-5 bg-gradient-to-r from-[#FF1F8E] to-[#FF0055] rounded-full text-white text-xs sm:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase overflow-hidden shadow-[0_15px_35px_rgba(255,31,142,0.3)] hover:shadow-[0_20px_40px_rgba(255,31,142,0.4)] hover:-translate-y-1 transition-all duration-300">
                        {submitting ? 'Submitting...' : 'Submit Request'} <FaCheckCircle className="inline ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity z-0" />
                      </motion.button>
                      {submitStatus.message && (
                        <p className={`text-xs sm:text-sm font-semibold ${submitStatus.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                          {submitStatus.message}
                        </p>
                      )}
                    </form>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </section>
  );
}
