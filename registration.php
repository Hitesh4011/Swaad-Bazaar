<?php
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    $host = "localhost";
    $user = "root";
    $pass = "root";
    $dbname = "swaad-bazaar";
    $port = 3306;

    // Connect to MySQL
    $conn = new mysqli($host, $user, $pass, $dbname, $port);
    if ($conn->connect_error) {
        die(json_encode(["status" => "error", "message" => "Database connection failed!"]));
    }

    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);
    if(empty($data["name"]) || empty($data["email"]) || empty($data["password"])) {
        echo json_encode(["status" => "error", "message" => "hello"]);
        exit;
    }
    $name = $data["name"];
    $email = $data["email"];
    $password = $data["password"];

    // Check if email already exists
    $stmt = $conn->prepare("SELECT email FROM useracc WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email is already registered try another"]);
        exit;
    }

    // Hash password before storing
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO useracc (email, userName, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $name, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Registration successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed!"]);
    }

    $conn->close();
?>
