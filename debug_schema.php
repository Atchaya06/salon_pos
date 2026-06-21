<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\CatalogItem;

echo "--- COLUMNS ---\n";
print_r(Schema::getColumnListing('catalog_items'));

echo "\n--- SERVICES SAMPLES ---\n";
$services = CatalogItem::where('type', 'Service')->limit(5)->get();
foreach ($services as $s) {
    echo "ID: {$s->id} | Name: {$s->name} | Desc: {$s->description}\n";
}

echo "\n--- SEARCHING FOR 'hairwash' ---\n";
$hw = CatalogItem::where('name', 'like', '%hairwash%')->get();
foreach ($hw as $h) {
    echo "ID: {$h->id} | Name: {$h->name} | Type: {$h->type} | Stock: {$h->stock_available}\n";
}
