import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Scan, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your UI",
    description: "Simply upload screenshots, connect your staging environment, or integrate with your design tools.",
    color: "text-primary"
  },
  {
    icon: Scan,
    step: "02", 
    title: "AI Analysis",
    description: "Our machine learning models analyze every pixel, comparing against design systems and best practices.",
    color: "text-accent"
  },
  {
    icon: AlertTriangle,
    step: "03",
    title: "Issue Detection",
    description: "Get detailed reports highlighting inconsistencies, alignment issues, typography problems, and more.",
    color: "text-primary"
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Fix & Verify",
    description: "Apply suggested fixes and re-run analysis to ensure all issues are resolved before deployment.",
    color: "text-accent"
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
      
      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Scan className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">How It Works</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Four Simple Steps to
            <span className="text-transparent bg-gradient-primary bg-clip-text block">
              Bug-Free UI
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our streamlined workflow makes it easy to integrate visual testing into your development process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-scale-in" style={{ animationDelay: `${index * 200}ms` }}>
              <Card className="h-full border-border hover:shadow-card transition-all duration-300 hover:border-primary/20 bg-card/80 backdrop-blur-sm group">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="text-xs font-mono text-muted-foreground mb-4">{step.step}</div>
                  
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-primary/10 border border-primary/20 mb-6 group-hover:shadow-glow transition-all duration-300">
                    <step.icon className={`h-8 w-8 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <Button variant="hero" size="lg" className="group">
            See It In Action
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}