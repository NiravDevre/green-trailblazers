import React, { useState, useEffect } from 'react';
import { Trophy, Leaf, Users, BookOpen, Camera, MapPin, Star, Award, Target, TrendingUp, Menu, X, ChevronRight } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Priya Sharma',
    school: 'Delhi Public School, Bharuch',
    ecoPoints: 1250,
    level: 'Green Guardian',
    badges: ['Water Saver', 'Waste Warrior', 'Tree Lover'],
    completedChallenges: 15,
    rank: 3
  });

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
    }
  ]);

  const leaderboard = [
    { rank: 1, name: 'Arjun Patel', school: 'Kendriya Vidyalaya', points: 1580, location: 'Ahmedabad' },
    { rank: 2, name: 'Sneha Gupta', school: 'DPS Vadodara', points: 1420, location: 'Vadodara' },
    { rank: 3, name: 'Priya Sharma', school: 'DPS Bharuch', points: 1250, location: 'Bharuch' },
    { rank: 4, name: 'Rohit Kumar', school: 'St. Xavier\'s', points: 1180, location: 'Surat' },
    { rank: 5, name: 'Kavya Nair', school: 'Navrachana School', points: 1050, location: 'Vadodara' }
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

  const ProgressBar = ({ progress, className = '' }) => (
    <div className={`progress-eco h-3 ${className}`}>
      <div
        className="progress-fill animate-pulse"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const completeChallenge = (challengeId) => {
    setChallenges(challenges.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, completed: true }
        : challenge
    ));
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setUserProfile(prev => ({
        ...prev,
        ecoPoints: prev.ecoPoints + challenge.points,
        completedChallenges: prev.completedChallenges + 1
      }));
    }
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
                onClick={() => completeChallenge(1)}
                className="btn-eco flex items-center gap-2"
              >
                <Camera size={16} />
                Take Challenge
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
                      className="btn-eco flex items-center gap-2 flex-1 sm:flex-none"
                    >
                      <Camera size={16} />
                      Submit Evidence
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
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'learning', label: 'Learn', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy }
  ];

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
                P
              </div>
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
                  onClick={setActiveTab}
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
                onClick={setActiveTab}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'challenges' && <ChallengesView />}
        {activeTab === 'learning' && <LearningView />}
        {activeTab === 'leaderboard' && <LeaderboardView />}
      </main>
    </div>
  );
};

export default Index;