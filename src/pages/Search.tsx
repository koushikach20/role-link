import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft, FileText, GitBranch, MessageSquare, Filter, ExternalLink } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleResultClick = (type: string, id: string) => {
    if (type === 'github') {
      window.open(`https://github.com/example/${id}`, '_blank');
    } else if (type === 'document') {
      alert(`Opening document: ${id}`);
    } else {
      alert(`Opening ${type}: ${id}`);
    }
  };

  const mockResults = {
    all: [
      {
        id: 'aws-architecture',
        type: 'document',
        title: 'AWS Architecture Overview',
        description: 'Comprehensive guide to our AWS infrastructure setup and best practices',
        project: 'Amazon Web Services',
        lastModified: '2 hours ago',
        author: 'John Doe'
      },
      {
        id: 'payment-api',
        type: 'github',
        title: 'Payment API Implementation',
        description: 'Secure payment processing with Stripe integration',
        project: 'Netflix Platform', 
        lastModified: '4 hours ago',
        author: 'Jane Smith'
      },
      {
        id: 'ui-guidelines',
        type: 'note',
        title: 'UI Design Guidelines',
        description: 'Design system documentation and component library',
        project: 'Google Analytics',
        lastModified: '1 day ago',
        author: 'Mike Johnson'
      }
    ],
    docs: [
      {
        id: 'aws-architecture',
        type: 'document',
        title: 'AWS Architecture Overview',
        description: 'Comprehensive guide to our AWS infrastructure setup and best practices',
        project: 'Amazon Web Services',
        lastModified: '2 hours ago',
        author: 'John Doe'
      }
    ],
    github: [
      {
        id: 'payment-api',
        type: 'github',
        title: 'Payment API Implementation',
        description: 'Secure payment processing with Stripe integration',
        project: 'Netflix Platform',
        lastModified: '4 hours ago',
        author: 'Jane Smith'
      }
    ],
    notes: [
      {
        id: 'ui-guidelines',
        type: 'note',
        title: 'UI Design Guidelines',
        description: 'Design system documentation and component library',
        project: 'Google Analytics',
        lastModified: '1 day ago',
        author: 'Mike Johnson'
      }
    ]
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'github': return <GitBranch className="w-4 h-4" />;
      case 'note': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'github': return 'bg-green-100 text-green-800';
      case 'note': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-background border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2" onClick={handleBackToDashboard}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Search</h1>
              <div className="flex gap-4 mt-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search across all projects and resources..."
                    className="pl-10 pr-4 py-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button variant="default" onClick={handleSearch}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="docs">Documents</TabsTrigger>
            <TabsTrigger value="github">GitHub</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {Object.entries(mockResults).map(([key, results]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {searchTerm && (
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    Found {results.length} results for "{searchTerm}"
                  </p>
                </div>
              )}

              {results.map((result) => (
                <Card 
                  key={result.id} 
                  className="card-hover cursor-pointer"
                  onClick={() => handleResultClick(result.type, result.id)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getIcon(result.type)}
                        <div>
                          <CardTitle className="text-lg">{result.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {result.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(result.type)}>
                          {result.type}
                        </Badge>
                        {result.type === 'github' && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Project: {result.project}</span>
                      <span>•</span>
                      <span>by {result.author}</span>
                      <span>•</span>
                      <span>{result.lastModified}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {results.length === 0 && searchTerm && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">No results found in this category.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {!searchTerm && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Search across all your resources</h2>
            <p className="text-muted-foreground">
              Find documents, GitHub repositories, notes, and more across all your projects
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;