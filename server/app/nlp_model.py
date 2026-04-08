import re
import spacy
from transformers import AutoTokenizer, AutoModelForTokenClassification, pipeline

print("Loading SciSpacy and BioBERT models...")

# Load SciSpacy
nlp_ner = spacy.load("en_ner_bc5cdr_md")

# Load BioBERT
tokenizer = AutoTokenizer.from_pretrained("dmis-lab/biobert-base-cased-v1.1")
model = AutoModelForTokenClassification.from_pretrained("dmis-lab/biobert-base-cased-v1.1")
biobert_pipeline = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple")

def clean_text(text: str):
    text = text.lower().strip()
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    return text

def extract_symptoms(text: str):
    """Extract symptoms using hybrid SciSpacy + BioBERT model."""
    text = clean_text(text)

    # 1️⃣ SciSpacy entities
    doc = nlp_ner(text)
    scispacy_entities = {
        ent.text.lower() for ent in doc.ents if ent.label_.lower() in ["disease", "symptom"]
    }

    # 2️⃣ BioBERT entities
    biobert_results = biobert_pipeline(text)
    biobert_entities = {r["word"].lower() for r in biobert_results if len(r["word"]) > 2}

    # 3️⃣ Combine results
    combined = list(set(scispacy_entities.union(biobert_entities)))

    # 4️⃣ Basic cleanup
    filtered = [w for w in combined if w not in ["i", "have", "since", "pain", "morning"]]
    return filtered
