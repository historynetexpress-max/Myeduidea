# Python (Flask/FastAPI) उदाहरण
from flask import Flask, request, jsonify
import google.generativeai as genai
import base64

app = Flask(__name__)
genai.configure(api_key="YOUR_API_KEY")

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content(user_message)
    
    return jsonify({'response': response.text})

@app.route('/api/chat-with-image', methods=['POST'])
def chat_with_image():
    # इमेज अपलोड हैंडलिंग
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    image_file = request.files['image']
    prompt = request.form.get('prompt', 'Describe this image')
    
    # इमेज को base64 में convert करें
    image_bytes = image_file.read()
    image_base64 = base64.b64encode(image_bytes).decode('utf-8')
    
    # Gemini Vision API कॉल
    model = genai.GenerativeModel('gemini-2.0-flash')
    response = model.generate_content([
        prompt,
        {"mime_type": "image/jpeg", "data": image_base64}
    ])
    
    return jsonify({'response': response.text})
