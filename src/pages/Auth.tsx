import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, User, Building, Handshake, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: '',
    organizationName: '',
    schoolName: '',
    gradeLevel: '',
    location: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in."
      });
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (!signupData.role) {
      toast({
        title: "Role Required",
        description: "Please select your role.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const userData = {
      full_name: signupData.fullName,
      role: signupData.role,
      organization_name: signupData.organizationName,
      school_name: signupData.schoolName,
      grade_level: signupData.gradeLevel,
      location: signupData.location
    };

    const { error } = await signUp(signupData.email, signupData.password, userData);
    
    if (error) {
      toast({
        title: "Signup Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account."
      });
    }
    
    setLoading(false);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <GraduationCap size={16} />;
      case 'institute': return <Building size={16} />;
      case 'company': return <Building size={16} />;
      case 'ngo': return <Handshake size={16} />;
      default: return <User size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-green-600 p-3 rounded-lg mb-4 w-fit">
            <Leaf className="text-white" size={32} />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Welcome to Nirvana</CardTitle>
          <p className="text-gray-600">Environmental Education Platform</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select onValueChange={(value) => setSignupData({ ...signupData, role: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon('student')}
                          <span>Student</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="institute">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon('institute')}
                          <span>Educational Institute</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="company">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon('company')}
                          <span>Company/Organization</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ngo">
                        <div className="flex items-center space-x-2">
                          {getRoleIcon('ngo')}
                          <span>NGO/Non-Profit</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(signupData.role === 'institute' || signupData.role === 'company' || signupData.role === 'ngo') && (
                  <div className="space-y-2">
                    <Label htmlFor="organizationName">Organization Name</Label>
                    <Input
                      id="organizationName"
                      placeholder="Your organization name"
                      value={signupData.organizationName}
                      onChange={(e) => setSignupData({ ...signupData, organizationName: e.target.value })}
                    />
                  </div>
                )}

                {signupData.role === 'student' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School/College Name</Label>
                      <Input
                        id="schoolName"
                        placeholder="Your school or college"
                        value={signupData.schoolName}
                        onChange={(e) => setSignupData({ ...signupData, schoolName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gradeLevel">Grade/Year</Label>
                      <Input
                        id="gradeLevel"
                        placeholder="e.g., Grade 10, 2nd Year"
                        value={signupData.gradeLevel}
                        onChange={(e) => setSignupData({ ...signupData, gradeLevel: e.target.value })}
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={signupData.location}
                    onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    type="password"
                    placeholder="Create a strong password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;