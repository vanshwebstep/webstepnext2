<?php
require __DIR__ . '/db.php';

api_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    api_response(['success' => false, 'message' => 'Method not allowed'], 405);
}

try {
    $pdo = api_pdo();

    $page = $_GET['page'] ?? ''; // 'b2b' | 'packages'
    $col  = null;
    if ($page === 'b2b') $col = 'show_on_b2b';
    elseif ($page === 'packages') $col = 'show_on_packages';

    $tableExists = false;
    try {
        $check = $pdo->query("SHOW TABLES LIKE 'packages'");
        $tableExists = (bool) $check->fetch();
    } catch (Throwable $t) {
        $tableExists = false;
    }

    if ($tableExists) {
        $sql = "SELECT * FROM packages WHERE is_active = 1";
        if ($col) $sql .= " AND `$col` = 1";
        $sql .= " ORDER BY sort_order ASC, id ASC";

        $stmt = $pdo->query($sql);
        $packages = $stmt->fetchAll();

        foreach ($packages as &$pkg) {
            if (isset($pkg['events']) && is_string($pkg['events'])) {
                $decoded = json_decode($pkg['events'], true);
                if (is_array($decoded)) $pkg['events'] = $decoded;
            }
            if (isset($pkg['isPopular'])) $pkg['isPopular'] = (bool) $pkg['isPopular'];
        }

        api_response(['tabs' => [], 'packages' => $packages]);
    } else {
        $stmt = $pdo->prepare("SELECT data FROM dynamic_content WHERE type = 'packages' AND is_active = 1 ORDER BY updated_at DESC LIMIT 1");
        $stmt->execute();
        $row = $stmt->fetch();

        if ($row && !empty($row['data'])) {
            api_response(json_decode($row['data'], true));
        } else {
            api_response(['tabs' => [], 'packages' => []]);
        }
    }
} catch (Throwable $e) {
    api_response(['success' => false, 'message' => 'Database connection error: ' . $e->getMessage()], 500);
}