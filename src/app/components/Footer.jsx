"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  Mail,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Add Product", href: "/add-product" },
        { name: "Manage Products", href: "/manage-products" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand / Logo Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              Phoen Zone
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-xs">
              Build amazing products with ease. Your marketplace for creativity
              and innovation.
            </p>

            {/* Optional: Newsletter */}
            <div className="mt-6">
              <p className="text-sm font-medium text-gray-200">Stay updated</p>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 w-full max-w-xs"
                />
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-r-lg transition-colors">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            © {currentYear} Phone Zone. All rights reserved.
          </p>

          {/* Social Icons (optional – hide if not needed) */}
          <div className="mt-6 md:mt-0 flex space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
