import json
import os

from datetime import datetime

from typing import List, Dict
from flask import Flask, request, jsonify
import mysql.connector
import requests

app = Flask(__name__)

user_svc_uri = os.getenv('USER_SVC_HOSTPORT')

# db config
config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'todolist-app'
}

def _get_todos(user_id) -> List[Dict]:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    
    query = 'SELECT * FROM todos WHERE user_id = %s'
    values = (user_id,)
    cursor.execute(query, values)
    todos = cursor.fetchall()

    cursor.close()
    connection.close()

    todo_list = []
    for todo in todos:
      todo_id, user_id, description, completed, due_date, priority = todo
      todo_dict = {
        'id': todo_id,
        'description': description,
        'completed': completed,
        'due_date': due_date,
        'priority': priority
      }
      todo_list.append(todo_dict)
    return todo_list

def _create_todo(user_id, description, completed, due_date, priority):
  connection = mysql.connector.connect(**config)
  cursor = connection.cursor()

  date = datetime.strptime(due_date, '%m-%d-%Y')

  query = "INSERT INTO todos (user_id, description, completed, due_date, priority) VALUES (%s, %s, %s, %s, %s)"
  values = (user_id, description, completed, date, priority)
  cursor.execute(query, values)
  connection.commit()

  todo_id = cursor.lastrowid
  todo = {
    'id': todo_id,
    'description': description,
    'completed': completed,
    'due_date': due_date,
    'priority': priority
  }

  cursor.close()
  connection.close()

  return todo

# Endpoint for getting a to-do list for a user
@app.route('/users/<string:email>/todos', methods=['GET'])
def get_todo_list(email):
  # Find the user from the user service
  user = requests.get('%s/users/%s' % (user_svc_uri, email)).json()

  # If the user doesn't exist, return a 404 error
  if not user:
    return jsonify({'error': 'User not found'}), 404

  # If the user exists, retrieve their to-do list from the database
  todo_list = _get_todos(user['id'])
  return jsonify(todo_list), 200

@app.route('/users/<string:email>/todos', methods=['POST'])
def add_todo_item(email):
  # Find the user from the user service
  user = requests.get('%s/users/%s' % (user_svc_uri, email)).json()

  # If the user doesn't exist, return a 404 error
  if not user:
    return jsonify({'error': 'User not found'}), 404
  
  # If the user exists, add a todolist item (which is not done by default)
  description = request.json['description']
  completed = False
  due_date = request.json['due_date']
  priority = request.json['priority']
  
  todo = _create_todo(user['id'], description, completed, due_date, priority)
  return jsonify(todo), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
