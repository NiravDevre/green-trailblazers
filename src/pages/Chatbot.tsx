import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Leaf, BookOpen, Target, TrendingUp, MessageCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ChatBot from '@/components/ChatBot';

const Chatbot = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('chat');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Safe defaults
  const [userProfile, setUserProfile] = useState({
    name: 'User',
    school: 'Not specified',
    ecoPoints: 0,
    level: 1,
    badges: [],
    completedChallenges: 0,
    rank: 3,
    role: 'student'
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Update profile state when data is loaded
  useEffect(() => {
    if (profile) {
      setUserProfile({
        name: profile.full_name || 'User',
        school: profile.school_name || profile.organization_name || 'Not specified',
        ecoPoints: profile.eco_points || 0,
        level: Number(profile.level) || 1,
        badges: profile.badges || [],
        completedChallenges: profile.completed_challenges || 0,
        rank: 3,
        role: profile.role || 'student'
      });
    }
  }, [profile]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-600 p-4 rounded-lg mb-4 w-fit mx-auto">
            <Leaf className="text-white animate-pulse" size={32} />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No profile found. Please log in again.</p>
      </div>
    );
  }

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => {
        onClick(id);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 w-full md:w-auto ${
        active
          ? 'card-gradient shadow-[var(--shadow-glow)] transform scale-105'
          : 'btn-ghost hover:bg-muted'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {active && <div className="hidden md:block w-2 h-2 rounded-full bg-white/30"></div>}
    </button>
  );

  const ChatView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="text-primary" size={32} />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">AI Environmental Assistant</h2>
          <p className="text-muted-foreground">Get personalized environmental guidance and answers</p>
        </div>
      </div>
      
      <div className="card-eco p-6 md:p-8">
        <div className="text-center py-12">
          <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto mb-6">
            <MessageCircle className="text-primary w-12 h-12" />
          </div>
          <h3 className="text-xl font-bold mb-4">AI Chat Available in Bottom Right</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Click the chat button in the bottom right corner to start a conversation with our AI environmental assistant. 
            Get instant answers about sustainability, climate action, and environmental challenges!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="bg-muted/50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">🌱 Environmental Tips</h4>
              <p className="text-sm text-muted-foreground">Get personalized sustainability advice</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">📚 Learning Support</h4>
              <p className="text-sm text-muted-foreground">Ask questions about lessons and concepts</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">🎯 Challenge Help</h4>
              <p className="text-sm text-muted-foreground">Get guidance on environmental challenges</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl">
              <h4 className="font-semibold mb-2">🌍 Climate Action</h4>
              <p className="text-sm text-muted-foreground">Learn about climate solutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="card-eco p-6">
        <h3 className="text-xl font-bold mb-4">Quick Start Guide</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <h4 className="font-semibold mb-1">Look for the Chat Button</h4>
              <p className="text-sm text-muted-foreground">Find the floating chat button in the bottom right corner of your screen.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <h4 className="font-semibold mb-1">Start Chatting</h4>
              <p className="text-sm text-muted-foreground">Click to open the chat and type your environmental questions or concerns.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <h4 className="font-semibold mb-1">Get Instant Help</h4>
              <p className="text-sm text-muted-foreground">Receive personalized advice, tips, and support for your environmental journey.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="card-eco p-6">
        <h3 className="text-xl font-bold mb-4">Sample Questions to Try</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-medium">"How can I reduce plastic use in my daily life?"</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-eco-blue/5 to-eco-blue/10 rounded-lg border border-eco-blue/20">
            <p className="text-sm font-medium">"What are some easy water conservation tips?"</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-success/5 to-success/10 rounded-lg border border-success/20">
            <p className="text-sm font-medium">"Tell me about renewable energy in Gujarat"</p>
          </div>
          <div className="p-3 bg-gradient-to-r from-nature-orange/5 to-nature-orange/10 rounded-lg border border-nature-orange/20">
            <p className="text-sm font-medium">"How do I start composting at home?"</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'learning', label: 'Learn', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'chat', label: 'Chatbot', icon: MessageCircle }
  ];

  const handleNavigation = (tabId: string) => {
    switch(tabId) {
      case 'dashboard':
        navigate('/');
        break;
      case 'challenges':
        navigate('/challenges');
        break;
      case 'learning':
        navigate('/learning');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      default:
        navigate('/chatbot');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="bg-surface/95 backdrop-blur-md shadow-[var(--shadow-soft)] border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-3">
              <div className="card-gradient p-2.5 rounded-xl shadow-[var(--shadow-soft)]">
                <Leaf className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Nirvana</h1>
                <p className="text-xs md:text-sm text-muted-foreground">Environmental Education Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-foreground">{userProfile.name}</div>
                <div className="text-xs text-muted-foreground">{userProfile.school}</div>
              </div>
              <div className="w-10 h-10 card-gradient rounded-full flex items-center justify-center text-white font-bold text-lg shadow-[var(--shadow-soft)]">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="hidden sm:flex text-muted-foreground hover:text-foreground"
                title="Sign Out"
              >
                <LogOut size={20} />
              </Button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 max-w-full bg-surface shadow-2xl p-6 pt-24">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  active={activeTab === tab.id}
                  onClick={handleNavigation}
                />
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-surface/95 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-4 overflow-x-auto">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  id={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  active={activeTab === tab.id}
                  onClick={handleNavigation}
                />
              ))}
              <Button
                variant="ghost"
                onClick={signOut}
                className="flex items-center gap-2 w-full justify-start text-muted-foreground hover:text-foreground mt-4"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <ChatView />
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Chatbot;