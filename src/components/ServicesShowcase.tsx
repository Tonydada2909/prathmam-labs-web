import { TestTube, Microscope, Heart, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServicesShowcase = () => {
  const services = [
    {
      icon: TestTube,
      title: "Laboratory Testing",
      description: "Comprehensive blood tests, biochemistry, and specialized diagnostic tests",
      image: "/lovable-uploads/b4f43511-f037-4e00-8622-12f6d1c4a653.png"
    },
    {
      icon: Microscope,
      title: "Pathology Services",
      description: "Expert pathological analysis with accurate and timely results",
      image: "/lovable-uploads/fdfcdc54-b7bc-4c52-a080-da0e3354e978.png"
    },
    {
      icon: Heart,
      title: "Health Monitoring",
      description: "Regular health checkups and monitoring for diabetes and other conditions",
      image: "/lovable-uploads/287bfd2f-2f1f-43be-8391-995acac3fa03.png"
    },
    {
      icon: Activity,
      title: "Health Packages",
      description: "Comprehensive health packages designed for different age groups and needs",
      image: "/lovable-uploads/6dcedb14-8ca1-479b-8e98-59885c68e8d9.png"
    }
  ];

  return (
    <section className="py-20 bg-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive diagnostic services with state-of-the-art technology and expert care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-card hover:shadow-medical transition-all duration-300 group overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;