<?php
// chat.php for php-api
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
$messages = $data['messages'] ?? null;

if (!$messages || !is_array($messages)) {
    http_response_code(400);
    echo json_encode(['error' => 'Messages array required']);
    exit;
}

$systemPrompt = "You are a friendly and professional AI assistant for WebStep Solutions, a web development and digital marketing agency based in India.

Your job is to:
- Answer questions about WebStep's services: website development, SEO, digital marketing, mobile apps, e-commerce solutions, UI/UX design
- Help visitors understand pricing, timelines, and packages
- Collect basic lead info (name, business type, requirements) naturally in conversation
- Be warm, helpful, and concise — like a knowledgeable sales executive
- Respond in the same language the user is using (English or Hinglish)
- If someone asks for a quote or wants to talk to a human, guide them to call:  79739-38927 or visit /customize-package

Keep responses short (2-4 sentences max) unless detailed explanation is needed.
Never make up pricing — say \"our team will provide a custom quote based on your needs.\"";

$formattedMessages = [
    ['role' => 'system', 'content' => $systemPrompt],
];

foreach ($messages as $msg) {
    if (!is_array($msg)) continue;
    $role = $msg['role'] ?? '';
    $content = trim($msg['content'] ?? '');
    if (($role === 'user' || $role === 'assistant') && $content !== '') {
        $formattedMessages[] = [
            'role'    => $role,
            'content' => $content,
        ];
    }
}

$apiKey = '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';
$reply = '';
$models = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];

foreach ($models as $model) {
    $payload = json_encode([
        'model'       => $model,
        'messages'    => $formattedMessages,
        'max_tokens'  => 500,
        'temperature' => 0.7,
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey,
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);

    $raw = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status === 200 && $raw) {
        $res = json_decode($raw, true);
        $content = $res['choices'][0]['message']['content'] ?? null;
        if (!empty($content)) {
            $reply = trim($content);
            break;
        }
    }
}

if (!$reply) {
    $reply = "Sorry, something went wrong. Please call us at 79739-38927 or email info@webstepsolutions.com!";
}

echo json_encode([
    'success' => true,
    'reply'   => $reply,
], JSON_UNESCAPED_UNICODE);
