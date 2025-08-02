import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Knowledge Transfer assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(message),
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('upload') || lowerMessage.includes('document')) {
      return "To upload documents, go to your role's resource page and use the drag & drop area or click 'Choose Files'.";
    } else if (lowerMessage.includes('access') || lowerMessage.includes('permission')) {
      return "To request access to other roles' resources, click on their role card and use the 'Request Access' button.";
    } else if (lowerMessage.includes('github') || lowerMessage.includes('commit')) {
      return "GitHub activity is automatically synced and displayed in your role's resource page timeline.";
    } else if (lowerMessage.includes('search')) {
      return "Use the search bar at the top to find documents, GitHub repos, or notes across all projects.";
    } else if (lowerMessage.includes('navigation') || lowerMessage.includes('navigate')) {
      return "Use the sidebar to navigate between projects, or click the back arrow to return to the dashboard.";
    } else if (lowerMessage.includes('role') || lowerMessage.includes('team')) {
      return "Each project has different roles (Frontend, Backend, DevOps) with specific access permissions. You can request access to view other roles' resources.";
    } else {
      return "I can help you navigate the platform, understand features, or provide guidance on uploading documents and managing access permissions. Feel free to ask specific questions!";
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setMessage(query);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full shadow-elegant bg-primary hover:bg-primary/90"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]">
          <Card className="shadow-elegant animate-scale-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Knowledge Assistant
                <Badge variant="secondary" className="ml-auto">Online</Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="flex-1 p-4 overflow-y-auto max-h-80">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.sender === 'bot' ? 'bg-primary' : 'bg-secondary'
                      }`}>
                        {msg.sender === 'bot' ? (
                          <Bot className="w-4 h-4 text-primary-foreground" />
                        ) : (
                          <User className="w-4 h-4 text-secondary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`p-3 rounded-lg ${
                          msg.sender === 'bot' ? 'bg-muted' : 'bg-primary text-primary-foreground'
                        }`}>
                          <p className="text-sm">{msg.text}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {messages.length === 1 && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full text-left justify-start text-sm"
                        onClick={() => handleSuggestedQuery("How do I upload documents?")}
                      >
                        How do I upload documents?
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-left justify-start text-sm"
                        onClick={() => handleSuggestedQuery("Where can I find GitHub activity?")}
                      >
                        Where can I find GitHub activity?
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-left justify-start text-sm"
                        onClick={() => handleSuggestedQuery("How do I request access to other roles?")}
                      >
                        How do I request access to other roles?
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ask me anything..."
                    className="flex-1 text-sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;