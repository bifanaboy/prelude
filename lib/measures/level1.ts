import { Measure, MeasureItem } from '@/types'

export const LEVEL1_MEASURE: Measure = {
  id: 'level1',
  name: 'DSM-5-TR Level 1 Cross-Cutting Symptom Measure (Adult)',
  description:
    'This measure assesses 13 psychiatric domains across 23 items. Each item asks about how much you have been bothered by specific symptoms during the past TWO (2) WEEKS.',
  items: [
    {
      id: 'LEVEL1_01',
      text: 'Little interest or pleasure in doing things?',
      domain: 'depression',
    },
    {
      id: 'LEVEL1_02',
      text: 'Feeling down, depressed, or hopeless?',
      domain: 'depression',
    },
    {
      id: 'LEVEL1_03',
      text: 'Feeling more irritated, grouchy, or angry than usual?',
      domain: 'anger',
    },
    {
      id: 'LEVEL1_04',
      text: 'Sleeping less than usual, but still have a lot of energy?',
      domain: 'mania',
    },
    {
      id: 'LEVEL1_05',
      text: 'Starting lots more projects than usual or doing more risky things than usual?',
      domain: 'mania',
    },
    {
      id: 'LEVEL1_06',
      text: 'Feeling nervous, anxious, frightened, worried, or on edge?',
      domain: 'anxiety',
    },
    {
      id: 'LEVEL1_07',
      text: 'Feeling panic or being frightened?',
      domain: 'anxiety',
    },
    {
      id: 'LEVEL1_08',
      text: 'Avoiding situations that make you anxious?',
      domain: 'anxiety',
    },
    {
      id: 'LEVEL1_09',
      text: 'Unexplained aches and pains (e.g., head, back, joints, abdomen, legs)?',
      domain: 'somatic',
    },
    {
      id: 'LEVEL1_10',
      text: 'Feeling that your illnesses are not being taken seriously enough?',
      domain: 'somatic',
    },
    {
      id: 'LEVEL1_11',
      text: 'Thoughts of actually hurting yourself?',
      domain: 'suicidal_ideation',
    },
    {
      id: 'LEVEL1_12',
      text: 'Hearing things other people couldn\'t hear, such as voices even when no one was around?',
      domain: 'psychosis',
    },
    {
      id: 'LEVEL1_13',
      text: 'Feeling that someone could hear your thoughts, or that you could hear what another person was thinking?',
      domain: 'psychosis',
    },
    {
      id: 'LEVEL1_14',
      text: 'Problems with sleep that affected your sleep quality over all?',
      domain: 'sleep',
    },
    {
      id: 'LEVEL1_15',
      text: 'Problems with memory (e.g., learning new information) or with location (e.g., finding your way home)?',
      domain: 'memory',
    },
    {
      id: 'LEVEL1_16',
      text: 'Unpleasant thoughts, urges, or images that repeatedly enter your mind?',
      domain: 'repetitive_thoughts',
    },
    {
      id: 'LEVEL1_17',
      text: 'Feeling driven to perform certain behaviors or mental acts over and over again?',
      domain: 'repetitive_thoughts',
    },
    {
      id: 'LEVEL1_18',
      text: 'Feeling detached or distant from yourself, your body, your physical surroundings, or your memories?',
      domain: 'dissociation',
    },
    {
      id: 'LEVEL1_19',
      text: 'Not knowing who you really are or what you want out of life?',
      domain: 'personality_functioning',
    },
    {
      id: 'LEVEL1_20',
      text: 'Not feeling close to other people or enjoying your relationships with them?',
      domain: 'personality_functioning',
    },
    {
      id: 'LEVEL1_21',
      text: 'Drinking at least 4 drinks of any kind of alcohol in a single day?',
      domain: 'substance_use',
    },
    {
      id: 'LEVEL1_22',
      text: 'Smoking any cigarettes, a cigar, or pipe, or using snuff or chewing tobacco?',
      domain: 'substance_use',
    },
    {
      id: 'LEVEL1_23',
      text: 'Using any of the following medicines ON YOUR OWN, that is, without a doctor\'s prescription, in greater amounts or longer than prescribed [e.g., painkillers (like Vicodin), stimulants (like Ritalin or Adderall), sedatives or tranquilizers (like sleeping pills or Valium), or drugs like marijuana, cocaine or crack, club drugs (like ecstasy), hallucinogens (like LSD), heroin, inhalants or solvents (like glue), or methamphetamine (like speed)]?',
      domain: 'substance_use',
    },
  ],
  domains: [
    'depression',
    'anger',
    'mania',
    'anxiety',
    'somatic',
    'suicidal_ideation',
    'psychosis',
    'sleep',
    'memory',
    'repetitive_thoughts',
    'dissociation',
    'personality_functioning',
    'substance_use',
  ],
  scoring: {
    domainThresholds: {
      depression: { none: [0, 1], slight: [2, 3], mild: [4, 5], moderate: [6, 7], severe: [8, 8] },
      anger: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      mania: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      anxiety: { none: [0, 1], slight: [2, 3], mild: [4, 5], moderate: [6, 7], severe: [8, 12] },
      somatic: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      suicidal_ideation: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      psychosis: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      sleep: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      memory: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      repetitive_thoughts: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      dissociation: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
      personality_functioning: { none: [0, 1], slight: [2, 3], mild: [4, 5], moderate: [6, 7], severe: [8, 8] },
      substance_use: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 4] },
    },
  },
}

export const LEVEL1_DOMAIN_LABELS: Record<string, string> = {
  depression: 'Depression',
  anger: 'Anger/Irritability',
  mania: 'Mania',
  anxiety: 'Anxiety',
  somatic: 'Somatic Symptoms',
  suicidal_ideation: 'Suicidal Ideation',
  psychosis: 'Psychosis',
  sleep: 'Sleep Problems',
  memory: 'Memory Problems',
  repetitive_thoughts: 'Repetitive Thoughts/Behaviors',
  dissociation: 'Dissociation',
  personality_functioning: 'Personality Functioning',
  substance_use: 'Substance Use',
}

export const LEVEL1_DOMAIN_TO_LEVEL2: Record<string, string> = {
  depression: 'level2_depression',
  anger: 'level2_anger',
  mania: 'level2_mania',
  anxiety: 'level2_anxiety',
  somatic: 'level2_somatic',
  suicidal_ideation: 'level2_suicidal_ideation',
  psychosis: 'level2_psychosis',
  sleep: 'level2_sleep',
  memory: 'level2_memory',
  repetitive_thoughts: 'level2_repetitive_thoughts',
  dissociation: 'level2_dissociation',
  personality_functioning: 'level2_personality_functioning',
  substance_use: 'level2_substance_use',
}

export const LEVEL1_THRESHOLD_FOR_LEVEL2: Record<string, 'slight' | 'mild'> = {
  depression: 'mild',
  anger: 'mild',
  mania: 'mild',
  anxiety: 'mild',
  somatic: 'mild',
  suicidal_ideation: 'slight',
  psychosis: 'slight',
  sleep: 'mild',
  memory: 'mild',
  repetitive_thoughts: 'mild',
  dissociation: 'mild',
  personality_functioning: 'mild',
  substance_use: 'slight',
}