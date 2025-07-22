from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def game_challenge():
    return render_template('game_challenge.html')

@app.route('/festival')
def index():
    return render_template('index.html')

@app.route('/como-lo-hacemos')
def como_lo_hacemos():
    return render_template('como_lo_hacemos.html')

if __name__ == '__main__':
    app.run(debug=True)