import { Users, Target, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const About = () => {
  const team = [{
    name: "Dr. Pooja Bansal",
    role: "Founder & Director",
    description: "Leading pathologist with 15+ years of experience in diagnostic medicine.",
    image: "/lovable-uploads/8d40fa16-3275-4a02-8b1f-1bb5664353ba.png"
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

        {/* Founder's Message */}
        <div className="mb-20">
          <Card className="border-none shadow-medical bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">Message from Our Founder</h3>
                <h3 className="text-xl font-bold text-foreground mb-4">संस्थापक का संदेश</h3>
              </div>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img 
                    src="/lovable-uploads/8d40fa16-3275-4a02-8b1f-1bb5664353ba.png" 
                    alt="Smt. Pooja Bansal, Founder & Director"
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 text-center lg:text-left space-y-6">
                  <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                    "At Prathmam Medicare Labs, our mission is deeply rooted in care, quality, and community. 
                    As a woman founder and a mother, I understand the importance of trust in healthcare. 
                    We are committed to providing accurate, affordable, and timely diagnostic services to every family—especially in underserved regions like ours. 
                    Our vision is to build a lab that feels like your partner in health, where compassion meets science. 
                    Our values are integrity, accessibility, and a relentless pursuit of excellence."
                  </blockquote>
                  
                  <blockquote className="text-lg text-muted-foreground leading-relaxed italic">
                    "प्रथमम् मेडिकेयर लैब्स में, हमारा मिशन देखभाल, गुणवत्ता और समुदाय में गहराई से निहित है। 
                    एक महिला संस्थापक और माता के रूप में, मैं स्वास्थ्य सेवा में विश्वास के महत्व को समझती हूं। 
                    हम हर परिवार को सटीक, किफायती और समय पर निदान सेवाएं प्रदान करने के लिए प्रतिबद्ध हैं—विशेष रूप से हमारे जैसे वंचित क्षेत्रों में। 
                    हमारा दृष्टिकोण एक ऐसी प्रयोगशाला बनाना है जो आपके स्वास्थ्य में साझेदार की तरह महसूस हो, जहां करुणा विज्ञान से मिलती है। 
                    हमारे मूल्य अखंडता, पहुंच और उत्कृष्टता की अथक खोज हैं।"
                  </blockquote>
                  
                  <div className="text-right">
                    <p className="font-semibold text-foreground">— Smt. Pooja Bansal</p>
                    <p className="text-primary">Founder & Director</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-20">
          {/* Content */}
          <div className="space-y-6 max-w-4xl mx-auto text-center">
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
              Our ISO-certified laboratory follows international quality standards, 
              ensuring that every test meets the highest benchmarks of accuracy and reliability. 
              We serve both individual patients and healthcare institutions across the region.
            </p>
            
            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4 pt-6 max-w-md mx-auto">
              <div className="text-center p-4 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-primary">ISO</div>
                <div className="text-sm text-muted-foreground">Certified</div>
              </div>
              <div className="text-center p-4 bg-accent rounded-lg">
                <div className="text-2xl font-bold text-primary">Quality</div>
                <div className="text-sm text-muted-foreground">Assured</div>
              </div>
            </div>
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