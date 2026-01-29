import { useState } from 'react'
import Card, { CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { sampleRestaurants, colorPresets, fontPresets } from '@/data/mockData'
import type { RestaurantTheme } from '@/data/mockData'

export default function ThemeEditor() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(sampleRestaurants[0])
  const [theme, setTheme] = useState<RestaurantTheme>(selectedRestaurant.theme)
  const [hasChanges, setHasChanges] = useState(false)

  const updateTheme = (key: keyof RestaurantTheme, value: string | boolean) => {
    setTheme(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const applyPreset = (preset: { primary: string; secondary: string }) => {
    setTheme(prev => ({ 
      ...prev, 
      primaryColor: preset.primary, 
      secondaryColor: preset.secondary 
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // In real app, this would call an API
    setHasChanges(false)
    alert('Theme saved successfully!')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[rgb(var(--text))]">Theme Editor</h1>
          <p className="text-[rgb(var(--text-muted))]">Customize restaurant colors, fonts, and styles</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" disabled={!hasChanges}>
            Reset Changes
          </Button>
          <Button size="sm" disabled={!hasChanges} onClick={handleSave}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Theme
          </Button>
        </div>
      </div>

      {/* Restaurant Selector */}
      <Card variant="elevated">
        <CardContent className="p-4">
          <label className="text-sm font-medium text-[rgb(var(--text))] block mb-2">Select Restaurant</label>
          <div className="flex flex-wrap gap-3">
            {sampleRestaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => {
                  setSelectedRestaurant(restaurant)
                  setTheme(restaurant.theme)
                  setHasChanges(false)
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl border-2 transition-all ${
                  selectedRestaurant.id === restaurant.id
                    ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5'
                    : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                }`}
              >
                <img 
                  src={restaurant.logo} 
                  alt={restaurant.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="font-medium text-[rgb(var(--text))]">{restaurant.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <div className="space-y-6">
          {/* Colors */}
          <Card variant="elevated">
            <CardHeader>
              <h2 className="font-bold text-[rgb(var(--text))]">🎨 Brand Colors</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">Primary and secondary colors</p>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[rgb(var(--text))] block mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="w-12 h-10 rounded-lg border border-[rgb(var(--border))] cursor-pointer"
                    />
                    <Input 
                      value={theme.primaryColor}
                      onChange={(e) => updateTheme('primaryColor', e.target.value)}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[rgb(var(--text))] block mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      value={theme.secondaryColor}
                      onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                      className="w-12 h-10 rounded-lg border border-[rgb(var(--border))] cursor-pointer"
                    />
                    <Input 
                      value={theme.secondaryColor}
                      onChange={(e) => updateTheme('secondaryColor', e.target.value)}
                      className="flex-1 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div>
                <label className="text-sm font-medium text-[rgb(var(--text))] block mb-2">Quick Presets</label>
                <div className="flex flex-wrap gap-2">
                  {colorPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[rgb(var(--border))] hover:border-[rgb(var(--primary))] transition-colors"
                      title={preset.name}
                    >
                      <span 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: preset.secondary }}
                      />
                      <span className="text-xs text-[rgb(var(--text-muted))]">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card variant="elevated">
            <CardHeader>
              <h2 className="font-bold text-[rgb(var(--text))]">✏️ Typography</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">Font family for the menu</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {fontPresets.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => updateTheme('fontFamily', font.name)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      theme.fontFamily === font.name
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                    }`}
                  >
                    <span 
                      className="text-lg font-semibold text-[rgb(var(--text))] block"
                      style={{ fontFamily: font.value }}
                    >
                      Aa
                    </span>
                    <span className="text-xs text-[rgb(var(--text-muted))]">{font.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Card Style */}
          <Card variant="elevated">
            <CardHeader>
              <h2 className="font-bold text-[rgb(var(--text))]">📦 Card Style</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">Menu item card appearance</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(['flat', 'elevated', 'bordered', 'glass'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => updateTheme('cardStyle', style)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme.cardStyle === style
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                    }`}
                  >
                    <div className={`w-full h-12 rounded-lg mb-2 ${
                      style === 'flat' ? 'bg-[rgb(var(--bg-elevated))]' :
                      style === 'elevated' ? 'bg-[rgb(var(--bg-card))] shadow-md' :
                      style === 'bordered' ? 'bg-[rgb(var(--bg-card))] border-2 border-[rgb(var(--border))]' :
                      'bg-white/50 backdrop-blur border border-white/20'
                    }`} />
                    <span className="text-xs font-medium text-[rgb(var(--text))] capitalize">{style}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Border Radius */}
          <Card variant="elevated">
            <CardHeader>
              <h2 className="font-bold text-[rgb(var(--text))]">⬜ Border Radius</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">Corner roundness</p>
            </CardHeader>
            <CardContent className="p-5">
              <div className="grid grid-cols-5 gap-3">
                {(['none', 'small', 'medium', 'large', 'full'] as const).map((radius) => (
                  <button
                    key={radius}
                    onClick={() => updateTheme('borderRadius', radius)}
                    className={`p-3 border-2 transition-all flex flex-col items-center ${
                      theme.borderRadius === radius
                        ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/5'
                        : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                    } ${
                      radius === 'none' ? 'rounded-none' :
                      radius === 'small' ? 'rounded' :
                      radius === 'medium' ? 'rounded-lg' :
                      radius === 'large' ? 'rounded-xl' :
                      'rounded-2xl'
                    }`}
                  >
                    <div className={`w-8 h-8 bg-[rgb(var(--primary))] ${
                      radius === 'none' ? 'rounded-none' :
                      radius === 'small' ? 'rounded' :
                      radius === 'medium' ? 'rounded-lg' :
                      radius === 'large' ? 'rounded-xl' :
                      'rounded-full'
                    }`} />
                    <span className="text-xs text-[rgb(var(--text-muted))] mt-2 capitalize">{radius}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dark Mode Toggle */}
          <Card variant="elevated">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[rgb(var(--text))]">🌙 Dark Mode</h3>
                  <p className="text-sm text-[rgb(var(--text-muted))]">Enable dark theme for menu</p>
                </div>
                <button
                  onClick={() => updateTheme('darkMode', !theme.darkMode)}
                  className={`toggle-switch ${theme.darkMode ? 'active' : ''}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Preview */}
        <div className="lg:sticky lg:top-24 space-y-4">
          <Card variant="elevated">
            <CardHeader>
              <h2 className="font-bold text-[rgb(var(--text))]">👁️ Live Preview</h2>
              <p className="text-sm text-[rgb(var(--text-muted))]">See your changes in real-time</p>
            </CardHeader>
            <CardContent className="p-0">
              {/* Preview Container */}
              <div 
                className="p-4 min-h-[500px]"
                style={{ 
                  backgroundColor: theme.darkMode ? '#1a1a2e' : '#fff',
                  fontFamily: fontPresets.find(f => f.name === theme.fontFamily)?.value || 'Inter'
                }}
              >
                {/* Preview Header */}
                <div 
                  className="p-4 rounded-t-xl"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20" />
                    <div>
                      <p className="text-white font-bold">{selectedRestaurant.name}</p>
                      <p className="text-white/70 text-xs">{selectedRestaurant.tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Preview Menu Item */}
                <div className="p-4 space-y-3">
                  <div 
                    className={`p-3 ${
                      theme.cardStyle === 'flat' ? '' :
                      theme.cardStyle === 'elevated' ? 'shadow-md' :
                      theme.cardStyle === 'bordered' ? 'border-2' :
                      'backdrop-blur bg-white/10 border border-white/20'
                    } ${
                      theme.borderRadius === 'none' ? 'rounded-none' :
                      theme.borderRadius === 'small' ? 'rounded' :
                      theme.borderRadius === 'medium' ? 'rounded-lg' :
                      theme.borderRadius === 'large' ? 'rounded-xl' :
                      'rounded-2xl'
                    }`}
                    style={{ 
                      backgroundColor: theme.cardStyle === 'glass' ? 'rgba(255,255,255,0.1)' : (theme.darkMode ? '#2d2d44' : '#fff'),
                      borderColor: theme.darkMode ? '#3d3d5c' : '#e5e7eb'
                    }}
                  >
                    <div className="flex gap-3">
                      <div 
                        className={`w-16 h-16 bg-gray-200 ${
                          theme.borderRadius === 'none' ? 'rounded-none' :
                          theme.borderRadius === 'small' ? 'rounded' :
                          theme.borderRadius === 'medium' ? 'rounded-lg' :
                          theme.borderRadius === 'large' ? 'rounded-xl' :
                          'rounded-2xl'
                        }`}
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200)', backgroundSize: 'cover' }}
                      />
                      <div className="flex-1">
                        <p style={{ color: theme.darkMode ? '#fff' : '#1a1a2e' }} className="font-semibold">
                          Crispy Chicken
                        </p>
                        <p style={{ color: theme.darkMode ? '#a0a0b0' : '#6b7280' }} className="text-xs">
                          Delicious crispy fried chicken
                        </p>
                        <p style={{ color: theme.primaryColor }} className="font-bold mt-1">
                          $12.99
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Preview Button */}
                  <button 
                    className={`w-full py-2 text-white font-semibold ${
                      theme.borderRadius === 'none' ? 'rounded-none' :
                      theme.borderRadius === 'small' ? 'rounded' :
                      theme.borderRadius === 'medium' ? 'rounded-lg' :
                      theme.borderRadius === 'large' ? 'rounded-xl' :
                      'rounded-full'
                    }`}
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Actions */}
          <div className="flex gap-3">
            <Button variant="outline" fullWidth size="sm">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Open Full Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
