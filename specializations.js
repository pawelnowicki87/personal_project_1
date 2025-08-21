export class Specialization {
  constructor(name, symptoms) {
    this.name = name;
    this.symptoms = symptoms.map(s => s.toLowerCase());
  }

  hasSymptom(symptom) {
    return this.symptoms.includes(symptom.toLowerCase());
  }
}

export const specializations = [
  new Specialization("cardiology", [
    "chest pain",
    "heart palpitations",
    "shortness of breath during exertion",
    "fainting or blackouts",
    "ankle or foot swelling",
    "pain radiating to left arm or jaw",
    "bluish lips or fingers during exertion",
    "easily fatigued",
    "dizziness when standing up",
    "irregular heartbeat"
  ]),

  new Specialization("surgery", [
    "acute abdominal pain",
    "bleeding wound",
    "suspected fracture",
    "hernia lump with pain",
    "abscess with redness and swelling",
    "postoperative wound check",
    "sudden pain in right lower abdomen",
    "burns with blisters",
    "foreign body in wound",
    "persistent bleeding from injury"
  ]),

  new Specialization("dermatology", [
    "itchy rash",
    "acne",
    "skin discoloration or dark spots",
    "scaly skin patches",
    "hives",
    "dandruff and itchy scalp",
    "cracked corners of mouth",
    "warts",
    "suspicious mole or skin lesion",
    "eczema with dryness and redness"
  ]),

  new Specialization("neurology", [
    "recurrent headache",
    "migraine",
    "dizziness or balance problems",
    "numbness in limbs",
    "weakness on one side of body",
    "memory problems",
    "difficulty speaking",
    "tremors",
    "seizures",
    "vision disturbances"
  ]),

  new Specialization("pediatrics", [
    "fever in child",
    "persistent cough in child",
    "ear pain in child",
    "vomiting in child",
    "rash in child",
    "diarrhea in child",
    "loss of appetite in child",
    "sleep disturbances in child",
    "abdominal pain in child",
    "sore throat in child"
  ])
];

export function findSpecializationBySymptom(symptom) {
  const lower = symptom.toLowerCase();
  for (const spec of specializations) {
    if (spec.hasSymptom(lower)) {
      return spec.name;
    }
  }
  return null;
}
