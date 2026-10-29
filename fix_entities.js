const fs = require('fs');
const replacements = [
  {
    file: 'src/app/not-found.js',
    replaces: [
      {
        from: "The page you're looking for might have been moved, deleted, or never existed in the first place. Don't worry, let's get you back on track.",
        to: "The page you&apos;re looking for might have been moved, deleted, or never existed in the first place. Don&apos;t worry, let&apos;s get you back on track."
      }
    ]
  },
  {
    file: 'src/components/BlogSidebar.js',
    replaces: [
      { from: "<li>Editor's Picks<span>(20)</span></li>", to: "<li>Editor&apos;s Picks<span>(20)</span></li>" },
      { from: "<li>Editor's Picks<span>(10)</span></li>", to: "<li>Editor&apos;s Picks<span>(10)</span></li>" }
    ]
  },
  {
    file: 'src/components/contactus/ContactUs.js',
    replaces: [
      { from: "Let's Start Your <span", to: "Let&apos;s Start Your <span" },
      { from: "Have a groundbreaking idea? We're here to turn it into reality. Reach out and let's start building the future together.", to: "Have a groundbreaking idea? We&apos;re here to turn it into reality. Reach out and let&apos;s start building the future together." },
      { from: "Fill out the form below and we'll get back to you within one business day.", to: "Fill out the form below and we&apos;ll get back to you within one business day." }
    ]
  },
  {
    file: 'src/components/FormSection.js',
    replaces: [
      { from: "We're here to help you navigate the digital landscape. Reach out to discuss your project, or just say hello!", to: "We&apos;re here to help you navigate the digital landscape. Reach out to discuss your project, or just say hello!" }
    ]
  },
  {
    file: 'src/components/Fullstack/FullStackDev.js',
    replaces: [
      { from: "Whether you're looking for a React-based frontend", to: "Whether you&apos;re looking for a React-based frontend" }
    ]
  },
  {
    file: 'src/components/Funnel/Checkout.js',
    replaces: [
      { from: 'COUPON CODE "20OFF" Expires In:', to: 'COUPON CODE &quot;20OFF&quot; Expires In:' }
    ]
  },
  {
    file: 'src/components/Funnel/Countdown.js',
    replaces: [
      { from: "<span>Time's up!</span>", to: "<span>Time&apos;s up!</span>" }
    ]
  },
  {
    file: 'src/components/Funnel/FunelBanner.js',
    replaces: [
      { from: '"Today You\'ll Get Access To The Complete FunnelMates Suite, Traffic Automation Software Tools & Our Beginner Friendly 10 Part Video Series (Inc. Templates & Resources) Responsible For Taking 1,000\'s Of Complete Affiliate Zero\'s To Legendary Affiliate Marketing Hero\'s"', to: '&quot;Today You&apos;ll Get Access To The Complete FunnelMates Suite, Traffic Automation Software Tools & Our Beginner Friendly 10 Part Video Series (Inc. Templates & Resources) Responsible For Taking 1,000&apos;s Of Complete Affiliate Zero&apos;s To Legendary Affiliate Marketing Hero&apos;s&quot;' }
    ]
  },
  {
    file: 'src/components/laravel/LaravelDev.js',
    replaces: [
      { from: "Laravel's advanced security features.", to: "Laravel&apos;s advanced security features." }
    ]
  },
  {
    file: 'src/components/laravel/LaravelElevate.js',
    replaces: [
      { from: "leverage Laravel's full power", to: "leverage Laravel&apos;s full power" }
    ]
  },
  {
    file: 'src/components/MarketingTeam.js',
    replaces: [
      { from: '"{member.description}"', to: '&quot;{member.description}&quot;' }
    ]
  },
  {
    file: 'src/components/mobileapp/MobileDev.js',
    replaces: [
      { from: "In today's mobile-centric world", to: "In today&apos;s mobile-centric world" },
      { from: "your customers' fingertips.", to: "your customers&apos; fingertips." }
    ]
  },
  {
    file: 'src/components/nodejs/NodeDev.js',
    replaces: [
      { from: "It's the go-to choice for companies", to: "It&apos;s the go-to choice for companies" }
    ]
  },
  {
    file: 'src/components/ourworks/WorksGetInTouch.js',
    replaces: [
      { from: '"We can help you streamline your business, connect with more customers, and earn that competitive advantage with our custom-made software solutions."', to: '&quot;We can help you streamline your business, connect with more customers, and earn that competitive advantage with our custom-made software solutions.&quot;' }
    ]
  },
  {
    file: 'src/components/php/PhpDev.js',
    replaces: [
      { from: "results you've never experienced before", to: "results you&apos;ve never experienced before" },
      { from: "experience, we've provided PHP services", to: "experience, we&apos;ve provided PHP services" }
    ]
  },
  {
    file: 'src/components/team/OurTeam.js',
    replaces: [
      { from: "<h2>It's time to create the Perfect Team</h2>", to: "<h2>It&apos;s time to create the Perfect Team</h2>" }
    ]
  },
  {
    file: 'src/components/Wp/WpDev.js',
    replaces: [
      { from: "The World's Favorite CMS", to: "The World&apos;s Favorite CMS" },
      { from: 'we don\'t just "install" WordPress.', to: 'we don&apos;t just &quot;install&quot; WordPress.' }
    ]
  }
];

replacements.forEach(r => {
  let content = fs.readFileSync(r.file, 'utf8');
  r.replaces.forEach(rep => {
    content = content.replace(rep.from, rep.to);
  });
  fs.writeFileSync(r.file, content);
});
console.log('All replacements done');
