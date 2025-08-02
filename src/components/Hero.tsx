import { Button } from '@/components/ui/button';
import { Shield, Clock, Award, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(/lovable-uploads/9cca4691-daca-4cb2-9beb-22f58ce4ebc9.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Pioneers in advanced medical and diagnostic services - Trusted by KARAULI
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                अत्यधिक मेडिकल एवं डायग्नोस्टिक सेवा में अग्रणी करौली की विश्वसनीय लैब
              </h2>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                Advanced diagnostic services with accurate results you can trust. 
                ISO certified laboratory serving Karauli with cutting-edge technology.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center p-4 bg-white/50 rounded-lg">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium text-center">ISO Certified</span>
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
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5000+</div>
                <div className="text-sm text-white/80">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-white/80">Tests Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99.9%</div>
                <div className="text-sm text-white/80">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;