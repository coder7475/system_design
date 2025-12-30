from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

# Initialize SQLite connection
def get_db():
    conn = sqlite3.connect('database.db')
    return conn

@app.route('/process_payment', methods=['POST'])
def process_payment():
    request_id = request.headers.get("Request-ID")
    db = get_db()
    cursor = db.cursor()

    # Check if request_id already processed
    cursor.execute("SELECT 1 FROM processed_requests WHERE request_id = ?", (request_id,))
    if cursor.fetchone():
        return jsonify({"message": "Duplicate request ignored"}), 200

    # Process payment
    # Here you would include your payment processing logic
    print("Processing payment...")

    # Mark request as processed
    cursor.execute("INSERT INTO processed_requests (request_id) VALUES (?)", (request_id,))
    db.commit()
    return jsonify({"message": "Payment processed successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)