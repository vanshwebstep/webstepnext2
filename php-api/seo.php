<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$db = getDB();
$raw_url = trim($_GET['page_url'] ?? '');

if (!$raw_url) {
    echo json_encode(['success' => false, 'error' => 'Page URL parameter is required']);
    exit;
}

$url_without_slash = ltrim($raw_url, '/');
$url_with_slash = '/' . $url_without_slash;

$stmt = $db->prepare("
    SELECT title, description, keywords 
    FROM seo_settings 
    WHERE page_url = ? OR page_url = ? OR page_url = ?
    LIMIT 1
");
$stmt->execute([$raw_url, $url_without_slash, $url_with_slash]);
$row = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$row) {
    echo json_encode([
        'success' => true,
        'data' => [
            'title' => '',
            'description' => '',
            'keywords' => ''
        ]
    ]);
    exit;
}

echo json_encode(['success' => true, 'data' => $row]);
