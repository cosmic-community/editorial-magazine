'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteSettings } from '@/types'

interface FooterProps {
  siteSettings: SiteSettings | null
}

export default function Footer({ siteSettings }: FooterProps) {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const currentYear = new Date().getFullYear()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)
    // Simulate subscription API call
    setTimeout(() => {
      setIsSubscribing(false)
      setSubscriptionStatus('success')
      setEmail('')
      setTimeout(() => setSubscriptionStatus('idle'), 3000)
    }, 1000)
  }

  const contactEmail = siteSettings?.metadata?.contact_email || 'hello@cosmicsignal.com'
  const phoneNumber = siteSettings?.metadata?.phone
  const address = siteSettings?.metadata?.address

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '90px 90px'
        }} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-14">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-10 mb-10">
          
          {/* Left Column - Newsletter Signup */}
          <div className="lg:col-span-1 space-y-5">
            <div className="space-y-3.5">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">📮</span>
                <h2 className="text-2xl font-serif leading-none bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  Stay in the Loop
                </h2>
              </div>
              <p className="text-base text-slate-300 leading-relaxed">
                Get the latest stories and insights delivered to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3.5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
                  disabled={isSubscribing}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubscribing || !email}
                className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]"
              >
                {isSubscribing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  'Subscribe'
                )}
              </button>

              {subscriptionStatus === 'success' && (
                <p className="text-green-400 font-medium text-xs">✨ Thank you for subscribing!</p>
              )}
            </form>
          </div>

          {/* Middle Column - Contact Info */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-3xl">✉️</span>
              <h3 className="text-2xl font-serif leading-none bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Get in Touch
              </h3>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3.5">
              <div className="flex items-center space-x-2.5 p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <p className="text-slate-400 text-xs">Email</p>
                  <a 
                    href={`mailto:${contactEmail}`}
                    className="text-white font-medium hover:text-blue-300 transition-colors text-xs"
                  >
                    {contactEmail}
                  </a>
                </div>
              </div>

              {phoneNumber && (
                <div className="flex items-center space-x-2.5 p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Phone</p>
                    <a 
                      href={`tel:${phoneNumber}`}
                      className="text-white font-medium hover:text-green-300 transition-colors text-xs"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                </div>
              )}

              {address && (
                <div className="flex items-center space-x-2.5 p-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-9 h-9 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Address</p>
                    <p className="text-white font-medium text-xs">
                      {address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Brand & Links */}
          <div className="lg:col-span-1 space-y-5">
            {/* Brand */}
            <div>
              <Link href="/" className="inline-block group mb-2.5">
                <h4 className="text-xl font-serif text-white group-hover:text-blue-300 transition-colors">
                  {siteSettings?.metadata?.site_name || 'Cosmic Signal'}
                </h4>
              </Link>
              {siteSettings?.metadata?.tagline && (
                <p className="text-slate-400 mb-2.5 leading-relaxed">
                  {siteSettings.metadata.tagline}
                </p>
              )}
              {siteSettings?.metadata?.footer_about && (
                <p className="text-slate-400 text-xs leading-relaxed">
                  {siteSettings.metadata.footer_about}
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h4 className="text-white font-medium mb-2.5">Explore</h4>
                <div className="space-y-1.5">
                  <Link 
                    href="/categories/culture" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Culture
                  </Link>
                  <Link 
                    href="/categories/design" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Design
                  </Link>
                  <Link 
                    href="/categories/technology" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Technology
                  </Link>
                  <Link 
                    href="/about" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    About
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2.5">Company</h4>
                <div className="space-y-1.5">
                  <Link 
                    href="/about" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    About Us
                  </Link>
                  <Link 
                    href="/contact" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Contact
                  </Link>
                  <Link 
                    href="/privacy" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Privacy
                  </Link>
                  <Link 
                    href="/terms" 
                    className="block text-slate-400 hover:text-white transition-colors text-xs"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-3.5 mb-7">
          {siteSettings?.metadata?.social_links?.twitter && (
            <a
              href={siteSettings.metadata.social_links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          )}
          
          {siteSettings?.metadata?.social_links?.instagram && (
            <a
              href={siteSettings.metadata.social_links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          
          {siteSettings?.metadata?.social_links?.linkedin && (
            <a
              href={siteSettings.metadata.social_links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              aria-label="Follow us on LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center pt-5 border-t border-white/10">
          <p className="text-slate-400 text-xs">
            &copy; {currentYear} {siteSettings?.metadata?.site_name || 'Cosmic Signal'}. All rights reserved.
            <span className="mx-2">•</span>
            Crafted with ❤️ for storytellers everywhere.
          </p>
        </div>
      </div>

      {/* Floating Action Button - Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-5 right-5 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full flex items-center justify-center text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 z-20"
        aria-label="Back to top"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}