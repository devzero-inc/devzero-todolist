from typing import List, Dict
from flask import Flask, request, jsonify
import mysql.connector
import json

app = Flask(__name__)

# db config
config = {
    'user': 'root',
    'password': 'root',
    'host': 'db',
    'port': '3306',
    'database': 'todolist-app'
}

def _get_users() -> List[Dict]:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    
    cursor.execute('SELECT * FROM users')
    results = [{user_id: (name, email)} for (user_id, name, email) in cursor]

    cursor.close()
    connection.close()

    return results

def _get_user(email) -> Dict:
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()

    query = "SELECT * FROM users WHERE email = %s"
    values = (email,)
    cursor.execute(query, values)
    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user:
      user_id, name, email = user
      return {
        'id': user_id,
        'name': name,
        'email': email
      }
    return {}

def _create_user(name, email):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    
    query = "INSERT INTO users (name, email) VALUES (%s, %s)"
    values = (name, email)
    cursor.execute(query, values)
    connection.commit()

    # Return the newly created user object
    user_id = cursor.lastrowid
    user = {
      'id': user_id,
      'name': name,
      'email': email
    }

    cursor.close()
    connection.close()
    return user

@app.route('/users', methods=['GET'])
def get_users() -> str:
    return json.dumps({'users': _get_users()})

# Endpoint for retrieving a user by email
@app.route('/users/<string:email>', methods=['GET'])
def get_user(email):
  user = _get_user(email)

  # If the user exists, return the user object
  if user:
    return jsonify(user), 200
  # If the user doesn't exist, return a 404 error
  else:
    return jsonify({'error': 'User not found'}), 404

@app.route('/users', methods=['POST'])
def create_user():
  # Get the name and email from the request body
  name = request.json['name']
  email = request.json['email']

  user = _create_user(name, email)
  return jsonify(user), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
