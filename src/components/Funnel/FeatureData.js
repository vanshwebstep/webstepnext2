import Image from 'next/image';
import { assetImage } from "@/lib/assets";
const img = assetImage("FM-FE-47-ImageBody-26.png");
const img2 = assetImage("FEATURE2.png");
const img3 = assetImage("FEATURE3.png");
const img4 = assetImage("FEATURE4.png");
const img5 = assetImage("FEATURE5.png");
const img6 = assetImage("FEATURE6.png");
const img7 = assetImage("FEATURE7.png");
const img8 = assetImage("FEATURE8.png");
const img9 = assetImage("FEATURE9.png");
const img10 = assetImage("FEATURE10.png");
const img11 = assetImage("FEATURE11.png");
const img12 = assetImage("FEATURE12.png");
const img13 = assetImage("FEATURE13.png");
const img14 = assetImage("FEATURE14.png");
const img15 = assetImage("FEATURE15.png");
const img16 = assetImage("FEATURE16.png");
const Features = [
    {
        id: 0,
        btn: 'Feature #1',
        maintitle: "Beginner Friendly 27 Second Activation (No Editing!)",
        des1: 'Our average person, completely new to the system has their entire account set up, branded and profit ready in just 27 seconds.',
        des2: "There’s no editing code, no designing pages, no tricky configurations. Everything is done in your easy to use members dashboard.",
        img: img,
    },
    {
        id: 1,
        btn: 'Feature #2',
        maintitle: "High Converting Landing Pages With Targeted Lead Magnets That Pull In Subscribers Like Crazy!",
        des1: 'Our constantly growing collection of high converting squeeze pages come with a custom created lead magnet, offering anything from reports, software or coupons to free trials, consultations and entire membership giveaways.',
        des2: "We host the pages and gifts… and give you a link to share to get subscribers, or download the gift and try it out for yourself too!",
        img: img2,
    },
    {
        id: 2,
        btn: 'Feature #3',
        maintitle: "Fully Integrated Funnel That Places Your Links To Sales Offers On Pages",
        des1: 'Once people subscribe to receive their lead magnet gift they will go through our TESTED and PROVEN funnel complete with Thank-you, confirmation, and download pages.',
        des2: "It’s already set up for you. Each of these pages are highly optimized with integrated ads that will automatically send traffic to your affiliate links.",
        img: img3,
    },
    {
        id: 3,
        btn: 'Feature #4',
        maintitle: "No Setup Needed,With Everything Hosted For You At No Extra Cost",
        des1: 'You don’t need to install or configure anything. We host all your pages and run the high converting autoresponder follow up system for you, at no cost.',
        des2: "FunnelMates is entirely cloud based, so you’ll find everything you need inside the member’s area, so you can get started immediately.",
        img: img4,
    },
    {
        id: 4,
        btn: 'Feature #5',
        maintitle: "Hosted Email Software & (Optional) Autoresponder Integration",
        des1: 'Your new subscribers are added onto a list we’ve created for you, delivering high converting prewritten emails on autopilot, totally managed, and with absolutely nothing extra you need to do to make this work.',
        des2: "However, if you’d like you have a copy of your subscribers also added to your own email sequences you can! Simply connect your autoresponder of choice, choose the list you’d like us to add them to and it’s done!",
        img: img5,
    },
    {
        id: 5,
        btn: 'Feature #6',
        maintitle: "Unlimited Subscribers",
        des1: 'With a system this powerful, filling your lists is going to be easier and faster and cheaper than anything you may have tried in the past.',
        des2: "To let you really profit like the ‘big boys’ with their BIG lists, we’re giving you our no-holding back – no subscriber limits advantage.",
        des3: "You’ll never run out of space, or be forced to pay extra once your subscriber count is really pumping and your business is really taking off. No limits, ever.",
        img: img6,
    },
    {
        id: 6,
        btn: 'Feature #7',
        maintitle: "Unlimited Professionally Written Follow Up Emails",
        des1: 'Once people are on the list they will be tagged to your affiliate ID for life!',
        des2: "We will send them professionally written follow up emails promoting solid evergreen products and exciting new launches in their targeted niche.",
        des3: "All emails will use your affiliate link so you always get the affiliate commissions… doesn’t matter if it’s two years from now.",
        img: img7,
    },
    {
        id: 7,
        btn: 'Feature #8',
        maintitle: "Automatically Included Email Promotions For Offers On  Multiple Popular Affiliate Networks",
        des1: 'FunnelMates is integrated with:',
        list: [
            {
                title: 'JVZoo',
            },
            {
                title: 'WarriorPlus',
            },
            {
                title: 'Clickbank',
            },
            {
                title: 'PayKickstart',
            },
            {
                title: 'ThriveCart',
            },
            {
                title: 'Amazon',
            },
            {
                title: 'Shopify',
            },
            {
                title: '• And MANY More',
            }
        ],
        des2: "So when you make sales you’ll see them sent directly to your own account – no middleman cut.",
        img: img8,
    },
    {
        id: 8,
        btn: 'Feature #9',
        maintitle: "1-Click Automatically Customized Traffic Toolkit",
        des1: 'Each unlocked funnel comes packed with a customized affiliate toolkit that’s as easy as copy paste or in some cases, click and share.',
        des2: "Content varies between funnels, but can include:",
        img: img9,
    },
    {
        id: 9,
        btn: 'Feature #10',
        maintitle: "100’s Of Niches Or Funnels By Request",
        des1: 'Simply select one of our profit funnels to get started. They cover almost all niches and product types, from dating to WordPress and everything in between… no matter what you are interested in… we have you covered!',
        des2: "If you can’t find something to fit your needs, fill out a funnel request form in your members dashboard! All requests are considered and made available to our growing funnel building team.",
        img: img10,
    },
    {
        id: 10,
        btn: 'Feature #11',
        maintitle: "Add Your Own Scripts",
        des1: 'Our easy script integration gives you full flexibility over your funnel pages, without having to deal with any page editing.',
        des2: "If you can’t find something to fit your needs, fill out a funnel request form in your members dashboard! All requests are considered and made available to our growing funnel building team.",
        img: img11,
    },
    {
        id: 11,
        btn: 'Feature #12',
        maintitle: "Use Your Own Domain Name",
        des1: 'When you receive the link to your funnel you can choose from a regular, funnelmates link, a shortened/shareable version – or, you can add your own custom domain name.',
        des2: "Connect up to 5 different domain names and have beautifully branded funnels that look like they’ve taken weeks to build, but really… took you seconds to activate.",
        img: img12,
    },
    {
        id: 12,
        btn: 'Feature #13',
        maintitle: "Click Tracking & Statistics",
        des1: 'Each funnel comes with a cleverly built tracking system. Simply add any keyword to the end of your funnel link and we’ll go to work for you, giving you a breakdown of unique clicks and signups for each of your traffic sources.',
        img: img13,
    },
    {
        id: 13,
        btn: 'Feature #14',
        maintitle: "Peer Reviewed Rating System",
        des1: 'Want to make sure the funnels you’re promoting are actually getting signups and earning commissions for people?',
        des2: "Our internal rating review system allows members to share their experience, post their star ratings and let you find the perfect funnel, that fits your needs.",
        img: img14,
    },

    {
        id: 14,
        btn: 'Feature #15',
        maintitle: "Mac, PC & Mobile Friendly",
        des1: 'Activating and setting up up your profit funnels is quick and easy, and can be done from literally anywhere.',
        des2: "Once you’ve joined, you’ll get access to your cloudbased members dashboard, so you can access and start using it from your Windows computer, Mac or yes, even your phone!",
        des3:"All you need is an internet connection and a minute or two to make this work for you.",
        img: img15,
    },
    {
        id: 15,
        btn: 'Feature #16',
        maintitle: "GDPR Compliant",
        des1: 'You don’t need to install or configure anything. We host all your pages and run the high converting autoresponder follow up system for you, at no cost.',
        des2:"FunnelMates is entirely cloud based, so you’ll find everything you need inside the member’s area, so you can get started immediately.",
        img: img16,
    },
];
export default Features



