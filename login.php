<?php
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    session_start();

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

    if(empty($data["email"]) || empty($data["password"])) {
        echo json_encode(["status" => "error", "message" => "Please fill all fields!"]);
        exit;
    }

    $email = $data["email"];
    $password = $data["password"];

    // Check user in database
    $stmt = $conn->prepare("SELECT userName, password FROM useracc WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($name, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION["user"] = $name;
            echo json_encode(["status" => "success", "message" => "Login successful!", "name" => $name]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid password!"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found!"]);
    }

    $conn->close();
?>