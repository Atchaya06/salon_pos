<?php
$payload = json_encode([
    'client_id' => null,
    'client_name' => 'Walk-in',
    'client_phone' => '',
    'bill_type' => 'GST',
    'discount_type' => 'Flat',
    'discount_amount' => 0,
    'advance_received' => 0,
    'amount_paid' => 0,
    'payment_mode' => 'Cash',
    'items' => [
        ['catalog_item_id' => 2, 'staff_id' => null, 'quantity' => 1]
    ]
]);
$ch = curl_init('http://127.0.0.1:8000/api/pos/checkout');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json', 'Accept: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
echo "HTTP $httpcode\n";
echo $response;
