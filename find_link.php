<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

echo "--- HAIRWASH DATA ---\n";
$hw = DB::table('catalog_items')->where('name', 'hairwash')->first();
print_r((array)$hw);

echo "\n--- XTENSO DATA ---\n";
$xt = DB::table('catalog_items')->where('name', 'like', '%Xtenso%')->first();
print_r((array)$xt);

echo "\n--- SEARCHING FOR ANY LINKING COLUMNS ---\n";
$all = DB::table('catalog_items')->get();
foreach ($all as $item) {
    if ($item->description && str_contains($item->description, '{')) {
        echo "POSSIBLE JSON in ID {$item->id}: {$item->description}\n";
    }
}
