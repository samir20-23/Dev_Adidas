<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
class PaymentMethod extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'type', 'card_number_masked'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}