import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, Upload, FileText, Download, ExternalLink, Eye, 
  GitBranch, CheckCircle, Clock, XCircle, Calendar, User 
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  file: File;
}

const RoleResource = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const project = searchParams.get('project');
  const subProject = searchParams.get('subProject');
  const userRole = localStorage.getItem('userRole') || 'Frontend Developer';

  useEffect(() => {
    // Load saved files from localStorage
    const savedFiles = localStorage.getItem('uploadedFiles');
    if (savedFiles) {
      const parsedFiles = JSON.parse(savedFiles);
      setFiles(parsedFiles.map((file: any) => ({
        ...file,
        uploadedAt: new Date(file.uploadedAt)
      })));
    }
  }, []);

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    const newFiles: UploadedFile[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      file
    }));

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    
    // Save to localStorage
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles.map(f => ({
      ...f,
      file: undefined // Don't store file object in localStorage
    }))));

    alert(`Successfully uploaded ${newFiles.length} file(s)!`);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDownload = (file: UploadedFile) => {
    if (file.file) {
      const url = URL.createObjectURL(file.file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleViewFile = (file: UploadedFile) => {
    setSelectedFile(file);
    setViewerOpen(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleBackToProject = () => {
    navigate(`/project/${project}`);
  };

  const githubActivity = [
    {
      id: 1,
      title: "Fix button styles in header component",
      status: "merged",
      pr: "#123",
      author: "John Doe",
      date: "2 hours ago",
      link: "https://github.com/example/repo/pull/123"
    },
    {
      id: 2,
      title: "Add responsive design for mobile",
      status: "pending",
      pr: "#124",
      author: "Jane Smith", 
      date: "4 hours ago",
      link: "https://github.com/example/repo/pull/124"
    },
    {
      id: 3,
      title: "Update TypeScript configurations",
      status: "rejected",
      pr: "#122",
      author: "Mike Johnson",
      date: "1 day ago",
      link: "https://github.com/example/repo/pull/122"
    }
  ];

  const timeline = [
    {
      id: 1,
      action: "Document uploaded",
      description: "UI Component Guidelines.pdf",
      user: "You",
      timestamp: "2 hours ago",
      type: "upload"
    },
    {
      id: 2,
      action: "GitHub PR merged",
      description: "Fix button styles in header component",
      user: "John Doe",
      timestamp: "4 hours ago",
      type: "github"
    },
    {
      id: 3,
      action: "Access granted",
      description: "Backend Developer resources",
      user: "Admin",
      timestamp: "1 day ago",
      type: "access"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'merged': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderFileViewer = () => {
    if (!selectedFile || !selectedFile.file) return null;

    const file = selectedFile.file;
    const fileUrl = URL.createObjectURL(file);

    if (file.type.startsWith('image/')) {
      return <img src={fileUrl} alt={selectedFile.name} className="max-w-full h-auto" />;
    } else if (file.type === 'application/pdf') {
      return (
        <iframe 
          src={fileUrl} 
          className="w-full h-96"
          title={selectedFile.name}
        />
      );
    } else if (file.type.startsWith('text/')) {
      return (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Text file preview not available. Click download to view the file.</p>
        </div>
      );
    } else {
      return (
        <div className="text-center p-8">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Preview not available for this file type</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => handleDownload(selectedFile)}
          >
            Download to View
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-background border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="p-2" onClick={handleBackToProject}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{userRole} Resources</h1>
              <p className="text-muted-foreground">{project} → {subProject}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="github">GitHub Activity</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Documents
                </CardTitle>
                <CardDescription>
                  Upload PDFs, documents, or any files related to your role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drop files here</h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse your files
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>
                  Manage your uploaded files and resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                {files.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No documents uploaded yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <FileText className="w-8 h-8 text-primary" />
                        <div className="flex-1">
                          <h4 className="font-medium">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleViewFile(file)}
                            className="p-2"
                            title="View file"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              const url = URL.createObjectURL(file.file);
                              window.open(url, '_blank');
                            }}
                            className="p-2"
                            title="Open in new tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleDownload(file)}
                            className="p-2"
                            title="Download file"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="github" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  GitHub Activity
                </CardTitle>
                <CardDescription>
                  Recent pull requests and commits for your role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {githubActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => window.open(activity.link, '_blank')}
                    >
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {activity.pr} by {activity.author} • {activity.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={activity.status === 'merged' ? 'default' : 'outline'}
                          className={
                            activity.status === 'merged' ? 'bg-green-100 text-green-800' :
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {activity.status}
                        </Badge>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activity Timeline
                </CardTitle>
                <CardDescription>
                  Chronological view of all project activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.type === 'upload' ? 'bg-blue-500' :
                        item.type === 'github' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{item.action}</h4>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{item.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" />
                          <span className="text-xs text-muted-foreground">{item.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* File Viewer Dialog */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
            <DialogDescription>
              {selectedFile && formatFileSize(selectedFile.size)} • 
              {selectedFile?.uploadedAt.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {renderFileViewer()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleResource;