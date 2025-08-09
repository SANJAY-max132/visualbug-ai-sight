import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Zap, Eye, Brain } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartTrial = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const handleWatchDemo = () => {
    // You can implement demo functionality later
    console.log('Demo functionality coming soon');
  };
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Bug Detection</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Find UI Bugs
              <span className="text-transparent bg-gradient-primary bg-clip-text block">
                Before Users Do
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              VisualBug uses advanced machine learning to automatically detect UI inconsistencies, 
              layout issues, and visual bugs across your entire application. Deploy with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" className="group" onClick={handleStartTrial}>
                {user ? 'Go to Dashboard' : 'Start Free Trial'}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group" onClick={handleWatchDemo}>
                <Play className="h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">99.2%</div>
                <div className="text-sm text-muted-foreground">Bug Detection</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50ms</div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">10,000+</div>
                <div className="text-sm text-muted-foreground">Apps Tested</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative bg-card rounded-2xl shadow-card overflow-hidden border border-border">
              <img 
                src={heroImage} 
                alt="VisualBug AI detecting UI bugs" 
                className="w-full h-auto"
              />
              
              {/* Floating cards */}
              <div className="absolute top-4 right-4 bg-card border border-border rounded-lg p-3 shadow-elegant animate-fade-in">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">3 issues detected</span>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-elegant animate-fade-in">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium">AI Analysis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}