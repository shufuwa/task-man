from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3

app = Flask(__name__)

# Connect to the database
conn = sqlite3.connect('tasks.db', check_same_thread=False)
c = conn.cursor()

# Create the "tasks" table if it doesn't exist
c.execute('''CREATE TABLE IF NOT EXISTS tasks
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              task_order INTEGER NOT NULL,
              project TEXT NOT NULL,
              project_order INTEGER NOT NULL)''')
conn.commit()

# Create the "tasks-done" table if it doesn't exist
c.execute('''CREATE TABLE IF NOT EXISTS tasks_done
             (id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT NOT NULL,
              task_order INTEGER NOT NULL,
              project TEXT NOT NULL,
              project_order INTEGER NOT NULL)''')
conn.commit()

# Close the connection
conn.close()

@app.route('/')
def index():
    # Connect to the database
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    c = conn.cursor()

    # Fetch all tasks from the "tasks" table
    c.execute('''SELECT * FROM tasks ORDER BY project_order, task_order''')
    tasks = c.fetchall()

    c.execute('''SELECT * FROM tasks_done''')
    tasks_done = c.fetchall()
    tasks_done = reversed(tasks_done)

    projects = []
    current_project = None
    for task in tasks:
        # Check if the current task belongs to a new project
        if task[3] != current_project:
            current_project = task[3]
            projects.append({'name': current_project, 'tasks': []})

        # Add the current task to the current project
        projects[-1]['tasks'].append(task)

    # Close the connection
    conn.close()

    print(projects)

    return render_template('table.html', projects=projects, tasks_done=tasks_done)

@app.route('/tasks/<int:task_id>', methods=['POST'])
def tasks(task_id):
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    c = conn.cursor()
    c.execute('SELECT * FROM tasks WHERE id=?', (task_id,))
    task = c.fetchone()
    conn.close()
    return jsonify({
        'id': task[0],
        'title': task[1],
        'task_order': task[2],
        'project': task[3],
        'project_order': task[4]
    })


@app.route('/add_task/', methods=['POST'])
@app.route('/edit_task/<int:task_id>', methods=['POST'])
def add_or_edit_task(task_id=None):
    # Get the form data
    title = request.form['title']
    task_order = request.form['task_order']
    project = request.form['project']
    project_order = request.form['project_order']

    # Connect to the database
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    c = conn.cursor()

    if task_id is not None:
        # Update an existing task
        c.execute('''UPDATE tasks SET title=?, task_order=?, project=?, project_order=?
                     WHERE id=?''', (title, task_order, project, project_order, task_id))
    else:
        # Insert a new task
        c.execute('''INSERT INTO tasks (title, task_order, project, project_order)
                     VALUES (?, ?, ?, ?)''', (title, task_order, project, project_order))
    conn.commit()

    # Close the connection
    conn.close()

    return redirect(url_for('index'))



@app.route('/delete_task/<task_ids>', methods=['POST', 'GET'])
def delete_task(task_ids):
    task_ids = [int(task_id) for task_id in task_ids.split('a')]
    # Connect to the database
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    c = conn.cursor()

    for task_id in task_ids:
        # Fetch the task from the "tasks" table
        c.execute('''SELECT * FROM tasks WHERE id = ?''', (task_id,))
        task = c.fetchone()

        if task:
            # Delete the task from the "tasks" table
            c.execute('''DELETE FROM tasks WHERE id = ?''', (task_id,))
            conn.commit()
    
    # Close the connection
    conn.close()

    return redirect(url_for('index'))

@app.route('/done_task/<task_ids>', methods=['POST', 'GET'])
def done_task(task_ids):
    task_ids = [int(task_id) for task_id in task_ids.split('a')]

    print(task_ids)
    # Connect to the database
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    c = conn.cursor()

    for task_id in task_ids:
        # Fetch the task from the "tasks" table
        c.execute('''SELECT * FROM tasks WHERE id = ?''', (task_id,))
        task = c.fetchone()

        if task:
            # Move the task to the "tasks-done" table
            c.execute('''INSERT INTO tasks_done (title, task_order, project, project_order)
                         VALUES (?, ?, ?, ?)''', (task[1], task[2], task[3], task[4]))
            conn.commit()

            # Delete the task from the "tasks" table
            c.execute('''DELETE FROM tasks WHERE id = ?''', (task_id,))
            conn.commit()

    # Close the connection
    conn.close()

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
