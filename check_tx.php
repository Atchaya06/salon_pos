<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\InventoryTransaction;
use App\Models\CatalogItem;

$item = CatalogItem::where('name', 'like', '%Xtenso%')->first();
echo "ITEM ID: {$item->id}\n";
echo "CURRENT STOCK: {$item->stock_available}\n";

$txs = InventoryTransaction::where('catalog_item_id', $item->id)->latest()->limit(5)->get();
foreach ($txs as $t) {
    echo "TX ID: {$t->id} | Qty: {$t->quantity} | Remark: {$t->remarks} | Created: {$t->created_at}\n";
}
