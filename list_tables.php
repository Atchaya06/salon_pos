<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$tables = DB::select('SHOW TABLES');
$dbname = 'Tables_in_salon';
echo "--- TABLES ---\n";
foreach ($tables as $table) {
    if (isset($table->$dbname)) {
        echo $table->$dbname . "\n";
    } else {
        // Handle different DB name or structure
        $vars = get_object_vars($table);
        echo reset($vars) . "\n";
    }
}
echo "--- END TABLES ---\n";
