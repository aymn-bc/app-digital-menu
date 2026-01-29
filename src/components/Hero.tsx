import { useState, useEffect } from 'react'
import type { HeroSection as HeroSectionType } from '@/data/mockData'
import Button from './ui/Button'
import Input from './ui/Input'

interface HeroProps {
  hero: HeroSectionType
  restaurantName?: string
  onSearch?: (query: string) => void
}

export default function Hero({ hero, restaurantName, onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Auto-rotate carousel
  useEffect(() => {
    if (hero.type === 'carousel') {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 3)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [hero.type])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchQuery)
  }

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {hero.type === 'video' && hero.backgroundVideo ? (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={hero.backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={hero.backgroundImage} 
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        )}
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: hero.overlayOpacity }}
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-app w-full py-12 md:py-20">
        <div className={`flex flex-col ${alignmentClasses[hero.alignment]} max-w-3xl ${hero.alignment === 'center' ? 'mx-auto' : hero.alignment === 'right' ? 'ml-auto' : ''}`}>
          
          {/* Featured Badge */}
          {hero.featuredBadge && (
            <div className="animate-fade-in mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[rgb(var(--secondary))] text-[rgb(var(--accent))] rounded-full text-sm font-bold shadow-lg">
                {hero.featuredBadge}
              </span>
            </div>
          )}

          {/* Restaurant Name */}
          {restaurantName && (
            <p className="text-white/80 text-lg md:text-xl font-medium mb-2 animate-fade-in">
              {restaurantName}
            </p>
          )}

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-up leading-tight">
            {hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 animate-slide-up max-w-xl" style={{ animationDelay: '100ms' }}>
            {hero.subtitle}
          </p>

          {/* Search Bar */}
          {hero.showSearch && (
            <form 
              onSubmit={handleSearch}
              className="w-full max-w-md mb-8 animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search our menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 py-4 text-base rounded-full bg-white/95 border-0 shadow-xl"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[rgb(var(--primary))] text-white rounded-full flex items-center justify-center hover:bg-[rgb(var(--primary-dark))] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {/* CTA Button */}
          <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <Button 
              size="xl" 
              rounded
              className="shadow-xl hover:shadow-2xl"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
              iconPosition="right"
            >
              {hero.ctaText}
            </Button>
          </div>

          {/* Carousel Indicators */}
          {hero.type === 'carousel' && (
            <div className="flex gap-2 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgb(var(--bg))] to-transparent z-10" />
      
      {/* Floating food icons (decorative) */}
      <div className="absolute top-20 right-10 text-6xl opacity-20 animate-bounce hidden lg:block">🍗</div>
      <div className="absolute bottom-40 left-10 text-5xl opacity-20 animate-bounce hidden lg:block" style={{ animationDelay: '500ms' }}>🍔</div>
    </section>
  )
}

// Compact Hero for inner pages
export function CompactHero({ 
  title, 
  subtitle,
  backgroundImage,
}: { 
  title: string
  subtitle?: string
  backgroundImage?: string
}) {
  return (
    <section className="relative h-48 md:h-64 flex items-center overflow-hidden">
      {backgroundImage ? (
        <>
          <img 
            src={backgroundImage} 
            alt="Page header"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div className="absolute inset-0 gradient-primary" />
      )}
      
      <div className="relative z-10 container-app">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h1>
        {subtitle && (
          <p className="text-white/80 text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
