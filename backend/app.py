import os
import uuid
from flask import Flask, request, send_file
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/convert/avif2png', methods=['POST'])
def hello(): 
    return 500

@app.route('/convert/png2jpg', methods=['POST'])
def png_to_jpg():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']

    if file.filename == '':
        return "No selected file", 400

    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4()) + '.jpg'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        # Read PNG image using PIL
        img = Image.open(filepath)
        
        if img.format.lower() != 'png':
            return "Invalid file format. Please upload a PNG file.", 400
        
        # Save the PNG image as JPEG
        jpeg_filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        img = img.convert('RGB')
        img.save(jpeg_filepath, 'JPEG')

        return send_file(jpeg_filepath, as_attachment=True)
    else:
        return "Invalid file format. Please upload a PNG file.", 400

@app.route('/convert/jpg2png', methods=['POST'])
def jpg_to_png():
    if 'file' not in request.files:
        return "No file part", 400
    
    file = request.files['file']

    if file.filename == '':
        return "No selected file", 400

    if file and allowed_file(file.filename):
        filename = str(uuid.uuid4()) + '.png'
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)

        # Read JPEG image using PIL
        img = Image.open(filepath)
        
        if img.format.lower() not in ['jpeg', 'jpg']:
            return "Invalid file format. Please upload a JPG file.", 400

        # Save the JPEG image as PNG
        png_filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        img.save(png_filepath, 'PNG')

        return send_file(png_filepath, as_attachment=True)
    else:
        return "Invalid file format. Please upload a JPG file.", 400

if __name__ == '__main__':
    app.run(debug=True)
