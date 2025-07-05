from flask import Flask, render_template, request, send_from_directory, redirect, url_for, flash
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for flashing messages
app.config['TEMPLATES_AUTO_RELOAD'] = True

# Single-page route
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Email sending logic will go here
        flash('Message sent successfully!', 'success')
        return redirect(url_for('index'))
    return render_template('index.html')

# Resume download route
@app.route('/resume')
def download_resume():
    return send_from_directory('static', 'resume.pdf', as_attachment=True)

@app.route('/all-projects')
def all_projects():
    return render_template('all_projects.html')

@app.route('/project/<int:project_id>')
def project_detail(project_id):
    return render_template('project_detail.html', project_id=project_id)

if __name__ == '__main__':
    # Always run in debug mode for auto-reload during development
    app.run(debug=True, port=5001)
