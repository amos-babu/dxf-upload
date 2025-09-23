<?php

namespace App\Enums;

enum Categories: string
{
    case GATES = 'gates';
    case ENCLOSURES = 'enclosures';
    case METERBOX = 'meterbox';

    public function label(): string
    {
        return match ($this) {
            self::GATES => 'Gates',
            self::ENCLOSURES => 'Enclosures',
            self::METERBOX => 'Meterboxes',
        };
    }
}
