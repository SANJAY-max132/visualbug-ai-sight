import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Brain, Zap, Shield, Clock, Target } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description: "Advanced machine learning algorithms trained on millions of UI patterns to detect even the subtlest visual inconsistencies.",
    color: "text-primary"
  },
  {
    icon: Eye,
    title: "Visual Regression Testing",
    description: "Automatically compare screenshots across deployments to catch unintended visual changes before they reach production.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Get instant feedback during development with our live preview integration. Fix bugs as you code, not after deployment.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Cross-Browser Coverage",
    description: "Test across all major browsers and devices simultaneously. Ensure consistent user experience everywhere.",
    color: "text-accent"
  },
  {
    icon: Clock,
    title: "Automated Workflows",
    description: "Integrate seamlessly into your CI/CD pipeline. Run visual tests on every commit and pull request automatically.",
    color: "text-primary"
  },
  {
    icon: Target,
    title: "Precision Targeting",
    description: "Smart component-level analysis that identifies exactly which elements have issues and suggests specific fixes.",
    color: "text-accent"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything You Need for
            <span className="text-transparent bg-gradient-primary bg-clip-text block">
              Perfect UI Quality
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools ensures your UI is pixel-perfect, 
            consistent, and bug-free across all platforms and devices.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group border-border hover:shadow-card transition-all duration-300 hover:border-primary/20 bg-card/50 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-primary/10 border border-primary/20 mb-4 group-hover:shadow-glow transition-all duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}