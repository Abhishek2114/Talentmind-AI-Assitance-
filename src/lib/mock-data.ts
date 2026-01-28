import type { JobRecommendation } from './types';

export const mockJobRecommendations: JobRecommendation[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Innovate Inc.',
    location: 'San Francisco, CA',
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Node.js'],
    matchPercentage: 92,
    url: '#',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Solutions Co.',
    location: 'New York, NY (Remote)',
    skills: ['React', 'Node.js', 'Python', 'Django', 'AWS'],
    matchPercentage: 85,
    url: '#',
  },
  {
    id: 3,
    title: 'AI/ML Engineer',
    company: 'Future AI',
    location: 'Austin, TX',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'GenAI', 'GCP'],
    matchPercentage: 78,
    url: '#',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'Creative Minds',
    location: 'Los Angeles, CA',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    matchPercentage: 65,
    url: '#',
  },
];
