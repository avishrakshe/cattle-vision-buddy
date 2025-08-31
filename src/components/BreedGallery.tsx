import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Award, Milk } from 'lucide-react';
import murrahImage from '@/assets/murrah-buffalo.jpg';
import girImage from '@/assets/gir-cattle.jpg';

const breeds = [
  {
    id: 1,
    name: 'Murrah Buffalo',
    type: 'Buffalo',
    origin: 'Haryana, Punjab',
    image: murrahImage,
    features: ['Curved horns', 'Black coat', 'High milk yield'],
    milkYield: '12-15 L/day',
    specialty: 'Premium milk producer'
  },
  {
    id: 2,
    name: 'Gir Cattle',
    type: 'Cattle',
    origin: 'Gujarat',
    image: girImage,
    features: ['Distinctive hump', 'Long ears', 'White-brown coat'],
    milkYield: '8-12 L/day',
    specialty: 'Disease resistant'
  },
  {
    id: 3,
    name: 'Sahiwal Cattle',
    type: 'Cattle',
    origin: 'Punjab, Pakistan',
    image: girImage, // Placeholder
    features: ['Red-brown coat', 'Medium hump', 'Droopy ears'],
    milkYield: '10-14 L/day',
    specialty: 'Heat tolerant'
  },
  {
    id: 4,
    name: 'Jaffarabadi Buffalo',
    type: 'Buffalo',
    origin: 'Gujarat',
    image: murrahImage, // Placeholder
    features: ['Large size', 'Curved horns', 'Dark coat'],
    milkYield: '10-12 L/day',
    specialty: 'Largest buffalo breed'
  }
];

export const BreedGallery: React.FC = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Indian Breeds We Recognize</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI can identify 20+ indigenous cattle and buffalo breeds with high accuracy,
            helping preserve and promote India's rich livestock heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {breeds.map((breed) => (
            <Card key={breed.id} className="group hover:shadow-elevated transition-all duration-300 overflow-hidden border-0 bg-card">
              <div className="relative overflow-hidden">
                <img 
                  src={breed.image} 
                  alt={breed.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant={breed.type === 'Cattle' ? 'default' : 'secondary'}>
                    {breed.type}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{breed.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {breed.origin}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <Milk className="w-4 h-4 mr-2 text-accent" />
                      <span className="font-medium">{breed.milkYield}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Award className="w-4 h-4 mr-1 text-primary" />
                      <span className="text-xs">{breed.specialty}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {breed.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to see more breeds? Our system recognizes 20+ indigenous varieties.
          </p>
          <Badge variant="outline" className="text-sm px-4 py-2">
            Red Sindhi • Kankrej • Ongole • Hariana • Mehsana • Surti • Nagpuri
          </Badge>
        </div>
      </div>
    </section>
  );
};