import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Leaf, BookOpen, Target, TrendingUp, MessageCircle, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ChatBot from '@/components/ChatBot';

const Learning = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('learning');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: 'Climate Change in Gujarat',
      description: 'Understanding local climate impacts and solutions',
      duration: '15 min',
      points: 50,
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Sustainable Agriculture',
      description: 'Traditional and modern eco-friendly farming',
      duration: '20 min',
      points: 75,
      completed: false,
      progress: 60
    },
    {
      id: 3,
      title: 'Renewable Energy Systems',
      description: 'Solar and wind energy potential in India',
      duration: '25 min',
      points: 100,
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Water Conservation Techniques',
      description: 'Traditional and modern water saving methods',
      duration: '18 min',
      points: 60,
      completed: false,
      progress: 30
    },
    {
      id: 5,
      title: 'Biodiversity in Western Ghats',
      description: 'Exploring Gujarat\'s unique ecosystems',
      duration: '22 min',
      points: 85,
      completed: true,
      progress: 100
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

//   // Show loading while checking auth
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="bg-green-600 p-4 rounded-lg mb-4 w-fit mx-auto">
//             <Leaf className="text-white animate-pulse" size={32} />
//           </div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

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

  const ProgressBar = ({ progress, className = '' }) => (
    <div className={`progress-eco h-3 ${className}`}>
      <div
        className="progress-fill animate-pulse"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const LearningView = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="text-primary" size={32} />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Interactive Learning</h2>
          <p className="text-muted-foreground">Discover environmental science with local context</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="card-eco p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="font-bold text-xl mb-2">{lesson.title}</h3>
                    <p className="text-muted-foreground mb-3">{lesson.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <BookOpen size={16} />
                        <span>{lesson.duration}</span>
                      </div>
                      <span className="badge-eco">+{lesson.points} points</span>
                      <span className="badge-success">Interactive</span>
                    </div>
                  </div>
                  {lesson.completed ? (
                    <span className="badge-success font-medium whitespace-nowrap">
                      ✓ Completed
                    </span>
                  ) : (
                    <span className="badge-warning font-medium whitespace-nowrap">
                      {lesson.progress}% Complete
                    </span>
                  )}
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{lesson.progress}%</span>
                  </div>
                  <ProgressBar progress={lesson.progress} />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    <span className="badge-eco text-xs">Gujarat Focused</span>
                    <span className="badge-eco text-xs">Hands-on</span>
                  </div>
                  
                  <button className={`${
                    lesson.completed ? 'btn-ghost' : 'btn-eco'
                  } flex items-center gap-2`}>
                    {lesson.completed ? 'Review' : 'Continue Learning'}
                    <ChevronRight size={16} />
                  </button>
                </div>
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
      case 'challenges':
        navigate('/challenges');
        break;
      case 'leaderboard':
        navigate('/leaderboard');
        break;
      case 'chat':
        navigate('/chatbot');
        break;
      default:
        navigate('/learning');
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
        <LearningView />
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Learning;