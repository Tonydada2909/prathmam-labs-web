import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Smartphone, Mail, Phone } from 'lucide-react';

const ReportDownloadGuide = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Download Your Reports</h2>
          <p className="text-lg text-gray-600">Simple steps to access your lab test results</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Online Portal Method */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Online Portal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-gray-600">Visit our website and click "Download Reports"</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-gray-600">Enter your Patient ID and Mobile Number</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-gray-600">Verify OTP sent to your mobile</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-gray-600">Download or view your reports instantly</p>
                </div>
              </div>
              <Button variant="cta" className="w-full mt-6">
                <Download className="mr-2 h-4 w-4" />
                Access Report Portal
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Method */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">WhatsApp Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                  <p className="text-gray-600">Send a WhatsApp message to 9799656357</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                  <p className="text-gray-600">Include your Patient ID and Name</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                  <p className="text-gray-600">Our team will verify and send your report</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                  <p className="text-gray-600">Receive PDF report directly on WhatsApp</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 border-green-600 text-green-600 hover:bg-green-50" asChild>
                <a href="https://wa.me/919799656357?text=Hello! I would like to request my lab report. My Patient ID is: [Enter ID]" target="_blank" rel="noopener noreferrer">
                  <Phone className="mr-2 h-4 w-4" />
                  Request via WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Email Method */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-xl">Email Request</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Send an email to <strong>reports@prathamamlabs.com</strong> with your Patient ID, 
                Name, and Mobile Number. We'll send your report within 2 hours during business hours.
              </p>
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                <Mail className="mr-2 h-4 w-4" />
                Send Email Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <div className="mt-12 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Important Notes</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Reports are available 24-48 hours after sample collection</li>
            <li>• Keep your Patient ID safe - it's required for report access</li>
            <li>• For urgent reports, contact us directly at 9403892093</li>
            <li>• Reports older than 6 months may require special request</li>
            <li>• Original hard copy reports can be collected from our lab</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ReportDownloadGuide;