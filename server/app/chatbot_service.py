import os
import re
import joblib

# === Dynamic model paths ===
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "specialization_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "tfidf_vectorizer.pkl")

# === Load model and vectorizer safely ===
try:
    rf_model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
except FileNotFoundError as e:
    raise FileNotFoundError(
        f"❌ Model file not found: {e.filename}\n"
        f"Expected in: {os.path.dirname(MODEL_PATH)}\n"
        f"Make sure the model files exist there."
    )

# === Symptom extraction configuration ===
SYMPTOM_KEYWORDS = [
    "Fatigue", "Jaundice", "Fluid retention",
    "Headache", "Nasal congestion", "Facial pain",
    "Widespread pain", "Memory issues",
    "Rash", "Cough", "Fever", "Runny nose",
    "Swelling", "Reduced urine output",
    "Bulge", "Pain while lifting", "Weakness",
    "Abdominal pain", "Nausea", "Bloating after meals",
    "Frequent urination", "Burning sensation",
    "Blurry vision", "Glare sensitivity", "Faded colors",
    "Red eyes", "Itching", "Discharge",
    "Difficulty speaking", "Vision loss",
    "Weight gain", "Shortness of breath",
    "Extreme tiredness", "Sleep issues", "Joint pain",
    "Vomiting", "Heartburn",
    "Sudden fear", "Heart palpitations", "Sweating",
    "Persistent sadness", "Loss of interest",
    "Seizures", "Confusion", "Loss of consciousness",
    "Redness", "Pus formation",
    "Weak bones", "Fractures", "Back pain",
    "Dizziness", "Shaking",
    "Chronic cough", "Mucus", "Breathlessness",
    "Sneezing", "Watery eyes",
    "Scaly skin patches",
    "Sore throat", "Difficulty swallowing",
    "Dry itchy skin", "Cracking",
    "Excessive worry", "Restlessness",
    "Muscle spasms", "Stiffness",
    "Lower back ache"
]

DURATION_PATTERN = r"(for|since)\s+([a-zA-Z0-9\s]+?)(?=$|[.,;]| and| also)"

def process_chat_message(message: str):
    text = message.lower().strip()
    text = text.replace("dizzyness", "dizziness")

    parts = re.split(r"[.,;]| and | also | but ", text)
    extracted_symptoms = []

    for part in parts:
        part = part.strip()
        if not part:
            continue

        duration_match = re.search(DURATION_PATTERN, part)
        duration_text = duration_match.group(0).strip() if duration_match else ""

        # Match "pain in ..."
        if "pain in" in part:
            match = re.search(r"pain in (my |the |your )?([a-z\s]+)", part)
            if match:
                symptom = "pain in " + match.group(2).strip()
                if duration_text:
                    symptom += f" {duration_text}"
                extracted_symptoms.append(symptom)
                continue

        # Match predefined symptoms
        for symptom in SYMPTOM_KEYWORDS:
            if symptom.lower() in part:
                if symptom.lower() == "pain" and any("pain" in s for s in extracted_symptoms):
                    continue
                symptom_with_duration = f"{symptom} {duration_text}".strip()
                extracted_symptoms.append(symptom_with_duration)

    # Deduplicate
    symptoms = list(dict.fromkeys(extracted_symptoms))
    reply = "I understand. You mentioned symptoms like: " + ", ".join(symptoms) + "."

    # Predict specialization
    if symptoms:
        combined_text = " ".join(symptoms)
        features = vectorizer.transform([combined_text])
        predicted_specialization = rf_model.predict(features)[0]
        reply += f" Based on your symptoms, I recommend consulting a **{predicted_specialization}**."
    else:
        predicted_specialization = None
        reply += " Could you describe your symptoms a bit more clearly?"

    return {
        "reply": reply,
        "symptoms": symptoms,
        "predicted_specialization": predicted_specialization
    }

if __name__ == "__main__":
    user_input = "I have a persistent cough and chest pain for 2 weeks"
    response = process_chat_message(user_input)
    print(response["reply"])
