import React, { useState, useEffect } from 'react';
import { ChevronDown, Package, MapPin, Clock, CheckCircle, AlertCircle, Eye, EyeOff, LogOut } from 'lucide-react';

export default function PackageTracker() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [activeTracking, setActiveTracking] = useState(null);
  const [loginError, setLoginError] = useState('');

  // Mock package data
  const mockPackages = {
    'DHL1234567890': {
      id: 'DHL1234567890',
      carrier: 'DHL Express',
      from: 'New York, NY',
      to: 'Lagos, NG',
      weight: '2.5 kg',
      status: 'In Transit',
      estimatedDelivery: '2024-05-18',
      progressPercent: 65,
      events: [
        { date: '2024-05-16 14:30', location: 'Dubai Hub', status: 'Departed', icon: '✈️' },
        { date: '2024-05-15 09:15', location: 'New York Facility', status: 'Picked up', icon: '📦' },
        { date: '2024-05-15 22:45', location: 'In Transit', status: 'On the way', icon: '🚚' },
      ]
    },
    'FDX9876543210': {
      id: 'FDX9876543210',
      carrier: 'FedEx International',
      from: 'Los Angeles, CA',
      to: 'Lagos, NG',
      weight: '1.8 kg',
      status: 'Out for Delivery',
      estimatedDelivery: '2024-05-17',
      progressPercent: 90,
      events: [
        { date: '2024-05-16 06:00', location: 'Lagos Distribution Center', status: 'Out for Delivery', icon: '🚚' },
        { date: '2024-05-15 18:30', location: 'Lagos Customs Clearance', status: 'Cleared', icon: '✅' },
        { date: '2024-05-14 12:00', location: 'In Transit to Nigeria', status: 'International Hub', icon: '✈️' },
        { date: '2024-05-13 10:00', location: 'Los Angeles Hub', status: 'Shipped', icon: '📦' },
      ]
    },
    'UPS5555666677': {
      id: 'UPS5555666677',
      carrier: 'UPS Worldwide',
      from: 'Chicago, IL',
      to: 'Lagos, NG',
      weight: '3.2 kg',
      status: 'Delivered',
      estimatedDelivery: '2024-05-16',
      progressPercent: 100,
      events: [
        { date: '2024-05-16 14:20', location: 'Lagos Address', status: 'Delivered', icon: '🎉' },
        { date: '2024-05-16 08:30', location: 'Lagos Local Hub', status: 'Out for Delivery', icon: '🚚' },
        { date: '2024-05-15 16:00', location: 'Lagos Facility', status: 'Ready for Pickup', icon: '✅' },
      ]
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }

    if (email.includes('@') && password.length >= 4) {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    const id = trackingId.trim().toUpperCase();
    
    if (mockPackages[id]) {
      setActiveTracking(mockPackages[id]);
      setTrackingId('');
    } else {
      alert('Package not found. Try: DHL1234567890, FDX9876543210, or UPS5555666677');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTracking(null);
    setTrackingId('');
  };

  const getStatusColor = (status) => {
    if (status === 'Delivered') return 'text-emerald-500';
    if (status === 'Out for Delivery') return 'text-blue-500';
    if (status === 'In Transit') return 'text-amber-500';
    return 'text-slate-500';
  };

  const getStatusBgColor = (status) => {
    if (status === 'Delivered') return 'bg-emerald-50 border-emerald-200';
    if (status === 'Out for Delivery') return 'bg-blue-50 border-blue-200';
    if (status === 'In Transit') return 'bg-amber-50 border-amber-200';
    return 'bg-slate-50 border-slate-200';
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap');
          
          * {
            font-family: 'Sora', sans-serif;
          }

          .login-container {
            animation: fadeInScale 0.6s ease-out;
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
          }

          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }

          input:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
        `}</style>

        <div className="login-container w-full max-w-md">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-700 shadow-2xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4 shadow-lg">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>TrackHub</h1>
              <p className="text-slate-400 text-sm">Global Package Tracking Platform</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 transition-all duration-200 hover:border-slate-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-200 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 transition-all duration-200 hover:border-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
            </form>

            {/* Demo Note */}
            <div className="mt-6 pt-6 border-t border-slate-600">
              <p className="text-xs text-slate-400 text-center mb-3">Demo Credentials:</p>
              <div className="space-y-2 text-xs text-slate-500">
                <p>📧 <span className="text-slate-300">demo@example.com</span></p>
                <p>🔑 <span className="text-slate-300">password (or anything 4+ chars)</span></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-slate-500 text-xs mt-6">
            © 2024 TrackHub. All rights reserved.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Playfair+Display:wght@600;700&display=swap');
        
        * {
          font-family: 'Sora', sans-serif;
        }

        .dashboard-fade {
          animation: dashboardFade 0.5s ease-out;
        }

        @keyframes dashboardFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .timeline {
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgb(59, 130, 246), transparent);
        }

        .timeline-item {
          margin-left: 50px;
          position: relative;
          padding-bottom: 24px;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: -42px;
          top: 6px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid rgb(59, 130, 246);
        }

        .timeline-item.completed::before {
          background: rgb(16, 185, 129);
          border-color: rgb(16, 185, 129);
        }

        .progress-bar {
          background: linear-gradient(90deg, rgb(59, 130, 246), rgb(6, 182, 212));
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .status-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        input:focus {
          outline: none;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>TrackHub</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="dashboard-fade">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome Back!</h2>
            <p className="text-slate-600">Track your packages in real-time across the globe</p>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-2xl p-6 mb-8 border border-slate-200 shadow-sm">
            <form onSubmit={handleTrack} className="flex gap-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tracking Number</label>
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your tracking ID (e.g., DHL1234567890)"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 transform hover:scale-105"
                >
                  Track
                </button>
              </div>
            </form>
            <p className="text-xs text-slate-500 mt-3">💡 Try: DHL1234567890, FDX9876543210, or UPS5555666677</p>
          </div>

          {/* Active Tracking */}
          {activeTracking && (
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8">
              {/* Package Header */}
              <div className={`p-6 border-b border-slate-200 ${getStatusBgColor(activeTracking.status)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-600 mb-1">TRACKING ID</p>
                    <h3 className="text-2xl font-bold text-slate-900 font-mono">{activeTracking.id}</h3>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${getStatusColor(activeTracking.status)} flex items-center gap-2 justify-end`}>
                      {activeTracking.status === 'Delivered' && <CheckCircle className="w-5 h-5" />}
                      {activeTracking.status === 'Out for Delivery' && <Clock className="w-5 h-5 status-pulse" />}
                      {activeTracking.status === 'In Transit' && <Package className="w-5 h-5 status-pulse" />}
                      {activeTracking.status}
                    </p>
                  </div>
                </div>

                {/* Route Info */}
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-1">FROM</p>
                    <p className="text-lg font-semibold text-slate-900">{activeTracking.from}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 font-semibold mb-1">TO</p>
                    <p className="text-lg font-semibold text-slate-900">{activeTracking.to}</p>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6 border-b border-slate-200 grid grid-cols-3 gap-4 md:gap-6">
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">CARRIER</p>
                  <p className="text-slate-900 font-semibold">{activeTracking.carrier}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">WEIGHT</p>
                  <p className="text-slate-900 font-semibold">{activeTracking.weight}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">EXPECTED DELIVERY</p>
                  <p className="text-slate-900 font-semibold">{activeTracking.estimatedDelivery}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-semibold text-slate-700">DELIVERY PROGRESS</p>
                  <span className="text-sm font-bold text-blue-600">{activeTracking.progressPercent}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="progress-bar h-full transition-all duration-700"
                    style={{ width: `${activeTracking.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="p-6">
                <h4 className="text-sm font-bold text-slate-900 mb-6 uppercase tracking-wide">Shipment Timeline</h4>
                <div className="timeline">
                  {activeTracking.events.map((event, idx) => (
                    <div
                      key={idx}
                      className={`timeline-item ${idx === 0 ? '' : 'completed'}`}
                    >
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                        <p className="text-xs font-semibold text-slate-600 mb-1">{event.date}</p>
                        <p className="text-sm font-bold text-slate-900 mb-1">{event.status}</p>
                        <p className="text-sm text-slate-600 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent Packages */}
          {!activeTracking && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(mockPackages).map((pkg) => (
                <div
                  key={pkg.id}
                  onClick={() => setActiveTracking(pkg)}
                  className="card-hover bg-white rounded-xl p-6 border border-slate-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getStatusBgColor(pkg.status)} group-hover:shadow-md transition-all`}>
                      <Package className={`w-6 h-6 ${getStatusColor(pkg.status)}`} />
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusColor(pkg.status)} bg-opacity-10 ${getStatusBgColor(pkg.status).replace('border', 'bg')}`}>
                      {pkg.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold mb-1">TRACKING ID</p>
                  <p className="text-sm font-mono font-bold text-slate-900 mb-4 truncate">{pkg.id}</p>
                  <div className="space-y-2 mb-4">
                    <p className="text-xs text-slate-600"><span className="font-semibold">From:</span> {pkg.from}</p>
                    <p className="text-xs text-slate-600"><span className="font-semibold">To:</span> {pkg.to}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-slate-600">Progress</span>
                      <span className="text-xs font-bold text-blue-600">{pkg.progressPercent}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                      <div
                        className="progress-bar h-full"
                        style={{ width: `${pkg.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm">
          <p>© 2024 TrackHub. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
    </div>
  );
}
