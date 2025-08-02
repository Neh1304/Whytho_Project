from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.message import EmailMessage
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Replace with your Gmail and App Password
EMAIL_ADDRESS = "itsnehasiju@gmail.com"
EMAIL_PASSWORD = "zktz epyr wwwd yqzc"

@app.route('/send', methods=['POST'])
def send_email():
    data = request.get_json()
    recipient = data.get("email")
    if not recipient:
        return jsonify({"message": "Email is required"}), 400

    now = datetime.now()
    current_time = now.strftime("%I:%M:%S %p")

    msg = EmailMessage()
    msg['Subject'] = "Current Time Update from TellTime"
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = recipient
    msg.set_content(f"Hey there! 👋\n\nThe current time is: {current_time}")

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return jsonify({"message": "Time sent to your inbox!"})
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Failed to send email."}), 500

if __name__ == '__main__':
    app.run(debug=True)
