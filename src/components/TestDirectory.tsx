import { useState } from 'react';
import { Search, Phone, Clock, Beaker, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const TestDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Blood Tests',
    'Urine Tests',
    'Biochemistry',
    'Hematology',
    'Microbiology',
    'Immunology',
    'Radiology'
  ];

  const tests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'Blood Tests',
      sampleType: 'Blood',
      method: 'Automated Cell Counter',
      reportingTime: '2-4 hours',
      price: '₹300',
      description: 'Comprehensive blood cell analysis'
    },
    {
      id: 2,
      name: 'Lipid Profile',
      category: 'Biochemistry',
      sampleType: 'Blood',
      method: 'Enzymatic Method',
      reportingTime: '4-6 hours',
      price: '₹500',
      description: 'Cholesterol and triglyceride levels'
    },
    {
      id: 3,
      name: 'Liver Function Test (LFT)',
      category: 'Biochemistry',
      sampleType: 'Blood',
      method: 'Spectrophotometry',
      reportingTime: '4-6 hours',
      price: '₹450',
      description: 'Comprehensive liver health assessment'
    },
    {
      id: 4,
      name: 'Kidney Function Test (KFT)',
      category: 'Biochemistry',
      sampleType: 'Blood',
      method: 'Spectrophotometry',
      reportingTime: '4-6 hours',
      price: '₹400',
      description: 'Kidney health evaluation'
    },
    {
      id: 5,
      name: 'Thyroid Profile (T3, T4, TSH)',
      category: 'Immunology',
      sampleType: 'Blood',
      method: 'CLIA',
      reportingTime: '6-8 hours',
      price: '₹600',
      description: 'Complete thyroid function assessment'
    },
    {
      id: 6,
      name: 'Urine Routine & Microscopy',
      category: 'Urine Tests',
      sampleType: 'Urine',
      method: 'Automated Analyzer',
      reportingTime: '2-3 hours',
      price: '₹200',
      description: 'Complete urine analysis'
    },
    {
      id: 7,
      name: 'HbA1c (Glycated Hemoglobin)',
      category: 'Biochemistry',
      sampleType: 'Blood',
      method: 'HPLC',
      reportingTime: '4-6 hours',
      price: '₹350',
      description: 'Diabetes monitoring test'
    },
    {
      id: 8,
      name: 'Vitamin D3',
      category: 'Immunology',
      sampleType: 'Blood',
      method: 'CLIA',
      reportingTime: '24 hours',
      price: '₹800',
      description: 'Vitamin D deficiency assessment'
    }
  ];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="tests" className="section-spacing bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Test <span className="text-primary">Directory</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive range of diagnostic tests with accurate results and quick turnaround time
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="border-none shadow-card hover-lift hover-glow bg-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground flex items-start justify-between">
                  <span>{test.name}</span>
                  <span className="text-primary font-bold text-lg">{test.price}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{test.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Sample:</span>
                  </div>
                  <span className="font-medium">{test.sampleType}</span>
                  
                  <div className="flex items-center gap-2">
                    <Beaker className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Method:</span>
                  </div>
                  <span className="font-medium text-sm">{test.method}</span>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">Report:</span>
                  </div>
                  <span className="font-medium">{test.reportingTime}</span>
                </div>
                
                <div className="pt-2">
                  <Button variant="medical" className="w-full" asChild>
                    <a href="tel:9403892093">
                      <Phone className="h-4 w-4 mr-2" />
                      Book Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tests found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestDirectory;