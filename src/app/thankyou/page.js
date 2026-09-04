import Link from "next/link";
import { FaArrowRight, FaCheck, FaEnvelopeOpenText, FaHome, FaPhoneAlt } from "react-icons/fa";
import { fetchSeoMetadata } from '@/lib/contentApi';




export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('thankyou');
  return {
    title: dynamicSeo.title || "Thank You | Webstep Solutions",
    description: dynamicSeo.description || "Thanks for contacting Webstep Solutions. Our team will get back to you shortly.",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="relative isolate overflow-hidden px-6 pb-24 pt-36 sm:pt-44">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,#fff7fb_0%,#eef8ff_45%,#f8fafc_100%)]" />
        <div className="absolute left-0 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute bottom-10 right-0 -z-10 h-80 w-80 translate-x-1/3 rounded-full bg-cyan-200/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="mb-7 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-[0_18px_40px_rgba(16,185,129,0.28)]">
              <FaCheck size={26} />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-pink-600">Submission received</p>
            <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Thank you for reaching out.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              Your details have been submitted successfully. Our team will review your request and contact you shortly.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#FF1F8E] to-[#FF0055] px-7 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_16px_36px_rgba(255,31,142,0.24)] transition hover:-translate-y-0.5"
              >
                <FaHome /> Back Home
              </Link>
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200"
              >
                Contact Us <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-slate-200 bg-white/85 p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="flex items-start gap-4 rounded-3xl bg-slate-50 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                  <FaEnvelopeOpenText size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-950">What happens next?</h2>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    We check your request, map the right contact person, and reply with the next practical step.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  ["Review", "Your submitted details are reviewed by our team."],
                  ["Response", "You will hear back from us shortly."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <FaCheck size={14} />
                    </div>
                    <h3 className="font-black text-slate-950">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>

              <a
                href="tel:7973938927"
                className="mt-5 flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white transition hover:-translate-y-0.5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-pink-200">
                  <FaPhoneAlt size={16} />
                </span>
                <span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.24em] text-slate-400">Need urgent help?</span>
                  <span className="mt-1 block text-lg font-black">+91 79739-38927</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
