import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      name: "राज कुमार शर्मा",
      nameEng: "Raj Kumar Sharma",
      location: "करौली",
      rating: 5,
      text: "बहुत ही अच्छी सेवा मिली। रिपोर्ट समय पर मिल गई और स्टाफ बहुत सहयोगी था। सभी स्टाफ का व्यवहार बहुत अच्छा है।",
      textEng: "Excellent service received. Got the report on time and staff was very cooperative. All this staff's behavior is very good."
    },
    {
      name: "सुनीता देवी",
      nameEng: "Sunita Devi", 
      location: "करौली",
      rating: 5,
      text: "प्रथमम् लैब की सेवा से बहुत खुश हूं। सभी टेस्ट एक ही जगह मिल जाते हैं और कीमत भी उचित है। परिवार के सभी लोग यहीं टेस्ट कराते हैं।",
      textEng: "Very happy with Prathmam Lab's service. All tests are available at one place and prices are reasonable. All family members get tested here only."
    }
  ];

  return (
    <section className="py-20 bg-medical-trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Patient Testimonials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real experiences from families we've served in Karauli
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-none shadow-card hover:shadow-medical transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-4 leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <blockquote className="text-muted-foreground/80 text-sm mb-4 leading-relaxed italic">
                      "{testimonial.textEng}"
                    </blockquote>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.nameEng}
                      </p>
                      <p className="text-sm text-primary">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;