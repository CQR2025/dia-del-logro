from flask import Flask, render_template, jsonify
import os
import json
import random

app = Flask(__name__)

# Mapeo de nombres de ruta a nombres de carpeta
NIVELES_MAP = {
    'inicial': 'inicial',
    'primaria': 'primaria',
    'secundaria': 'secundaria'
}

@app.route('/')
def game_challenge():
    return render_template('game_challenge.html')

@app.route('/festival')
def index():
    return render_template('index.html')

@app.route('/como-lo-hacemos')
def como_lo_hacemos():
    return render_template('como_lo_hacemos.html')

@app.route('/nivel/<nivel>')
def mostrar_nivel(nivel):
    folder_name = NIVELES_MAP.get(nivel.lower())
    if not folder_name:
        return "Nivel no encontrado", 404

    nivel_path = os.path.join(app.static_folder, 'img', folder_name)
    
    if not os.path.isdir(nivel_path):
        return "Nivel no encontrado", 404

    aulas = {}
    for aula_name in sorted(os.listdir(nivel_path)):
        aula_path = os.path.join(nivel_path, aula_name)
        if os.path.isdir(aula_path):
            all_images = sorted([f for f in os.listdir(aula_path) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.svg'))])
            # Seleccionar una imagen aleatoria para la tarjeta del aula
            random_image = None
            if all_images:
                random_image = f'/static/img/{folder_name}/{aula_name}/{random.choice(all_images)}'
            
            aulas[aula_name] = {
                'all_images': [f'/static/img/{folder_name}/{aula_name}/{img}' for img in all_images],
                'random_image': random_image
            }
    
    # Convertir el diccionario de aulas a JSON para pasarlo a la plantilla
    aulas_json = json.dumps(aulas)

    return render_template('nivel.html', nivel=nivel.capitalize(), aulas=aulas, aulas_json=aulas_json)

if __name__ == '__main__':
    app.run(debug=True)
