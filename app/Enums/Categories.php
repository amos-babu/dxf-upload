<?php

namespace App\Enums;

enum Categories: string
{
    case GATES = 'gates';
    case ENCLOSURES = 'enclosures';
    case METERBOXES = 'meterboxes';
    case PEDESTALS = 'pedestals';
    case TRUNKING = 'trunking';
    case CABLETRAYS = 'cabletrays';
    case CABINETS = 'cabinets';
    case ELECTRICALBOARDS = 'electricalboards';
    case KNOCKOUTS = 'knockouts';

    public function label(): string
    {
        return match ($this) {
            self::GATES => 'Gates',
            self::ENCLOSURES => 'Enclosures',
            self::METERBOXES => 'Meterboxes',
            self::PEDESTALS => 'Pedestals',
            self::TRUNKING => 'Trunking',
            self::CABLETRAYS => 'Cabletrays',
            self::CABINETS => 'Cabinets',
            self::KNOCKOUTS => 'Knockouts',
            self::ELECTRICALBOARDS => 'Electricalboards'
        };
    }
}
