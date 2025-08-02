import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, GitBranch, Users, FileText, TrendingUp, LogOut } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');
    if (!email) {
      navigate('/');
    } else {
      setUserEmail(email);
      setUserRole(role || 'Frontend Developer');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-primary/5">
      <div className="bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="animate-fade-up">
              <h1 className="text-3xl font-bold gradient-text">Knowledge Hub</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {userRole}</p>
            </div>
            <div className="flex items-center gap-4 animate-slide-in">
              <Badge variant="secondary" className="px-4 py-2 bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-lg">
                {userRole}
              </Badge>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2 hover:bg-destructive hover:text-white transition-colors duration-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search projects, documents, or GitHub repos..."
              className="pl-10 pr-4 py-3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="default" className="px-6" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover-glow animate-bounce-in bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold gradient-text">5</p>
                  <p className="text-sm text-muted-foreground">Amazon Services</p>
                </div>
                <FileText className="w-8 h-8 text-primary animate-pulse-glow" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover-glow animate-bounce-in bg-gradient-to-br from-aws-blue/10 to-aws-blue/5 border-aws-blue/20" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-aws-blue">847</p>
                  <p className="text-sm text-muted-foreground">Documents</p>
                </div>
                <Users className="w-8 h-8 text-aws-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover-glow animate-bounce-in bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-accent">1,456</p>
                  <p className="text-sm text-muted-foreground">GitHub Commits</p>
                </div>
                <GitBranch className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover-glow animate-bounce-in bg-gradient-to-br from-success/10 to-success/5 border-success/20" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-success">98.7%</p>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 gradient-text animate-fade-up">Amazon Service Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <Card 
              className="card-hover-glow cursor-pointer animate-fade-up bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/30" 
              onClick={() => handleProjectClick('aws')}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Amazon Web Services
                  <Badge className="bg-gradient-aws text-white">5 services</Badge>
                </CardTitle>
                <CardDescription>
                  Global cloud infrastructure and platform services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    1,247 engineers
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    6,456 commits
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="card-hover-glow cursor-pointer animate-fade-up bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-accent/30"
              onClick={() => handleProjectClick('prime')}
              style={{animationDelay: '0.1s'}}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Amazon Prime
                  <Badge className="bg-gradient-accent text-white">5 features</Badge>
                </CardTitle>
                <CardDescription>
                  Subscription service and streaming platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    834 engineers
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    4,234 commits
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="card-hover-glow cursor-pointer animate-fade-up bg-gradient-to-br from-warning/10 via-warning/5 to-transparent border-warning/30"
              onClick={() => handleProjectClick('marketplace')}
              style={{animationDelay: '0.2s'}}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Amazon Marketplace
                  <Badge className="bg-gradient-warm text-white">5 modules</Badge>
                </CardTitle>
                <CardDescription>
                  E-commerce platform and seller services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    1,156 engineers
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    7,672 commits
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="card-hover-glow cursor-pointer animate-fade-up bg-gradient-to-br from-success/10 via-success/5 to-transparent border-success/30"
              onClick={() => handleProjectClick('alexa')}
              style={{animationDelay: '0.3s'}}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Amazon Alexa
                  <Badge className="bg-success text-white">5 skills</Badge>
                </CardTitle>
                <CardDescription>
                  Voice AI and smart home ecosystem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    587 engineers
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    3,543 commits
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="card-hover-glow cursor-pointer animate-fade-up bg-gradient-to-br from-chart-2/10 via-chart-2/5 to-transparent border-chart-2/30"
              onClick={() => handleProjectClick('logistics')}
              style={{animationDelay: '0.4s'}}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Amazon Logistics
                  <Badge className="bg-chart-2 text-white">5 systems</Badge>
                </CardTitle>
                <CardDescription>
                  Supply chain and delivery infrastructure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    956 engineers
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    5,234 commits
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="animate-fade-up">
          <h2 className="text-2xl font-semibold mb-6 gradient-text">Live Activity Feed</h2>
          <Card className="card-hover-glow bg-gradient-to-br from-background via-secondary/10 to-primary/5 border-primary/20">
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                <div className="p-6 flex items-center gap-4 hover:bg-primary/5 transition-colors duration-300">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">AWS Lambda deployment completed successfully</p>
                    <p className="text-xs text-muted-foreground">by DevOps Team • 12 minutes ago</p>
                  </div>
                  <Badge className="bg-success text-white">Success</Badge>
                </div>
                <div className="p-6 flex items-center gap-4 hover:bg-aws-blue/5 transition-colors duration-300">
                  <div className="w-3 h-3 bg-aws-blue rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Prime Video: New streaming codec integration</p>
                    <p className="text-xs text-muted-foreground">by Video Engineering • 1 hour ago</p>
                  </div>
                  <Badge className="bg-aws-blue text-white">In Progress</Badge>
                </div>
                <div className="p-6 flex items-center gap-4 hover:bg-accent/5 transition-colors duration-300">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Alexa Skills: Voice recognition model updated</p>
                    <p className="text-xs text-muted-foreground">by AI/ML Team • 2 hours ago</p>
                  </div>
                  <Badge className="bg-accent text-white">Deployed</Badge>
                </div>
                <div className="p-6 flex items-center gap-4 hover:bg-warning/5 transition-colors duration-300">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Marketplace: Payment gateway optimization</p>
                    <p className="text-xs text-muted-foreground">by Payments Team • 4 hours ago</p>
                  </div>
                  <Badge className="bg-warning text-black">Testing</Badge>
                </div>
                <div className="p-6 flex items-center gap-4 hover:bg-chart-2/5 transition-colors duration-300">
                  <div className="w-3 h-3 bg-chart-2 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Logistics: Route optimization algorithm deployed</p>
                    <p className="text-xs text-muted-foreground">by Logistics Engineering • 6 hours ago</p>
                  </div>
                  <Badge className="bg-chart-2 text-white">Live</Badge>
                </div>
                <div className="p-6 flex items-center gap-4 hover:bg-chart-4/5 transition-colors duration-300">
                  <div className="w-3 h-3 bg-chart-4 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Kindle: New reading experience features</p>
                    <p className="text-xs text-muted-foreground">by Reading Experience • 8 hours ago</p>
                  </div>
                  <Badge className="bg-chart-4 text-white">Beta</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;