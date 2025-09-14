import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Leaf, Users, BookOpen, Target, TrendingUp, MessageCircle, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import ChatBot from '@/components/ChatBot';

const Leaderboard = () => {
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('leaderboard');
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

  const leaderboard = [
    { rank: 1, name: 'Arjun Patel', school: 'Kendriya Vidyalaya', points: 1580, location: 'Ahmedabad' },
    { rank: 2, name: 'Sneha Gupta', school: 'DPS Vadodara', points: 1420, location: 'Vadodara' },
    { rank: 3, name: 'Priya Sharma', school: 'DPS Bharuch', points: 1250, location: 'Bharuch' },
    { rank: 4, name: 'Rohit Kumar', school: 'St. Xavier\'s', points: 1180, location: 'Surat' },
    { rank: 5, name: 'Kavya Nair', school: 'Navrachana School', points: 1050, location: 'Vadodara' },
    { rank: 6, name: 'Harsh Mehta', school: 'Zydus School', points: 980, location: 'Ahmedabad' },
    { rank: 7, name: 'Ananya Shah', school: 'Gujarat Public School', points: 920, location: 'Gandhinagar' },
    { rank: 8, name: 'Dev Patel', school: 'SVKM International', points: 865, location: 'Rajkot' }
  ];

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

  const LeaderboardView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Trophy className="text-nature-yellow" size={32} />
            Gujarat Leaderboard
          </h2>
          <p className="text-muted-foreground">Top environmental champions in your state</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-eco">This Month</button>
          <button className="btn-ghost">All Time</button>
        </div>
      </div>

      <div className="card-eco overflow-hidden">
        <div className="p-6 card-gradient text-white">
          <h3 className="font-bold text-xl mb-2">🏆 Top Environmental Champions</h3>
          <p className="opacity-90">Students making the biggest impact across Gujarat</p>
        </div>
        
        <div className="divide-y divide-border">
          {leaderboard.map((student) => (
            <div key={student.rank} className={`p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-colors ${
              student.name === userProfile.name ? 'bg-primary/5 border-l-4 border-primary' : ''
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                  student.rank === 1 ? 'bg-gradient-to-br from-nature-yellow to-nature-orange' :
                  student.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                  student.rank === 3 ? 'bg-gradient-to-br from-yellow-600 to-yellow-700' :
                  'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600'
                }`}>
                  {student.rank <= 3 ? (
                    <Trophy size={20} />
                  ) : (
                    student.rank
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg">{student.name}</div>
                  <div className="text-muted-foreground text-sm">{student.school}</div>
                  <div className="text-muted-foreground text-xs">{student.location}, Gujarat</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-xl text-primary">{student.points.toLocaleString()}</div>
                <div className="text-muted-foreground text-sm">eco points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-eco p-6">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <Users className="text-primary" size={24} />
          School Rankings
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-nature-yellow/10 to-nature-orange/10 rounded-xl border border-nature-yellow/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥇</span>
              <span className="font-bold">Kendriya Vidyalaya Network</span>
            </div>
            <span className="font-bold text-xl text-nature-yellow">12,450</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-muted rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥈</span>
              <span className="font-bold">DPS Gujarat Region</span>
            </div>
            <span className="font-bold text-xl text-gray-600">11,200</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-600/10 to-yellow-700/10 rounded-xl border border-yellow-600/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥉</span>
              <span className="font-bold">St. Xavier's Schools</span>
            </div>
            <span className="font-bold text-xl text-yellow-700">9,800</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">4️⃣</span>
              <span className="font-bold">Zydus School Network</span>
            </div>
            <span className="font-bold text-xl text-muted-foreground">8,650</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">5️⃣</span>
              <span className="font-bold">Gujarat Public Schools</span>
            </div>
            <span className="font-bold text-xl text-muted-foreground">7,420</span>
          </div>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="card-eco p-6">
        <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
          <TrendingUp className="text-primary" size={24} />
          Regional Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="text-2xl font-bold text-primary mb-1">Ahmedabad</div>
            <div className="text-sm text-muted-foreground mb-2">4,250 total points</div>
            <div className="text-xs text-primary">🌟 Leading region</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-eco-blue/5 hover:bg-eco-blue/10 transition-colors">
            <div className="text-2xl font-bold text-eco-blue mb-1">Vadodara</div>
            <div className="text-sm text-muted-foreground mb-2">3,890 total points</div>
            <div className="text-xs text-eco-blue">💧 Water conservation leader</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-success/5 hover:bg-success/10 transition-colors">
            <div className="text-2xl font-bold text-success mb-1">Surat</div>
            <div className="text-sm text-muted-foreground mb-2">3,120 total points</div>
            <div className="text-xs text-success">🌱 Green initiatives champion</div>
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
      case 'chat':
        navigate('/chatbot');
        break;
      default:
        navigate('/leaderboard');
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
        <LeaderboardView />
      </main>

      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Leaderboard;
