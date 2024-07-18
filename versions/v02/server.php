<?php
session_start();

if (!isset($_SESSION['leaderboard'])) {
    $_SESSION['leaderboard'] = [];
}

// Add user score to leaderboard
function addScore($name, $triesRemaining) {
    // Storing user name and the number of tries remaining as their score
    $newEntry = ["name" => $name, "triesRemaining" => (int)$triesRemaining];
    $_SESSION['leaderboard'][] = $newEntry;

    // Sort leaderboard so that more tries remaining is higher than less tries remaining
    usort($_SESSION['leaderboard'], function($x, $y) {
        return $y['triesRemaining'] - $x['triesRemaining'];
    });

    // Keep only the top 10 scores
    if (count($_SESSION['leaderboard']) > 10) {
        array_pop($_SESSION['leaderboard']);
    }
}

// Retrieve entries in the leaderboard
function getScores() {
    return isset($_SESSION['leaderboard']) ? $_SESSION['leaderboard'] : [];
}

// Handle post operations
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    switch ($action) {
        // Add score to leaderboard
        case 'addScore':
            $name = $_POST['name'];
            $triesRemaining = $_POST['triesRemaining'];
            addScore($name, $triesRemaining);
            echo json_encode(["status" => "success"]);
            break;
        // Get current leaderboard
        case 'getScores':
            echo json_encode(getScores());
            break;
        // Clear current leaderboard of all entries
        case 'clearScores':
            $_SESSION['leaderboard'] = [];
            echo json_encode(["status" => "success"]);
            break;
        default:
            echo json_encode(["status" => "error"]);
            break;
    }
}
?>