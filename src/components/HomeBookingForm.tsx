import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HomeBookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    testType: '',
    specialInstructions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.patientName || !formData.phone || !formData.address || !formData.testType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Home booking form submitted:', formData);
    
    toast({
      title: "Booking Request Submitted",
      description: "We'll contact you shortly to confirm your home collection appointment.",
    });

    // Reset form
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      address: '',
      preferredDate: '',
      preferredTime: '',
      testType: '',
      specialInstructions: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="home-booking" className="py-16 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Book Home Collection Service
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convenient home sample collection at your doorstep. Book your appointment and our certified phlebotomists will visit your location.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Home Collection Booking
            </CardTitle>
            <CardDescription>
              Fill in the details below and we'll schedule a convenient time for sample collection at your home.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patientName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Patient Name *
                    </Label>
                    <Input
                      id="patientName"
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 9999999999"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="preferredDate" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Preferred Date
                    </Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="preferredTime" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Preferred Time
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('preferredTime', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8:00-10:00">8:00 AM - 10:00 AM</SelectItem>
                        <SelectItem value="10:00-12:00">10:00 AM - 12:00 PM</SelectItem>
                        <SelectItem value="12:00-14:00">12:00 PM - 2:00 PM</SelectItem>
                        <SelectItem value="14:00-16:00">2:00 PM - 4:00 PM</SelectItem>
                        <SelectItem value="16:00-18:00">4:00 PM - 6:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="testType">Test Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('testType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select test category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic-health">Basic Health Checkup</SelectItem>
                        <SelectItem value="diabetes">Diabetes Profile</SelectItem>
                        <SelectItem value="lipid">Lipid Profile</SelectItem>
                        <SelectItem value="thyroid">Thyroid Function Test</SelectItem>
                        <SelectItem value="liver">Liver Function Test</SelectItem>
                        <SelectItem value="kidney">Kidney Function Test</SelectItem>
                        <SelectItem value="vitamin">Vitamin Profile</SelectItem>
                        <SelectItem value="cardiac">Cardiac Markers</SelectItem>
                        <SelectItem value="custom">Custom Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your complete address with landmarks"
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="specialInstructions">Special Instructions</Label>
                  <Textarea
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Any special requirements or instructions for the visit"
                    className="min-h-[60px]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Book Home Collection
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>* Our team will contact you within 2 hours to confirm the appointment.</p>
                <p>Home collection charges may apply based on location.</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomeBookingForm;