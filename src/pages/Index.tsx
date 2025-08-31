import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { BreedGallery } from '@/components/BreedGallery';
import { HowItWorks } from '@/components/HowItWorks';
import { ApplicationsSection } from '@/components/ApplicationsSection';
import { TechnologySection } from '@/components/TechnologySection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BreedGallery />
      <HowItWorks />
      <ApplicationsSection />
      <TechnologySection />
    </div>
  );
};

export default Index;
