import { Download, FileText, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Downloads = () => {
  const downloads = [
    {
      title: "Test Rate Card",
      titleHindi: "टेस्ट रेट कार्ड",
      description: "Complete list of all available tests with updated pricing",
      descriptionHindi: "सभी उपलब्ध टेस्ट की पूरी सूची और अपडेटेड कीमतों के साथ",
      icon: FileText,
      filename: "prathmam-rate-card-2024.pdf"
    },
    {
      title: "Sample Collection Guidelines",
      titleHindi: "सैंपल संग्रह दिशानिर्देश",
      description: "Instructions for proper sample collection and preparation",
      descriptionHindi: "उचित सैंपल संग्रह और तैयारी के लिए निर्देश",
      icon: Clock,
      filename: "sample-collection-guide.pdf"
    },
    {
      title: "Patient Instructions",
      titleHindi: "मरीज़ के लिए निर्देश",
      description: "Pre-test preparation and post-test care instructions",
      descriptionHindi: "टेस्ट से पहले की तैयारी और बाद की देखभाल के निर्देश",
      icon: Phone,
      filename: "patient-instructions.pdf"
    }
  ];

  const handleDownload = (filename: string) => {
    // In a real implementation, this would download the actual PDF
    // For now, we'll show an alert
    alert(`Download would start for: ${filename}`);
  };

  return (
    <section id="downloads" className="py-20 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Downloads & Resources
          </h2>
          <h3 className="text-2xl font-semibold text-primary mb-4">
            डाउनलोड और संसाधन
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access important documents, rate cards, and patient guidelines
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.map((item, index) => (
            <Card 
              key={index} 
              className="border-none shadow-card hover:shadow-medical transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {item.title}
                </CardTitle>
                <p className="text-lg font-medium text-primary">
                  {item.titleHindi}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  {item.description}
                </p>
                <p className="text-muted-foreground text-center text-sm">
                  {item.descriptionHindi}
                </p>
                <Button 
                  onClick={() => handleDownload(item.filename)}
                  variant="cta"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need help with downloads or have questions about our tests?
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="tel:9403892093">
              <Phone className="h-4 w-4 mr-2" />
              Call Us: +91 9403892093
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Downloads;