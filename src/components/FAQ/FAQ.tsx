import React, { useState } from 'react';
import './FAQ.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is GDG RBU?',
    answer:
      'GDG RBU is focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration.',
  },
  {
    id: 'faq-2',
    question: 'How to join GDG?',
    answer:
      'Information regarding student membership and onboarding is shared during chapter orientation sessions and official announcements. Check back for upcoming registration details.',
  },
  {
    id: 'faq-3',
    question: 'What does a GDG Lead do?',
    answer:
      'A GDG Lead coordinates campus chapter activities, facilitates technical workshops, and helps organize events for the student developer community.',
  },
  {
    id: 'faq-4',
    question: 'How is GDG related to Google?',
    answer:
      'GDG communities bring students and developers together to learn, share knowledge, and explore developer technologies. Check the chapter’s official information for details about its specific program.',
  },
  {
    id: 'faq-5',
    question: 'How to reach us?',
    answer:
      'You can get in touch with the GDG RBU student community using the contact details and social media channels listed below once verified.',
  },
];

export const FAQ: React.FC = () => {
  // Question 1 expanded by default matching Figma reference (image 7.png)
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(['faq-1']));

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="faq" className="faq-section" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        <h2 className="faq-heading">FAQs</h2>

        <div className="faq-list" role="region" aria-label="FAQ Accordion">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.has(item.id);
            return (
              <div key={item.id} className="faq-item">
                <button
                  type="button"
                  id={`faq-btn-${item.id}`}
                  className={`faq-question-btn ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className={`faq-chevron ${isOpen ? 'chevron-up' : 'chevron-down'}`} aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {isOpen ? (
                        <polyline points="18 15 12 9 6 15" />
                      ) : (
                        <polyline points="6 9 12 15 18 9" />
                      )}
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    className="faq-answer-card"
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                  >
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
