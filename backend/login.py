from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__, template_folder='frontend/login.html', static_folder='/frontend/static')
app.secret_key = 'e1234567cdef89ab1234567890abcdef'

USERNAME = 'user'
PASSWORD = 'password'

@app.route('/')
def home():
    return render_template('login.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        if username == USERNAME and password == PASSWORD:
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid credentials', 'danger')
            return redirect(url_for('login'))
    
    return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    return 'Welcome to your dashboard!'


if __name__ == '__main__':
    app.run(debug=True)
