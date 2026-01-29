import { useState } from 'react'
import { Card, CardContent, Button, Input, toast } from '@/components/ui'

interface BrandingSettings {
  // Logo & Images
  logo: string
  coverImage: string
  favicon: string
  
  // Colors
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  
  // Typography
  fontFamily: string
  headingFont: string
  
  // Layout
  borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
  cardStyle: 'flat' | 'elevated' | 'bordered' | 'glass'
  
  // Restaurant Info
  restaurantName: string
  tagline: string
  description: string
  
  // Social Links
  facebook: string
  instagram: string
  twitter: string
  website: string
}

const defaultSettings: BrandingSettings = {
  logo: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200&h=200&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1920&h=600&fit=crop',
  favicon: '',
  primaryColor: '#C8102E',
  secondaryColor: '#F4B223',
  accentColor: '#1C1C1C',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
  fontFamily: 'Inter',
  headingFont: 'Inter',
  borderRadius: 'medium',
  cardStyle: 'elevated',
  restaurantName: 'Crispy Chicken House',
  tagline: 'Finger Lickin\' Good Since 1992',
  description: 'The best fried chicken in town with our secret 11 herbs and spices recipe.',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  twitter: 'https://twitter.com',
  website: 'https://example.com',
}

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Montserrat', label: 'Montserrat' },
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Lato', label: 'Lato' },
]

const borderRadiusOptions = [
  { value: 'none', label: 'None (0px)', preview: 'rounded-none' },
  { value: 'small', label: 'Small (4px)', preview: 'rounded' },
  { value: 'medium', label: 'Medium (8px)', preview: 'rounded-lg' },
  { value: 'large', label: 'Large (16px)', preview: 'rounded-2xl' },
  { value: 'full', label: 'Full (999px)', preview: 'rounded-full' },
]

const cardStyleOptions = [
  { value: 'flat', label: 'Flat', description: 'Clean, no shadow' },
  { value: 'elevated', label: 'Elevated', description: 'Subtle shadow' },
  { value: 'bordered', label: 'Bordered', description: 'Visible border' },
  { value: 'glass', label: 'Glass', description: 'Frosted glass effect' },
]

