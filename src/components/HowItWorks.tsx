import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Brain, Scan, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Take a photo or upload an image of your cattle/buffalo',
    details: 'Support for JPEG, PNG formats. Works with mobile camera or gallery images.'
  },
  {
    icon: Scan,
    title: 'AI Processing',
    description: 'Our CNN model analyzes key features like horns, ears, coat, and body structure',
    details: 'Advanced computer vision extracts 50+ morphological features in real-time.'
  },
  {
    icon: Brain,
    title: 'Feature Analysis',
    description: 'Deep learning algorithms compare against trained breed patterns',
    details: 'Trained on 10,000+ images of authenticated Indian cattle and buffalo breeds.'
  },
  {
    icon: CheckCircle,
    title: 'Breed Identification',
    description: 'Get instant results with confidence score and breed information',
    details: '95%+ accuracy with detailed breed info, origin, and characteristics.'
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How Our AI Recognition Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced computer vision pipeline uses state-of-the-art deep learning 
            to identify cattle and buffalo breeds with exceptional accuracy.
          </p>
        </div>

        {/* Process Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="p-6 text-center hover:shadow-soft transition-all duration-300 border-0 bg-gradient-card">
                  <CardContent className="p-0 space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 -right-12 w-24 h-0.5 bg-gradient-to-r from-primary to-primary/30" />
                      )}
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-primary mb-2">
                        Step {index + 1}
                      </div>
                      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {step.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.details}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Technology Stack */}
        <div className="bg-muted/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Powered by Advanced Technology</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Convolutional Neural Networks</h4>
              <p className="text-sm text-muted-foreground">
                ResNet-50 architecture fine-tuned on livestock imagery for optimal feature extraction
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Scan className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Computer Vision Pipeline</h4>
              <p className="text-sm text-muted-foreground">
                Advanced preprocessing with segmentation and morphological analysis
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Ensemble Learning</h4>
              <p className="text-sm text-muted-foreground">
                Multiple model predictions combined for maximum accuracy and reliability
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};