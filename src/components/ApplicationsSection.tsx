import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Database, Shield, TrendingUp, Users, FileText } from 'lucide-react';

const applications = [
  {
    icon: Smartphone,
    title: 'Mobile App for Farmers',
    description: 'Take photos in the field and get instant breed identification',
    benefits: ['Quick breed verification', 'Offline capability', 'Simple interface'],
    users: 'Small & large-scale farmers'
  },
  {
    icon: Database,
    title: 'Livestock Management',
    description: 'Integrate with farm management systems for record keeping',
    benefits: ['Automated cataloging', 'Breeding programs', 'Health tracking'],
    users: 'Dairy farms, cattle ranchers'
  },
  {
    icon: Shield,
    title: 'Insurance & Verification',
    description: 'Verify breed authenticity for insurance claims and subsidies',
    benefits: ['Fraud prevention', 'Quick claims', 'Government schemes'],
    users: 'Insurance companies, govt agencies'
  },
  {
    icon: TrendingUp,
    title: 'Research & Analytics',
    description: 'Study breed populations and genetic diversity patterns',
    benefits: ['Population studies', 'Conservation efforts', 'Data insights'],
    users: 'Researchers, veterinary institutes'
  },
  {
    icon: Users,
    title: 'Breeding Programs',
    description: 'Select optimal breeding pairs based on breed characteristics',
    benefits: ['Genetic improvement', 'Milk yield optimization', 'Disease resistance'],
    users: 'Breeding centers, AI stations'
  },
  {
    icon: FileText,
    title: 'Market & Trading',
    description: 'Authenticate breeds for fair pricing in livestock markets',
    benefits: ['Fair valuation', 'Market transparency', 'Quality assurance'],
    users: 'Livestock traders, markets'
  }
];

export const ApplicationsSection: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Real-World Applications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cattle recognition technology serves diverse stakeholders across 
            the livestock ecosystem, from individual farmers to large institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => {
            const Icon = app.icon;
            return (
              <Card key={index} className="group hover:shadow-elevated transition-all duration-300 border-0 bg-card overflow-hidden">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{app.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-2">Key Benefits:</p>
                      <div className="space-y-1">
                        {app.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">Target Users:</p>
                      <Badge variant="outline" className="text-xs">
                        {app.users}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">300M+</div>
            <p className="text-sm text-muted-foreground">Cattle in India</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <p className="text-sm text-muted-foreground">Recognized Breeds</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2-3s</div>
            <p className="text-sm text-muted-foreground">Processing Time</p>
          </div>
        </div>
      </div>
    </section>
  );
};