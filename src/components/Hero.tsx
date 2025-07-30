import { Button } from '@/components/ui/button';
import { Shield, Clock, Award, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-lab.jpg';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen bg-gradient-to-br from-medical-trust via-white to-accent relative overflow-hidden"
      style={{
        backgroundImage: `url('/lovable-uploads/a9a07be7-29a4-4b4e-8c22-e58a87d7d557.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-trust/80 via-white/90 to-accent/80"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Your Health is Our{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Priority
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Advanced diagnostic services with accurate results you can trust. 
                NABL accredited laboratory serving Karauli with cutting-edge technology.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">NABL Certified</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">Quick Reports</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Award className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">Expert Team</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">100% Accurate</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta" size="xl" asChild>
                <a href="tel:9403892093">Book Test Now</a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#tests">View All Tests</a>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-3xl font-bold text-primary">5000+</div>
                <div className="text-sm text-muted-foreground">Happy Patients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Tests Available</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-up">
            <div className="relative">
              <img
                src="/lovable-uploads/240163de-4a3f-453d-86d1-9d29c73007ce.png"
                alt="Prathmam Medicare Labs - Serving Families with Care"
                className="rounded-2xl shadow-2xl w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-card border">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">ISO 15189:2012</div>
                  <div className="text-sm text-muted-foreground">Certified Laboratory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;