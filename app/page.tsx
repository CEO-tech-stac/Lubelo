"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Code,
  Smartphone,
  Globe,
  Database,
  Shield,
  Zap,
  Users,
  Headphones,
  Wrench,
  Monitor,
  Cloud,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function LubeloTechSolutions() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderTransparent(window.scrollY < 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Website Design",
      description:
        "Professional, responsive websites using modern technologies like HTML5, CSS3, React, and WordPress. Built for performance, SEO, and user experience.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "E-commerce Development",
      description:
        "Secure, scalable online stores with integrated payment gateways. Specializing in WooCommerce, Shopify, and custom solutions that drive sales.",
      color: "from-green-500 to-teal-600",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "CMS Solutions",
      description:
        "User-friendly content management systems built on WordPress, Joomla, or custom platforms. Easy to update, secure, and scalable for your business growth.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Landing Pages",
      description:
        "High-converting single-page microsites designed for campaigns, product launches, and lead generation. Optimized for maximum conversion rates.",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Website Maintenance",
      description:
        "Comprehensive ongoing support including security updates, plugin management, performance optimization, and regular backups to keep your site running smoothly.",
      color: "from-red-500 to-orange-600",
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "SEO Services",
      description:
        "Complete SEO optimization including on-page setup, technical audits, speed improvements, and keyword strategy to boost your search rankings.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Help Desk Support",
      description:
        "Professional remote and on-site technical support for hardware, software, and user devices. Quick response times and expert problem resolution.",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Network Setup & Configuration",
      description:
        "Professional LAN/Wi-Fi setup, router configuration, and secure networking solutions. Ensuring reliable, fast, and secure connectivity for your business.",
      color: "from-teal-500 to-green-600",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Cybersecurity Solutions",
      description:
        "Comprehensive security including antivirus deployment, firewall configuration, and staff training on security best practices to protect your business.",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Services & Migration",
      description:
        "Seamless migration to Microsoft 365, Google Workspace, AWS, and other cloud platforms. Improve collaboration, security, and accessibility.",
      color: "from-cyan-500 to-blue-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "CCTV Installation & Maintenance",
      description:
        "Professional surveillance solutions for homes and businesses. Complete installation, setup, and ongoing maintenance for enhanced security and peace of mind.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Bulk SMS & Email Campaigns",
      description:
        "Cost-effective bulk messaging services to reach your clients instantly. Perfect for promotions, updates, and customer communication campaigns.",
      color: "from-emerald-500 to-teal-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHeaderTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Lubelo Tech Solutions
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors hover:text-blue-600 ${
                    isHeaderTransparent ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isHeaderTransparent ? "text-white" : "text-gray-700"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isHeaderTransparent ? "text-white" : "text-gray-700"}`} />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <nav className="py-4 space-y-2">
                {["Home", "About", "Services", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Empowering Your Business with{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Innovative IT Solutions
            </span>
          </h1>
          <div className="text-2xl md:text-3xl mb-8 text-yellow-300 font-semibold animate-fade-in-delay">
            "Stay ahead with the ever-changing technology"
          </div>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in-delay">
            Your trusted partner for digital transformation and technology excellence.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
                  <p className="text-blue-100">
                    Lubelo Tech Solutions is a Durban-based tech company focused on delivering cost-effective IT
                    services and digital solutions to individuals, startups, and small businesses.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Vision</h2>
                  <p className="text-green-100">
                    To be a trusted leader in South Africa's tech landscape by enabling individuals and businesses to
                    thrive through accessible and innovative technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-4">Mission</h2>
                  <p className="text-orange-100">
                    To deliver human-centered, professional, and practical tech solutions that support local economic
                    development and digital transformation — one client at a time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
              Comprehensive IT solutions tailored to your business needs
            </p>
            <p className="text-lg text-blue-600 font-semibold italic">"Stay ahead with the ever-changing technology"</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 overflow-hidden"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Build Something Amazing Together</h2>
              <p className="text-xl text-gray-300 mb-4">
                Ready to transform your business? Get in touch with us today!
              </p>
              <p className="text-lg text-yellow-400 font-semibold italic">
                "Stay ahead with the ever-changing technology"
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-blue-300">Email:</p>
                      <a
                        href="mailto:lubelotechsolutions@gmail.com"
                        className="text-white hover:text-yellow-400 transition-colors"
                      >
                        lubelotechsolutions@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-300">Phone:</p>
                      <a href="tel:0659042919" className="text-white hover:text-yellow-400 transition-colors">
                        065 904 2919
                      </a>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-300">Address:</p>
                      <p className="text-white">85 Sixth Avenue, Essenwood, Durban</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-300">Social Media:</p>
                      <p className="text-white">@LubeloTechSolutions on Facebook & Instagram</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 min-h-[120px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Send Message
                  </Button>
                  {isSubmitted && (
                    <div className="text-green-400 text-center font-semibold">
                      Thank you! Your message has been sent.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© 2024 Lubelo Tech Solutions. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-yellow-400 italic">"Stay ahead with the ever-changing technology"</p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/LubeloTechSolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/lubelo_tech_solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
