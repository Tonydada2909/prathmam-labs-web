import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Brain, Shield, Calendar, Clock, Globe } from 'lucide-react';
import { useState } from 'react';

const BlogArticles = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const articles = [
    {
      id: 1,
      icon: Heart,
      date: 'December 15, 2024',
      readTime: '5 min read',
      title: {
        en: 'Why Regular Health Checkups Matter',
        hi: 'नियमित स्वास्थ्य जांच क्यों जरूरी है'
      },
      description: {
        en: 'Regular health checkups help detect diseases early and maintain optimal health. Learn about the importance of preventive healthcare.',
        hi: 'नियमित स्वास्थ्य जांच से बीमारियों का जल्दी पता चलता है और स्वास्थ्य अच्छा रहता है। निवारक स्वास्थ्य सेवा के महत्व के बारे में जानें।'
      }
    },
    {
      id: 2,
      icon: Brain,
      date: 'December 10, 2024',
      readTime: '4 min read',
      title: {
        en: 'Sugar Test FAQs - Everything You Need to Know',
        hi: 'शुगर टेस्ट के बारे में अक्सर पूछे जाने वाले सवाल'
      },
      description: {
        en: 'Common questions about diabetes testing, fasting glucose levels, and HbA1c tests. Get accurate information from our experts.',
        hi: 'डायबिटीज टेस्ट, फास्टिंग ग्लूकोज़ लेवल और HbA1c टेस्ट के बारे में आम सवाल। हमारे विशेषज्ञों से सटीक जानकारी प्राप्त करें।'
      }
    }
  ];

  return (
    <section id="blog" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health & Wellness Blog</h2>
          <p className="text-lg text-gray-600 mb-6">Stay informed with latest health insights and tips</p>
          
          {/* Language Toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Globe className="h-4 w-4 text-gray-500" />
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="text-xs"
            >
              English
            </Button>
            <Button
              variant={language === 'hi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('hi')}
              className="text-xs"
            >
              हिंदी
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <Card key={article.id} className="hover-lift group cursor-pointer border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                    {article.title[language]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {article.description[language]}
                  </p>
                  <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary transition-colors">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button variant="cta" size="lg">
            View All Articles
          </Button>
        </div>

      </div>
    </section>
  );
};

export default BlogArticles;