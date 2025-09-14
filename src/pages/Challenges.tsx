import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Leaf, Users, BookOpen, MapPin, Star, Target, TrendingUp, MessageCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ChatBot from '@/components/ChatBot';
import { verifyPlanting } from "../services/api";

const Challenges = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('challenges');
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
    },
    {
      id: 4,
      title: 'Energy Saving Challenge',
      description: 'Reduce household energy consumption by 20% this month',
      points: 180,
      category: 'Energy',
      difficulty: 'Medium',
      location: 'Home',
      completed: false,
      participants: 67
    },
    {
      id: 5,
      title: 'Composting Initiative',
      description: 'Start a composting system and maintain it for 2 weeks',
      points: 120,
      category: 'Waste Management',
      difficulty: 'Easy',
      location: 'Home/School',
      completed: false,
      participants: 98
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

//   // Don't render if no user
//   if (!user || !profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">No profile found. Please log in again.</p>
//       </div>
//     );
//   }

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
        alert("❌ Not valid planting photo:");
      }
    };

    input.click();
  };

  const ChallengesView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">Environmental Challenges</h2>
        <div className="flex flex-wrap gap-2">
          <button className="btn-eco">All</button>
          <button className="btn-ghost">Local</button>
          <button className="btn-ghost">School</button>
          <button className="btn-ghost">Global</button>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="card-eco p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 gap-2">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{challenge.title}</h3>
                    <p className="text-muted-foreground">{challenge.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      challenge.completed 
                        ? 'badge-success' 
                        : 'badge-eco'
                    }`}>
                      {challenge.completed ? '✓ Completed' : `+${challenge.points} points`}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      challenge.difficulty === 'Easy' ? 'badge-success' :
                      challenge.difficulty === 'Medium' ? 'badge-warning' :
                      'bg-error/10 text-error'
                    }`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>{challenge.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf size={16} />
                    <span>{challenge.category}</span>
                  </div>
                </div>
                
                {!challenge.completed && (
                  <div className="flex flex-wrap gap-3">
                    <button className="btn-outline flex-1 sm:flex-none">
                      Learn More
                    </button>
                    <button
                    onClick={() => completeChallenge(challenge.id)}
                    disabled={challenge.completed}
                    className={`btn-eco ${challenge.completed ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {challenge.completed ? "✅ Completed" : "Complete Challenge"}
                  </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
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
        navigate('/challenges');
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
        <ChallengesView />
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Challenges;