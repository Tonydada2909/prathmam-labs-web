import { Download, FileText, Users, Phone, Mail, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DoctorsZone = () => {
  const resources = [
    {
      title: 'Sample Reports',
      description: 'Download sample laboratory reports for reference',
      icon: FileText,
      action: 'Download PDF',
      file: '#'
    },
    {
      title: 'Rate List',
      description: 'Complete test catalog with current pricing',
      icon: Download,
      action: 'Download PDF',
      file: '#'
    },
    {
      title: 'Test Directory',
      description: 'Comprehensive list of all available tests',
      icon: FileText,
      action: 'Download PDF',
      file: '#'
    }
  ];

  const benefits = [
    {
      title: 'Priority Service',
      description: 'Faster processing for your patients\' samples'
    },
    {
      title: 'Digital Reports',
      description: 'Online access to reports and instant notifications'
    },
    {
      title: 'Collection Service',
      description: 'Free sample collection from your clinic'
    },
    {
      title: 'Technical Support',
      description: '24/7 support for test interpretations'
    },
    {
      title: 'Bulk Discounts',
      description: 'Special pricing for high volume orders'
    },
    {
      title: 'CME Programs',
      description: 'Regular educational programs and updates'
    }
  ];

  return (
    <section id="doctors" className="section-spacing bg-gradient-to-br from-medical-blue-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Doctors' <span className="text-primary">Zone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Dedicated support and resources for healthcare professionals. Partner with us for better patient care.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Resources Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Download Resources
            </h3>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <Card key={index} className="border-none shadow-card hover-lift hover-glow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <resource.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={resource.file} download>
                          <Download className="h-4 w-4 mr-2" />
                          {resource.action}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact for Partnership */}
            <Card className="mt-8 border-none shadow-card bg-gradient-primary text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  B2B Partnership
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-white/90">
                  Interested in establishing a partnership with our laboratory? 
                  Contact us for exclusive rates and services.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                    <a href="tel:9403892093">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
                    <a href="mailto:contact@prathmammedlabs.com">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Partnership Benefits
            </h3>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-card hover-lift hover-glow bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center p-6 bg-white rounded-lg shadow-card">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">
                Join Our Network
              </h4>
              <p className="text-muted-foreground mb-4">
                Over 200+ healthcare professionals trust us for accurate diagnostics
              </p>
              <Button variant="cta" asChild>
                <a href="#contact">Get Started</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorsZone;