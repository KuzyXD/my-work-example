export function getAllSlots(slots) {
    var TokenGOST2 = [];

    for (let i = 0; i < slots.length; i++) {
        let slot = slots[i];
        let tokenInfo = {};

        window.JCWebClient2.getTokenInfo({
            args: {
                tokenID: slot.id
            },
            onSuccess: function (result) {
                tokenInfo = result;

                if(tokenInfo.type === window.JCWebClient2.Vars.TokenType.gost2) {
                    TokenGOST2.push({slot: slot, tokenInfo: tokenInfo});
                }
            },
            onError: function () {
                alert("Произошла ошибка при устройств");
                location.reload();
            }
        });
    }

    return TokenGOST2;
}

export function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode>>6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                0x80 | ((charcode>>12) & 0x3f),
                0x80 | ((charcode>>6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

export function getRegionsObject() {
  let arrayOfRegions = [
    "1:Республика Адыгея (Адыгея)",
    "2:Республика Башкортостан",
    "3:Республика Бурятия",
    "4:Республика Алтай",
    "5:Республика Дагестан",
    "6:Республика Ингушетия",
    "7:Кабардино-Балкарская Республика",
    "8:Республика Калмыкия",
    "9:Карачаево-Черкесская Республика",
    "10:Республика Карелия",
    "11:Республика Коми",
    "12:Республика Марий Эл",
    "13:Республика Мордовия",
    "14:Республика Саха (Якутия)",
    "15:Республика Северная Осетия - Алания",
    "16:Республика Татарстан (Татарстан)",
    "17:Республика Тыва",
    "18:Удмуртская Республика",
    "19:Республика Хакасия",
    "20:Чеченская Республика",
    "21:Чувашская Республика - Чувашия",
    "22:Алтайский край",
    "23:Краснодарский край",
    "24:Красноярский край",
    "25:Приморский край",
    "26:Ставропольский край",
    "27:Хабаровский край",
    "28:Амурская область",
    "29:Архангельская область",
    "30:Астраханская область",
    "31:Белгородская область",
    "32:Брянская область",
    "33:Владимирская область",
    "34:Волгоградская область",
    "35:Вологодская область",
    "36:Воронежская область",
    "37:Ивановская область",
    "38:Иркутская область",
    "39:Калининградская область",
    "40:Калужская область",
    "41:Камчатский край",
    "42:Кемеровская область - Кузбасс",
    "43:Кировская область",
    "44:Костромская область",
    "45:Курганская область",
    "46:Курская область",
    "47:Ленинградская область",
    "48:Липецкая область",
    "49:Магаданская область",
    "50:Московская область",
    "51:Мурманская область",
    "52:Нижегородская область",
    "53:Новгородская область",
    "54:Новосибирская область",
    "55:Омская область",
    "56:Оренбургская область",
    "57:Орловская область",
    "58:Пензенская область",
    "59:Пермский край",
    "60:Псковская область",
    "61:Ростовская область",
    "62:Рязанская область",
    "63:Самарская область",
    "64:Саратовская область",
    "65:Сахалинская область",
    "66:Свердловская область",
    "67:Смоленская область",
    "68:Тамбовская область",
    "69:Тверская область",
    "70:Томская область",
    "71:Тульская область",
    "72:Тюменская область",
    "73:Ульяновская область",
    "74:Челябинская область",
    "75:Забайкальский край",
    "76:Ярославская область",
    "77:г. Москва",
    "78:Санкт-Петербург",
    "79:Еврейская автономная область",
    "83:Ненецкий автономный округ",
    "86:Ханты-Мансийский автономный округ - Югра",
    "87:Чукотский автономный округ",
    "89:Ямало-Ненецкий автономный округ",
    "91:Республика Крым",
    "92:Севастополь",
    "99:Иные территории, включая город и космодром Байконур"
  ];
  let regions = {};

  for (const region of arrayOfRegions) {
    let regionArray = region.split(":");
    let id = regionArray[0];
    let name = regionArray[1];

    regions[id] = name;
  }

  return regions;
}

export function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Преобразование шестнадцатеричного id ключевой пары в формат для ЕГАИС
export function asciitohex(str){
  var result = [];
  for (var n = 0, l = str.length; n < l; n++) {
    var code = str.charCodeAt(n);
    if(code > 128 || code == 32)
      continue;

    var hex = code.toString(16);
    result.push(hex);
  }
  return result.join(':');
}
