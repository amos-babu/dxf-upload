<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'pending';
    case PAID = 'paid';
    case FAILED = 'failed';

    public function label(): string {
        return match($this){
            self::PENDING => 'Pending',
            self::PAID => 'Paid',
            self::FAILED => 'Failed'
        };
    }
}
