from flask import Flask, render_template, url_for

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/game/game1')
def game1():
    return render_template('game1.html')

@app.route('/game/game2')
def game2():
    return render_template('game2.html')

@app.route('/game/game3')
def game3():
    return render_template('game3.html')