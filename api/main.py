from flask import Flask, request
from flask_cors import CORS
from ocrapi.predict import bashExec
import os
import base64
from werkzeug.utils import secure_filename
import PIL.Image as Image
import io

app = Flask("handiji")
CORS(app)


@app.route("/", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        # os.system("curl --request POST --url https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/ --header 'X-RapidAPI-Host: pen-to-print-handwriting-ocr.p.rapidapi.com' --header 'X-RapidAPI-Key: 2dcc147c66msh82530d1cf01e008p10c70djsnd1626946ad8c' --header 'content-type: multipart/form-data' --form 'srcImg=@uploads/temp.jpg' --form Session=string")

        jsonFile = request.get_json()
        file = jsonFile['file']
        image = base64.b64decode(file)
        img = Image.open(io.BytesIO(image))
        basepath = os.path.dirname(__file__)
        img.save(os.path.join("uploads", "temp.jpg"))
        result = os.popen("curl --request POST --url https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/ --header 'X-RapidAPI-Host: pen-to-print-handwriting-ocr.p.rapidapi.com' --header 'X-RapidAPI-Key: 2dcc147c66msh82530d1cf01e008p10c70djsnd1626946ad8c' --header 'content-type: multipart/form-data' --form 'srcImg=@uploads/temp.jpg' --form Session=string").read()
        result.replace("\n", "\\n")
        # response = bashExec(file_path)

    return result


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)


# from flask import Flask,jsonify, request
# from flask_cors import CORS
# from ocrapi.predict import bashExec
# import os
# from werkzeug.utils import secure_filename


# app = Flask("handiji")
# CORS(app)


# @app.route("/", methods=["GET", "POST"])
# def predict():
#     if request.method == "POST":
#         jsonFile = request.get_json()

#         basepath = os.path.dirname(__file__)
#         file_path = os.path.join(basepath, "uploads", secure_filename(file.filename))
#         file.save(file_path)
#         response = bashExec(file_path)
#     return response


# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=8080)
