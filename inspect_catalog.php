<?php
require __DIR__ . '/vendor/autoload.php';
$bootstrap = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $bootstrap->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

$table = 'catalog_items';
$columns = Schema::getColumnListing($table);
echo "Columns: " . implode(', ', $columns) . "\n\n";

$services = DB::table($table)->where('type', 'Service')->limit(10)->get();
foreach ($services as $s) {
    echo "ID: {$s->id} | Name: {$s->name}\n";
    foreach ((array)$s as $key => $val) {
        if ($val && !in_array($key, ['name', 'id', 'created_at', 'updated_at'])) {
             // Look for columns that might hold an ID
             if (str_contains($key, 'id') || is_numeric($val)) {
                 echo "  - $key: $val\n";
             }
        }
    }
}
