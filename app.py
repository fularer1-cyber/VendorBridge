from flask import Flask,render_template, request, redirect, url_for, flash
import mysql.connector
import os
app = Flask(__name__)
UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"]=UPLOAD_FOLDER

app.secret_key = "vendorbridge_secret_key"


# =========================================
# MYSQL DATABASE CONNECTION
# =========================================

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="762090",
        database="vendorbridge"
    )


# =========================================
# HOME PAGE
# =========================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================
# ABOUT PAGE
# =========================================

@app.route("/about")
def about():
    return render_template("index.html")


# =========================================
# CONTACT FORM
# =========================================

@app.route("/contact", methods=["GET", "POST"])
def contact():

    if request.method == "POST":

        name = request.form.get("name")
        email = request.form.get("email")
        phone = request.form.get("phone")
        subject = request.form.get("subject")
        company = request.form.get("company")
        requirement_date = request.form.get("requirement_date")
        message = request.form.get("message")
        document = request.files.get("document")
        document.save(os.path.join(app.config["UPLOAD_FOLDER"], document.filename))

        try:

            connection = get_db_connection()
            cursor = connection.cursor()

            sql = """
                INSERT INTO contact
                (name, email, phone, subject, company, requirement_date, message)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """

            values = (
                name,
                email,
                phone,
                subject,
                company,
                requirement_date,
                message
            )

            cursor.execute(sql, values)

            connection.commit()

            cursor.close()
            connection.close()

            return """
                <h2>Message received successfully!</h2>
                <p>Thank you for contacting VendorBridge.</p>
                <a href="/">Go Back to Home</a>
            """

        except Exception as e:

            return f"""
                <h2>Database Error</h2>
                <p>{e}</p>
                <a href="/">Go Back to Home</a>
            """

    return redirect(url_for("home"))


# =========================================
# TEST DATABASE
# =========================================

@app.route("/test")
def test():

    try:

        connection = get_db_connection()

        cursor = connection.cursor()

        cursor.execute("SELECT DATABASE()")

        result = cursor.fetchone()

        cursor.close()
        connection.close()

        return f"""
            <h2>MySQL Connected Successfully!</h2>
            <p>Database: {result[0]}</p>
        """

    except Exception as e:

        return f"""
            <h2>MySQL Connection Failed</h2>
            <p>{e}</p>
        """


# =========================================
# RUN APPLICATION
# =========================================

if __name__ == "__main__":
    app.run(debug=True)