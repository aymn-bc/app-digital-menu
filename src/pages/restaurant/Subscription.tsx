import { useState } from 'react'
import { Card, Button, Badge, toast } from '@/components/ui'

interface Plan {
  id: string
  name: string
  price: number
  period: 'monthly' | 'yearly'
  features: string[]
  isPopular?: boolean
}

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    period: 'monthly',
    features: [
      'Up to 50 menu items',
      'QR code menu',
      'Basic analytics',
      'Email support',
      '1 staff account',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    period: 'monthly',
    features: [
      'Unlimited menu items',
      'QR code menu + ordering',
      'Advanced analytics',
      'Priority support',
      '5 staff accounts',
      'Kitchen display system',
      'Table management',
      'Custom branding',
    ],
    isPopular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    period: 'monthly',
    features: [
      'Everything in Professional',
      'Multiple locations',
      'API access',
      'Dedicated account manager',
      'Unlimited staff accounts',
      'Custom integrations',
      'SLA guarantee',
      'White-label option',
    ],
  },
]

interface Subscription {
  plan: Plan
  status: 'active' | 'trial' | 'expired' | 'cancelled'
  startDate: string
  endDate: string
  trialDaysLeft?: number
  autoRenew: boolean
}

export default function SubscriptionPage() {
  const [currentSubscription, setCurrentSubscription] = useState<Subscription>({
    plan: plans[0],
    status: 'trial',
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    trialDaysLeft: 0,
    autoRenew: true,
  })
  
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')

  const handleUpgrade = async (plan: Plan) => {
    setSelectedPlan(plan)
    setIsUpgrading(true)
    
    // Simulate payment process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setCurrentSubscription({
      plan,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      autoRenew: true,
    })
    
    setIsUpgrading(false)
    setSelectedPlan(null)
    toast(`Successfully upgraded to ${plan.name}! 🎉`, 'success')
  }

  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'active': return 'success'
      case 'trial': return 'warning'
      case 'expired': return 'error'
      case 'cancelled': return 'default'
    }
  }

  const getPriceWithDiscount = (price: number) => {
    return billingPeriod === 'yearly' ? Math.round(price * 0.8) : price
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Current Subscription Status */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Current Subscription</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant={getStatusColor(currentSubscription.status)}>
                {currentSubscription.status.charAt(0).toUpperCase() + currentSubscription.status.slice(1)}
              </Badge>
              <span className="text-white font-semibold">{currentSubscription.plan.name} Plan</span>
              <span className="text-gray-400">
                ${currentSubscription.plan.price}/month
              </span>
            </div>
          </div>
          
          {currentSubscription.status === 'trial' && currentSubscription.trialDaysLeft !== undefined && (
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-4 text-center">
              <p className="text-amber-400 font-bold text-2xl">{currentSubscription.trialDaysLeft}</p>
              <p className="text-amber-300 text-sm">days left in trial</p>
            </div>
          )}
          
          {currentSubscription.status === 'expired' && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-400 font-semibold">⚠️ Your subscription has expired</p>
              <p className="text-red-300 text-sm">Renew now to continue using all features</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-4 text-sm">
          <div>
            <span className="text-gray-400">Start Date:</span>
            <span className="text-white ml-2">{currentSubscription.startDate}</span>
          </div>
          <div>
            <span className="text-gray-400">End Date:</span>
            <span className="text-white ml-2">{currentSubscription.endDate}</span>
          </div>
          <div>
            <span className="text-gray-400">Auto-Renew:</span>
            <span className={`ml-2 ${currentSubscription.autoRenew ? 'text-green-400' : 'text-gray-400'}`}>
              {currentSubscription.autoRenew ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </Card>

      {/* Billing Period Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={billingPeriod === 'monthly' ? 'text-white font-semibold' : 'text-gray-400'}>
          Monthly
        </span>
        <button
          onClick={() => setBillingPeriod(b => b === 'monthly' ? 'yearly' : 'monthly')}
          className={`w-14 h-8 rounded-full transition-colors relative ${
            billingPeriod === 'yearly' ? 'bg-green-500' : 'bg-gray-600'
          }`}
        >
          <span className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
            billingPeriod === 'yearly' ? 'left-7' : 'left-1'
          }`} />
        </button>
        <span className={billingPeriod === 'yearly' ? 'text-white font-semibold' : 'text-gray-400'}>
          Yearly
        </span>
        {billingPeriod === 'yearly' && (
          <Badge variant="success">Save 20%</Badge>
        )}
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => {
          const isCurrentPlan = currentSubscription.plan.id === plan.id
          const price = getPriceWithDiscount(plan.price)
          
          return (
            <Card 
              key={plan.id}
              className={`p-6 relative overflow-hidden transition-all ${
                plan.isPopular ? 'ring-2 ring-[rgb(var(--primary))]' : ''
              } ${isCurrentPlan ? 'bg-[rgb(var(--primary))]/10' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-[rgb(var(--primary))] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${price}</span>
                  <span className="text-gray-400">/{billingPeriod === 'yearly' ? 'mo' : 'month'}</span>
                </div>
                {billingPeriod === 'yearly' && (
                  <p className="text-sm text-gray-400 mt-1">
                    <span className="line-through">${plan.price}</span>
                    <span className="text-green-400 ml-2">Save ${(plan.price - price) * 12}/year</span>
                  </p>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className="w-full"
                variant={isCurrentPlan ? 'secondary' : plan.isPopular ? 'primary' : 'secondary'}
                disabled={isCurrentPlan || isUpgrading}
                loading={isUpgrading && selectedPlan?.id === plan.id}
                onClick={() => handleUpgrade(plan)}
              >
                {isCurrentPlan ? 'Current Plan' : `Upgrade to ${plan.name}`}
              </Button>
            </Card>
          )
        })}
      </div>

      {/* Payment History */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="pb-3">Date</th>
                <th className="pb-3">Description</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-700/50">
                <td className="py-3 text-gray-300">Jan 15, 2024</td>
                <td className="py-3 text-white">Starter Plan - Monthly</td>
                <td className="py-3 text-white">$29.00</td>
                <td className="py-3"><Badge variant="success">Paid</Badge></td>
                <td className="py-3">
                  <Button variant="ghost" size="sm">📄 Invoice</Button>
                </td>
              </tr>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 text-gray-300">Dec 15, 2023</td>
                <td className="py-3 text-white">Starter Plan - Monthly</td>
                <td className="py-3 text-white">$29.00</td>
                <td className="py-3"><Badge variant="success">Paid</Badge></td>
                <td className="py-3">
                  <Button variant="ghost" size="sm">📄 Invoice</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAQ */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-1">Can I change plans anytime?</h4>
            <p className="text-gray-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">What happens when my trial ends?</h4>
            <p className="text-gray-400 text-sm">Your account will be limited to view-only mode. Subscribe to continue using all features.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Do you offer refunds?</h4>
            <p className="text-gray-400 text-sm">We offer a 14-day money-back guarantee on all plans.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
