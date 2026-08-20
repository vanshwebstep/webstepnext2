"use client";

import Link from "next/link";
import { useState } from "react";
import Packages from "./Packages";

const painPoints = [
  {
    icon: "01",
    title: "3-month hiring cycles",
    desc: "By the time a local developer starts, the project is late, the client is frustrated, and the next deal is already at risk.",
  },
  {
    icon: "$",
    title: "$8-15k/month per local dev",
    desc: "Salary, benefits, onboarding, and management overhead turn every local hire into a large annual commitment.",
  },
  {
    icon: "03",
    title: "Freelancer roulette",
    desc: "Inconsistent quality, weak accountability, and constant context switching pull your team away from shipping.",
  },
  {
    icon: "04",
    title: "Projects slipping",
    desc: "Every week without the right developer means delayed sprints, missed deadlines, and strained client relationships.",
  },
];

const steps = [
  {
    title: "30-min discovery call",
    desc: "Tell us your stack, team size, and what you are building. We match you with the right developer the same day.",
    tag: "Day 0",
  },
  {
    title: "Meet your developer",
    desc: "Review their profile, tech stack, past projects, and working style before anything begins.",
    tag: "Day 0-1",
  },
  {
    title: "Integrated in 24 hours",
    desc: "They join your Slack, Jira, GitHub, Trello, or existing workflow. No new process for your team to learn.",
    tag: "Day 1",
  },
  {
    title: "Shipping from day one",
    desc: "First standup, first tasks, and first commits start immediately after onboarding.",
    tag: "Day 2 onwards",
  },
];



const comparisonRows = [
  ["Time to first commit", "Days-weeks", "72 hours", "60-90 days"],
  ["Monthly cost", "Unpredictable", "From $1,500", "$8,000-15,000"],
  ["Works in your tools", "Rarely", "Always", "Yes"],
  ["Dedicated to your project", "No", "Yes", "Yes"],
  ["No long-term contract", "Yes", "Yes", "No"],
  ["Managed and accountable", "No", "Yes", "Yes"],
  ["Scales monthly", "No", "Yes", "No"],
];

