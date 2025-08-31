import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, Database, Cpu, Cloud, Shield, Zap } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Architecture</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built on modern AI infrastructure with scalability, security, and performance at its core.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="mb-16">
          <Card className="p-8 bg-gradient-card border-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Layer */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Cpu className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Input Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    Image preprocessing and normalization
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Image Capture</p>
                    <p className="text-xs text-muted-foreground">Mobile/Camera/Upload</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Preprocessing</p>
                    <p className="text-xs text-muted-foreground">Resize, Normalize, Augment</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Segmentation</p>
                    <p className="text-xs text-muted-foreground">Background removal</p>
                  </div>
                </div>
              </div>

              {/* AI Processing */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Database className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">AI Models</h3>
                  <p className="text-sm text-muted-foreground">
                    Deep learning and feature extraction
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">CNN Feature Extraction</p>
                    <p className="text-xs text-muted-foreground">ResNet-50 backbone</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Morphological Analysis</p>
                    <p className="text-xs text-muted-foreground">Horn, ear, hump detection</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Ensemble Classification</p>
                    <p className="text-xs text-muted-foreground">Multi-model prediction</p>
                  </div>
                </div>
              </div>

              {/* Output */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Results & Storage</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure output and data management
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Breed Prediction</p>
                    <p className="text-xs text-muted-foreground">95%+ confidence score</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Breed Information</p>
                    <p className="text-xs text-muted-foreground">Origin, characteristics</p>
                  </div>
                  <div className="p-3 bg-background rounded-lg">
                    <p className="text-sm font-medium">Database Storage</p>
                    <p className="text-xs text-muted-foreground">Secure record keeping</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 border-0 bg-card">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center space-x-3">
                <Code className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-bold">AI/ML Stack</h3>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">TensorFlow/PyTorch</Badge>
                <Badge variant="outline">OpenCV</Badge>
                <Badge variant="outline">ResNet-50</Badge>
                <Badge variant="outline">Computer Vision</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border-0 bg-card">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center space-x-3">
                <Cloud className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-bold">Infrastructure</h3>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">AWS/Azure</Badge>
                <Badge variant="outline">Docker</Badge>
                <Badge variant="outline">Kubernetes</Badge>
                <Badge variant="outline">Auto-scaling</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 border-0 bg-card">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-primary" />
                <h3 className="text-lg font-bold">Performance</h3>
              </div>
              <div className="space-y-2">
                <Badge variant="outline">GPU Acceleration</Badge>
                <Badge variant="outline">Edge Computing</Badge>
                <Badge variant="outline">Real-time API</Badge>
                <Badge variant="outline">CDN Delivery</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenges & Solutions */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Challenges & Our Solutions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Technical Challenges</h4>
              
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Crossbreeding Variations</p>
                    <p className="text-sm text-muted-foreground">Mixed breed features make identification complex</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Environmental Noise</p>
                    <p className="text-sm text-muted-foreground">Background objects, lighting, pose variations</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-destructive mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Limited Datasets</p>
                    <p className="text-sm text-muted-foreground">Scarce labeled Indian breed imagery</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Our Innovative Solutions</h4>
              
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Multi-Feature Analysis</p>
                    <p className="text-sm text-muted-foreground">Ensemble models for robust crossbreed handling</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Advanced Preprocessing</p>
                    <p className="text-sm text-muted-foreground">Segmentation and noise reduction pipelines</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Data Augmentation</p>
                    <p className="text-sm text-muted-foreground">Synthetic data generation and transfer learning</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};