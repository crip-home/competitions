<?php namespace App\Services\Models;

/**
 * Class Slug
 * @package App\Services\Models
 */
class Slug
{
    /**
     * @var array
     */
    private static $ascii = array(
        '/Ь|ь|Ъ|ъ|%D0%AA|%D0%AС|%D1%8A|%D1%8C/' => '',
        '/º|°/' => 0,
        '/¹/' => 1,
        '/²/' => 2,
        '/³/' => 3,
        '/æ|ǽ|ä/' => 'ae',
        '/œ|ö/' => 'oe',
        '/À|Á|Â|Ã|Å|Ǻ|Ā|Ă|Ą|Ǎ|А|%D0%90/' => 'A',
        '/à|á|â|ã|å|ǻ|ā|ă|ą|ǎ|ª|а|%D0%B0/' => 'a',
        '/@/' => 'at',
        '/Б|%D0%91/' => 'B',
        '/б|%D0%B1/' => 'b',
        '/Ç|Ć|Ĉ|Ċ|Č|Ц|%D0%A6/' => 'C',
        '/ç|ć|ĉ|ċ|č|ц|%D1%86/' => 'c',
        '/Ð|Ď|Đ|Д|%D0%94/' => 'Dj',
        '/ð|ď|đ|д|%D0%B4/' => 'dj',
        '/È|É|Ê|Ë|Ē|Ĕ|Ė|Ę|Ě|Е|Ё|Э|%D0%80|%D0%81|%D0%95|%D0%AD/' => 'E',
        '/è|é|ê|ë|ē|ĕ|ė|ę|ě|е|ё|э|%D0%B5|%D1%8D/' => 'e',
        '/Ф|%D0%A4/' => 'F',
        '/ƒ|ф|%D1%84/' => 'f',
        '/Ĝ|Ğ|Ġ|Ģ|Г|%D0%93/' => 'G',
        '/ĝ|ğ|ġ|ģ|г|%D0%B3/' => 'g',
        '/Ĥ|Ħ|Х|%D0%A5/' => 'H',
        '/ĥ|ħ|х|%D1%85/' => 'h',
        '/Ì|Í|Î|Ï|Ĩ|Ī|Ĭ|Ǐ|Į|İ|И|%D0%98/' => 'I',
        '/ì|í|î|ï|ĩ|ī|ĭ|ǐ|į|ı|и|%D0%B8/' => 'i',
        '/Ĵ|Й|%D0%99/' => 'J',
        '/ĵ|й|%D0%B9/' => 'j',
        '/Ķ|К|%D0%9A/' => 'K',
        '/ķ|к|%D0%BA/' => 'k',
        '/Ĺ|Ļ|Ľ|Ŀ|Ł|Л|%D0%9B/' => 'L',
        '/ĺ|ļ|ľ|ŀ|ł|л|%D0%BB/' => 'l',
        '/М|%D0%9C/' => 'M',
        '/м|%D0%BC/' => 'm',
        '/Ñ|Ń|Ņ|Ň|Н|%D0%9D/' => 'N',
        '/ñ|ń|ņ|ň|ŉ|н|%D0%BD/' => 'n',
        '/Ò|Ó|Ô|Õ|Ō|Ŏ|Ǒ|Ő|Ơ|Ø|Ǿ|О|%D0%9E/' => 'O',
        '/ò|ó|ô|õ|ō|ŏ|ǒ|ő|ơ|ø|ǿ|º|о|%D0%BE/' => 'o',
        '/П|%D0%9F/' => 'P',
        '/п|%D0%BF/' => 'p',
        '/Ŕ|Ŗ|Ř|Р|%D0%A0/' => 'R',
        '/ŕ|ŗ|ř|р|%D1%80/' => 'r',
        '/Ś|Ŝ|Ş|Ș|Š|С|%D0%A1/' => 'S',
        '/ś|ŝ|ş|ș|š|ſ|с|%D1%81/' => 's',
        '/Ţ|Ț|Ť|Ŧ|Т|%D0%A2/' => 'T',
        '/ţ|ț|ť|ŧ|т|%D1%82/' => 't',
        '/Ù|Ú|Û|Ũ|Ū|Ŭ|Ů|Ű|Ų|Ư|Ǔ|Ǖ|Ǘ|Ǚ|Ǜ|У|%D0%A3/' => 'U',
        '/ù|ú|û|ũ|ū|ŭ|ů|ű|ų|ư|ǔ|ǖ|ǘ|ǚ|ǜ|у|%D1%83/' => 'u',
        '/ü/' => 'ue',
        '/Ü/' => 'UE',
        '/В|%D0%92/' => 'V',
        '/в|%D0%B2/' => 'v',
        '/Ý|Ÿ|Ŷ|Ы|%D0%AB/' => 'Y',
        '/ý|ÿ|ŷ|ы|%D1%8B/' => 'y',
        '/Ŵ/' => 'W',
        '/ŵ/' => 'w',
        '/Ź|Ż|Ž|З|%D0%97/' => 'Z',
        '/ź|ż|ž|з|%D0%B7/' => 'z',
        '/Æ|Ǽ|Ä/' => 'AE',
        '/ß/' => 'ss',
        '/Ĳ/' => 'IJ',
        '/ĳ/' => 'ij',
        '/Œ|Ö/' => 'OE',
        '/Ч|%D0%A7/' => 'Ch',
        '/ч|%D1%87/' => 'ch',
        '/Ю|%D0%AE/' => 'Ju',
        '/ю|%D1%8E/' => 'ju',
        '/Я|%D0%AF/' => 'Ja',
        '/я|%D1%8F/' => 'ja',
        '/Ш|%D0%A8/' => 'Sh',
        '/ш|%D1%88/' => 'sh',
        '/Щ|%D0%A9/' => 'Shch',
        '/щ|%D1%89/' => 'shch',
        '/Ж|%D0%96/' => 'Zh',
        '/ж|%D0%B6/' => 'zh',
    );
    /**
     * Converts string from special characters to URL friendly string
     * @param string $string String co covert
     * @param string $separator Separator to replace spaces
     * @param null $emptyValue Return value if target result is empty
     * @return string URL friendly string
     */
    public static function make($string, $separator = '-', $emptyValue = null)
    {
        $string = preg_replace('/
                    [\x09\x0A\x0D\x20-\x7E]            # ASCII
                  | [\xC2-\xDF][\x80-\xBF]             # non-overlong 2-byte
                  |  \xE0[\xA0-\xBF][\x80-\xBF]        # excluding overlongs
                  | [\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}  # straight 3-byte
                  |  \xED[\x80-\x9F][\x80-\xBF]        # excluding surrogates
                  |  \xF0[\x90-\xBF][\x80-\xBF]{2}     # planes 1-3
                  | [\xF1-\xF3][\x80-\xBF]{3}          # planes 4-15
                  |  \xF4[\x80-\x8F][\x80-\xBF]{2}     # plane 16
               /', '', $string);
        $string = static::translateByArray($string);
        $string = preg_replace('#[^\\pL\d]+#u', $separator, $string);
        $string = trim($string, $separator);
        $string = (defined('MB_CASE_LOWER')) ? mb_strtolower($string) : strtolower($string);
        $string = preg_replace('#[^-\w]+#', '', $string);
        if ($string === '') {
            return $emptyValue ?: 'n' . $separator . 'a';
        }
        return $string;
    }
    /**
     * Replace special characters with english chars
     * @param string $string String co covert
     * @return string English char string
     */
    public static function translateByArray($string)
    {
        return preg_replace(array_keys(self::$ascii), array_values(self::$ascii), $string);
    }
}