import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Brain, Zap, Shield, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-bg.jpg';

interface BreedAnalysis {
  breedName: string;
  confidence: number;
  type: 'cattle' | 'buffalo';
  origin: string;
  characteristics: string[];
  milkYield: string;
  specialty: string;
  description: string;
}

export const HeroSection: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<BreedAnalysis | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    setAnalysis(null);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const analyzeImage = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      const base64Image = await convertFileToBase64(selectedFiles[0]);
      
      const { data, error } = await supabase.functions.invoke('analyze-cattle', {
        body: { image: base64Image }
      });

      if (error) {
        console.error('Error analyzing image:', error);
        const msg = (error as any)?.message?.includes('non-2xx')
          ? 'The AI is busy (rate limited). Please try again in a few seconds.'
          : 'Failed to analyze the image. Please try again.';
        toast({
          title: 'Analysis failed',
          description: msg,
          variant: 'destructive'
        });
        return;
      }

      if (data.success) {
        setAnalysis(data.analysis);
        toast({
          title: "Analysis complete",
          description: `Identified as ${data.analysis.breedName} with ${data.analysis.confidence}% confidence`,
        });
      } else {
        toast({
          title: "Analysis failed",
          description: data.error || "Failed to analyze the image",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
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
                
                {selectedFiles.length > 0 && (
                  <Button 
                    onClick={analyzeImage} 
                    disabled={isAnalyzing}
                    className="w-full"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze Breed'
                    )}
                  </Button>
                )}

                {analysis && (
                  <Card className="p-6 bg-background border border-primary/20">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-bold text-primary">{analysis.breedName}</h4>
                        <div className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {analysis.confidence}% confidence
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Type:</span> {analysis.type}
                        </div>
                        <div>
                          <span className="font-medium">Origin:</span> {analysis.origin}
                        </div>
                        <div>
                          <span className="font-medium">Milk Yield:</span> {analysis.milkYield}
                        </div>
                        <div>
                          <span className="font-medium">Specialty:</span> {analysis.specialty}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-2">Key Characteristics:</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.characteristics.map((char, index) => (
                            <span 
                              key={index}
                              className="text-xs bg-muted px-2 py-1 rounded-md"
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="font-medium mb-2">About this breed:</p>
                        <p className="text-sm text-muted-foreground">{analysis.description}</p>
                      </div>
                    </div>
                  </Card>
                )}
                
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