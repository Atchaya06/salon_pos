<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\CatalogItem;

$updates = [
    'Advanced Haircut & Styling' => ['description' => 'Trimmer, Comb, Styling Gel, Hair Spray', 'price' => null],
    'Global Hair Color' => ['description' => 'L\'Oreal Hair Color, Developer, Foil', 'price' => null],
    'Signature Facial' => ['description' => 'Cleanser, Scrub, Massage Cream, Face Mask', 'price' => null],
    'Luxury Blow Dry' => ['description' => 'Heat Protectant Spray, Hair Serum', 'price' => null],
    'silk spa' => ['description' => 'Keratin Mask, Argan Oil', 'price' => null],
    'coloring' => ['description' => 'natural colour', 'price' => 4556.00]
];

foreach ($updates as $name => $data) {
    $updateData = ['description' => $data['description']];
    if ($data['price'] !== null) {
        $updateData['price'] = $data['price'];
    }
    CatalogItem::where('name', $name)->update($updateData);
}

CatalogItem::where('type', 'Service')->whereNull('description')->update(['description' => 'Standard Salon Supplies']);

echo "Services updated successfully.";
