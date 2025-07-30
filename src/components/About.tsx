import { Users, Target, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const About = () => {
  const team = [{
    name: "Dr. Pooja Bansal",
    role: "Lab Director",
    description: "Leading pathologist with 15+ years of experience in diagnostic medicine."
  }, {
    name: "Nipun Bansal",
    role: "Chief Executive Officer",
    description: "Healthcare management expert focused on quality and innovation."
  }];
  const values = [{
    icon: Target,
    title: "Accuracy",
    description: "Precise results using state-of-the-art equipment and rigorous quality control."
  }, {
    icon: Heart,
    title: "Care",
    description: "Patient-centered approach with compassionate service and support."
  }, {
    icon: Award,
    title: "Excellence",
    description: "Continuous improvement and adherence to international standards."
  }, {
    icon: Users,
    title: "Trust",
    description: "Building lasting relationships through reliability and transparency."
  }];
  return <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About <span className="text-primary">Prathmam Medicare Labs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Established with a vision to provide world-class diagnostic services in Karauli, 
            we are committed to accuracy, reliability, and patient care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Leading Healthcare Innovation in Rajasthan
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Since our inception, Prathmam Medicare Labs has been at the forefront of 
              diagnostic excellence in Karauli. We combine cutting-edge technology with 
              experienced professionals to deliver accurate results that healthcare 
              providers and patients can rely on.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our NABL-accredited laboratory follows international quality standards, 
              ensuring that every test meets the highest benchmarks of accuracy and reliability. 
              We serve both individual patients and healthcare institutions across the region.
            </p>
            
            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-primary">NABL</div>
                <div className="text-sm text-muted-foreground">Accredited</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-primary">ISO</div>
                <div className="text-sm text-muted-foreground">Certified</div>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Our Leadership</h3>
            {team.map((member, index) => <Card key={index} className="border-none shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-foreground mb-1">
                        {member.name}
                      </h4>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <Card key={index} className="text-center border-none shadow-card hover:shadow-medical transition-shadow">
                <CardContent className="p-8">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </div>
    </section>;
};
export default About;