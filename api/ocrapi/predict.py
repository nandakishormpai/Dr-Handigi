from subprocess import PIPE, Popen
import json
import os


def bashExec(file_path):

    os.system('dir')

    bashCommand2 = f"curl --request POST --url https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/ --header 'X-RapidAPI-Host: pen-to-print-handwriting-ocr.p.rapidapi.com' --header 'X-RapidAPI-Key: 2dcc147c66msh82530d1cf01e008p10c70djsnd1626946ad8c' --header 'content-type: multipart/form-data' --form 'srcImg=@uploads/temp.jpg' --form Session=string"
    bashCommand3 = f'''
    curl --request POST \
	--url https://pen-to-print-handwriting-ocr.p.rapidapi.com/recognize/ \
	--header 'X-RapidAPI-Host: pen-to-print-handwriting-ocr.p.rapidapi.com' \
	--header 'X-RapidAPI-Key: 2dcc147c66msh82530d1cf01e008p10c70djsnd1626946ad8c' \
	--header 'content-type: multipart/form-data' \
	--form srcImg=@uploads/temp.jpg' \
	--form Session=string
    '''
    # print("AAAAAAAAAAAa "+file_path)
    with Popen(bashCommand3, stdout=PIPE, shell=True) as process:
        output = process.communicate()[0].decode('utf-8')
        output.replace("\n", "\\n")
        print("Hoiii", output, "Heyy")
        return json.loads(output)
