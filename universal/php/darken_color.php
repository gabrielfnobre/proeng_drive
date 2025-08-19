<?php
function darken_color($color, $percent = 0.82) {
    $color = trim($color);
    if (preg_match('/^#([a-f0-9]{6})$/i', $color, $matches)) {
        $hex = $matches[1];
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
        $r = max(0, min(255, intval($r * $percent)));
        $g = max(0, min(255, intval($g * $percent)));
        $b = max(0, min(255, intval($b * $percent)));
        return sprintf("#%02x%02x%02x", $r, $g, $b);
    }
    // Se não for cor sólida, retorna igual
    return $color;
}
?>