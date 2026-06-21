<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

$cols = Schema::getColumnListing('catalog_items');
file_put_contents('schema_cols.txt', implode("\n", $cols));

$services = DB::table('catalog_items')->where('type', 'Service')->get();
$data = [];
foreach ($services as $s) {
    foreach ((array)$s as $k => $v) {
        if ($v && str_contains($k, 'id') && $k !== 'id') {
            $data[] = "Service: {$s->name} | Column: {$k} | Value: {$v}";
        }
    }
}
file_put_contents('service_links.txt', implode("\n", $data));
echo "Done. Check schema_cols.txt and service_links.txt\n";
