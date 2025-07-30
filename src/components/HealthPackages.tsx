import { CheckCircle, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const HealthPackages = () => {
  const packages = [
    {
      id: 1,
      name: 'Basic Health Checkup',
      price: '₹1,500',
      originalPrice: '₹2,000',
      popular: false,
      tests: [
        'Complete Blood Count (CBC)',
        'Liver Function Test (LFT)',
        'Kidney Function Test (KFT)', 
        'Lipid Profile',
        'Blood Sugar (Fasting)',
        'Urine Routine & Microscopy'
      ],
      ideal: 'Adults 18-40 years',
      reports: '6-8 hours'
    },
    {
      id: 2,
      name: 'Comprehensive Health Package',
      price: '₹3,500',
      originalPrice: '₹4,500',
      popular: true,
      tests: [
        'Complete Blood Count (CBC)',
        'Liver Function Test (LFT)',
        'Kidney Function Test (KFT)',
        'Lipid Profile Complete',
        'Thyroid Profile (T3, T4, TSH)',
        'HbA1c',
        'Vitamin D3',
        'Vitamin B12',
        'Urine Routine & Microscopy',
        'ECG'
      ],
      ideal: 'Adults 40+ years',
      reports: '8-12 hours'
    },
    {
      id: 3,
      name: 'Diabetes Monitoring Package',
      price: '₹1,200',
      originalPrice: '₹1,600',
      popular: false,
      tests: [
        'HbA1c (Glycated Hemoglobin)',
        'Fasting Blood Sugar',
        'Post Meal Blood Sugar',
        'Kidney Function Test',
        'Lipid Profile',
        'Urine Microalbumin'
      ],
      ideal: 'Diabetic patients',
      reports: '4-6 hours'
    },
    {
      id: 4,
      name: 'Cardiac Risk Assessment',
      price: '₹2,200',
      originalPrice: '₹2,800',
      popular: false,
      tests: [
        'Lipid Profile Complete',
        'CRP (C-Reactive Protein)',
        'Troponin-I',
        'D-Dimer',
        'Homocysteine',
        'ECG',
        'Blood Pressure Check'
      ],
      ideal: 'Heart health screening',
      reports: '6-8 hours'
    },
    {
      id: 5,
      name: 'Women\'s Health Package',
      price: '₹2,800',
      originalPrice: '₹3,500',
      popular: false,
      tests: [
        'Complete Blood Count',
        'Thyroid Profile',
        'Iron Studies',
        'Vitamin D3',
        'Calcium',
        'Pap Smear',
        'Mammography',
        'Bone Density Scan'
      ],
      ideal: 'Women 25+ years',
      reports: '12-24 hours'
    },
    {
      id: 6,
      name: 'Senior Citizen Package',
      price: '₹4,500',
      originalPrice: '₹6,000',
      popular: false,
      tests: [
        'Complete Blood Count',
        'Comprehensive Metabolic Panel',
        'Lipid Profile Complete',
        'Thyroid Function Test',
        'Vitamin D3 & B12',
        'PSA (for men)',
        'Bone Density Scan',
        'ECG',
        'Chest X-Ray',
        'Eye Examination'
      ],
      ideal: 'Adults 60+ years',
      reports: '24 hours'
    }
  ];

  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Health <span className="text-primary">Packages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive health checkup packages designed for different age groups and health needs
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative border-none shadow-card hover:shadow-medical transition-all duration-300 ${
                pkg.popular ? 'ring-2 ring-primary' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-foreground mb-2">
                  {pkg.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                    <span className="text-lg text-muted-foreground line-through">{pkg.originalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{pkg.ideal}</p>
                  <p className="text-sm text-muted-foreground">Reports in: {pkg.reports}</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Tests included */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Tests Included:</h4>
                  <ul className="space-y-2">
                    {pkg.tests.map((test, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book button */}
                <Button 
                  variant={pkg.popular ? "cta" : "medical"} 
                  className="w-full" 
                  asChild
                >
                  <a href="tel:9403892093">
                    <Phone className="h-4 w-4 mr-2" />
                    Book Package
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-12 text-center">
          <div className="bg-accent/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Need a Custom Package?
            </h3>
            <p className="text-muted-foreground mb-4">
              Contact us to create a personalized health checkup package based on your specific requirements
            </p>
            <Button variant="outline" asChild>
              <a href="tel:9403892093">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthPackages;