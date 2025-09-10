import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="mt-15 my-5 grid grid-cols-2 text-center gap-y-15 md:text-left md:flex md:justify-between">
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <Link to="/" className="text-xl font-medium">
          TRENDBLOG
        </Link>
        <p className="">© 2025 Trendpost.</p>
        <p className="">All rights reserved.</p>
      </div>
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <p className="text-base">Links</p>
        <Link to="/">Homepage</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Terms of Service</Link>
        <Link to="/">Privacy Policy</Link>
      </div>
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <p className="text-base">Links</p>
        <Link to="/">All Posts</Link>
        <Link to="/">Featured Post</Link>
        <Link to="/">Most Popular Post</Link>
      </div>
      <div className="flex flex-col gap-4 text-textSoft text-sm">
        <p className="text-base">Links</p>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Blog</Link>
        <Link to="/">Affiliate Program</Link>
      </div>
    </div>
  );
};

export default Footer;