export default function Branding() {
  const [settings, setSettings] = useState<BrandingSettings>(defaultSettings)
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'images' | 'info'>('colors')
  const [saving, setSaving] = useState(false)

  const updateSetting = <K extends keyof BrandingSettings>(key: K, value: BrandingSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    toast('Branding settings saved successfully!', 'success')
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    toast('Settings reset to default', 'info')
  }

  const tabs = [
    { id: 'colors', label: 'Colors', icon: '🎨' },
    { id: 'typography', label: 'Typography', icon: '✏️' },
    { id: 'images', label: 'Images', icon: '🖼️' },
    { id: 'info', label: 'Info & Social', icon: '📝' },
  ] as const

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Branding & Customization</h1>
          <p className="text-gray-400 mt-1">Customize your menu's appearance and branding</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave} loading={saving}>
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="xl:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>🎨</span> Color Scheme
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Primary Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Primary Color</label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer overflow-hidden"
                        style={{ backgroundColor: settings.primaryColor }}
                      >
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => updateSetting('primaryColor', e.target.value)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => updateSetting('primaryColor', e.target.value)}
                        className="flex-1 bg-white/5 border-white/10 text-white"
                        placeholder="#C8102E"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Used for buttons, links, and highlights</p>
                  </div>

                  {/* Secondary Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Color</label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer overflow-hidden"
                        style={{ backgroundColor: settings.secondaryColor }}
                      >
                        <input
                          type="color"
                          value={settings.secondaryColor}
                          onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => updateSetting('secondaryColor', e.target.value)}
                        className="flex-1 bg-white/5 border-white/10 text-white"
                        placeholder="#F4B223"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Used for accents and secondary elements</p>
                  </div>

                  {/* Accent Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Accent Color</label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer overflow-hidden"
                        style={{ backgroundColor: settings.accentColor }}
                      >
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => updateSetting('accentColor', e.target.value)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => updateSetting('accentColor', e.target.value)}
                        className="flex-1 bg-white/5 border-white/10 text-white"
                        placeholder="#1C1C1C"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Used for icons and decorative elements</p>
                  </div>

                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                    <div className="flex gap-3">
                      <div 
                        className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer overflow-hidden"
                        style={{ backgroundColor: settings.backgroundColor }}
                      >
                        <input
                          type="color"
                          value={settings.backgroundColor}
                          onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <Input
                        value={settings.backgroundColor}
                        onChange={(e) => updateSetting('backgroundColor', e.target.value)}
                        className="flex-1 bg-white/5 border-white/10 text-white"
                        placeholder="#FFFFFF"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Main background color of your menu</p>
                  </div>
                </div>

                {/* Border Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Border Radius</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {borderRadiusOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSetting('borderRadius', option.value as BrandingSettings['borderRadius'])}
                        className={`p-3 border-2 transition-all ${
                          settings.borderRadius === option.value
                            ? 'border-orange-500 bg-orange-500/20'
                            : 'border-white/10 hover:border-white/30'
                        } ${option.preview}`}
                      >
                        <div className={`w-full h-8 bg-white/20 ${option.preview}`} />
                        <span className="text-xs text-gray-400 mt-2 block">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Card Style</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {cardStyleOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => updateSetting('cardStyle', option.value as BrandingSettings['cardStyle'])}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          settings.cardStyle === option.value
                            ? 'border-orange-500 bg-orange-500/20'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span className="text-white font-medium block">{option.label}</span>
                        <span className="text-xs text-gray-500">{option.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Typography Tab */}
          {activeTab === 'typography' && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>✏️</span> Typography
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Body Font */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Body Font</label>
                    <select
                      value={settings.fontFamily}
                      onChange={(e) => updateSetting('fontFamily', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.value} value={font.value} className="bg-gray-900">
                          {font.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Used for body text and descriptions</p>
                  </div>

                  {/* Heading Font */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Heading Font</label>
                    <select
                      value={settings.headingFont}
                      onChange={(e) => updateSetting('headingFont', e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {fontOptions.map((font) => (
                        <option key={font.value} value={font.value} className="bg-gray-900">
                          {font.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Used for headings and titles</p>
                  </div>
                </div>

                {/* Font Preview */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                  <h3 className="text-gray-400 text-sm mb-4">Preview</h3>
                  <div style={{ fontFamily: settings.headingFont }}>
                    <h1 className="text-3xl font-bold text-white mb-2">Heading Preview</h1>
                    <h2 className="text-xl font-semibold text-white mb-4">Subheading Text</h2>
                  </div>
                  <div style={{ fontFamily: settings.fontFamily }}>
                    <p className="text-gray-300">
                      This is how your body text will look. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Images Tab */}
          {activeTab === 'images' && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>🖼️</span> Logo & Images
                </h2>

                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Restaurant Logo</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-32 h-32 rounded-2xl bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden">
                      {settings.logo ? (
                        <img src={settings.logo} alt="Logo" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">🖼️</span>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                      <Input
                        value={settings.logo}
                        onChange={(e) => updateSetting('logo', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="Enter logo URL or upload"
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <span className="mr-2">📤</span> Upload Image
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => updateSetting('logo', '')}>
                          Remove
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">Recommended: 200x200px, PNG or SVG with transparency</p>
                    </div>
                  </div>
                </div>

                {/* Cover Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Cover Image</label>
                  <div className="space-y-3">
                    <div className="aspect-[3/1] w-full rounded-xl bg-white/10 border-2 border-dashed border-white/20 overflow-hidden">
                      {settings.coverImage ? (
                        <img src={settings.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl">🏞️</span>
                        </div>
                      )}
                    </div>
                    <Input
                      value={settings.coverImage}
                      onChange={(e) => updateSetting('coverImage', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Enter cover image URL"
                    />
                    <p className="text-xs text-gray-500">Recommended: 1920x600px, JPEG or PNG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info & Social Tab */}
          {activeTab === 'info' && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span>📝</span> Restaurant Info
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Restaurant Name</label>
                    <Input
                      value={settings.restaurantName}
                      onChange={(e) => updateSetting('restaurantName', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="Your Restaurant Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tagline</label>
                    <Input
                      value={settings.tagline}
                      onChange={(e) => updateSetting('tagline', e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="A short catchy tagline"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      value={settings.description}
                      onChange={(e) => updateSetting('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      placeholder="Tell customers about your restaurant..."
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <span>🔗</span> Social Links
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Facebook</label>
                      <Input
                        value={settings.facebook}
                        onChange={(e) => updateSetting('facebook', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Instagram</label>
                      <Input
                        value={settings.instagram}
                        onChange={(e) => updateSetting('instagram', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Twitter / X</label>
                      <Input
                        value={settings.twitter}
                        onChange={(e) => updateSetting('twitter', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Website</label>
                      <Input
                        value={settings.website}
                        onChange={(e) => updateSetting('website', e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Live Preview Panel */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <span>👁️</span> Live Preview
          </h3>
          
          <div 
            className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ 
              backgroundColor: settings.backgroundColor,
              fontFamily: settings.fontFamily 
            }}
          >
            {/* Preview Header */}
            <div 
              className="relative h-32 bg-cover bg-center"
              style={{ backgroundImage: `url(${settings.coverImage})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <img 
                  src={settings.logo} 
                  alt="Logo" 
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-lg"
                />
                <div>
                  <h3 
                    className="text-white font-bold"
                    style={{ fontFamily: settings.headingFont }}
                  >
                    {settings.restaurantName}
                  </h3>
                  <p className="text-white/80 text-xs">{settings.tagline}</p>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-4 space-y-3">
              {/* Sample Menu Item */}
              <div 
                className={`p-3 ${
                  settings.cardStyle === 'flat' ? '' :
                  settings.cardStyle === 'elevated' ? 'shadow-md' :
                  settings.cardStyle === 'bordered' ? 'border' :
                  'bg-white/50 backdrop-blur'
                }`}
                style={{ 
                  borderRadius: settings.borderRadius === 'none' ? '0' :
                    settings.borderRadius === 'small' ? '4px' :
                    settings.borderRadius === 'medium' ? '8px' :
                    settings.borderRadius === 'large' ? '16px' : '24px',
                  borderColor: settings.borderRadius !== 'none' ? `${settings.primaryColor}20` : undefined,
                  backgroundColor: settings.cardStyle === 'glass' ? `${settings.backgroundColor}80` : settings.backgroundColor
                }}
              >
                <div className="flex gap-3">
                  <div 
                    className="w-16 h-16 bg-gray-200 flex-shrink-0"
                    style={{ 
                      borderRadius: settings.borderRadius === 'none' ? '0' :
                        settings.borderRadius === 'small' ? '4px' :
                        settings.borderRadius === 'medium' ? '8px' :
                        settings.borderRadius === 'large' ? '12px' : '16px'
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 
                      className="font-semibold text-sm"
                      style={{ color: settings.textColor, fontFamily: settings.headingFont }}
                    >
                      Crispy Chicken
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      Juicy fried chicken with secret spices
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span 
                        className="font-bold text-sm"
                        style={{ color: settings.primaryColor }}
                      >
                        $12.99
                      </span>
                      <button 
                        className="px-3 py-1 text-xs text-white rounded-full"
                        style={{ 
                          backgroundColor: settings.primaryColor,
                          borderRadius: settings.borderRadius === 'none' ? '4px' :
                            settings.borderRadius === 'small' ? '4px' :
                            settings.borderRadius === 'medium' ? '8px' :
                            settings.borderRadius === 'large' ? '12px' : '999px'
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div className="flex gap-2 pt-2">
                <div 
                  className="w-8 h-8 rounded-lg" 
                  style={{ backgroundColor: settings.primaryColor }}
                  title="Primary"
                />
                <div 
                  className="w-8 h-8 rounded-lg" 
                  style={{ backgroundColor: settings.secondaryColor }}
                  title="Secondary"
                />
                <div 
                  className="w-8 h-8 rounded-lg" 
                  style={{ backgroundColor: settings.accentColor }}
                  title="Accent"
                />
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4">
              <h4 className="text-white font-medium text-sm mb-2">💡 Quick Tips</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Use contrasting colors for better readability</li>
                <li>• Keep your logo simple and recognizable</li>
                <li>• High-quality images attract more customers</li>
                <li>• Consistent branding builds trust</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
