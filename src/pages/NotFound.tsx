import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="card-gradient p-3 rounded-xl shadow-[var(--shadow-soft)]">
            <Leaf className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Nirvana</h1>
            <p className="text-sm text-muted-foreground">Environmental Education Platform</p>
          </div>
        </div>

        {/* 404 Content */}
        <div className="card-eco p-8 mb-6">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-6">
            Oops! The page you're looking for seems to have wandered off into the digital wilderness. 
            Let's get you back on the path to environmental learning!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate('/')}
              className="btn-eco flex items-center gap-2"
            >
              <Home size={16} />
              Go to Dashboard
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="btn-outline flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="card-eco p-6">
          <h3 className="font-bold text-lg mb-4">Quick Navigation</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/challenges')}
              className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium text-sm">🎯 Challenges</div>
              <div className="text-xs text-muted-foreground">Environmental tasks</div>
            </button>
            <button
              onClick={() => navigate('/learning')}
              className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium text-sm">📚 Learning</div>
              <div className="text-xs text-muted-foreground">Educational content</div>
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium text-sm">🏆 Leaderboard</div>
              <div className="text-xs text-muted-foreground">Top performers</div>
            </button>
            <button
              onClick={() => navigate('/chatbot')}
              className="p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <div className="font-medium text-sm">💬 AI Chat</div>
              <div className="text-xs text-muted-foreground">Get assistance</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Lost? Our AI assistant is always here to help! 🌱
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
