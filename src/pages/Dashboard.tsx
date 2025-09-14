import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Leaf, Users, BookOpen, Camera, MapPin, Star, Award, Target, TrendingUp, MessageCircle, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ChatBot from '@/components/ChatBot';
import { verifyPlanting } from "../services/api";

const Dashboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Plant a Tree Challenge',
      description: 'Plant a sapling and track its growth for 30 days',
      points: 200,
      category: 'Biodiversity',
      difficulty: 'Medium',
      location: 'Local',
      completed: false,
      participants: 156
    },
    {
      id: 2,
      title: 'Plastic-Free Week',
      description: 'Avoid single-use plastics for 7 consecutive days',
      points: 150,
      category: 'Waste Management',
      difficulty: 'Hard',
      location: 'Home/School',
      completed: true,
      participants: 89
    },
    {
      id: 3,
      title: 'Water Conservation Audit',
      description: 'Measure and reduce water usage at home',
      points: 100,
      category: 'Water Conservation',
      difficulty: 'Easy',
      location: 'Home',
      completed: false,
      participants: 234
    }
  ]);

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

  const completeChallenge = (challengeId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const result = await verifyPlanting(file);

      if (result.success && result.verified) {
        // Update challenge state
        setChallenges((prev) =>
          prev.map((challenge) =>
            challenge.id === challengeId && !challenge.completed
              ? { ...challenge, completed: true }
              : challenge
          )
        );

        // Find the completed challenge
        const completedChallenge = challenges.find((c) => c.id === challengeId);

        // Update ecoPoints in userProfile
        if (completedChallenge && !completedChallenge.completed) {
          setUserProfile((prev) => ({
            ...prev,
            ecoPoints: prev.ecoPoints + completedChallenge.points,
          }));
        }
      } else {
        console.log("❌ Not valid planting photo:", result);
      }
    };

    input.click();
  };

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Hero Welcome Section */}
      <div className="card-gradient p-6 md:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {userProfile.name}! 🌱</h2>
          <p className="opacity-90 mb-6">Ready to make a difference today?</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Star className="text-nature-yellow" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">{userProfile.ecoPoints}</div>
                <div className="text-sm opacity-90">Eco Points</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Trophy className="text-nature-yellow" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold">#{userProfile.rank}</div>
                <div className="text-sm opacity-90">Gujarat Rank</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="card-eco p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Current Level</p>
              <p className="text-2xl font-bold text-primary">{userProfile.level}</p>
              <p className="text-xs text-muted-foreground mt-1">Keep growing! 🌱</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
              <Leaf className="text-primary" size={28} />
            </div>
          </div>
        </div>
        
        <div className="card-eco p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Challenges Done</p>
              <p className="text-2xl font-bold text-eco-blue">{userProfile.completedChallenges}</p>
              <p className="text-xs text-muted-foreground mt-1">Amazing progress! 🎯</p>
            </div>
            <div className="p-3 bg-eco-blue/10 rounded-xl group-hover:scale-110 transition-transform">
              <Target className="text-eco-blue" size={28} />
            </div>
          </div>
        </div>
        
        <div className="card-eco p-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Badges Earned</p>
              <p className="text-2xl font-bold text-nature-orange">{userProfile.badges.length}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {userProfile.badges.slice(0, 2).map((badge, index) => (
                  <span key={index} className="badge-success text-xs">
                    {badge}
                  </span>
                ))}
                {userProfile.badges.length > 2 && (
                  <span className="badge-eco text-xs">+{userProfile.badges.length - 2}</span>
                )}
              </div>
            </div>
            <div className="p-3 bg-nature-orange/10 rounded-xl group-hover:scale-110 transition-transform">
              <Award className="text-nature-orange" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Challenge */}
      <div className="card-eco p-6 md:p-8">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <Target className="text-primary" size={24} />
          </div>
          <h3 className="text-xl font-bold">Today's Featured Challenge</h3>
        </div>
        
        <div className="card-glass p-6 border-2 border-primary/20 hover:border-primary/40 transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-bold text-lg text-foreground">Plant a Tree Challenge</h4>
                <span className="badge-success font-medium">+200 points</span>
              </div>
              <p className="text-muted-foreground mb-4">Plant a sapling and track its growth for 30 days. Make a real impact in your community!</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>Local Community</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>156 participants</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={16} />
                  <span>Medium Difficulty</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="btn-outline">
                Learn More
              </button>
              <button
                onClick={() => completeChallenge(challenges[0].id)}
                disabled={challenges[0].completed}
                className={`btn-eco ${challenges[0].completed ? "opacity-50 cursor-not-allowed" : ""}`}
              > <Camera size={16} />
                {challenges[0].completed ? "✅ Completed" : "Take Challenge"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Statistics */}
      <div className="card-eco p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <TrendingUp className="mr-3 text-primary" size={24} />
          Your Environmental Impact This Month
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="text-3xl font-bold text-primary mb-1">12kg</div>
            <div className="text-sm text-muted-foreground">CO₂ Reduced</div>
            <div className="text-xs text-primary mt-1">🌍 Great job!</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-eco-blue/5 hover:bg-eco-blue/10 transition-colors">
            <div className="text-3xl font-bold text-eco-blue mb-1">450L</div>
            <div className="text-sm text-muted-foreground">Water Saved</div>
            <div className="text-xs text-eco-blue mt-1">💧 Excellent!</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-success/5 hover:bg-success/10 transition-colors">
            <div className="text-3xl font-bold text-success mb-1">8</div>
            <div className="text-sm text-muted-foreground">Trees Planted</div>
            <div className="text-xs text-success mt-1">🌳 Amazing!</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-nature-orange/5 hover:bg-nature-orange/10 transition-colors">
            <div className="text-3xl font-bold text-nature-orange mb-1">25kg</div>
            <div className="text-sm text-muted-foreground">Waste Recycled</div>
            <div className="text-xs text-nature-orange mt-1">♻️ Superb!</div>
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
      case 'challenges':
        navigate('/challenges');
        break;
      case 'learning':
        navigate('/learning');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      case 'chat':
        navigate('/chatbot');
        break;
      default:
        navigate('/');
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
        <DashboardView />
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Dashboard;