<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\CatalogItem;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\InvoiceItem;
use Illuminate\Support\Facades\DB;

DB::transaction(function () {
    $existingServices = CatalogItem::where('type', 'Service')->get();
    
    foreach ($existingServices as $item) {
        $service = Service::create([
            'name' => $item->name,
            'category' => $item->category,
            'price' => $item->price,
            'gst_percent' => $item->gst_percent,
            'description' => $item->description,
            'duration_minutes' => $item->duration_minutes,
            'gender' => $item->gender ?: 'Unisex',
            'is_active' => $item->is_active,
        ]);
        
        // Update Appointments
        Appointment::where('catalog_item_id', $item->id)->update(['service_id' => $service->id]);
        
        // Update InvoiceItems
        InvoiceItem::where('catalog_item_id', $item->id)->update(['service_id' => $service->id]);
        
        // Optionally delete from catalog_items AFTER ensuring everything is done
        // For safety, I'll just mark them as is_active = false or keep them for a bit.
        // Actually, the user wants "separate database" so I'll eventually delete them.
        echo "Migrated Service: {$item->name}\n";
    }
});
