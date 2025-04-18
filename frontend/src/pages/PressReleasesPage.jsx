import React from 'react';
import { FaNewspaper, FaCalendarAlt } from 'react-icons/fa';
import PageTemplate from '../components/layout/PageTemplate';

const PressReleasesPage = () => {
  // Sample press releases
  const pressReleases = [
    {
      id: 1,
      title: 'Luxify Launches Revolutionary 3D Product Visualization Technology',
      date: 'November 15, 2023',
      excerpt: 'Luxify introduces groundbreaking 3D product visualization technology, allowing customers to examine products in detail before purchasing.',
      content: `SEATTLE—November 15, 2023—Luxify today announced the launch of its revolutionary 3D product visualization technology, setting a new standard for online shopping experiences. This innovative feature allows customers to view products from every angle, zoom in on details, and even place items in their own space using augmented reality.

"We believe this technology will fundamentally change how people shop online," said Jane Smith, CEO of Luxify. "By giving customers the ability to examine products in incredible detail before purchasing, we're bringing the in-store experience online in a way that's never been done before."

The new feature is now available for select product categories, with plans to expand across the entire catalog by early 2024.`
    },
    {
      id: 2,
      title: 'Luxify Expands Same-Day Delivery to 25 New Cities',
      date: 'October 3, 2023',
      excerpt: 'Luxify announces expansion of its popular same-day delivery service to 25 additional metropolitan areas across the United States.',
      content: `SEATTLE—October 3, 2023—Luxify today announced the expansion of its same-day delivery service to 25 additional metropolitan areas across the United States, bringing the convenience of rapid delivery to millions more customers.

"We're committed to making premium shopping not just exceptional in quality, but also in convenience," said Michael Johnson, VP of Logistics at Luxify. "With this expansion, over 70% of our U.S. customers now have access to same-day delivery options."

The expansion includes major cities such as Denver, Detroit, and Phoenix, as well as surrounding suburban areas. Customers in these regions can now receive eligible orders placed before noon on the same day, with no minimum purchase requirement for Luxify Premium members.`
    },
    {
      id: 3,
      title: 'Luxify Partners with Leading Sustainable Brands for Eco-Friendly Collection',
      date: 'September 12, 2023',
      excerpt: 'Luxify announces partnerships with over 50 sustainable brands to launch a new eco-friendly product collection.',
      content: `SEATTLE—September 12, 2023—Luxify today announced partnerships with over 50 leading sustainable brands to launch "Luxify Earth," a new collection featuring premium eco-friendly products across all categories.

"Sustainability is no longer optional—it's essential," said Sarah Williams, Director of Sustainability at Luxify. "With Luxify Earth, we're making it easier for customers to shop their values without compromising on quality or luxury."

The collection includes everything from organic cotton bedding and bamboo furniture to solar-powered electronics and zero-waste beauty products. Each item in the collection meets strict sustainability criteria, including responsible sourcing, ethical manufacturing, and eco-friendly packaging.

The Luxify Earth collection is available now on the Luxify website and mobile app.`
    }
  ];

  return (
    <PageTemplate 
      title="Press Releases" 
      breadcrumbs={[{ text: 'Press Releases' }]}
    >
      <div className="page-section">
        <p className="text-lg">
          Stay up to date with the latest news and announcements from Luxify. For press inquiries, 
          please contact our media relations team at <a href="mailto:press@luxify.com">press@luxify.com</a>.
        </p>
      </div>

      <div className="page-section">
        <div className="space-y-8">
          {pressReleases.map(release => (
            <div key={release.id} className="info-card">
              <div className="flex items-center text-gray-500 mb-2">
                <FaCalendarAlt className="mr-2" />
                <span>{release.date}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-3">{release.title}</h2>
              
              <div className="prose max-w-none">
                {release.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "font-medium" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="secondary-button">
                  <FaNewspaper className="mr-2" />
                  Download Full Release
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-section">
        <h2>Media Resources</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>Press Kit</h3>
            <p>
              Download our press kit, including company logos, executive headshots, 
              product images, and fact sheets.
            </p>
            <button className="secondary-button mt-4">
              Download Press Kit
            </button>
          </div>
          
          <div className="info-card">
            <h3>Brand Guidelines</h3>
            <p>
              Access our brand guidelines for information on proper logo usage, 
              color palette, typography, and more.
            </p>
            <button className="secondary-button mt-4">
              View Brand Guidelines
            </button>
          </div>
          
          <div className="info-card">
            <h3>Media Contacts</h3>
            <p>
              Connect with our media relations team for interview requests, 
              additional information, or press inquiries.
            </p>
            <button className="secondary-button mt-4">
              Contact Media Team
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default PressReleasesPage;
