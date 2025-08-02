import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, GitBranch, Clock, Shield, Lock } from "lucide-react";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role || 'Frontend Developer');
  }, []);

  const handleRoleClick = (role: string, subProject: string) => {
    navigate(`/role/${role.toLowerCase().replace(' ', '-')}?project=${projectId}&subProject=${subProject}`);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const getProjectName = () => {
    switch(projectId) {
      case 'aws': return 'Amazon Web Services';
      case 'netflix': return 'Netflix Platform';
      case 'google': return 'Google Analytics';
      default: return 'Project';
    }
  };

  const handleRequestAccess = (role: string) => {
    alert(`Access request sent to ${role} lead. You will be notified when approved.`);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-background border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{getProjectName()}</h1>
              <p className="text-muted-foreground">Cloud infrastructure and microservices platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Sub-Projects</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      UI Redesign
                      <Badge variant="secondary">In Progress</Badge>
                    </CardTitle>
                    <CardDescription>
                      Modern interface overhaul with improved UX
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={75} className="mb-4" />
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card 
                        className="card-hover cursor-pointer"
                        onClick={() => handleRoleClick('Frontend Developer', 'UI Redesign')}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">Frontend Developer</CardTitle>
                          <CardDescription>React, TypeScript, UI/UX</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Access Level</span>
                            <Badge variant="secondary">Full Access</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            You have full access to all frontend resources
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="card-hover cursor-pointer opacity-75">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            Backend Developer
                            <Lock className="w-4 h-4" />
                          </CardTitle>
                          <CardDescription>Node.js, Python, APIs</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Access Level</span>
                            <Badge variant="outline">Restricted</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Request access to view backend resources
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAccess('Backend Developer');
                            }}
                          >
                            Request Access
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="card-hover cursor-pointer opacity-75">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            DevOps Engineer
                            <Lock className="w-4 h-4" />
                          </CardTitle>
                          <CardDescription>AWS, Docker, CI/CD</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Access Level</span>
                            <Badge variant="outline">Restricted</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Request access to view DevOps resources
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAccess('DevOps Engineer');
                            }}
                          >
                            Request Access
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Payments API
                      <Badge variant="outline">Planning</Badge>
                    </CardTitle>
                    <CardDescription>
                      Secure payment processing integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={25} className="mb-4" />
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="card-hover cursor-pointer opacity-75">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            Frontend Developer
                            <Lock className="w-4 h-4" />
                          </CardTitle>
                          <CardDescription>React, TypeScript, UI/UX</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Access Level</span>
                            <Badge variant="outline">Restricted</Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAccess('Frontend Developer (Payments)');
                            }}
                          >
                            Request Access
                          </Button>
                        </CardContent>
                      </Card>

                      <Card 
                        className="card-hover cursor-pointer"
                        onClick={() => handleRoleClick('Backend Developer', 'Payments API')}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg">Backend Developer</CardTitle>
                          <CardDescription>Node.js, Python, APIs</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Access Level</span>
                            <Badge variant="secondary">Full Access</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="card-hover cursor-pointer opacity-75">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            DevOps Engineer
                            <Lock className="w-4 h-4" />
                          </CardTitle>
                          <CardDescription>AWS, Docker, CI/CD</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Access Level</span>
                            <Badge variant="outline">Restricted</Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            className="w-full mt-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRequestAccess('DevOps Engineer (Payments)');
                            }}
                          >
                            Request Access
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Project Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team Members</span>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">24</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Branches</span>
                  <div className="flex items-center gap-1">
                    <GitBranch className="w-4 h-4" />
                    <span className="font-medium">8</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">2h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">PR merged</p>
                      <p className="text-xs text-muted-foreground">UI components update</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Document uploaded</p>
                      <p className="text-xs text-muted-foreground">API documentation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Access requested</p>
                      <p className="text-xs text-muted-foreground">Backend resources</p>
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