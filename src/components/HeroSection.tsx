import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Brain, Zap, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

export const HeroSection: React.FC = () => {
  const handleFileSelect = (files: File[]) => {
    console.log('Selected files:', files);
    // TODO: Implement file processing logic
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                AI-Powered
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Cattle Vision
                </span>
                Recognition
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Instantly identify Indian cattle and buffalo breeds using advanced computer vision. 
                Perfect for farmers, researchers, and livestock professionals.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">AI Recognition</p>
                  <p className="text-sm text-muted-foreground">95%+ Accuracy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Instant Results</p>
                  <p className="text-sm text-muted-foreground">2-3 Seconds</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Secure & Private</p>
                  <p className="text-sm text-muted-foreground">Local Processing</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Upload Interface */}
          <div className="lg:pl-8">
            <Card className="p-8 bg-gradient-card shadow-elevated border-0">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Try It Now</h3>
                  <p className="text-muted-foreground">
                    Upload an image to identify the breed instantly
                  </p>
                </div>
                
                <FileUpload onFileSelect={handleFileSelect} />
                
                <div className="text-center text-sm text-muted-foreground">
                  Supports: Gir, Sahiwal, Red Sindhi, Murrah, Jaffarabadi & 15+ more breeds
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};