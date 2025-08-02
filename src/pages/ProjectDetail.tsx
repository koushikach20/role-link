import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, GitBranch, Clock, Shield, Lock, Star, Zap, Database, Globe } from "lucide-react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'Frontend Developer');
  }, []);

  const getSubProjects = (projectId: string) => {
    const projects = {
      'aws': [
        { id: 'ec2', name: 'EC2 Compute', description: 'Virtual servers and auto-scaling infrastructure', progress: 94, team: 145, commits: 2847, priority: 'high' },
        { id: 's3', name: 'S3 Storage', description: 'Global object storage and data lakes', progress: 98, team: 89, commits: 1923, priority: 'critical' },
        { id: 'lambda', name: 'Lambda Serverless', description: 'Event-driven serverless computing', progress: 87, team: 167, commits: 3456, priority: 'high' },
        { id: 'rds', name: 'RDS Database', description: 'Managed relational database services', progress: 91, team: 78, commits: 1567, priority: 'medium' },
        { id: 'eks', name: 'EKS Kubernetes', description: 'Managed Kubernetes container orchestration', progress: 85, team: 234, commits: 2890, priority: 'high' },
        { id: 'cloudfront', name: 'CloudFront CDN', description: 'Global content delivery network', progress: 96, team: 56, commits: 1234, priority: 'medium' }
      ],
      'prime': [
        { id: 'video', name: 'Prime Video', description: 'Streaming platform and content delivery', progress: 96, team: 456, commits: 5678, priority: 'critical' },
        { id: 'music', name: 'Prime Music', description: 'Music streaming and playlist management', progress: 88, team: 234, commits: 3421, priority: 'high' },
        { id: 'gaming', name: 'Prime Gaming', description: 'Game downloads and Twitch integration', progress: 82, team: 167, commits: 2890, priority: 'medium' },
        { id: 'delivery', name: 'Prime Delivery', description: 'Logistics and shipping optimization', progress: 94, team: 345, commits: 4532, priority: 'high' }
      ],
      'marketplace': [
        { id: 'catalog', name: 'Product Catalog', description: 'Product information and search engine', progress: 93, team: 567, commits: 6789, priority: 'critical' },
        { id: 'payments', name: 'Payment Systems', description: 'Transaction processing and fraud detection', progress: 97, team: 234, commits: 4567, priority: 'critical' },
        { id: 'fulfillment', name: 'Fulfillment Centers', description: 'Warehouse management and robotics', progress: 89, team: 789, commits: 8901, priority: 'high' },
        { id: 'recommendations', name: 'ML Recommendations', description: 'AI-powered product suggestions', progress: 91, team: 156, commits: 2345, priority: 'high' }
      ],
      'alexa': [
        { id: 'voice', name: 'Voice Recognition', description: 'Natural language processing engine', progress: 95, team: 234, commits: 4567, priority: 'critical' },
        { id: 'skills', name: 'Alexa Skills', description: 'Third-party skill development platform', progress: 87, team: 156, commits: 2890, priority: 'high' },
        { id: 'smart-home', name: 'Smart Home', description: 'IoT device integration and control', progress: 92, team: 189, commits: 3456, priority: 'high' }
      ],
      'logistics': [
        { id: 'transportation', name: 'Transportation', description: 'Fleet management and route optimization', progress: 91, team: 456, commits: 5678, priority: 'high' },
        { id: 'warehousing', name: 'Warehousing', description: 'Inventory management and automation', progress: 94, team: 567, commits: 6789, priority: 'critical' },
        { id: 'drones', name: 'Prime Air Drones', description: 'Autonomous delivery drone network', progress: 73, team: 123, commits: 1567, priority: 'experimental' }
      ],
      'kindle': [
        { id: 'reading', name: 'Reading Experience', description: 'E-reader software and features', progress: 93, team: 89, commits: 1890, priority: 'high' },
        { id: 'store', name: 'Kindle Store', description: 'Digital bookstore and purchasing', progress: 96, team: 67, commits: 1456, priority: 'medium' }
      ],
      'gaming': [
        { id: 'twitch', name: 'Twitch Platform', description: 'Live streaming and community features', progress: 95, team: 345, commits: 4567, priority: 'critical' },
        { id: 'luna', name: 'Amazon Luna', description: 'Cloud gaming streaming service', progress: 81, team: 167, commits: 2345, priority: 'high' }
      ],
      'healthcare': [
        { id: 'pharmacy', name: 'Amazon Pharmacy', description: 'Online prescription and delivery', progress: 89, team: 156, commits: 2345, priority: 'high' },
        { id: 'health', name: 'Amazon Health', description: 'Telehealth and wellness services', progress: 83, team: 123, commits: 1789, priority: 'medium' }
      ]
    };
    return projects[projectId as keyof typeof projects] || [];
  };

  const getProjectTitle = (projectId: string) => {
    const titles = {
      'aws': 'Amazon Web Services',
      'prime': 'Amazon Prime Services',
      'marketplace': 'Amazon Marketplace',
      'alexa': 'Amazon Alexa Ecosystem',
      'logistics': 'Amazon Logistics Network',
      'kindle': 'Amazon Kindle Platform',
      'gaming': 'Amazon Gaming Division',
      'healthcare': 'Amazon Healthcare Services'
    };
    return titles[projectId as keyof typeof titles] || 'Unknown Project';
  };

  const getProjectDescription = (projectId: string) => {
    const descriptions = {
      'aws': 'Global cloud infrastructure and platform services powering millions of applications',
      'prime': 'Premium subscription services including video, music, gaming, and delivery',
      'marketplace': 'E-commerce platform connecting millions of sellers and buyers worldwide',
      'alexa': 'Voice AI ecosystem with smart home integration and skill platform',
      'logistics': 'Global supply chain and delivery network optimization',
      'kindle': 'Digital reading platform and e-book ecosystem',
      'gaming': 'Gaming platform with live streaming and cloud gaming services',
      'healthcare': 'Healthcare technology solutions and pharmacy services'
    };
    return descriptions[projectId as keyof typeof descriptions] || 'Project description';
  };

  const handleRoleClick = (role: string, subProject: string) => {
    navigate(`/role/${role.toLowerCase().replace(' ', '-')}?project=${projectId}&subProject=${subProject}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleRequestAccess = (role: string) => {
    alert(`Access request sent to ${role} lead. You will be notified when approved.`);
  };

  const roles = [
    { name: 'Frontend Developer', icon: Globe, color: 'primary', description: 'React, TypeScript, UI/UX' },
    { name: 'Backend Developer', icon: Database, color: 'aws-blue', description: 'Node.js, Python, APIs' },
    { name: 'DevOps Engineer', icon: Zap, color: 'accent', description: 'AWS, Docker, CI/CD' },
    { name: 'Data Scientist', icon: Star, color: 'chart-4', description: 'ML, Analytics, AI' },
    { name: 'Mobile Developer', icon: Globe, color: 'chart-2', description: 'iOS, Android, React Native' },
    { name: 'Security Engineer', icon: Shield, color: 'destructive', description: 'Security, Compliance, Auditing' }
  ];

  const getPriorityBadge = (priority: string) => {
    const configs = {
      'critical': { variant: 'destructive', label: 'Critical' },
      'high': { variant: 'default', label: 'High Priority' },
      'medium': { variant: 'secondary', label: 'Medium' },
      'experimental': { variant: 'outline', label: 'Experimental' }
    };
    return configs[priority as keyof typeof configs] || configs.medium;
  };

  const subProjects = getSubProjects(projectId || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      <div className="bg-background/80 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="p-2 hover:bg-primary/10 transition-colors duration-300" 
              onClick={handleBackToDashboard}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="animate-fade-up">
              <h1 className="text-3xl font-bold gradient-text">{getProjectTitle(projectId || '')}</h1>
              <p className="text-muted-foreground mt-1">{getProjectDescription(projectId || '')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 gradient-text animate-fade-up">Service Components</h2>
              <div className="grid gap-6">
                {subProjects.map((subProject, index) => (
                  <Card 
                    key={subProject.id} 
                    className="card-hover-glow animate-bounce-in bg-gradient-to-br from-card via-secondary/5 to-primary/5 border-primary/20"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-xl">{subProject.name}</span>
                        <Badge 
                          variant={getPriorityBadge(subProject.priority).variant as any}
                          className="px-3 py-1"
                        >
                          {getPriorityBadge(subProject.priority).label}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-base">
                        {subProject.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-bold text-primary">{subProject.progress}%</span>
                        </div>
                        <Progress value={subProject.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {subProject.team} engineers
                        </span>
                        <span className="flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          {subProject.commits.toLocaleString()} commits
                        </span>
                      </div>

                      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {roles.map((role, roleIndex) => {
                          const isOwnRole = role.name === userRole;
                          const IconComponent = role.icon;
                          
                          return (
                            <Card 
                              key={role.name}
                              className={`card-hover cursor-pointer transition-all duration-300 ${
                                isOwnRole 
                                  ? `bg-gradient-to-br from-${role.color}/20 to-${role.color}/10 border-${role.color}/30 shadow-lg` 
                                  : 'opacity-75 hover:opacity-100 bg-gradient-to-br from-muted/50 to-background'
                              }`}
                              onClick={() => {
                                if (isOwnRole) {
                                  handleRoleClick(role.name, subProject.name);
                                } else {
                                  handleRequestAccess(role.name);
                                }
                              }}
                            >
                              <CardHeader className="p-4">
                                <CardTitle className="text-sm flex items-center gap-2">
                                  <IconComponent className={`w-4 h-4 ${isOwnRole ? `text-${role.color}` : 'text-muted-foreground'}`} />
                                  {role.name}
                                  {!isOwnRole && <Lock className="w-3 h-3 ml-auto" />}
                                </CardTitle>
                                <CardDescription className="text-xs">
                                  {role.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <Badge 
                                  variant={isOwnRole ? 'default' : 'outline'}
                                  className={`text-xs ${
                                    isOwnRole 
                                      ? `bg-${role.color} text-white` 
                                      : ''
                                  }`}
                                >
                                  {isOwnRole ? 'Full Access' : 'Restricted'}
                                </Badge>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="card-hover-glow animate-fade-up bg-gradient-to-br from-card to-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Project Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Components</span>
                  <div className="flex items-center gap-1">
                    <Database className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">{subProjects.length}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Engineers</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-aws-blue" />
                    <span className="font-bold text-aws-blue">
                      {subProjects.reduce((acc, proj) => acc + proj.team, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Commits</span>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4 text-accent" />
                    <span className="font-bold text-accent">
                      {subProjects.reduce((acc, proj) => acc + proj.commits, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Progress</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning" />
                    <span className="font-bold text-warning">
                      {Math.round(subProjects.reduce((acc, proj) => acc + proj.progress, 0) / subProjects.length)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover animate-fade-up bg-gradient-to-br from-card to-aws-blue/5 border-aws-blue/20" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-aws-blue">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Production deployment successful</p>
                      <p className="text-xs text-muted-foreground">Lambda functions updated</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New feature branch created</p>
                      <p className="text-xs text-muted-foreground">Payment gateway integration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-aws-blue/10 border border-aws-blue/20">
                    <div className="w-2 h-2 bg-aws-blue rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Documentation updated</p>
                      <p className="text-xs text-muted-foreground">API reference guide</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;