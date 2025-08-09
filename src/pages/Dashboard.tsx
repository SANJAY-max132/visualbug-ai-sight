import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bug, 
  Plus, 
  Globe, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id: string;
  name: string;
  url: string;
  is_active: boolean;
  created_at: string;
}

interface Scan {
  id: string;
  project_id: string;
  status: string;
  bugs_found: number;
  started_at: string;
  completed_at: string | null;
}

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [scans, setScans] = useState<Scan[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch recent scans
      const { data: scansData } = await supabase
        .from('scans')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(5);

      setProjects(projectsData || []);
      setScans(scansData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: 'default',
      running: 'secondary',
      failed: 'destructive',
      pending: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Bug className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">VisualBug</span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{user?.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back!
          </h1>
          <p className="text-muted-foreground">
            Monitor your websites for UI bugs and keep your applications pixel-perfect.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scans.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bugs Found</CardTitle>
              <Bug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {scans.reduce((total, scan) => total + scan.bugs_found, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Your Projects</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
              <CardDescription>
                Websites and applications you're monitoring for bugs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No projects yet</p>
                  <Button variant="hero" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Project
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{project.name}</h4>
                        <p className="text-sm text-muted-foreground">{project.url}</p>
                      </div>
                      <Badge variant={project.is_active ? "default" : "secondary"}>
                        {project.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Scans */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>
                Latest bug detection results from your projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {scans.length === 0 ? (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No scans yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {scans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(scan.status)}
                        <div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(scan.status)}
                            <span className="text-sm font-medium">
                              {scan.bugs_found} bugs found
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(scan.started_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}