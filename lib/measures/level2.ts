import { Measure } from '@/types'

export const LEVEL2_MEASURES: Record<string, Measure> = {
  level2_depression: {
    id: 'level2_depression',
    name: 'DSM-5-TR Level 2 Depression Measure (PHQ-9)',
    description: 'Over the last 2 weeks, how often have you been bothered by any of the following problems?',
    items: [
      { id: 'PHQ9_01', text: 'Little interest or pleasure in doing things', domain: 'depression' },
      { id: 'PHQ9_02', text: 'Feeling down, depressed, or hopeless', domain: 'depression' },
      { id: 'PHQ9_03', text: 'Trouble falling or staying asleep, or sleeping too much', domain: 'depression' },
      { id: 'PHQ9_04', text: 'Feeling tired or having little energy', domain: 'depression' },
      { id: 'PHQ9_05', text: 'Poor appetite or overeating', domain: 'depression' },
      { id: 'PHQ9_06', text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', domain: 'depression' },
      { id: 'PHQ9_07', text: 'Trouble concentrating on things, such as reading the newspaper or watching television', domain: 'depression' },
      { id: 'PHQ9_08', text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', domain: 'depression' },
      { id: 'PHQ9_09', text: 'Thoughts that you would be better off dead, or of hurting yourself in some way', domain: 'depression' },
    ],
    domains: ['depression'],
    scoring: {
      domainThresholds: {
        depression: { none: [0, 4], slight: [5, 9], mild: [10, 14], moderate: [15, 19], severe: [20, 27] },
      },
    },
  },
  level2_anger: {
    id: 'level2_anger',
    name: 'DSM-5-TR Level 2 Anger Measure',
    description: 'How often have you experienced the following in the past 2 weeks?',
    items: [
      { id: 'ANGER_01', text: 'I felt angry', domain: 'anger' },
      { id: 'ANGER_02', text: 'I felt like I might lose control of my anger', domain: 'anger' },
      { id: 'ANGER_03', text: 'I felt like breaking things', domain: 'anger' },
      { id: 'ANGER_04', text: 'I felt like hitting someone', domain: 'anger' },
      { id: 'ANGER_05', text: 'I was angry when something did not go my way', domain: 'anger' },
    ],
    domains: ['anger'],
    scoring: {
      domainThresholds: {
        anger: { none: [0, 1], slight: [2, 4], mild: [5, 7], moderate: [8, 10], severe: [11, 20] },
      },
    },
  },
  level2_mania: {
    id: 'level2_mania',
    name: 'DSM-5-TR Level 2 Mania Measure (ASRM)',
    description: 'How have you been feeling over the past week?',
    items: [
      { id: 'ASRM_01', text: 'I feel happier or more cheerful than usual', domain: 'mania' },
      { id: 'ASRM_02', text: 'I feel more self-confident than usual', domain: 'mania' },
      { id: 'ASRM_03', text: 'I need less sleep than usual', domain: 'mania' },
      { id: 'ASRM_04', text: 'I talk more than usual', domain: 'mania' },
      { id: 'ASRM_05', text: 'I have been more active than usual', domain: 'mania' },
    ],
    domains: ['mania'],
    scoring: {
      domainThresholds: {
        mania: { none: [0, 2], slight: [3, 5], mild: [6, 8], moderate: [9, 11], severe: [12, 20] },
      },
    },
  },
  level2_anxiety: {
    id: 'level2_anxiety',
    name: 'DSM-5-TR Level 2 Anxiety Measure (GAD-7)',
    description: 'Over the last 2 weeks, how often have you been bothered by the following problems?',
    items: [
      { id: 'GAD7_01', text: 'Feeling nervous, anxious, or on edge', domain: 'anxiety' },
      { id: 'GAD7_02', text: 'Not being able to stop or control worrying', domain: 'anxiety' },
      { id: 'GAD7_03', text: 'Worrying too much about different things', domain: 'anxiety' },
      { id: 'GAD7_04', text: 'Trouble relaxing', domain: 'anxiety' },
      { id: 'GAD7_05', text: 'Being so restless that it is hard to sit still', domain: 'anxiety' },
      { id: 'GAD7_06', text: 'Becoming easily annoyed or irritable', domain: 'anxiety' },
      { id: 'GAD7_07', text: 'Feeling afraid as if something awful might happen', domain: 'anxiety' },
    ],
    domains: ['anxiety'],
    scoring: {
      domainThresholds: {
        anxiety: { none: [0, 4], slight: [5, 9], mild: [10, 14], moderate: [15, 19], severe: [20, 28] },
      },
    },
  },
  level2_somatic: {
    id: 'level2_somatic',
    name: 'DSM-5-TR Level 2 Somatic Symptom Measure',
    description: 'How much have you been bothered by these physical symptoms in the past 7 days?',
    items: [
      { id: 'SOMATIC_01', text: 'Stomach or bowel problems', domain: 'somatic' },
      { id: 'SOMATIC_02', text: 'Back pain', domain: 'somatic' },
      { id: 'SOMATIC_03', text: 'Pain in your arms, legs, or joints', domain: 'somatic' },
      { id: 'SOMATIC_04', text: 'Headaches', domain: 'somatic' },
      { id: 'SOMATIC_05', text: 'Chest pain or shortness of breath', domain: 'somatic' },
      { id: 'SOMATIC_06', text: 'Dizziness', domain: 'somatic' },
      { id: 'SOMATIC_07', text: 'Feeling tired or having low energy', domain: 'somatic' },
      { id: 'SOMATIC_08', text: 'Trouble sleeping', domain: 'somatic' },
    ],
    domains: ['somatic'],
    scoring: {
      domainThresholds: {
        somatic: { none: [0, 1], slight: [2, 4], mild: [5, 7], moderate: [8, 10], severe: [11, 32] },
      },
    },
  },
  level2_suicidal_ideation: {
    id: 'level2_suicidal_ideation',
    name: 'DSM-5-TR Level 2 Suicidal Ideation Measure',
    description: 'Have you had any of the following thoughts in the past 2 weeks?',
    items: [
      { id: 'SI_01', text: 'I thought it would be better if I were not alive', domain: 'suicidal_ideation' },
      { id: 'SI_02', text: 'I thought about hurting myself', domain: 'suicidal_ideation' },
      { id: 'SI_03', text: 'I thought about killing myself', domain: 'suicidal_ideation' },
      { id: 'SI_04', text: 'I made a plan for killing myself', domain: 'suicidal_ideation' },
      { id: 'SI_05', text: 'I attempted to kill myself', domain: 'suicidal_ideation' },
    ],
    domains: ['suicidal_ideation'],
    scoring: {
      domainThresholds: {
        suicidal_ideation: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 5] },
      },
    },
  },
  level2_psychosis: {
    id: 'level2_psychosis',
    name: 'DSM-5-TR Level 2 Psychosis Measure',
    description: 'Have you experienced any of the following in the past 2 weeks?',
    items: [
      { id: 'PSYCHOSIS_01', text: 'Heard things that others couldn\'t hear', domain: 'psychosis' },
      { id: 'PSYCHOSIS_02', text: 'Saw things that others couldn\'t see', domain: 'psychosis' },
      { id: 'PSYCHOSIS_03', text: 'Felt that your thoughts were being controlled by someone else', domain: 'psychosis' },
      { id: 'PSYCHOSIS_04', text: 'Felt that you could read other people\'s minds', domain: 'psychosis' },
      { id: 'PSYCHOSIS_05', text: 'Felt that others could read your mind', domain: 'psychosis' },
    ],
    domains: ['psychosis'],
    scoring: {
      domainThresholds: {
        psychosis: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 5] },
      },
    },
  },
  level2_sleep: {
    id: 'level2_sleep',
    name: 'DSM-5-TR Level 2 Sleep Measure',
    description: 'How satisfied/dissatisfied have you been with your sleep in the past 7 days?',
    items: [
      { id: 'SLEEP_01', text: 'Difficulty falling asleep', domain: 'sleep' },
      { id: 'SLEEP_02', text: 'Difficulty staying asleep', domain: 'sleep' },
      { id: 'SLEEP_03', text: 'Waking up too early', domain: 'sleep' },
      { id: 'SLEEP_04', text: 'Feeling unrefreshed after sleep', domain: 'sleep' },
      { id: 'SLEEP_05', text: 'Daytime sleepiness', domain: 'sleep' },
    ],
    domains: ['sleep'],
    scoring: {
      domainThresholds: {
        sleep: { none: [0, 1], slight: [2, 4], mild: [5, 7], moderate: [8, 10], severe: [11, 20] },
      },
    },
  },
  level2_memory: {
    id: 'level2_memory',
    name: 'DSM-5-TR Level 2 Memory Measure',
    description: 'How often have you experienced the following in the past 7 days?',
    items: [
      { id: 'MEMORY_01', text: 'Forgot appointments or commitments', domain: 'memory' },
      { id: 'MEMORY_02', text: 'Forgot what you were doing in the middle of a task', domain: 'memory' },
      { id: 'MEMORY_03', text: 'Had trouble remembering names', domain: 'memory' },
      { id: 'MEMORY_04', text: 'Had trouble finding your way around familiar places', domain: 'memory' },
      { id: 'MEMORY_05', text: 'Had to rely on others to remember things for you', domain: 'memory' },
    ],
    domains: ['memory'],
    scoring: {
      domainThresholds: {
        memory: { none: [0, 1], slight: [2, 4], mild: [5, 7], moderate: [8, 10], severe: [11, 20] },
      },
    },
  },
  level2_repetitive_thoughts: {
    id: 'level2_repetitive_thoughts',
    name: 'DSM-5-TR Level 2 Repetitive Thoughts/Behaviors Measure',
    description: 'How often have you experienced the following in the past 7 days?',
    items: [
      { id: 'RTB_01', text: 'Unwanted thoughts, images, or urges that repeatedly enter your mind', domain: 'repetitive_thoughts' },
      { id: 'RTB_02', text: 'Feeling driven to perform certain behaviors or mental acts over and over', domain: 'repetitive_thoughts' },
      { id: 'RTB_03', text: 'Spending a lot of time on these thoughts or behaviors', domain: 'repetitive_thoughts' },
      { id: 'RTB_04', text: 'These thoughts or behaviors cause significant distress', domain: 'repetitive_thoughts' },
      { id: 'RTB_05', text: 'These thoughts or behaviors interfere with daily life', domain: 'repetitive_thoughts' },
    ],
    domains: ['repetitive_thoughts'],
    scoring: {
      domainThresholds: {
        repetitive_thoughts: { none: [0, 1], slight: [2, 4], mild: [5, 7], moderate: [8, 10], severe: [11, 20] },
      },
    },
  },
  level2_dissociation: {
    id: 'level2_dissociation',
    name: 'DSM-5-TR Level 2 Dissociation Measure',
    description: 'How often have you experienced the following in the past 7 days?',
    items: [
      { id: 'DISS_01', text: 'Felt detached from your body', domain: 'dissociation' },
      { id: 'DISS_02', text: 'Felt that things around you were not real', domain: 'dissociation' },
      { id: 'DISS_03', text: 'Felt like you were watching yourself from outside', domain: 'dissociation' },
      { id: 'DISS_04', text: 'Had gaps in your memory for recent events', domain: 'dissociation' },
      { id: 'DISS_05', text: 'Felt like you were in a dream or fog', domain: 'dissociation' },
    ],
    domains: ['dissociation'],
    scoring: {
      domainThresholds: {
        dissociation: { none: [0, 1], slight: [2, 4], mild: [5, 7], moderate: [8, 10], severe: [11, 20] },
      },
    },
  },
  level2_personality_functioning: {
    id: 'level2_personality_functioning',
    name: 'DSM-5-TR Level 2 Personality Functioning Measure',
    description: 'How true are the following statements for you in general?',
    items: [
      { id: 'PF_01', text: 'I have trouble knowing what I want or value', domain: 'personality_functioning' },
      { id: 'PF_02', text: 'My goals and values change frequently', domain: 'personality_functioning' },
      { id: 'PF_03', text: 'I have difficulty feeling close to others', domain: 'personality_functioning' },
      { id: 'PF_04', text: 'I avoid relationships because I fear rejection', domain: 'personality_functioning' },
      { id: 'PF_05', text: 'I have trouble understanding other people\'s perspectives', domain: 'personality_functioning' },
    ],
    domains: ['personality_functioning'],
    scoring: {
      domainThresholds: {
        personality_functioning: { none: [0, 2], slight: [3, 5], mild: [6, 8], moderate: [9, 11], severe: [12, 20] },
      },
    },
  },
  level2_substance_use: {
    id: 'level2_substance_use',
    name: 'DSM-5-TR Level 2 Substance Use Measure',
    description: 'In the past 12 months, how often have you used the following?',
    items: [
      { id: 'SUB_01', text: 'Alcohol (4+ drinks in a day)', domain: 'substance_use' },
      { id: 'SUB_02', text: 'Tobacco products', domain: 'substance_use' },
      { id: 'SUB_03', text: 'Prescription medications not as prescribed', domain: 'substance_use' },
      { id: 'SUB_04', text: 'Marijuana or cannabis', domain: 'substance_use' },
      { id: 'SUB_05', text: 'Other drugs (cocaine, heroin, methamphetamine, etc.)', domain: 'substance_use' },
    ],
    domains: ['substance_use'],
    scoring: {
      domainThresholds: {
        substance_use: { none: [0, 0], slight: [1, 1], mild: [2, 2], moderate: [3, 3], severe: [4, 5] },
      },
    },
  },
}

export const LEVEL2_DOMAIN_LABELS: Record<string, string> = {
  level2_depression: 'Depression (PHQ-9)',
  level2_anger: 'Anger',
  level2_mania: 'Mania (ASRM)',
  level2_anxiety: 'Anxiety (GAD-7)',
  level2_somatic: 'Somatic Symptoms',
  level2_suicidal_ideation: 'Suicidal Ideation',
  level2_psychosis: 'Psychosis',
  level2_sleep: 'Sleep Problems',
  level2_memory: 'Memory Problems',
  level2_repetitive_thoughts: 'Repetitive Thoughts/Behaviors',
  level2_dissociation: 'Dissociation',
  level2_personality_functioning: 'Personality Functioning',
  level2_substance_use: 'Substance Use',
}