from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

# Crear la aplicación Flask
app = Flask(__name__)

# Conexión a la base de datos MySQL
conexion = mysql.connector.connect(
    user='root',
    password='',
    host='localhost',
    database='shadows',
    port='3306'
)

miCursor = conexion.cursor()
miCursor.execute("SHOW DATABASES")
consulta = miCursor.fetchall()
print(consulta)

# Ruta de registro de usuario
@app.route('/register', methods=['POST'])
def register_user():
    try:
        # Obtener datos del formulario (JSON)
        data = request.get_json()

        # Extraer los campos
        cedula = data['cedula']  # Este será el 'id' del usuario
        nombre = data['nombre']
        correo = data['correo']
        contraseña = data['contraseña']

        # Hash de la contraseña antes de almacenarla (uso de sha256)
        hashed_password = generate_password_hash(contraseña, method='sha256')

        # Conectar a la base de datos
        cursor = conexion.cursor()

        # Sentencia SQL para insertar los datos del usuario
        query = """
        INSERT INTO usuario (id, password, Rol, nombre, correo) 
        VALUES (%s, %s, 'CLIENTE', %s, %s)
        """
        values = (cedula, hashed_password, nombre, correo)

        # Ejecutar la consulta y guardar los cambios
        cursor.execute(query, values)
        conexion.commit()

        cursor.close()

        # Respuesta exitosa
        return jsonify({"message": "Usuario registrado exitosamente"}), 201

    except Exception as e:
        # Si ocurre un error, mostrar el mensaje del error
        print(f"Error al registrar el usuario: {str(e)}")  # Mostrar detalles del error en la consola
        return jsonify({"message": f"Error al registrar el usuario: {str(e)}"}), 500

# Ruta de login
@app.route('/login', methods=['POST'])
def login():
    # Obtener los datos de la solicitud (correo y contraseña)
    data = request.get_json()
    correo = data['correo']
    contraseña = data['contraseña']

    cursor = conexion.cursor()

    # Consulta para verificar si el usuario existe en la base de datos
    query = "SELECT nombre, password FROM usuario WHERE correo = %s"
    cursor.execute(query, (correo,))
    user = cursor.fetchone()

    if user and check_password_hash(user[1], contraseña):  # Comparar la contraseña (si es correcta)
        # Si las credenciales son correctas, enviar el nombre del usuario
        cursor.close()
        return jsonify({
            'success': True,
            'nombre': user[0]  # Retorna el nombre del usuario
        })
    else:
        # Si el usuario no existe o la contraseña es incorrecta
        cursor.close()
        return jsonify({'success': False}), 401  # 401 significa "No autorizado"

# Iniciar el servidor Flask
if __name__ == '__main__':
    app.run(debug=True)



