import os
import sys
import json
import numpy as np
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from sklearn.metrics.pairwise import cosine_similarity

print("Loading MobileNetV2 model...")
model = MobileNetV2(weights='imagenet', include_top=False, pooling='avg')
print("Model loaded successfully.")

def generate_embedding(image_path):
    try:
        print(f"Generating embedding for {image_path}")
        img = image.load_img(image_path, target_size=(224, 224))
        img_array = np.expand_dims(image.img_to_array(img), axis=0)
        img_array = preprocess_input(img_array)
        embedding = model.predict(img_array).flatten()
        return embedding
    except Exception as e:
        print(f"Error generating embedding: {e}")
        return None

def find_similar_images(uploaded_image_path, products, top_n=5):
    query_vector = generate_embedding(uploaded_image_path).reshape(1, -1)

    img_paths = [p['image'].replace('http://localhost:4000', '.') for p in products]
    product_details = [{k: p[k] for k in p if k != 'image'} for p in products]

    img_vectors = np.array([generate_embedding(path) for path in img_paths])

    similarities = cosine_similarity(query_vector, img_vectors)[0]
    similar_indices = similarities.argsort()[-top_n:][::-1]

    return [{**product_details[i], 'image': img_paths[i], 'similarity': float(similarities[i])} for i in similar_indices]

if __name__ == '__main__':
    try:
        with open('test_input.json', 'r') as f:
            data = json.load(f)
        
        uploaded_image_path = data['image_path']
        products = data['products']
        
        print("Arguments received successfully.")
        print(f"Uploaded Image Path: {uploaded_image_path}")
        print(f"Products JSON: {products}")

        similar_images = find_similar_images(uploaded_image_path, products)
        print("Similar images found.")
        print(json.dumps(similar_images))
    except Exception as e:
        print(f"Error in main execution: {e}")
