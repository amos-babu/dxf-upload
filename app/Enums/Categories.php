<?php

namespace App\Enums;

enum Categories: string
{
    case GATES = 'gates';
    case ENCLOSURES = 'enclosures';
    case METERBOXES = 'meterbox';
    case PEDESTALS = 'pedestals';
    case TRUNKING = 'trunking';
    case CABLETRAYS = 'cabletrays';

    public function label(): string
    {
        return match ($this) {
            self::GATES => 'Gates',
            self::ENCLOSURES => 'Enclosures',
            self::METERBOXES => 'Meterboxes',
            self::PEDESTALS => 'pedestals',
            self::TRUNKING => 'trunking',
            self::CABLETRAYS => 'cabletrays'
        };
    }
}