const faqs = [
  {
    q: "What timezone do your developers work in?",
    a: "Our developers work with meaningful overlap for US Eastern and Australian Eastern time. For teams that need tighter alignment, we can adjust working hours based on the engagement.",
  },
  {
    q: "What if the developer is not the right fit?",
    a: "We replace them quickly and keep the transition clean. The discovery call is designed to reduce mismatches before the engagement starts.",
  },
  {
    q: "Do I have to change how my team works?",
    a: "No. Your developer joins your existing Slack, Jira, GitHub, Trello, or whatever system your team already uses.",
  },
  {
    q: "Is there a minimum contract length?",
    a: "Plans are month-to-month. You can scale up, scale down, or pause with reasonable notice.",
  },
  {
    q: "What tech stacks do your developers cover?",
    a: "React, Next.js, Node.js, PHP, Laravel, WordPress, Shopify, WooCommerce, Vue, and related web stacks.",
  },
];

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`mb-4 text-[11px] font-bold uppercase tracking-[0.22em] ${
        light ? "text-pink-200" : "text-[#FF1F8E]"
      }`}
    >
      {children}
    </p>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-pink-100">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-5 py-6 text-left"
      >
        <span className="text-[15px] font-bold text-slate-950">{item.q}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold transition ${
            open ? "rotate-45 bg-[#FF1F8E] text-white" : "bg-pink-50 text-[#FF1F8E]"
          }`}
        >
          +
        </span>
      </button>
      {open && <p className="pb-6 text-sm leading-7 text-slate-600">{item.a}</p>}
    </div>
  );
}

export default function B2BSalesPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="bg-white pt-36 text-slate-950 md:pt-[100px] lg:pt-[130px]">
      <section className="relative overflow-hidden px-5 pb-20 pt-14 lg:pt-18 sm:px-8 lg:px-12 lg:pb-24">
        <div className="absolute right-[-160px] top-[-220px] h-[620px] w-[620px] rounded-full bg-pink-50" />
        <div className="absolute bottom-[-130px] left-[-120px] h-80 w-80 rounded-full bg-pink-50" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FF1F8E]">
            <span className="h-2 w-2 rounded-full bg-[#FF1F8E]" />
            For IT Agencies and SaaS Companies
          </div>

          <h1 className="max-w-5xl text-[42px] font-black leading-[1.03] tracking-normal text-slate-950 sm:text-6xl lg:text-[78px]">
            Your next developer.
            <span className="block text-[#FF1F8E]">Onboarded in 72 hours.</span>
            Not 3 months.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Stop losing clients to delayed projects. Get a dedicated, pre-vetted developer who joins your tools,
            attends your standups, and ships from day one at a lower cost than local hiring.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#book"
              className="rounded-full bg-[#FF1F8E] px-8 py-4 text-sm font-bold text-white shadow-[0_14px_34px_rgba(255,31,142,0.24)] transition hover:bg-[#D91676]"
            >
              Book a free 30-min call
            </a>
            <a
              href="#how"
              className="border-b border-pink-200 pb-1 text-sm font-semibold text-slate-600 transition hover:border-[#FF1F8E] hover:text-[#FF1F8E]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-14 grid max-w-4xl overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["72hrs", "Average onboarding"],
              ["70%", "Less than local hiring"],
              ["12+", "Years building products"],
              ["0", "Long-term contracts"],
            ].map(([num, label]) => (
              <div key={label} className="border-b border-pink-100 p-6 sm:border-r lg:border-b-0">
                <div className="text-3xl font-black text-[#FF1F8E]">{num}</div>
                <div className="mt-1 text-xs font-medium text-slate-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#FFF7FA] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>The problem</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Hiring is killing your growth velocity.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {painPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-pink-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-pink-200"
              >
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-pink-50 text-xl font-black text-[#FF1F8E]">
                  {item.icon}
                </div>
                <h3 className="text-base font-black text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>How it works</SectionLabel>
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
              From first call to first commit in 72 hours.
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              No lengthy RFPs, no endless interviews, and no waiting. Just a developer inside your team, shipping.
            </p>
          </div>

          <div className="mt-12">
            {steps.map((step, index) => (
              <div key={step.title} className="grid gap-5 border-b border-pink-100 py-8 sm:grid-cols-[72px_1fr]">
                <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-pink-200 text-lg font-black text-[#FF1F8E]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-950">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">{step.desc}</p>
                  <span className="mt-4 inline-flex rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-[#FF1F8E]">
                    {step.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#170711] px-5 py-20 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <SectionLabel light>Why Webstep</SectionLabel>
          <h2 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
            Not a freelancer. Not an agency.
            <span className="block text-[#FF1F8E]">Your team, extended.</span>
          </h2>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-[11px] uppercase tracking-[0.16em] text-white/35">
                  <th className="px-5 py-4">What matters</th>
                  <th className="px-5 py-4">Freelancers</th>
                  <th className="px-5 py-4 text-[#FF1F8E]">Webstep</th>
                  <th className="px-5 py-4">Local hire</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([label, freelance, webstep, local]) => (
                  <tr key={label} className="border-b border-white/10">
                    <td className="px-5 py-4 text-white/45">{label}</td>
                    <td className="px-5 py-4 text-white/65">{freelance}</td>
                    <td className="bg-[#FF1F8E]/15 px-5 py-4 font-bold text-white">{webstep}</td>
                    <td className="px-5 py-4 text-white/65">{local}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

   <section id="pricing">
  <Packages pageType="b2b" />
</section>

      <section id="faq" className="px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto xl:max-w-3xl">
          <SectionLabel>Common questions</SectionLabel>
          <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            Questions we hear before every first call.
          </h2>
          <div className="mt-8">
            {faqs.map((item, index) => (
              <FaqItem
                key={item.q}
                item={item}
                open={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="relative overflow-hidden bg-[#FF1F8E] px-5 py-24 text-center text-white sm:px-8 lg:px-12">
        <div className="absolute left-1/2 top-[-420px] h-[780px] w-[780px] -translate-x-1/2 rounded-full bg-white/10" />
        <div className="absolute bottom-[-220px] right-[-160px] h-[430px] w-[430px] rounded-full bg-black/10" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2 className="text-4xl font-black leading-tight sm:text-6xl">
            Your competitor already has a dedicated dev team. Do you?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80">
            Book a free 30-minute call. We will match you with the right developer and prepare onboarding within 72 hours.
          </p>
          <Link
            href="/contactus"
            className="mt-10 inline-flex rounded-full bg-white px-9 py-4 text-base font-black text-[#FF1F8E] shadow-[0_14px_34px_rgba(0,0,0,0.18)] transition hover:-translate-y-1"
          >
            Book your free call
          </Link>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/75">
            <span>No commitment required</span>
            <span>Developer profile shared first</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>
    </main>
  );
}
