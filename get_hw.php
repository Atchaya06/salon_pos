<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$hw = DB::table('catalog_items')->where('name', 'hairwash')->first();
echo "[[[START]]]\n";
echo "ID: " . $hw->id . "\n";
echo "NAME: " . $hw->name . "\n";
echo "DESC: " . $hw->description . "\n";
echo "USE_QTY: " . ($hw->use_qty ?? 'N/A') . "\n";
echo "USE_ID: " . ($hw->use_product_id ?? 'N/A') . "\n";
echo "[[[END]]]\n";
