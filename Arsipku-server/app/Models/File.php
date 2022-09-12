<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'nomor_berkas', 
        'tipe_berkas', 
        'kegiatan', 
        'pptk', 
        'jenis_berkas', 
        'foto', 
        'location_id', 
        'user_id'
    ];
}
