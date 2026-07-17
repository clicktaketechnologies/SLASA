import { Course, Testimonial, Stat } from './types';

export const COURSES: Course[] = [
  {
    id: 'ks1',
    title: 'KS1 Tuition',
    slug: 'ks1',
    description: 'Foundation building for Year 1 and 2 students in English and Maths.',
    fullDescription: 'Our KS1 program focuses on developing core literacy and numeracy skills through engaging, interactive lessons. We ensure children build a strong foundation for their future academic journey.',
    syllabus: ['Phonics & Reading', 'Basic Numeracy', 'Creative Writing', 'Problem Solving'],
    duration: 'Ongoing',
    fees: '£15/hour',
    timings: 'Mon-Fri: 4pm - 6pm',
    icon: 'BookOpen',
    seoContent: 'Key Stage 1 (KS1) is the foundation of your child\'s education. Our Nottingham-based KS1 tuition focuses on making learning fun while building essential skills in English and Maths. We help Year 1 and Year 2 students develop confidence in phonics, reading, and basic arithmetic, ensuring they are well-prepared for the transition to KS2.',
    programFocus: 'Basics, fun learning, and confidence building.',
    pricingStart: '60'
  },
  {
    id: 'ks2',
    title: 'KS2 Tuition',
    slug: 'ks2',
    description: 'Preparing students for SATs and secondary school transition.',
    fullDescription: 'KS2 is a critical stage. We provide targeted support for Year 3 to 6 students, focusing on SATs preparation and building confidence in core subjects.',
    syllabus: ['Advanced Arithmetic', 'Grammar & Punctuation', 'Reading Comprehension', 'Scientific Inquiry'],
    duration: 'Ongoing',
    fees: '£15/hour',
    timings: 'Mon-Fri: 4pm - 7pm',
    icon: 'GraduationCap',
    seoContent: 'Our KS2 tuition in Nottingham is designed to bridge the gap between lower primary and secondary school. We focus on Year 3 to Year 6 students, providing intensive SATs preparation and strengthening core foundations in English and Mathematics. Our expert tutors help students master complex concepts and build the academic resilience needed for future success.',
    programFocus: 'Foundation, confidence, and SATs preparation.',
    pricingStart: '60'
  },
  {
    id: 'ks3',
    title: 'KS3 Tuition',
    slug: 'ks3',
    description: 'Bridging the gap between primary and GCSE levels.',
    fullDescription: 'Our KS3 program ensures students are well-prepared for the rigors of GCSEs. We cover core subjects with a focus on deep understanding and analytical skills.',
    syllabus: ['Algebra & Geometry', 'English Literature Analysis', 'Science (Bio, Chem, Phys)', 'History & Geography'],
    duration: 'Ongoing',
    fees: '£18/hour',
    timings: 'Mon-Fri: 5pm - 8pm',
    icon: 'Users',
    seoContent: 'Key Stage 3 is the bridge to GCSE success. Our Nottingham KS3 tuition program supports students in Year 7, 8, and 9 as they transition to more complex academic challenges. We focus on deepening subject knowledge in English, Maths, and Science, ensuring students have the analytical skills and conceptual understanding required for top GCSE grades.',
    programFocus: 'Transition to GCSE, analytical skills, and subject depth.',
    pricingStart: '72'
  },
  {
    id: 'gcse',
    title: 'GCSE Coaching',
    slug: 'gcse',
    description: 'Intensive preparation for GCSE exams across all major boards.',
    fullDescription: 'Specialized coaching for Year 10 and 11 students. We focus on exam techniques, past paper practice, and mastering complex topics to ensure top grades.',
    syllabus: ['Exam Board Specific Content', 'Past Paper Workshops', 'Revision Strategies', 'Time Management'],
    duration: '1-2 Years',
    fees: '£20/hour',
    timings: 'Mon-Sat: Flexible',
    icon: 'Award',
    seoContent: 'Achieve your target grades with our expert GCSE tuition in Nottingham. We provide comprehensive support for Year 10 and 11 students across all major exam boards (AQA, Edexcel, OCR). Our program focuses on exam technique, intensive past paper practice, and mastering difficult topics in Maths, English, and Sciences to ensure students reach their full potential.',
    programFocus: 'Exams, results, and intensive revision.',
    pricingStart: '80'
  },
  {
    id: '11plus',
    title: '11+ Preparation',
    slug: '11plus',
    description: 'Specialized training for grammar school entrance exams.',
    fullDescription: 'Our 11+ program is designed to help students succeed in highly competitive entrance exams. We cover Verbal, Non-Verbal Reasoning, Maths, and English.',
    syllabus: ['Verbal Reasoning', 'Non-Verbal Reasoning', 'Advanced Maths', 'Timed Mock Exams'],
    duration: '6-12 Months',
    fees: '£20/hour',
    timings: 'Sat-Sun: 10am - 2pm',
    icon: 'Target',
    seoContent: 'Prepare for grammar school success with our specialized 11+ tuition in Nottingham. We provide structured training in Verbal Reasoning, Non-Verbal Reasoning, English, and Mathematics. Our program includes regular mock exams and timed practice sessions to build the speed and accuracy required for competitive entrance exams.',
    programFocus: 'Grammar school prep, speed, and accuracy.',
    pricingStart: '80'
  },
  {
    id: 'sats',
    title: 'SATs Tuition',
    slug: 'sats',
    description: 'Specialized preparation for Year 2 and Year 6 SATs exams.',
    fullDescription: 'Our SATs program is designed to help students excel in their Key Stage 1 and Key Stage 2 national curriculum tests. We focus on exam techniques, time management, and core subject mastery.',
    syllabus: ['Maths Reasoning', 'Arithmetic Practice', 'SPAG (Spelling, Punctuation & Grammar)', 'Reading Comprehension'],
    duration: '3-6 Months',
    fees: '£15/hour',
    timings: 'Mon-Fri: 4pm - 7pm',
    icon: 'Target',
    seoContent: 'Prepare for SATs success with our specialized tuition in Nottingham. We provide structured training for Year 2 (KS1) and Year 6 (KS2) students. Our program includes regular mock tests, intensive revision of core topics, and strategies to build confidence and reduce exam anxiety.',
    programFocus: 'Exam techniques, mock tests, and core mastery.',
    pricingStart: '60'
  },
  {
    id: 'urdu',
    title: 'Urdu Language',
    slug: 'urdu',
    description: 'Learn to read, write, and speak Urdu fluently.',
    fullDescription: 'Comprehensive Urdu classes for all ages. Whether you are a beginner or looking to improve your fluency, our native-speaking tutors are here to help.',
    syllabus: ['Alphabet & Script', 'Conversational Urdu', 'Grammar & Vocabulary', 'Literature Appreciation'],
    duration: 'Flexible',
    fees: '£12/hour',
    timings: 'Weekends & Evenings',
    icon: 'Languages',
    seoContent: 'Discover the beauty of the Urdu language with our expert-led classes in Nottingham. We offer Urdu tuition for all levels, from complete beginners to advanced learners. Our native-speaking tutors focus on reading, writing, and conversational skills, while also providing cultural context to enrich the learning experience.',
    programFocus: 'Language, culture, and conversational fluency.',
    pricingStart: '48'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Parent',
    content: 'The tutors here are exceptional. My son’s confidence in Maths has skyrocketed since he started his KS2 sessions.',
    rating: 5
  },
  {
    id: '2',
    name: 'Ahmed Khan',
    role: 'GCSE Student',
    content: 'I was struggling with Science, but the GCSE coaching here helped me achieve an A*. Highly recommended!',
    rating: 5
  },
  {
    id: '3',
    name: 'Emma Thompson',
    role: 'Parent',
    content: 'The 11+ preparation is very structured. The mock exams really helped my daughter get used to the pressure.',
    rating: 5
  }
];

export const STATS: Stat[] = [
  { label: 'Pass Rate', value: '95', suffix: '%' },
  { label: 'Students', value: '500', suffix: '+' },
  { label: 'Years Experience', value: '10', suffix: '+' },
  { label: 'Qualified Tutors', value: '25', suffix: '+' }
];
