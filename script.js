const PROTOCOLO_WEB = "https:" + "/" + "/";
const URL_SPOTIFY_SEARCH = PROTOCOLO_WEB + "open.spotify.com/search/";
const URL_SPOTIFY_PLAYLIST = PROTOCOLO_WEB + "open.spotify.com/playlist/";
const URL_SPOTIFY_OEMBED = PROTOCOLO_WEB + "open.spotify.com/oembed?url=";
const URL_POKEAPI_EMERALD = PROTOCOLO_WEB + "raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/emerald/";
const URL_MOSAIC_SCDN = PROTOCOLO_WEB + "mosaic.scdn.co/300/";
const URL_IMAGE_CDN_SPOTIFY = PROTOCOLO_WEB + "image-cdn-ak.spotifycdn.com/image/";
const URL_IMAGE_CDN_FA_SPOTIFY = PROTOCOLO_WEB + "image-cdn-fa.spotifycdn.com/image/";
const CLAVE_CACHE_PORTADAS = "boveda_portadas_spotify_v2";
const CLAVE_CACHE_TITULOS = "boveda_titulos_spotify_v2";

const PORTADAS_SPOTIFY_OFICIALES = {
    [URL_SPOTIFY_PLAYLIST + "4Rum8fiElouqBKP3PP1SIh"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da848abd40536ac267f4ae08b27f",
    [URL_SPOTIFY_PLAYLIST + "3oDK4P5TgunBb8GRPcfd9G"]: URL_MOSAIC_SCDN + "ab67616d00001e025149c948fde506624246a684ab67616d00001e02566acaba72c5509e3887c4b0ab67616d00001e027c2b1dc1639152beaeadf00dab67616d00001e0290b88187a9831d91f2438927",
    [URL_SPOTIFY_PLAYLIST + "356cdaFfhSWpUFP8rfVAzo"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da84c7ac486332c2811ead9583f3",
    [URL_SPOTIFY_PLAYLIST + "4VrpjOoamcYdvaLVgekjn7"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da84f1d63d798916673bb3fae4d6",
    [URL_SPOTIFY_PLAYLIST + "4uwJD0dL2HY9HM8RMpA5Xu"]: URL_MOSAIC_SCDN + "ab67616d00001e0212d6eaddbbff6de7dd946fe7ab67616d00001e0215a57856f31a311e7538aa38ab67616d00001e02311046133dd1329e4b989615ab67616d00001e02453d37c5539da97758914872",
    [URL_SPOTIFY_PLAYLIST + "7fvjGUXWoZsmTZ68VGrkD3"]: URL_MOSAIC_SCDN + "ab67616d00001e02323a7e13e8db7c6ba5e09c58ab67616d00001e02567a5eb8a519900fb57c5591ab67616d00001e0285d6ba9f273b00251a381f2cab67616d00001e029a0e68fc6761a742bf9b8659",
    [URL_SPOTIFY_PLAYLIST + "4c8AgdDLr7wh3Lnx5ZTfzu"]: URL_MOSAIC_SCDN + "ab67616d00001e02b5c40e3dd80c8898da3887c2ab67616d00001e02b872dbba9e27bb6131e2727dab67616d00001e02e60b56aa1e58fe76240a101bab67616d00001e02f7d60ae94e7b907a8a9ca3f3",
    [URL_SPOTIFY_PLAYLIST + "7zyE8isXMYHRdUnVXpLFlI"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da841ee63a06a19cbbf612487873",
    [URL_SPOTIFY_PLAYLIST + "1sOz3CqTUeRaaixgGu0TLy"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da8407e9a4a4c7b7d27b37e0379d",
    [URL_SPOTIFY_PLAYLIST + "3EyaOyeel8v9FbmJJfPpGn"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da84bd5754eb53193f67b325c0dd",
    [URL_SPOTIFY_PLAYLIST + "3f7ZO08vMggolQ6L9DJklF"]: URL_IMAGE_CDN_FA_SPOTIFY + "ab67706c0000da84dd227db53338d00ddd9d3fae",
    [URL_SPOTIFY_PLAYLIST + "3XqlDXRNLKB4KJSbyhDjNZ"]: URL_IMAGE_CDN_SPOTIFY + "ab67706c0000da84fb35cef5e78d714c4988b8a2"
};

const TITULOS_SPOTIFY_OFICIALES = {};

try {
    localStorage.removeItem("boveda_portadas_spotify_v1");
    const cacheGuardado = localStorage.getItem(CLAVE_CACHE_PORTADAS);
    if (cacheGuardado) {
        const parseado = JSON.parse(cacheGuardado);
        Object.assign(PORTADAS_SPOTIFY_OFICIALES, parseado);
    }
    const cacheTitulos = localStorage.getItem(CLAVE_CACHE_TITULOS);
    if (cacheTitulos) {
        const titulosParseados = JSON.parse(cacheTitulos);
        Object.assign(TITULOS_SPOTIFY_OFICIALES, titulosParseados);
    }
} catch (err) {
}

const themeBtn = document.getElementById("themeBtn");
const bodyElement = document.body;

themeBtn.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-mode");
});

const burguerBtn = document.getElementById("burguerBtn");
const navMenu = document.getElementById("navMenu");

burguerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    burguerBtn.classList.toggle("open");
    const expandido = navMenu.classList.contains("show");
    burguerBtn.setAttribute("aria-expanded", expandido ? "true" : "false");
});

function cerrarMenu() {
    navMenu.classList.remove("show");
    burguerBtn.classList.remove("open");
    burguerBtn.setAttribute("aria-expanded", "false");
}

function linkSpotify(consulta, urlFija) {
    if (urlFija && urlFija.length > 0) {
        return urlFija;
    }
    return URL_SPOTIFY_SEARCH + encodeURIComponent(consulta);
}

const SPRITES_GBA_GEN3 = [
    [212, "Scizor"], [254, "Sceptile"], [257, "Blaziken"], [260, "Swampert"], [282, "Gardevoir"],
    [306, "Aggron"], [330, "Flygon"], [359, "Absol"], [373, "Salamence"], [376, "Metagross"],
    [384, "Rayquaza"], [380, "Latias"], [381, "Latios"], [382, "Kyogre"], [383, "Groudon"],
    [385, "Jirachi"], [386, "Deoxys"], [248, "Tyranitar"], [94, "Gengar"], [6, "Charizard"],
    [9, "Blastoise"], [3, "Venusaur"], [65, "Alakazam"], [130, "Gyarados"], [149, "Dragonite"],
    [197, "Umbreon"], [196, "Espeon"], [229, "Houndoom"], [230, "Kingdra"], [245, "Suicune"],
    [243, "Raikou"], [244, "Entei"], [249, "Lugia"], [250, "Ho-Oh"], [251, "Celebi"],
    [150, "Mewtwo"], [151, "Mew"], [157, "Typhlosion"], [160, "Feraligatr"], [154, "Meganium"],
    [286, "Breloom"], [289, "Slaking"], [291, "Ninjask"], [292, "Shedinja"], [295, "Exploud"],
    [302, "Sableye"], [303, "Mawile"], [310, "Manectric"], [319, "Sharpedo"], [323, "Camerupt"],
    [324, "Torkoal"], [332, "Cacturne"], [334, "Altaria"], [335, "Zangoose"], [336, "Seviper"],
    [342, "Crawdaunt"], [344, "Claydol"], [346, "Cradily"], [348, "Armaldo"], [350, "Milotic"],
    [354, "Banette"], [356, "Dusclops"], [362, "Glalie"], [365, "Walrein"], [377, "Regirock"],
    [378, "Regice"], [379, "Registeel"], [123, "Scyther"], [214, "Heracross"], [169, "Crobat"]
];

const PLAYLISTS_DATA = [
    ["rap-trap", "El asesino", URL_SPOTIFY_PLAYLIST + "4Rum8fiElouqBKP3PP1SIh"],
    ["rock-alt", "Emergencia", URL_SPOTIFY_PLAYLIST + "3oDK4P5TgunBb8GRPcfd9G"],
    ["gaming-ps4", "Sangre y Codigo", URL_SPOTIFY_PLAYLIST + "356cdaFfhSWpUFP8rfVAzo"],
    ["rap-trap", "Rap del Credo", URL_SPOTIFY_PLAYLIST + "4VrpjOoamcYdvaLVgekjn7"],
    ["varios-raros", "Musiquilla", URL_SPOTIFY_PLAYLIST + "4uwJD0dL2HY9HM8RMpA5Xu"],
    ["chill-lofi", "Favorite Songs", URL_SPOTIFY_PLAYLIST + "7fvjGUXWoZsmTZ68VGrkD3"],
    ["rap-trap", "Urban", URL_SPOTIFY_PLAYLIST + "4c8AgdDLr7wh3Lnx5ZTfzu"],
    ["varios-raros", "5h0rt-N-5w33t", URL_SPOTIFY_PLAYLIST + "7zyE8isXMYHRdUnVXpLFlI"],
    ["chill-lofi", "M4L4.D33L", URL_SPOTIFY_PLAYLIST + "1sOz3CqTUeRaaixgGu0TLy"],
    ["rap-trap", "SadPerreoOoO", URL_SPOTIFY_PLAYLIST + "3EyaOyeel8v9FbmJJfPpGn"],
    ["rap-trap", "UnD3r biaaatch", URL_SPOTIFY_PLAYLIST + "3f7ZO08vMggolQ6L9DJklF"],
    ["gaming-ps4", "GLitCH-h0P", URL_SPOTIFY_PLAYLIST + "3XqlDXRNLKB4KJSbyhDjNZ"],
    ["varios-raros", "Gq0M", URL_SPOTIFY_PLAYLIST + "5W5M81JehhrYQb3CXHx5ck"],
    ["varios-raros", "Mis pistas en Shazam", URL_SPOTIFY_PLAYLIST + "3RLYlmWtR2RH7MJJYGnBdz"],
    ["rock-alt", "BestAlbums.", URL_SPOTIFY_PLAYLIST + "3EcShvyD30njVVhPVGM8Bt"],
    ["rock-alt", "S-Kei.", URL_SPOTIFY_PLAYLIST + "6cJTAhjDHbKNQi4MdJc3lH"],
    ["rap-trap", "H1p-H0p iNd", URL_SPOTIFY_PLAYLIST + "1Hu21U1sn6XBSSapbJGqp1"],
    ["gaming-ps4", "Nin-Cor3", URL_SPOTIFY_PLAYLIST + "6KIR70JxdBrabHuglEE1dy"],
    ["rock-alt", "M4th-R", URL_SPOTIFY_PLAYLIST + "6dFb1O6tNo9icFTmsRQXhE"],
    ["rock-alt", "D4rKZ1nTh", URL_SPOTIFY_PLAYLIST + "2xpjdhkjM9bA0UUiOZ8j4T"],
    ["varios-raros", "Funk Brasuk", URL_SPOTIFY_PLAYLIST + "3fSlUEQiJpLF4Kc5u6rXOv"],
    ["gaming-ps4", "R4v# mfk", URL_SPOTIFY_PLAYLIST + "2x1TN7eeu1Rf37NInsajjS"],
    ["chill-lofi", "I-D", URL_SPOTIFY_PLAYLIST + "6ksadn2ABOq2zQIIpMThrm"],
    ["varios-raros", "TaY-sFt.", URL_SPOTIFY_PLAYLIST + "7BGvPDKNjSokJgaP38CiAv"],
    ["rap-trap", "Trap Shileno", URL_SPOTIFY_PLAYLIST + "47qj4TfVabdGMFSpoBgghD"],
    ["rock-alt", "D0Om3R", URL_SPOTIFY_PLAYLIST + "133aOu2FXzrqLY2ixHdbFT"],
    ["rap-trap", "UKmdfDrill", URL_SPOTIFY_PLAYLIST + "5kkX1A7GvSOMdo9G72pumW"],
    ["rap-trap", "THop", URL_SPOTIFY_PLAYLIST + "6NjOmAcArinIvQjLkNhrpl"],
    ["varios-raros", "HyP3R90P", URL_SPOTIFY_PLAYLIST + "1JS4ls3C28V2Cff2CNTNBL"],
    ["rap-trap", "Ky0TTO", URL_SPOTIFY_PLAYLIST + "5xSxJADBJAxtVgf25CJGhq"],
    ["varios-raros", "Tu top de canciones más escuchadas", URL_SPOTIFY_PLAYLIST + "37i9dQZF1CKMFBxUbxRIAg"],
    ["rock-alt", "Clique |-/", URL_SPOTIFY_PLAYLIST + "6icMn94oor2J8oEHiAPMpz"],
    ["chill-lofi", "viajesitos", URL_SPOTIFY_PLAYLIST + "7IWbk06VSdukeg8zvKrVI6"],
    ["chill-lofi", "Blues...", URL_SPOTIFY_PLAYLIST + "3zWvLKpqCnDhOhAe0VIWMY"],
    ["varios-raros", "HousitoZuculento", URL_SPOTIFY_PLAYLIST + "7lFoeFYuz28u2rjGgBbR05"],
    ["varios-raros", "FfD_*Yyt", URL_SPOTIFY_PLAYLIST + "1SWb38i1wfhPDtBufclmVW"],
    ["chill-lofi", "Troste :')", URL_SPOTIFY_PLAYLIST + "0NaHTsPeWsvI1GsUs3hyaz"],
    ["varios-raros", "?Mix", URL_SPOTIFY_PLAYLIST + "5EQ8XKOyE0wU6TXvQ725EF"],
    ["rock-alt", "PSICODELICK", URL_SPOTIFY_PLAYLIST + "4ebcpkDlcTRJWQ85yK5OtT"],
    ["chill-lofi", "K-R&B", URL_SPOTIFY_PLAYLIST + "6Vk4d2LGE2KDzOuSryRRPC"],
    ["rap-trap", "Los Changuitozzz", URL_SPOTIFY_PLAYLIST + "0rIPIhb7Ig5VxkHtW93C8E"],
    ["rap-trap", "SISAS", URL_SPOTIFY_PLAYLIST + "2b4rtI2NJ76d5x1GrrJuY1"],
    ["rap-trap", "Nocturno Bat", URL_SPOTIFY_PLAYLIST + "5003oDyy8ebvTc5qku4dQH"],
    ["rap-trap", "Saaa nea", URL_SPOTIFY_PLAYLIST + "1lreVNZ1Z8Hh4kf0qAiTIq"],
    ["rap-trap", "Bases bn hijas de pvta", URL_SPOTIFY_PLAYLIST + "3wLaJwYcbT7JOZPNiD3TRi"],
    ["rap-trap", "Trapsin", URL_SPOTIFY_PLAYLIST + "2MXXpOYROOvhJ9JBQRXP1m"],
    ["gaming-ps4", "*Le da epilepsia*", URL_SPOTIFY_PLAYLIST + "2c2kwsYQ7SXQUVlhSok1yH"],
    ["chill-lofi", "Programming..", URL_SPOTIFY_PLAYLIST + "1c6YukmmlJYKTcmYGAvbvl"],
    ["gaming-ps4", "HYP3", URL_SPOTIFY_PLAYLIST + "157CR5vgVYfaCo8eoWekl6"],
    ["chill-lofi", "J-J Azz", URL_SPOTIFY_PLAYLIST + "2bxoFkuFNzILkBLAcfcaFf"],
    ["varios-raros", "XXxFXxJkM", URL_SPOTIFY_PLAYLIST + "2pErhEf8RLSBl5HlUv0oYE"],
    ["rock-alt", "Alternativo", URL_SPOTIFY_PLAYLIST + "1d0NdKOFNjc5siZEUzg31z"],
    ["varios-raros", "Ni pega tu webada hrmano", URL_SPOTIFY_PLAYLIST + "4JDpbf3GANW4MSJzSLKWu0"],
    ["varios-raros", "Rokudenashi no Ongaku", URL_SPOTIFY_PLAYLIST + "1vdpPIwxtht3KJOc4kXshS"],
    ["chill-lofi", "Late Night Chill", URL_SPOTIFY_PLAYLIST + "6WXL3TpPeMDK8xOVslWl0z"],
    ["rock-alt", "Rocksillo de la puta", URL_SPOTIFY_PLAYLIST + "6IW6CmlgWU7iPl0gkcS4o5"],
    ["rap-trap", "Under-Rap Gaucho", URL_SPOTIFY_PLAYLIST + "0qqvsikeXVABGBGu8ficSC"],
    ["rap-trap", "RomantiRap", URL_SPOTIFY_PLAYLIST + "6djK5hNHP1uSyNwUeXRAY6"],
    ["chill-lofi", "DiceBrisa xD", URL_SPOTIFY_PLAYLIST + "5hl6jNUiABldrX0nHWag5P"],
    ["rap-trap", "Milo..", URL_SPOTIFY_PLAYLIST + "6mdqV7LADLv8BzGVBrFg0L"],
    ["rap-trap", "Leon Mix", URL_SPOTIFY_PLAYLIST + "5lL9dwWaEOAp1CmiOy4AJR"],
    ["rap-trap", "Argentrap", URL_SPOTIFY_PLAYLIST + "5DsmS5Y6xRRLtzfvp4mVpF"],
    ["rap-trap", "MDB", URL_SPOTIFY_PLAYLIST + "3gTUm4SZNUp6snGdf1MUav"],
    ["rap-trap", "Crxkerx", URL_SPOTIFY_PLAYLIST + "5GKWfOOBZkV5ys2FWdYEKl"],
    ["rap-trap", "Ysysmo", URL_SPOTIFY_PLAYLIST + "5LJKIwplIZ0B7sw3ryzdPw"],
    ["rap-trap", "Duko", URL_SPOTIFY_PLAYLIST + "66WK75TpPIytY9yk8EMzCr"],
    ["rap-trap", "TR1", URL_SPOTIFY_PLAYLIST + "06CFgavfWgXLmAqXnMqVQE"],
    ["rap-trap", "Wos.free", URL_SPOTIFY_PLAYLIST + "6hvJr5pCrnTSxXzczxzfBE"],
    ["varios-raros", "10's :'))", URL_SPOTIFY_PLAYLIST + "74R52L6MAgd327DKfS0xKS"],
    ["rock-alt", "00's??", URL_SPOTIFY_PLAYLIST + "3Zky3AXhl29OnfXsn2UZtn"],
    ["varios-raros", "_-S'\"KZOOOzxX", URL_SPOTIFY_PLAYLIST + "1HX6OFiJWZcXspxTWflYg1"],
    ["chill-lofi", "Naight", URL_SPOTIFY_PLAYLIST + "3EU8rfOJGF7EIVrEH3e8fh"],
    ["rap-trap", "Gashita", URL_SPOTIFY_PLAYLIST + "6GyE1WegwqHXTkm1iCQ2ZS"],
    ["rock-alt", "J-R0ck", URL_SPOTIFY_PLAYLIST + "4v5EOHaDY1u6p5lBs557gw"],
    ["rap-trap", "The mdfk jug", URL_SPOTIFY_PLAYLIST + "6kz68wSUFhUECiRD3fGvpA"],
    ["rap-trap", "Bizarre$hit", URL_SPOTIFY_PLAYLIST + "124Zfdaym01Ync6fjXi9ZJ"],
    ["chill-lofi", "Riv_D4l3", URL_SPOTIFY_PLAYLIST + "5kDxNtJv0weGLyKYrwF8Xu"],
    ["rock-alt", "SKAAAAAAAAAATO", URL_SPOTIFY_PLAYLIST + "4K0DGajcdFhH37tTO1ZkcQ"],
    ["rap-trap", "$1M0n_", URL_SPOTIFY_PLAYLIST + "0OECMjqcbD0MDcP18uND9s"],
    ["rock-alt", "Xx_R.Wac", URL_SPOTIFY_PLAYLIST + "5eFJVnbnWVRrtHSY8LVzFt"],
    ["varios-raros", "tUd1", URL_SPOTIFY_PLAYLIST + "0L148vK1WrBbXLRPHkfmb7"],
    ["varios-raros", "Infant", URL_SPOTIFY_PLAYLIST + "3k9Ww13zeoWmB5pbe8m91h"],
    ["varios-raros", "L4SPoTrAs", URL_SPOTIFY_PLAYLIST + "4pvU0ipspxrqjvnL7G8KGY"],
    ["chill-lofi", "LasElegidas", URL_SPOTIFY_PLAYLIST + "4BV4oLiHmwfgwc7GS8ueDW"],
    ["rap-trap", "ElNanpa", URL_SPOTIFY_PLAYLIST + "0AvAjT52qHQ1QEu1fKgjmp"],
    ["rap-trap", "Malandrismo", URL_SPOTIFY_PLAYLIST + "65Ms1McozKrqkZOMROrxQw"],
    ["chill-lofi", "R&B", URL_SPOTIFY_PLAYLIST + "6EzLWMXUu6B5JLY8dJUgyG"],
    ["varios-raros", "2026", URL_SPOTIFY_PLAYLIST + "0VZfyvNGZ404dCwt6lRLZX"],
    ["chill-lofi", "Humb3", URL_SPOTIFY_PLAYLIST + "6477Wy0QncxUSqu6WJICgJ"],
    ["rock-alt", "RockHispano", URL_SPOTIFY_PLAYLIST + "7GSz4FXU1oavlHBTY7NUeW"],
    ["rock-alt", "NOSOYEMO", URL_SPOTIFY_PLAYLIST + "4sdoZXBytzGJvWRQCiPxnI"],
    ["chill-lofi", "TotalmenteChill", URL_SPOTIFY_PLAYLIST + "6w1hJHxudjDNrznUSBUlV9"],
    ["rock-alt", "LatinMafia", URL_SPOTIFY_PLAYLIST + "5FK2gtpTqr22DFRhVZslai"],
    ["chill-lofi", "Sad Nights", URL_SPOTIFY_PLAYLIST + "3iceDDhEXg85y5Cva19kem"],
    ["rap-trap", "El calacas", URL_SPOTIFY_PLAYLIST + "6qT8sHyhqbPc81DUlK5c4z"],
    ["gaming-ps4", "Pal OW2", URL_SPOTIFY_PLAYLIST + "6MfHlfVAEyfudi75ialnFJ"],
    ["gaming-ps4", "Lo que debio ser el soundtrack de flatout 4 xd", URL_SPOTIFY_PLAYLIST + "36eO9YgyALLtCWBdaLEpjw"],
    ["varios-raros", "Bue", URL_SPOTIFY_PLAYLIST + "4OVaIWutVrsSDjU8PTCSFE"],
    ["gaming-ps4", "P3R5ON4", URL_SPOTIFY_PLAYLIST + "5ci3cpBtxSxqzccW9TbLSw"],
    ["varios-raros", "31 minutazos", URL_SPOTIFY_PLAYLIST + "1XkWtRwxM0MAv7OW6Ou09c"],
    ["chill-lofi", "RainDays", URL_SPOTIFY_PLAYLIST + "5XEeJ9yauo4dMaNKTjY2Qg"],
    ["gaming-ps4", "Cyb3RC1tY", URL_SPOTIFY_PLAYLIST + "1jF8BdqLt9PgWrhIUMgcKO"],
    ["rock-alt", "SSSSKA.", URL_SPOTIFY_PLAYLIST + "6BVdntrFXAMKyTX3EiNJVm"],
    ["rock-alt", "MonosArticos", URL_SPOTIFY_PLAYLIST + "1cp9rgYqgT8Hh8qWeMNzrx"],
    ["chill-lofi", "Hozier", URL_SPOTIFY_PLAYLIST + "45oZFZT6kosjZlkcI3uKhl"],
    ["rock-alt", "BringMe", URL_SPOTIFY_PLAYLIST + "17b57MDismVxeNC5CmcKPz"],
    ["gaming-ps4", "Naruto", URL_SPOTIFY_PLAYLIST + "7bFOh0IlCy0HEpDMiVDssf"],
    ["varios-raros", "temitsler", URL_SPOTIFY_PLAYLIST + "5oXNQUfV3pOYa6CvX0jwHv"],
    ["rap-trap", "CreisiPoin", URL_SPOTIFY_PLAYLIST + "5Co1XGMw5JGNDE4YmWt2DS"],
    ["gaming-ps4", "Spidy", URL_SPOTIFY_PLAYLIST + "2iLVFJPdcJunEH0Mbsy2oM"],
    ["chill-lofi", "Jate..", URL_SPOTIFY_PLAYLIST + "5Y4OS8q5OpzcxZBCc9lq2a"],
    ["rap-trap", "7:11", URL_SPOTIFY_PLAYLIST + "5XC2bwiBYFKeQdYiyjHvng"],
    ["rock-alt", "Zoe", URL_SPOTIFY_PLAYLIST + "6nySeViB6PaReGhywtWVr3"],
    ["chill-lofi", "chill de cojones", URL_SPOTIFY_PLAYLIST + "6gdpnWpuKbNQwB3ciZMeOg"],
    ["rap-trap", "EHHH WAXOOOO", URL_SPOTIFY_PLAYLIST + "0OOtep50yctz6pNUgHzwNG"],
    ["gaming-ps4", "GG", URL_SPOTIFY_PLAYLIST + "20KTPSUJYHwW3UWsqw1644"],
    ["rap-trap", "LO'TUSSILOKO", URL_SPOTIFY_PLAYLIST + "7LHKeWxl6vaxmpuFQeRWFy"],
    ["chill-lofi", "GoodVibes", URL_SPOTIFY_PLAYLIST + "3TlNNpuOsks0S1yevoBwES"],
    ["gaming-ps4", "pH0nKZsiT0", URL_SPOTIFY_PLAYLIST + "2Xeei51LDWcDKFwcIPx5y3"],
    ["rap-trap", "El conejo malvado", URL_SPOTIFY_PLAYLIST + "2UypmZ9scNOqgvOeQliFiS"],
    ["rap-trap", "ES EL ES EL ES EL CHOOSEY", URL_SPOTIFY_PLAYLIST + "0xgLX8KVL8e8HiOnmRVeAv"],
    ["rap-trap", "PuroDuroYMacizo", URL_SPOTIFY_PLAYLIST + "3TGr23yu74cwv0D1w6XXuH"],
    ["rap-trap", "MORAdo tu calzón", URL_SPOTIFY_PLAYLIST + "7kd4mWCSTdFjURYFins6jG"],
    ["varios-raros", "2025", URL_SPOTIFY_PLAYLIST + "4iTnpXKTDLy7LU07K7oKht"],
    ["varios-raros", "Vocal & Beats", URL_SPOTIFY_PLAYLIST + "6csbwi3O0dLoGMcmCl7ERc"],
    ["gaming-ps4", "Vocaloids", URL_SPOTIFY_PLAYLIST + "0jO34Q3jFeCiC1CVvtQvtf"],
    ["varios-raros", "Fuego Mix", URL_SPOTIFY_PLAYLIST + "4hoizeSdrA2L2GTBvZ2SMA"],
    ["varios-raros", "Mamá", URL_SPOTIFY_PLAYLIST + "61aEfRS4HiNPTWySk3pgqz"],
    ["rap-trap", "Protesta", URL_SPOTIFY_PLAYLIST + "0PPrVKuASg9K7vVl801VXJ"],
    ["rap-trap", "Kinoto", URL_SPOTIFY_PLAYLIST + "1xWHG159aSJgaII1tzlhJ9"],
    ["gaming-ps4", "Ryodan Gang", URL_SPOTIFY_PLAYLIST + "3rceM0X2nOqFuQNQBo3gU7"],
    ["varios-raros", "camote pa mierda 2", URL_SPOTIFY_PLAYLIST + "7duqMDyhF4qUjYjc8GglKJ"],
    ["gaming-ps4", "Mimision", URL_SPOTIFY_PLAYLIST + "3RVRHTq0ukN8d0S3YJvjBy"],
    ["varios-raros", "2024", URL_SPOTIFY_PLAYLIST + "3s4W1xk0YX0WtXFEKghzf9"],
    ["chill-lofi", "Pour Mon Amour", URL_SPOTIFY_PLAYLIST + "6Tie8xtVLm4kQX1Nhx5oBl"],
    ["varios-raros", "Horror", URL_SPOTIFY_PLAYLIST + "5TJL5ZsNGDkIAPehlQ8oRr"],
    ["varios-raros", "Filtro de la puta", URL_SPOTIFY_PLAYLIST + "6pomHmjs49nPNLldHHrMrW"],
    ["gaming-ps4", "Re Blue Lock", URL_SPOTIFY_PLAYLIST + "4J5o5GZe2OhKTlq2YC4dCn"],
    ["chill-lofi", "Besheza", URL_SPOTIFY_PLAYLIST + "2DKj6Byg47zGFz1WIwM2QG"],
    ["varios-raros", "Pop-Pop-it", URL_SPOTIFY_PLAYLIST + "4XM9boERH0vZjsq1lXe1Sv"],
    ["gaming-ps4", "Dark Fantasy", URL_SPOTIFY_PLAYLIST + "7dKihRHRPU6DpykOwcxc9j"],
    ["rap-trap", "Playlist pal golpe de Estado", URL_SPOTIFY_PLAYLIST + "1W018zCCEpnPnhz5Z69NPj"],
    ["rap-trap", "Biza Biza", URL_SPOTIFY_PLAYLIST + "1KFD78l5CRk2L1d3i2Rwa0"],
    ["varios-raros", "Yapame K-Sera", URL_SPOTIFY_PLAYLIST + "0vQXv6t67ziytzBEMm5hFX"],
    ["rock-alt", "Oliver Mf Tree", URL_SPOTIFY_PLAYLIST + "7uRZ808cWEuq06t9A3SlN5"],
    ["gaming-ps4", "Geek >:3", URL_SPOTIFY_PLAYLIST + "0M7G2ePuIZKlGrmF6PIWoB"],
    ["rap-trap", "PRIME..", URL_SPOTIFY_PLAYLIST + "6GH0qDtvHlO67Zmc8RSrlx"],
    ["rock-alt", "They Call Me Cry Baby...", URL_SPOTIFY_PLAYLIST + "6NDFYfwihv7VkrYzuRZ9pU"],
    ["chill-lofi", "Vintage \\^o^/", URL_SPOTIFY_PLAYLIST + "6H31kEbBm8pcf80fmGocpX"],
    ["rap-trap", "Perreito Vibes >:3", URL_SPOTIFY_PLAYLIST + "3RXnFtOkJmGDGxLgEspWGR"],
    ["chill-lofi", "astetik", URL_SPOTIFY_PLAYLIST + "4Dlrbe5fIDMrRucEKngTlH"],
    ["rock-alt", "Gorillaz 20 Mix (extras)", URL_SPOTIFY_PLAYLIST + "0fFbD1wToOElqc3lLMBUGT"],
    ["gaming-ps4", "MUSICA PA ESCUCHAR MIENTRAS JUEGO PS4 Y NO MORIR INTENTANDO CAMBIAR DE CANCION (JAJA SALU3)", URL_SPOTIFY_PLAYLIST + "1Kv3THs002jnuyet9Edozc"],
    ["varios-raros", "Top letras", URL_SPOTIFY_PLAYLIST + "37i9dQZF1CLcTo7UzL0sYK"],
    ["rap-trap", "SISAS", URL_SPOTIFY_PLAYLIST + "2b4rtI2NJ76d5x1GrrJuY1?uid=eed53ab86f298f27&uri=spotify%3Atrack%3A4woTEX1wYOTGDqNXuavlRC"]
];

const ETIQUETAS_VIBRA = {
    "gaming-ps4": "Gaming PS4",
    "rap-trap": "Rap / Trap",
    "rock-alt": "Rock / Alt",
    "chill-lofi": "Chill / Lo-Fi",
    "varios-raros": "Varios / Raros"
};

const CANCIONES_Y_DISCOS = [
    ["gorillaz", "Gorillaz", "Gorillaz (Álbum Debut - 2001)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Gorillaz%20Album%202001%20Gorillaz"],
    ["gorillaz", "Gorillaz", "G-Sides (B-Sides - 2002)", "Álbum Compilatorio", URL_SPOTIFY_SEARCH + "G-Sides%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Demon Days (Álbum - 2005)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Demon%20Days%20Gorillaz"],
    ["gorillaz", "Gorillaz", "D-Sides (Rarezas - 2007)", "Álbum Compilatorio", URL_SPOTIFY_SEARCH + "D-Sides%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Plastic Beach (Álbum - 2010)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Plastic%20Beach%20Gorillaz"],
    ["gorillaz", "Gorillaz", "The Fall (Álbum - 2010)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "The%20Fall%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Humanz (Álbum - 2017)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Humanz%20Gorillaz"],
    ["gorillaz", "Gorillaz", "The Now Now (Álbum - 2018)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "The%20Now%20Now%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Song Machine, Season One: Strange Timez (2020)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Song%20Machine%20Season%20One%20Strange%20Timez%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Meanwhile EP (2021)", "EP Oficial", URL_SPOTIFY_SEARCH + "Meanwhile%20EP%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Cracker Island (Álbum - 2023)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Cracker%20Island%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Clint Eastwood", "Gorillaz (2001)", URL_SPOTIFY_SEARCH + "Clint%20Eastwood%20Gorillaz"],
    ["gorillaz", "Gorillaz", "19-2000", "Gorillaz (2001)", URL_SPOTIFY_SEARCH + "19-2000%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Tomorrow Comes Today", "Gorillaz (2001)", URL_SPOTIFY_SEARCH + "Tomorrow%20Comes%20Today%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Rock the House", "Gorillaz (2001)", URL_SPOTIFY_SEARCH + "Rock%20the%20House%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Feel Good Inc.", "Demon Days (2005)", URL_SPOTIFY_SEARCH + "Feel%20Good%20Inc.%20Gorillaz"],
    ["gorillaz", "Gorillaz", "DARE", "Demon Days (2005)", URL_SPOTIFY_SEARCH + "DARE%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Dirty Harry", "Demon Days (2005)", URL_SPOTIFY_SEARCH + "Dirty%20Harry%20Gorillaz"],
    ["gorillaz", "Gorillaz", "El Mañana", "Demon Days (2005)", URL_SPOTIFY_SEARCH + "El%20Ma%C3%B1ana%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Kids with Guns", "Demon Days (2005)", URL_SPOTIFY_SEARCH + "Kids%20with%20Guns%20Gorillaz"],
    ["gorillaz", "Gorillaz", "November Has Come (feat. MF DOOM)", "Demon Days (2005)", URL_SPOTIFY_SEARCH + "November%20Has%20Come%20MF%20DOOM%20Gorillaz"],
    ["gorillaz", "Gorillaz", "On Melancholy Hill", "Plastic Beach (2010)", URL_SPOTIFY_SEARCH + "On%20Melancholy%20Hill%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Rhinestone Eyes", "Plastic Beach (2010)", URL_SPOTIFY_SEARCH + "Rhinestone%20Eyes%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Empire Ants (feat. Little Dragon)", "Plastic Beach (2010)", URL_SPOTIFY_SEARCH + "Empire%20Ants%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Stylo", "Plastic Beach (2010)", URL_SPOTIFY_SEARCH + "Stylo%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Saturnz Barz", "Humanz (2017)", URL_SPOTIFY_SEARCH + "Saturnz%20Barz%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Andromeda", "Humanz (2017)", URL_SPOTIFY_SEARCH + "Andromeda%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Humility", "The Now Now (2018)", URL_SPOTIFY_SEARCH + "Humility%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Tranz", "The Now Now (2018)", URL_SPOTIFY_SEARCH + "Tranz%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Momentary Bliss", "Song Machine (2020)", URL_SPOTIFY_SEARCH + "Momentary%20Bliss%20Gorillaz"],
    ["gorillaz", "Gorillaz", "New Gold (feat. Tame Impala & Bootie Brown)", "Cracker Island (2023)", URL_SPOTIFY_SEARCH + "New%20Gold%20Tame%20Impala%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Silent Running", "Cracker Island (2023)", URL_SPOTIFY_SEARCH + "Silent%20Running%20Gorillaz"],
    ["gorillaz", "Gorillaz", "Tormenta (feat. Bad Bunny)", "Cracker Island (2023)", URL_SPOTIFY_SEARCH + "Tormenta%20Bad%20Bunny%20Gorillaz"],

    ["twenty-one-pilots", "Twenty One Pilots", "Twenty One Pilots (Álbum Debut - 2009)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Twenty%20One%20Pilots%20Album%202009"],
    ["twenty-one-pilots", "Twenty One Pilots", "Regional at Best (Álbum - 2011)", "Álbum Independiente", URL_SPOTIFY_SEARCH + "Regional%20at%20Best%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Vessel (Álbum - 2013)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Vessel%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Blurryface (Álbum - 2015)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Blurryface%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Trench (Álbum - 2018)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Trench%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Scaled and Icy (Álbum - 2021)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Scaled%20and%20Icy%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Clancy (Álbum - 2024)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Clancy%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Breach (Álbum - 2025)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Breach%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Ode to Sleep", "Vessel (2013)", URL_SPOTIFY_SEARCH + "Ode%20to%20Sleep%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Holding On to You", "Vessel (2013)", URL_SPOTIFY_SEARCH + "Holding%20On%20to%20You%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Migraine", "Vessel (2013)", URL_SPOTIFY_SEARCH + "Migraine%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Car Radio", "Vessel (2013)", URL_SPOTIFY_SEARCH + "Car%20Radio%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Trees", "Vessel (2013)", URL_SPOTIFY_SEARCH + "Trees%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Heavydirtysoul", "Blurryface (2015)", URL_SPOTIFY_SEARCH + "Heavydirtysoul%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Stressed Out", "Blurryface (2015)", URL_SPOTIFY_SEARCH + "Stressed%20Out%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Ride", "Blurryface (2015)", URL_SPOTIFY_SEARCH + "Ride%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Tear in My Heart", "Blurryface (2015)", URL_SPOTIFY_SEARCH + "Tear%20in%20My%20Heart%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Lane Boy", "Blurryface (2015)", URL_SPOTIFY_SEARCH + "Lane%20Boy%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Heathens", "Single (2016)", URL_SPOTIFY_SEARCH + "Heathens%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Jumpsuit", "Trench (2018)", URL_SPOTIFY_SEARCH + "Jumpsuit%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Levitate", "Trench (2018)", URL_SPOTIFY_SEARCH + "Levitate%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Morph", "Trench (2018)", URL_SPOTIFY_SEARCH + "Morph%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "My Blood", "Trench (2018)", URL_SPOTIFY_SEARCH + "My%20Blood%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Chlorine", "Trench (2018)", URL_SPOTIFY_SEARCH + "Chlorine%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Nico and the Niners", "Trench (2018)", URL_SPOTIFY_SEARCH + "Nico%20and%20the%20Niners%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Bandito", "Trench (2018)", URL_SPOTIFY_SEARCH + "Bandito%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Shy Away", "Scaled and Icy (2021)", URL_SPOTIFY_SEARCH + "Shy%20Away%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "The Outside", "Scaled and Icy (2021)", URL_SPOTIFY_SEARCH + "The%20Outside%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Overcompensate", "Clancy (2024)", URL_SPOTIFY_SEARCH + "Overcompensate%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Next Semester", "Clancy (2024)", URL_SPOTIFY_SEARCH + "Next%20Semester%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Midwest Indigo", "Clancy (2024)", URL_SPOTIFY_SEARCH + "Midwest%20Indigo%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Routines in the Night", "Clancy (2024)", URL_SPOTIFY_SEARCH + "Routines%20in%20the%20Night%20Twenty%20One%20Pilots"],
    ["twenty-one-pilots", "Twenty One Pilots", "Paladin Strait", "Clancy (2024)", URL_SPOTIFY_SEARCH + "Paladin%20Strait%20Twenty%20One%20Pilots"],

    ["oliver-tree", "Oliver Tree", "Alien Boy EP (2018)", "EP Oficial", URL_SPOTIFY_SEARCH + "Alien%20Boy%20EP%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Do You Feel Me? EP (2019)", "EP Oficial", URL_SPOTIFY_SEARCH + "Do%20You%20Feel%20Me%20EP%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Ugly Is Beautiful (Álbum - 2020)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Ugly%20Is%20Beautiful%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Cowboy Tears (Álbum - 2022)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Cowboy%20Tears%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Alone in a Crowd (Álbum - 2023)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Alone%20in%20a%20Crowd%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Alien Boy", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Alien%20Boy%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Hurt", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Hurt%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Miracle Man", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Miracle%20Man%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Cash Machine", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Cash%20Machine%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Let Me Down", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Let%20Me%20Down%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Life Goes On", "Ugly Is Beautiful Deluxe (2021)", URL_SPOTIFY_SEARCH + "Life%20Goes%20On%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Jerk", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Jerk%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Bury Me Alive", "Ugly Is Beautiful (2020)", URL_SPOTIFY_SEARCH + "Bury%20Me%20Alive%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Cowboys Don't Cry", "Cowboy Tears (2022)", URL_SPOTIFY_SEARCH + "Cowboys%20Don%27t%20Cry%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Freaks & Geeks", "Cowboy Tears (2022)", URL_SPOTIFY_SEARCH + "Freaks%20%26%20Geeks%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Miss You", "Alone in a Crowd (2023)", URL_SPOTIFY_SEARCH + "Miss%20You%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "Bounce", "Alone in a Crowd (2023)", URL_SPOTIFY_SEARCH + "Bounce%20Oliver%20Tree"],
    ["oliver-tree", "Oliver Tree", "One & Only", "Alone in a Crowd (2023)", URL_SPOTIFY_SEARCH + "One%20%26%20Only%20Oliver%20Tree"],

    ["melanie-martinez", "Melanie Martinez", "Dollhouse EP (2014)", "EP Oficial", URL_SPOTIFY_SEARCH + "Dollhouse%20EP%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Cry Baby (Álbum - 2015)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Cry%20Baby%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "K-12 (Álbum - 2019)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "K-12%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "After School EP (2020)", "EP Oficial", URL_SPOTIFY_SEARCH + "After%20School%20EP%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Portals (Álbum - 2023)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Portals%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Cry Baby", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Cry%20Baby%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Dollhouse", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Dollhouse%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Sippy Cup", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Sippy%20Cup%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Carousel", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Carousel%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Alphabet Boy", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Alphabet%20Boy%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Soap", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Soap%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Pity Party", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Pity%20Party%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Mrs. Potato Head", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Mrs.%20Potato%20Head%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Mad Hatter", "Cry Baby (2015)", URL_SPOTIFY_SEARCH + "Mad%20Hatter%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Play Date", "Cry Baby Deluxe (2015)", URL_SPOTIFY_SEARCH + "Play%20Date%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Show & Tell", "K-12 (2019)", URL_SPOTIFY_SEARCH + "Show%20%26%20Tell%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Nurse's Office", "K-12 (2019)", URL_SPOTIFY_SEARCH + "Nurse%27s%20Office%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Strawberry Shortcake", "K-12 (2019)", URL_SPOTIFY_SEARCH + "Strawberry%20Shortcake%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "Lunchbox Friends", "K-12 (2019)", URL_SPOTIFY_SEARCH + "Lunchbox%20Friends%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "High School Sweethearts", "K-12 (2019)", URL_SPOTIFY_SEARCH + "High%20School%20Sweethearts%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "The Bakery", "After School EP (2020)", URL_SPOTIFY_SEARCH + "The%20Bakery%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "DEATH", "Portals (2023)", URL_SPOTIFY_SEARCH + "DEATH%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "VOID", "Portals (2023)", URL_SPOTIFY_SEARCH + "VOID%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "TUNNEL VISION", "Portals (2023)", URL_SPOTIFY_SEARCH + "TUNNEL%20VISION%20Melanie%20Martinez"],
    ["melanie-martinez", "Melanie Martinez", "EVIL", "Portals (2023)", URL_SPOTIFY_SEARCH + "EVIL%20Melanie%20Martinez"],

    ["zoe", "Zoé", "Zoé (Álbum Debut - 2001)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Zo%C3%A9%20Album%202001"],
    ["zoe", "Zoé", "Rocanlover (Álbum - 2003)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Rocanlover%20Zo%C3%A9"],
    ["zoe", "Zoé", "Memo Rex Commander y el Corazón Atómico de la Vía Láctea (2006)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Memo%20Rex%20Commander%20Zo%C3%A9"],
    ["zoe", "Zoé", "Reptilectric (Álbum - 2008)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Reptilectric%20Zo%C3%A9"],
    ["zoe", "Zoé", "MTV Unplugged: Música de Fondo (2011)", "Álbum En Vivo", URL_SPOTIFY_SEARCH + "M%C3%BAsica%20de%20Fondo%20MTV%20Unplugged%20Zo%C3%A9"],
    ["zoe", "Zoé", "Prográmaton (Álbum - 2013)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Progr%C3%A1maton%20Zo%C3%A9"],
    ["zoe", "Zoé", "Aztlán (Álbum - 2018)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Aztl%C3%A1n%20Zo%C3%A9"],
    ["zoe", "Zoé", "Sonidos de Karmática Resonancia (2021)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Sonidos%20de%20Karm%C3%A1tica%20Resonancia%20Zo%C3%A9"],
    ["zoe", "Zoé", "Asteroide", "Zoé (2001)", URL_SPOTIFY_SEARCH + "Asteroide%20Zo%C3%A9"],
    ["zoe", "Zoé", "Deja Te Conecto", "Zoé (2001)", URL_SPOTIFY_SEARCH + "Deja%20Te%20Conecto%20Zo%C3%A9"],
    ["zoe", "Zoé", "Love", "Rocanlover (2003)", URL_SPOTIFY_SEARCH + "Love%20Zo%C3%A9"],
    ["zoe", "Zoé", "Soñé", "Rocanlover (2003)", URL_SPOTIFY_SEARCH + "So%C3%B1%C3%A9%20Zo%C3%A9"],
    ["zoe", "Zoé", "Peace & Love", "Rocanlover (2003)", URL_SPOTIFY_SEARCH + "Peace%20%26%20Love%20Zo%C3%A9"],
    ["zoe", "Zoé", "Vía Láctea", "Memo Rex Commander (2006)", URL_SPOTIFY_SEARCH + "V%C3%ADa%20L%C3%A1ctea%20Zo%C3%A9"],
    ["zoe", "Zoé", "No Me Destruyas", "Memo Rex Commander (2006)", URL_SPOTIFY_SEARCH + "No%20Me%20Destruyas%20Zo%C3%A9"],
    ["zoe", "Zoé", "Paula", "Memo Rex Commander (2006)", URL_SPOTIFY_SEARCH + "Paula%20Zo%C3%A9"],
    ["zoe", "Zoé", "Dead", "Memo Rex Commander (2006)", URL_SPOTIFY_SEARCH + "Dead%20Zo%C3%A9"],
    ["zoe", "Zoé", "Reptilectric", "Reptilectric (2008)", URL_SPOTIFY_SEARCH + "Reptilectric%20Zo%C3%A9"],
    ["zoe", "Zoé", "Nada", "Reptilectric (2008)", URL_SPOTIFY_SEARCH + "Nada%20Zo%C3%A9"],
    ["zoe", "Zoé", "Poli", "Reptilectric (2008)", URL_SPOTIFY_SEARCH + "Poli%20Zo%C3%A9"],
    ["zoe", "Zoé", "Labios Rotos", "Música de Fondo (2011)", URL_SPOTIFY_SEARCH + "Labios%20Rotos%20Zo%C3%A9"],
    ["zoe", "Zoé", "Luna", "Música de Fondo (2011)", URL_SPOTIFY_SEARCH + "Luna%20Zo%C3%A9"],
    ["zoe", "Zoé", "Arrullo de Estrellas", "Prográmaton (2013)", URL_SPOTIFY_SEARCH + "Arrullo%20de%20Estrellas%20Zo%C3%A9"],
    ["zoe", "Zoé", "10 A.M.", "Prográmaton (2013)", URL_SPOTIFY_SEARCH + "10%20A.M.%20Zo%C3%A9"],
    ["zoe", "Zoé", "Azul", "Aztlán (2018)", URL_SPOTIFY_SEARCH + "Azul%20Zo%C3%A9"],
    ["zoe", "Zoé", "Hielo", "Aztlán (2018)", URL_SPOTIFY_SEARCH + "Hielo%20Zo%C3%A9"],
    ["zoe", "Zoé", "Karmadame", "Sonidos de Karmática Resonancia (2021)", URL_SPOTIFY_SEARCH + "Karmadame%20Zo%C3%A9"],
    ["zoe", "Zoé", "SKR", "Sonidos de Karmática Resonancia (2021)", URL_SPOTIFY_SEARCH + "SKR%20Zo%C3%A9"],

    ["trap-argentino", "El Quinto Escalón (Duki, Ysy A, Mks, Wolf)", "Sesiones Parque Rivadavia (2015)", "Origen Trap Argentino (2015)", URL_SPOTIFY_SEARCH + "El%20Quinto%20Escal%C3%B3n%20Duki%20Ysy%20A"],
    ["trap-argentino", "Duki", "No Vendo Trap (2016)", "Himno Fundacional #1", URL_SPOTIFY_SEARCH + "No%20Vendo%20Trap%20Duki"],
    ["trap-argentino", "Neo Pistea", "Tumbando el Club (Versión Original 2016)", "Clásico Subterráneo", URL_SPOTIFY_SEARCH + "Tumbando%20el%20Club%20Neo%20Pistea"],
    ["trap-argentino", "Ysy A", "Trap de Verdad (2017)", "Linaje El Quinto Escalón", URL_SPOTIFY_SEARCH + "Trap%20de%20Verdad%20Ysy%20A"],
    ["trap-argentino", "Duki", "Hello Cotto (2017)", "Explosión Mueva Records", URL_SPOTIFY_SEARCH + "Hello%20Cotto%20Duki"],
    ["trap-argentino", "Khea, Duki, Cazzu", "Loca (2017)", "Himno Masivo del Movimiento", URL_SPOTIFY_SEARCH + "Loca%20Khea%20Duki%20Cazzu"],
    ["trap-argentino", "Duki feat. Khea", "She Don't Give a FO (2017)", "Clásico Inmortal", URL_SPOTIFY_SEARCH + "She%20Don%27t%20Give%20a%20FO%20Duki%20Khea"],
    ["trap-argentino", "Ecko", "Dorado (2017)", "Prime Trap Callejero", URL_SPOTIFY_SEARCH + "Dorado%20Ecko"],
    ["trap-argentino", "Ecko", "Dealer (2017)", "Freestyle & Trap", URL_SPOTIFY_SEARCH + "Dealer%20Ecko"],
    ["trap-argentino", "Cazzu", "Maldade$ (2017)", "Maldades Album", URL_SPOTIFY_SEARCH + "Maldades%20Cazzu"],
    ["trap-argentino", "Duki", "Nivel (2017)", "Single Clásico", URL_SPOTIFY_SEARCH + "Nivel%20Duki"],
    ["trap-argentino", "Duki, Ysy A, Klopp", "Listo Pa' La Foto (2017)", "Pre-Modo Diablo", URL_SPOTIFY_SEARCH + "Listo%20Pa%20La%20Foto%20Duki%20Ysy%20A"],
    ["trap-argentino", "C.R.O & Homer el Mero Mero", "Esperanza - Barderos (2017)", "Pure Drug Music", URL_SPOTIFY_SEARCH + "Esperanza%20Barderos%20C.R.O%20Homer%20el%20Mero%20Mero"],
    ["trap-argentino", "Seven Kayne", "Si Te Lastimé (2017)", "Mueva Records Era", URL_SPOTIFY_SEARCH + "Si%20Te%20Lastim%C3%A9%20Seven%20Kayne"],
    ["trap-argentino", "Paulo Londra", "Relax (2017)", "Explosión Córdoba", URL_SPOTIFY_SEARCH + "Relax%20Paulo%20Londra"],
    ["trap-argentino", "Paulo Londra", "Condenado para el Millón (2017)", "Big Ligas", URL_SPOTIFY_SEARCH + "Condenado%20para%20el%20Mill%C3%B3n%20Paulo%20Londra"],
    ["trap-argentino", "Duki", "Rockstar (2018)", "Era #ModoDiablo", URL_SPOTIFY_SEARCH + "Rockstar%20Duki"],
    ["trap-argentino", "Modo Diablo (Duki, Ysy A, Neo Pistea)", "Quavo #ModoDiablo (2018)", "Tridente Histórico", URL_SPOTIFY_SEARCH + "Quavo%20Modo%20Diablo%20Duki%20Ysy%20A%20Neo%20Pistea"],
    ["trap-argentino", "Modo Diablo (Duki, Ysy A, Neo Pistea)", "Uh (2018)", "Modo Diablo Clásico", URL_SPOTIFY_SEARCH + "Uh%20Modo%20Diablo%20Duki%20Ysy%20A%20Neo%20Pistea"],
    ["trap-argentino", "Modo Diablo (Duki, Ysy A, Neo Pistea)", "Todo el Día (2018)", "Modo Diablo Clásico", URL_SPOTIFY_SEARCH + "Todo%20el%20D%C3%ADa%20Modo%20Diablo%20Duki%20Ysy%20A%20Neo%20Pistea"],
    ["trap-argentino", "C.R.O, Duki", "Hijo de la Noche (2018)", "Himno Nocturno", URL_SPOTIFY_SEARCH + "Hijo%20de%20la%20Noche%20C.R.O%20Duki"],
    ["trap-argentino", "C.R.O, Neo Pistea", "Ella Es una G (2018)", "Trap Oscuro", URL_SPOTIFY_SEARCH + "Ella%20Es%20una%20G%20C.R.O%20Neo%20Pistea"],
    ["trap-argentino", "C.R.O", "Reina (2018)", "542 Album", URL_SPOTIFY_SEARCH + "Reina%20C.R.O"],
    ["trap-argentino", "C.R.O", "Ciudad Gris (2018)", "542 Album", URL_SPOTIFY_SEARCH + "Ciudad%20Gris%20C.R.O"],
    ["trap-argentino", "C.R.O, Duki", "Alas (2018)", "Colaboración Clásica", URL_SPOTIFY_SEARCH + "Alas%20C.R.O%20Duki"],
    ["trap-argentino", "Ysy A", "Antezana 247 (2018)", "Álbum de Culto", URL_SPOTIFY_SEARCH + "Antezana%20247%20Ysy%20A"],
    ["trap-argentino", "Ysy A", "Pastel con Nutella (2018)", "Antezana 247", URL_SPOTIFY_SEARCH + "Pastel%20con%20Nutella%20Ysy%20A"],
    ["trap-argentino", "Ysy A", "Hidro (2018)", "Antezana 247", URL_SPOTIFY_SEARCH + "Hidro%20Ysy%20A"],
    ["trap-argentino", "Ysy A", "Tamo Loco (2018)", "Antezana 247", URL_SPOTIFY_SEARCH + "Tamo%20Loco%20Ysy%20A"],
    ["trap-argentino", "Ysy A, Duki", "No Sé (2018)", "Antezana 247", URL_SPOTIFY_SEARCH + "No%20S%C3%A9%20Ysy%20A%20Duki"],
    ["trap-argentino", "Ysy A, Duki, Obie Wanshot", "Vuelta a la Luna (Remix) (2019)", "Antezana 247", URL_SPOTIFY_SEARCH + "Vuelta%20a%20la%20Luna%20Remix%20Ysy%20A%20Duki"],
    ["trap-argentino", "Neo Pistea", "Messi (2018)", "Trap de Culto", URL_SPOTIFY_SEARCH + "Messi%20Neo%20Pistea"],
    ["trap-argentino", "Ecko", "Rebota (2018)", "Hit de Club", URL_SPOTIFY_SEARCH + "Rebota%20Ecko"],
    ["trap-argentino", "Ecko, Khea, Seven Kayne, Iacho", "Bésame (Remix) (2018)", "Mueva Records", URL_SPOTIFY_SEARCH + "B%C3%A9same%20Remix%20Ecko%20Khea%20Seven%20Kayne"],
    ["trap-argentino", "Ecko, Blunted Vato", "Ice (2018)", "Trap Pesado", URL_SPOTIFY_SEARCH + "Ice%20Ecko%20Blunted%20Vato"],
    ["trap-argentino", "Duki", "Si Te Sentís Sola (2018)", "Single Clásico", URL_SPOTIFY_SEARCH + "Si%20Te%20Sent%C3%ADs%20Sola%20Duki"],
    ["trap-argentino", "Duki feat. DrefQuila", "Sin Culpa (2018)", "Conexión Cono Sur", URL_SPOTIFY_SEARCH + "Sin%20Culpa%20Duki%20DrefQuila"],
    ["trap-argentino", "Duki", "Ferrari (feat. Dicc) (2018)", "Trap Puro", URL_SPOTIFY_SEARCH + "Ferrari%20Duki%20Dicc"],
    ["trap-argentino", "Bhavi, Ecko", "Piso (2018)", "Mueva Records", URL_SPOTIFY_SEARCH + "Piso%20Bhavi%20Ecko"],
    ["trap-argentino", "Bhavi, Duki", "Mojaa (2018)", "Clásico Experimental", URL_SPOTIFY_SEARCH + "Mojaa%20Bhavi%20Duki"],
    ["trap-argentino", "Khea", "Cómo Le Digo (2018)", "Trap Melódico", URL_SPOTIFY_SEARCH + "C%C3%B3mo%20Le%20Digo%20Khea"],
    ["trap-argentino", "Khea", "Vete (2018)", "Mueva Records", URL_SPOTIFY_SEARCH + "Vete%20Khea"],
    ["trap-argentino", "Cazzu", "Chapiadora (2018)", "La Jefa del Trap", URL_SPOTIFY_SEARCH + "Chapiadora%20Cazzu"],
    ["trap-argentino", "Lucho SSJ, Duki", "Blood (2018)", "Sangre Joven", URL_SPOTIFY_SEARCH + "Blood%20Lucho%20SSJ%20Duki"],
    ["trap-argentino", "Neo Pistea, C.R.O, Obie Wanshot, Ysy A, Cazzu, Khea, Lucho SSJ, Coqeéin Montana, Marcianos Crew, Duki", "Tumbando el Club (Remix) (2019)", "El Himno Definitivo", URL_SPOTIFY_SEARCH + "Tumbando%20el%20Club%20Remix%20Neo%20Pistea%20Duki%20Ysy%20A"],
    ["trap-argentino", "Modo Diablo (Duki, Ysy A, Neo Pistea)", "Trap N' Export (2019)", "Cierre de Oro Modo Diablo", URL_SPOTIFY_SEARCH + "Trap%20N%20Export%20Modo%20Diablo%20Duki%20Ysy%20A%20Neo%20Pistea"],
    ["trap-argentino", "Duki", "Goteo (2019)", "Súper Sangre Joven", URL_SPOTIFY_SEARCH + "Goteo%20Duki"],
    ["trap-argentino", "Duki, Khea", "Hitboy (2019)", "Súper Sangre Joven", URL_SPOTIFY_SEARCH + "Hitboy%20Duki%20Khea"],
    ["trap-argentino", "Duki, Ysy A", "A Punta de Espada (2019)", "Súper Sangre Joven", URL_SPOTIFY_SEARCH + "A%20Punta%20de%20Espada%20Duki%20Ysy%20A"],
    ["trap-argentino", "Ysy A", "Full Ice (2019)", "Hecho a Mano", URL_SPOTIFY_SEARCH + "Full%20Ice%20Ysy%20A"],
    ["trap-argentino", "Ysy A", "Alma (2019)", "Hecho a Mano", URL_SPOTIFY_SEARCH + "Alma%20Ysy%20A"],
    ["trap-argentino", "C.R.O", "6 A.M. (2019)", "C.R.O Clásico", URL_SPOTIFY_SEARCH + "6%20A.M.%20C.R.O"],

    ["lytos", "Lytos", "Déjame Hablar Contigo (Álbum - 2016)", "Álbum Recopilatorio", URL_SPOTIFY_SEARCH + "D%C3%A9jame%20Hablar%20Contigo%20Lytos"],
    ["lytos", "Lytos", "7:11 (Álbum - 2017)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "7%3A11%20Lytos"],
    ["lytos", "Lytos", "TWO (Álbum - 2020)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "TWO%20Lytos"],
    ["lytos", "Lytos", "Percepción & Perfección (EP - 2021)", "EP Oficial", URL_SPOTIFY_SEARCH + "Percepci%C3%B3n%20%26%20Perfecci%C3%B3n%20Lytos"],
    ["lytos", "Lytos", "Déjame Hablar Contigo", "Sencillo Emblemático", URL_SPOTIFY_SEARCH + "D%C3%A9jame%20Hablar%20Contigo%20Lytos"],
    ["lytos", "Lytos", "¿Quién Me Salva a Mí?", "Sencillo Reflexivo", URL_SPOTIFY_SEARCH + "Qui%C3%A9n%20Me%20Salva%20a%20M%C3%AD%20Lytos"],
    ["lytos", "Lytos", "Musa", "TWO (2020)", URL_SPOTIFY_SEARCH + "Musa%20Lytos"],
    ["lytos", "Lytos", "Moonwalk", "TWO (2020)", URL_SPOTIFY_SEARCH + "Moonwalk%20Lytos"],
    ["lytos", "Lytos", "Amor a la Carta (con Brock Ansiolitiko)", "TWO (2020)", URL_SPOTIFY_SEARCH + "Amor%20a%20la%20Carta%20Lytos%20Brock%20Ansiolitiko"],
    ["lytos", "Lytos", "Esclavo de la Química", "Reflexión Musical", URL_SPOTIFY_SEARCH + "Esclavo%20de%20la%20Qu%C3%ADmica%20Lytos"],
    ["lytos", "Lytos", "QUÍMICA: Las 3 Máscaras Japonesas", "Historia Rimada", URL_SPOTIFY_SEARCH + "Qu%C3%ADmica%20Lytos"],
    ["lytos", "Lytos", "Lo Siento", "Sencillo (2020)", URL_SPOTIFY_SEARCH + "Lo%20Siento%20Lytos"],
    ["lytos", "Lytos", "Un Nuevo Comienzo", "Sencillo (2021)", URL_SPOTIFY_SEARCH + "Un%20Nuevo%20Comienzo%20Lytos"],
    ["lytos", "Lytos", "Tengo Envidia", "Sencillo (2022)", URL_SPOTIFY_SEARCH + "Tengo%20Envidia%20Lytos"],
    ["lytos", "Lytos", "Herida Abierta", "Sencillo (2023)", URL_SPOTIFY_SEARCH + "Herida%20Abierta%20Lytos"],
    ["lytos", "Lytos", "Solo Quiero Ser Normal", "Sencillo (2023)", URL_SPOTIFY_SEARCH + "Solo%20Quiero%20Ser%20Normal%20Lytos"],
    ["lytos", "Lytos", "La Soledad del Artista", "Sencillo (2025)", URL_SPOTIFY_SEARCH + "La%20Soledad%20del%20Artista%20Lytos"],

    ["crazy-point", "Crazy Point", "Wo (Álbum - 2020)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Wo%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Trap Ñema (Álbum - 2020)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Trap%20%C3%91ema%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "El Inventor del Sexo (Álbum - 2021)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "El%20Inventor%20del%20Sexo%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Que Maldito Swagger (Álbum - 2022)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Que%20Maldito%20Swagger%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "888 (Álbum - 2022)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "888%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Broken Boy 2 (Álbum - 2023)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Broken%20Boy%202%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Trap Ñema, Vol. 5 (Álbum - 2023)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Trap%20%C3%91ema%20Vol.%205%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Viviendo lo que Queda (Álbum - 2024)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Viviendo%20lo%20que%20Queda%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Broken Boy 3 Deluxe (Álbum - 2024)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Broken%20Boy%203%20Deluxe%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Make Trap Great Again (Álbum - 2025)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Make%20Trap%20Great%20Again%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Altita (Álbum - 2025)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Altita%20Crazy%20Point"],
    ["crazy-point", "Crazy Point & YEI808", "Y3K (Álbum - 2026)", "Álbum Estudio", URL_SPOTIFY_SEARCH + "Y3K%20Crazy%20Point%20YEI808"],
    ["crazy-point", "Crazy Point feat. Bigoblin", "Wo", "Hit Underground", URL_SPOTIFY_SEARCH + "Wo%20Crazy%20Point%20Bigoblin"],
    ["crazy-point", "Crazy Point", "Modo Sexo", "Hit Underground", URL_SPOTIFY_SEARCH + "Modo%20Sexo%20Crazy%20Point"],
    ["crazy-point", "Crazy Point feat. Sin Nombre", "Por Ti", "Trap Alternativo", URL_SPOTIFY_SEARCH + "Por%20Ti%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "120", "Single Oficial", URL_SPOTIFY_SEARCH + "120%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Zaza", "Single Oficial", URL_SPOTIFY_SEARCH + "Zaza%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Eterno", "Single Oficial", URL_SPOTIFY_SEARCH + "Eterno%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Baraka", "Single Oficial", URL_SPOTIFY_SEARCH + "Baraka%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Double Cup", "Single Oficial", URL_SPOTIFY_SEARCH + "Double%20Cup%20Crazy%20Point"],
    ["crazy-point", "Crazy Point", "Me Salió un Baká", "Single Oficial", URL_SPOTIFY_SEARCH + "Me%20Sali%C3%B3%20un%20Bak%C3%A1%20Crazy%20Point"],
    ["crazy-point", "Crazy Point & YEI808", "DM", "Single Oficial", URL_SPOTIFY_SEARCH + "DM%20Crazy%20Point%20YEI808"],

    ["flatout2", "Rob Zombie", "Demon Speeding", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Demon%20Speeding%20Rob%20Zombie"],
    ["flatout2", "Rob Zombie", "Feel So Numb", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Feel%20So%20Numb%20Rob%20Zombie"],
    ["flatout2", "Megadeth", "Symphony of Destruction", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Symphony%20of%20Destruction%20Megadeth"],
    ["flatout2", "Nickelback", "Believe It or Not", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Believe%20It%20or%20Not%20Nickelback"],
    ["flatout2", "Nickelback", "Flat on the Floor", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Flat%20on%20the%20Floor%20Nickelback"],
    ["flatout2", "Audioslave", "Man or Animal", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Man%20or%20Animal%20Audioslave"],
    ["flatout2", "Audioslave", "Your Time Has Come", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Your%20Time%20Has%20Come%20Audioslave"],
    ["flatout2", "Fall Out Boy", "7 Minutes in Heaven (Atavan Halen)", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "7%20Minutes%20in%20Heaven%20Atavan%20Halen%20Fall%20Out%20Boy"],
    ["flatout2", "Fall Out Boy", "Snitches and Talkers Get Stitches and Walkers", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Snitches%20and%20Talkers%20Get%20Stitches%20and%20Walkers%20Fall%20Out%20Boy"],
    ["flatout2", "Papa Roach", "Blood Brothers", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Blood%20Brothers%20Papa%20Roach"],
    ["flatout2", "Papa Roach", "Not Listening", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Not%20Listening%20Papa%20Roach"],
    ["flatout2", "Rise Against", "Give It All", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Give%20It%20All%20Rise%20Against"],
    ["flatout2", "Yellowcard", "Breathing", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Breathing%20Yellowcard"],
    ["flatout2", "Yellowcard", "Rough Landing, Holly", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Rough%20Landing%20Holly%20Yellowcard"],
    ["flatout2", "Wolfmother", "Dimension", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Dimension%20Wolfmother"],
    ["flatout2", "Wolfmother", "Pyramid", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Pyramid%20Wolfmother"],
    ["flatout2", "Alkaline Trio", "Fall Victim", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Fall%20Victim%20Alkaline%20Trio"],
    ["flatout2", "Alkaline Trio", "Mercy Me", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Mercy%20Me%20Alkaline%20Trio"],
    ["flatout2", "Mötley Crüe", "Dr. Feelgood", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Dr.%20Feelgood%20M%C3%B6tley%20Cr%C3%BCe"],
    ["flatout2", "Underoath", "Reinventing Your Exit", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Reinventing%20Your%20Exit%20Underoath"],
    ["flatout2", "Supergrass", "Richard III", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Richard%20III%20Supergrass"],
    ["flatout2", "Supergrass", "Road to Rouen", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Road%20to%20Rouen%20Supergrass"],
    ["flatout2", "The Vines", "Don't Listen to the Radio", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Don%27t%20Listen%20to%20the%20Radio%20The%20Vines"],
    ["flatout2", "The Chelsea Smiles", "Nowhere Ride", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Nowhere%20Ride%20The%20Chelsea%20Smiles"],
    ["flatout2", "Zebrahead", "Lobotomy for Dummies", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Lobotomy%20for%20Dummies%20Zebrahead"],
    ["flatout2", "AFI", "Rabbits Are Roadkill on Rt. 37", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Rabbits%20Are%20Roadkill%20on%20Rt.%2037%20AFI"],
    ["flatout2", "Nine Black Alps", "Cosmopolitan", "OST FlatOut 2 (2006)", URL_SPOTIFY_SEARCH + "Cosmopolitan%20Nine%20Black%20Alps"],

    ["gh3", "DragonForce", "Through the Fire and Flames", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Through%20the%20Fire%20and%20Flames%20DragonForce"],
    ["gh3", "Metallica", "One", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "One%20Metallica"],
    ["gh3", "Slayer", "Raining Blood", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Raining%20Blood%20Slayer"],
    ["gh3", "Iron Maiden", "The Number of the Beast", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "The%20Number%20of%20the%20Beast%20Iron%20Maiden"],
    ["gh3", "Muse", "Knights of Cydonia", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Knights%20of%20Cydonia%20Muse"],
    ["gh3", "Slipknot", "Before I Forget", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Before%20I%20Forget%20Slipknot"],
    ["gh3", "Disturbed", "Stricken", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Stricken%20Disturbed"],
    ["gh3", "Queens of the Stone Age", "3's & 7's", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "3%27s%20%26%207%27s%20Queens%20of%20the%20Stone%20Age"],
    ["gh3", "Rage Against the Machine", "Bulls on Parade", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Bulls%20on%20Parade%20Rage%20Against%20the%20Machine"],
    ["gh3", "Guns N' Roses", "Welcome to the Jungle", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Welcome%20to%20the%20Jungle%20Guns%20N%27%20Roses"],
    ["gh3", "The Rolling Stones", "Paint It Black", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Paint%20It%20Black%20The%20Rolling%20Stones"],
    ["gh3", "Black Sabbath", "Paranoid", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Paranoid%20Black%20Sabbath"],
    ["gh3", "The Killers", "When You Were Young", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "When%20You%20Were%20Young%20The%20Killers"],
    ["gh3", "Pearl Jam", "Even Flow", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Even%20Flow%20Pearl%20Jam"],
    ["gh3", "Weezer", "My Name Is Jonas", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "My%20Name%20Is%20Jonas%20Weezer"],
    ["gh3", "Tenacious D", "The Metal", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "The%20Metal%20Tenacious%20D"],
    ["gh3", "Living Colour", "Cult of Personality", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Cult%20of%20Personality%20Living%20Colour"],
    ["gh3", "Eric Johnson", "Cliffs of Dover", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Cliffs%20of%20Dover%20Eric%20Johnson"],
    ["gh3", "Scorpions", "Rock You Like a Hurricane", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Rock%20You%20Like%20a%20Hurricane%20Scorpions"],
    ["gh3", "Santana", "Black Magic Woman", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Black%20Magic%20Woman%20Santana"],
    ["gh3", "The Smashing Pumpkins", "Cherub Rock", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Cherub%20Rock%20The%20Smashing%20Pumpkins"],
    ["gh3", "AFI", "Miss Murder", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Miss%20Murder%20AFI"],
    ["gh3", "The Strokes", "Reptilia", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Reptilia%20The%20Strokes"],
    ["gh3", "Beastie Boys", "Sabotage", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Sabotage%20Beastie%20Boys"],
    ["gh3", "Red Hot Chili Peppers", "Suck My Kiss", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Suck%20My%20Kiss%20Red%20Hot%20Chili%20Peppers"],
    ["gh3", "Killswitch Engage", "My Curse", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "My%20Curse%20Killswitch%20Engage"],
    ["gh3", "Rise Against", "Prayer of the Refugee", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Prayer%20of%20the%20Refugee%20Rise%20Against"],
    ["gh3", "Bloc Party", "Helicopter", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Helicopter%20Bloc%20Party"],
    ["gh3", "Héroes del Silencio", "Avalancha", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Avalancha%20H%C3%A9roes%20del%20Silencio"],
    ["gh3", "Kiss", "Rock and Roll All Nite", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Rock%20and%20Roll%20All%20Nite%20Kiss"],
    ["gh3", "Foghat", "Slow Ride", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Slow%20Ride%20Foghat"],
    ["gh3", "Heart", "Barracuda", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "Barracuda%20Heart"],
    ["gh3", "ZZ Top", "La Grange", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "La%20Grange%20ZZ%20Top"],
    ["gh3", "Steve Ouimette", "The Devil Went Down to Georgia", "OST Guitar Hero III (2007)", URL_SPOTIFY_SEARCH + "The%20Devil%20Went%20Down%20to%20Georgia%20Steve%20Ouimette"],

    ["nfs-carbon", "Ekstrak feat. Know-1", "Hard Drivers", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "Hard%20Drivers%20Ekstrak"],
    ["nfs-carbon", "Pharrell feat. Lauren", "Show You How to Hustle", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "Show%20You%20How%20to%20Hustle%20Pharrell"],
    ["nfs-carbon", "Spank Rock", "What It Look Like", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "What%20It%20Look%20Like%20Spank%20Rock"],
    ["nfs-carbon", "Sway", "Hype Boys", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "Hype%20Boys%20Sway"],
    ["nfs-carbon", "Roots Manuva", "No Love", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "No%20Love%20Roots%20Manuva"],
    ["nfs-carbon", "Lady Sovereign", "Love Me or Hate Me", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "Love%20Me%20or%20Hate%20Me%20Lady%20Sovereign"],
    ["nfs-carbon", "Grandmaster Flash & The Furious Five", "Scorpio", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "Scorpio%20Grandmaster%20Flash"],
    ["nfs-carbon", "Dynamite MC", "After Party", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "After%20Party%20Dynamite%20MC"],
    ["nfs-carbon", "Dynamite MC", "Bounce", "OST Need for Speed: Carbon (Exotic)", URL_SPOTIFY_SEARCH + "Bounce%20Dynamite%20MC"],
    ["nfs-carbon", "Wolfmother", "Joker and the Thief", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "Joker%20and%20the%20Thief%20Wolfmother"],
    ["nfs-carbon", "Eagles of Death Metal", "Don't Speak (I Came to Make a Bang!)", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "Don%27t%20Speak%20I%20Came%20to%20Make%20a%20Bang%20Eagles%20of%20Death%20Metal"],
    ["nfs-carbon", "Priestess", "I Am the Night, Colour Me Black", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "I%20Am%20the%20Night%20Colour%20Me%20Black%20Priestess"],
    ["nfs-carbon", "Kyuss", "Hurricane", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "Hurricane%20Kyuss"],
    ["nfs-carbon", "Valient Thorr", "Heatseeker", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "Heatseeker%20Valient%20Thorr"],
    ["nfs-carbon", "The Bronx", "Around the Horn", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "Around%20the%20Horn%20The%20Bronx"],
    ["nfs-carbon", "Every Move a Picture", "Signs of Life", "OST Need for Speed: Carbon (Muscle)", URL_SPOTIFY_SEARCH + "Signs%20of%20Life%20Every%20Move%20a%20Picture"],
    ["nfs-carbon", "Ladytron", "Sugar (Jagz Kooner Remix)", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Sugar%20Jagz%20Kooner%20Remix%20Ladytron"],
    ["nfs-carbon", "Ladytron", "Fighting in Built-Up Areas", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Fighting%20in%20Built-Up%20Areas%20Ladytron"],
    ["nfs-carbon", "Gary Numan & Tubeway Army", "Are 'Friends' Electric?", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Are%20Friends%20Electric%20Gary%20Numan%20Tubeway%20Army"],
    ["nfs-carbon", "Goldfrapp", "Ride a White Horse (Serge Santiago Remix)", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Ride%20a%20White%20Horse%20Serge%20Santiago%20Remix%20Goldfrapp"],
    ["nfs-carbon", "The Presets", "Steamworks", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Steamworks%20The%20Presets"],
    ["nfs-carbon", "Tiga", "Good as Gold", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Good%20as%20Gold%20Tiga"],
    ["nfs-carbon", "Vitalic", "My Friend Dario", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "My%20Friend%20Dario%20Vitalic"],
    ["nfs-carbon", "Yonderboi", "People Always Talk About the Weather (Junkie XL Remix)", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "People%20Always%20Talk%20About%20the%20Weather%20Junkie%20XL%20Remix%20Yonderboi"],
    ["nfs-carbon", "Melody", "Feel the Rush (Junkie XL Remix)", "OST Need for Speed: Carbon (Tuner)", URL_SPOTIFY_SEARCH + "Feel%20the%20Rush%20Junkie%20XL%20Remix%20Melody"],

    ["thps3", "Motörhead", "Ace of Spades", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Ace%20of%20Spades%20Mot%C3%B6rhead"],
    ["thps3", "Ramones", "Blitzkrieg Bop", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Blitzkrieg%20Bop%20Ramones"],
    ["thps3", "Red Hot Chili Peppers", "Fight Like a Brave", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Fight%20Like%20a%20Brave%20Red%20Hot%20Chili%20Peppers"],
    ["thps3", "CKY", "96 Quite Bitter Beings", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "96%20Quite%20Bitter%20Beings%20CKY"],
    ["thps3", "Alien Ant Farm", "Wish", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Wish%20Alien%20Ant%20Farm"],
    ["thps3", "AFI", "The Boy Who Destroyed the World", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "The%20Boy%20Who%20Destroyed%20the%20World%20AFI"],
    ["thps3", "Adolescents", "Amoeba", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Amoeba%20Adolescents"],
    ["thps3", "Bodyjar", "Not the Same", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Not%20the%20Same%20Bodyjar"],
    ["thps3", "Del the Funky Homosapien", "If You Must", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "If%20You%20Must%20Del%20the%20Funky%20Homosapien"],
    ["thps3", "KRS-One", "Hush", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Hush%20KRS-One"],
    ["thps3", "Redman", "Let's Get Dirty (I Can't Get in da Club)", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Let%27s%20Get%20Dirty%20Redman"],
    ["thps3", "Xzibit", "Paparazzi", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Paparazzi%20Xzibit"],
    ["thps3", "House of Pain", "I'm a Swing It", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "I%27m%20a%20Swing%20It%20House%20of%20Pain"],
    ["thps3", "Rollins Band", "What's the Matter Man", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "What%27s%20the%20Matter%20Man%20Rollins%20Band"],
    ["thps3", "Zebrahead", "Check", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Check%20Zebrahead"],
    ["thps3", "Guttermouth", "I'm Destroying the World", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "I%27m%20Destroying%20the%20World%20Guttermouth"],
    ["thps3", "Ozomatli", "Cut Chemist Suite", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Cut%20Chemist%20Suite%20Ozomatli"],
    ["thps3", "The Mad Capsule Markets", "Pulse", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Pulse%20The%20Mad%20Capsule%20Markets"],
    ["thps3", "The Nextmen", "Amongst the Madness", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "Amongst%20the%20Madness%20The%20Nextmen"],
    ["thps3", "The Reverend Horton Heat", "I Can't Surf", "OST Tony Hawk's Pro Skater 3 (2001)", URL_SPOTIFY_SEARCH + "I%20Can%27t%20Surf%20The%20Reverend%20Horton%20Heat"],

    ["fifa-fc", "Bad Bunny & Bomba Estéreo", "Ojitos Lindos", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Ojitos%20Lindos%20Bad%20Bunny%20Bomba%20Est%C3%A9reo"],
    ["fifa-fc", "Gorillaz", "Baby Queen", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Baby%20Queen%20Gorillaz"],
    ["fifa-fc", "ROSALÍA", "Saoko", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Saoko%20ROSAL%C3%8DA"],
    ["fifa-fc", "Stromae", "Fils de joie", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Fils%20de%20joie%20Stromae"],
    ["fifa-fc", "Trueno & Victor Heredia", "Tierra Zanta", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Tierra%20Zanta%20Trueno%20Victor%20Heredia"],
    ["fifa-fc", "Denzel Curry feat. slowthai", "Zatoichi", "OST FIFA 23 Volta", URL_SPOTIFY_SEARCH + "Zatoichi%20Denzel%20Curry%20slowthai"],
    ["fifa-fc", "Nas", "40-16 Building", "OST FIFA 23 Volta", URL_SPOTIFY_SEARCH + "40-16%20Building%20Nas"],
    ["fifa-fc", "Yeah Yeah Yeahs feat. Perfume Genius", "Spitting Off the Edge of the World", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Spitting%20Off%20the%20Edge%20of%20the%20World%20Yeah%20Yeah%20Yeahs"],
    ["fifa-fc", "Flume feat. Caroline Polachek", "Sirens", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Sirens%20Flume%20Caroline%20Polachek"],
    ["fifa-fc", "ODESZA", "Behind the Sun", "OST FIFA 23", URL_SPOTIFY_SEARCH + "Behind%20the%20Sun%20ODESZA"],
    ["fifa-fc", "Baby Keem & Kendrick Lamar", "The Hillbillies", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "The%20Hillbillies%20Baby%20Keem%20Kendrick%20Lamar"],
    ["fifa-fc", "Jack Harlow", "They Don't Love It", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "They%20Don%27t%20Love%20It%20Jack%20Harlow"],
    ["fifa-fc", "Karol G", "Bichota G", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "Bichota%20G%20Karol%20G"],
    ["fifa-fc", "Bas & J. Cole", "Passport Bros", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "Passport%20Bros%20Bas%20J.%20Cole"],
    ["fifa-fc", "Ashnikko", "Worms", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "Worms%20Ashnikko"],
    ["fifa-fc", "Channel Tres", "6am", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "6am%20Channel%20Tres"],
    ["fifa-fc", "2hollis", "poster boy", "OST EA Sports FC 24", URL_SPOTIFY_SEARCH + "poster%20boy%202hollis"],
    ["fifa-fc", "Twenty One Pilots", "Midwest Indigo", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "Midwest%20Indigo%20Twenty%20One%20Pilots"],
    ["fifa-fc", "Billie Eilish", "CHIHIRO", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "CHIHIRO%20Billie%20Eilish"],
    ["fifa-fc", "Charli xcx", "Sympathy is a knife", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "Sympathy%20is%20a%20knife%20Charli%20xcx"],
    ["fifa-fc", "Fontaines D.C.", "Starburster", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "Starburster%20Fontaines%20D.C."],
    ["fifa-fc", "Fred again.., Anderson .Paak & CHIKA", "places to be", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "places%20to%20be%20Fred%20again%20Anderson%20.Paak"],
    ["fifa-fc", "Justice & Tame Impala", "Neverender", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "Neverender%20Justice%20Tame%20Impala"],
    ["fifa-fc", "Glass Animals", "A Tear in Space (Airlock)", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "A%20Tear%20in%20Space%20Airlock%20Glass%20Animals"],
    ["fifa-fc", "Ice Spice & Central Cee", "Did It First", "OST EA Sports FC 25", URL_SPOTIFY_SEARCH + "Did%20It%20First%20Ice%20Spice%20Central%20Cee"],
    ["fifa-fc", "CA7RIEL & Paco Amoroso", "IMPOSTOR", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "IMPOSTOR%20CA7RIEL%20Paco%20Amoroso"],
    ["fifa-fc", "Fred again.. feat. Skepta & PlaqueBoyMax", "Victory Lap", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "Victory%20Lap%20Fred%20again%20Skepta"],
    ["fifa-fc", "JENNIE", "like JENNIE", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "like%20JENNIE%20JENNIE"],
    ["fifa-fc", "Dominic Fike", "upset & aggressive", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "upset%20%26%20aggressive%20Dominic%20Fike"],
    ["fifa-fc", "PinkPantheress", "Girl Like Me", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "Girl%20Like%20Me%20PinkPantheress"],
    ["fifa-fc", "Djo", "Back On You", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "Back%20On%20You%20Djo"],
    ["fifa-fc", "Young Miko", "Wassup", "OST EA Sports FC 26", URL_SPOTIFY_SEARCH + "Wassup%20Young%20Miko"],
    ["fifa-fc", "Interpol", "See Out Loud", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "See%20Out%20Loud%20Interpol"],
    ["fifa-fc", "Cage the Elephant", "Dying in Reverse", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "Dying%20in%20Reverse%20Cage%20the%20Elephant"],
    ["fifa-fc", "Joji", "Last of a Dying Breed", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "Last%20of%20a%20Dying%20Breed%20Joji"],
    ["fifa-fc", "CA7RIEL & Paco Amoroso", "Muero", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "Muero%20CA7RIEL%20Paco%20Amoroso"],
    ["fifa-fc", "Cazzu", "Dolce", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "Dolce%20Cazzu"],
    ["fifa-fc", "Chase & Status feat. Little Simz", "Carnage", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "Carnage%20Chase%20%26%20Status%20Little%20Simz"],
    ["fifa-fc", "Dahi feat. Kendrick Lamar & Amber Mark", "How to Pray", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "How%20to%20Pray%20Dahi%20Kendrick%20Lamar"],
    ["fifa-fc", "Barry Can't Swim", "Dance Dance Dance", "OST EA Sports FC 27", URL_SPOTIFY_SEARCH + "Dance%20Dance%20Dance%20Barry%20Can%27t%20Swim"],

    ["seleccion-top", "$uicideboy$", "Antarctica / Paris / Kill Yourself (Part III)", "Dark Trap / Underground Hip-Hop", URL_SPOTIFY_SEARCH + "Antarctica%20%24uicideboy%24"],
    ["seleccion-top", "Afaz Natural", "Quizás / Vuelo / Así Soy Yo", "Rap / Reggae Consciente", URL_SPOTIFY_SEARCH + "Quiz%C3%A1s%20Afaz%20Natural"],
    ["seleccion-top", "Swaggerboyz", "Antología Trap Alternativo", "Trap / Urbano Alternativo", URL_SPOTIFY_SEARCH + "Swaggerboyz"],
    ["seleccion-top", "Alcolirykoz", "Servicios Ambulatorios / Tararea / La Típica", "Rap Colombiano / Boom Bap", URL_SPOTIFY_SEARCH + "Servicios%20Ambulatorios%20Alcolirykoz"],
    ["seleccion-top", "Milo J", "111 / En Dormir Sin Madrid / Rara Vez", "Urbano / Alternativo", URL_SPOTIFY_SEARCH + "111%20Milo%20J"],
    ["seleccion-top", "Kendrick Lamar", "good kid, m.A.A.d city / To Pimp a Butterfly / DAMN.", "Hip-Hop / West Coast Rap", URL_SPOTIFY_SEARCH + "good%20kid%20m.A.A.d%20city%20Kendrick%20Lamar"],
    ["seleccion-top", "Das EFX", "Dead Serious (They Want EFX)", "90s East Coast Hip-Hop", URL_SPOTIFY_SEARCH + "They%20Want%20EFX%20Das%20EFX"],
    ["seleccion-top", "Limp Bizkit", "Chocolate Starfish / Significant Other (Break Stuff)", "Nu Metal / Rap Rock", URL_SPOTIFY_SEARCH + "Break%20Stuff%20Limp%20Bizkit"],
    ["seleccion-top", "Nujabes", "Modal Soul / Metaphorical Music (Feather, Luv(sic))", "Lo-Fi Hip-Hop / Jazz Hop", URL_SPOTIFY_SEARCH + "Feather%20Nujabes"],
    ["seleccion-top", "Héctor Lavoe", "El Cantante / Periódico de Ayer / Juanito Alimaña", "Salsa Clásica / Fania", URL_SPOTIFY_SEARCH + "El%20Cantante%20H%C3%A9ctor%20Lavoe"],
    ["seleccion-top", "Julio Jaramillo", "Nuestro Juramento / Ódiame / Fatalidad", "Bolero / Pasillo Clásico", URL_SPOTIFY_SEARCH + "Nuestro%20Juramento%20Julio%20Jaramillo"],
    ["seleccion-top", "Silvio Rodríguez", "Ojalá / Unicornio / Óleo de una Mujer con Sombrero", "Nueva Trova / Cantautor", URL_SPOTIFY_SEARCH + "Ojal%C3%A1%20Silvio%20Rodr%C3%ADguez"],
    ["seleccion-top", "Mora", "Microdosis / Paraíso / Estrella", "Urbano Contemporáneo", URL_SPOTIFY_SEARCH + "Microdosis%20Mora"]
];

const HEROES_DATA = [
    {
        nombre: "Spider-Man",
        identidad: "Peter Parker",
        editorial: "Marvel Comics",
        rol: "Héroe Callejero / Asombroso",
        categoria: "marvel callejeros",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/620-spider-man.jpg"
    },
    {
        nombre: "Ghost Rider",
        identidad: "Johnny Blaze",
        editorial: "Marvel Comics",
        rol: "Espíritu de la Venganza",
        categoria: "marvel antiheroes",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/280-ghost-rider.jpg"
    },
    {
        nombre: "Robin",
        identidad: "Dick Grayson / Damian Wayne",
        editorial: "DC Comics",
        rol: "El Joven Maravilla de Gotham",
        categoria: "dc callejeros",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/561-robin.jpg"
    },
    {
        nombre: "Nightwing",
        identidad: "Dick Grayson",
        editorial: "DC Comics",
        rol: "Protector de Blüdhaven & Gotham",
        categoria: "dc callejeros",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/491-nightwing.jpg"
    },
    {
        nombre: "Red Hood",
        identidad: "Jason Todd",
        editorial: "DC Comics",
        rol: "Antihéroe Letal de Gotham",
        categoria: "dc antiheroes callejeros",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/546-red-hood.jpg"
    },
    {
        nombre: "Daredevil",
        identidad: "Matt Murdock",
        editorial: "Marvel Comics",
        rol: "El Hombre Sin Miedo (Hell's Kitchen)",
        categoria: "marvel callejeros",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/201-daredevil.jpg"
    },
    {
        nombre: "Miles Morales",
        identidad: "Spider-Man (Brooklyn)",
        editorial: "Marvel Comics",
        rol: "Venom Blast & Camuflaje Arácnido",
        categoria: "marvel callejeros",
        img: PROTOCOLO_WEB + "upload.wikimedia.org/wikipedia/en/8/8e/Spider-Man_%28Miles_Morales%29_character_art.png"
    },
    {
        nombre: "Venom",
        identidad: "Eddie Brock",
        editorial: "Marvel Comics",
        rol: "Protector Letal Simbionte",
        categoria: "marvel antiheroes",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/687-venom.jpg"
    },
    {
        nombre: "Deadpool",
        identidad: "Wade Wilson",
        editorial: "Marvel Comics",
        rol: "El Mercenario Bocazas",
        categoria: "marvel antiheroes",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/213-deadpool.jpg"
    },
    {
        nombre: "Rocket Raccoon",
        identidad: "Sujeto 89P13",
        editorial: "Marvel Comics",
        rol: "Estratega y Artillero Galáctico",
        categoria: "marvel antiheroes",
        img: PROTOCOLO_WEB + "cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/566-rocket-raccoon.jpg"
    }
];

const PELICULAS_DATA = [
    ["Midsommar: El Terror No Espera la Noche", "A24 / Ari Aster", 2019, "terror"],
    ["Coraline y la Puerta Secreta", "Laika / Henry Selick", 2009, "animadas terror fantasia"],
    ["Interstellar (Interestelar)", "Christopher Nolan", 2014, "scifi"],
    ["El Señor de los Anillos: La Comunidad del Anillo", "Trilogía El Señor de los Anillos (#1)", 2001, "fantasia sagas"],
    ["El Señor de los Anillos: Las Dos Torres", "Trilogía El Señor de los Anillos (#2)", 2002, "fantasia sagas"],
    ["El Señor de los Anillos: El Retorno del Rey", "Trilogía El Señor de los Anillos (#3)", 2003, "fantasia sagas"],
    ["Harry Potter y la Piedra Filosofal", "Saga Harry Potter (#1)", 2001, "fantasia sagas"],
    ["Harry Potter y la Cámara Secreta", "Saga Harry Potter (#2)", 2002, "fantasia sagas"],
    ["Harry Potter y el Prisionero de Azkaban", "Saga Harry Potter (#3)", 2004, "fantasia sagas"],
    ["Harry Potter y el Cáliz de Fuego", "Saga Harry Potter (#4)", 2005, "fantasia sagas"],
    ["Harry Potter y la Orden del Fénix", "Saga Harry Potter (#5)", 2007, "fantasia sagas"],
    ["Harry Potter y el Misterio del Príncipe", "Saga Harry Potter (#6)", 2009, "fantasia sagas"],
    ["Harry Potter y las Reliquias de la Muerte: Parte 1", "Saga Harry Potter (#7)", 2010, "fantasia sagas"],
    ["Harry Potter y las Reliquias de la Muerte: Parte 2", "Saga Harry Potter (#8)", 2011, "fantasia sagas"],
    ["Star Wars: Episodio I - La Amenaza Fantasma", "Saga Star Wars (Precuelas)", 1999, "scifi sagas"],
    ["Star Wars: Episodio II - El Ataque de los Clones", "Saga Star Wars (Precuelas)", 2002, "scifi sagas"],
    ["Star Wars: Episodio III - La Venganza de los Sith", "Saga Star Wars (Precuelas)", 2005, "scifi sagas"],
    ["Rogue One: Una Historia de Star Wars", "Saga Star Wars (Spin-off)", 2016, "scifi sagas"],
    ["Han Solo: Una Historia de Star Wars", "Saga Star Wars (Spin-off)", 2018, "scifi sagas"],
    ["Star Wars: Episodio IV - Una Nueva Esperanza", "Saga Star Wars (Trilogía Original)", 1977, "scifi sagas"],
    ["Star Wars: Episodio V - El Imperio Contraataca", "Saga Star Wars (Trilogía Original)", 1980, "scifi sagas"],
    ["Star Wars: Episodio VI - El Retorno del Jedi", "Saga Star Wars (Trilogía Original)", 1983, "scifi sagas"],
    ["Star Wars: Episodio VII - El Despertar de la Fuerza", "Saga Star Wars (Secuelas)", 2015, "scifi sagas"],
    ["Star Wars: Episodio VIII - Los Últimos Jedi", "Saga Star Wars (Secuelas)", 2017, "scifi sagas"],
    ["Star Wars: Episodio IX - El Ascenso de Skywalker", "Saga Star Wars (Secuelas)", 2019, "scifi sagas"],
    ["Spider-Man (El Hombre Araña)", "Trilogía Sam Raimi / Tobey Maguire (#1)", 2002, "heroes sagas accion"],
    ["Spider-Man 2 (El Hombre Araña 2)", "Trilogía Sam Raimi / Tobey Maguire (#2)", 2004, "heroes sagas accion"],
    ["Spider-Man 3 (El Hombre Araña 3)", "Trilogía Sam Raimi / Tobey Maguire (#3)", 2007, "heroes sagas accion"],
    ["The Amazing Spider-Man (El Sorprendente Hombre Araña)", "Saga Andrew Garfield (#1)", 2012, "heroes sagas accion"],
    ["The Amazing Spider-Man 2: La Amenaza de Electro", "Saga Andrew Garfield (#2)", 2014, "heroes sagas accion"],
    ["Spider-Man: Homecoming (De Regreso a Casa)", "Saga MCU / Tom Holland (#1)", 2017, "heroes sagas accion"],
    ["Spider-Man: Far From Home (Lejos de Casa)", "Saga MCU / Tom Holland (#2)", 2019, "heroes sagas accion"],
    ["Spider-Man: No Way Home (Sin Camino a Casa)", "Saga MCU / Tom Holland (#3)", 2021, "heroes sagas accion"],
    ["Spider-Man: Into the Spider-Verse (Un Nuevo Universo)", "Saga Animada Spider-Verse (#1)", 2018, "heroes animadas sagas"],
    ["Spider-Man: Across the Spider-Verse (A Través del Spider-Verso)", "Saga Animada Spider-Verse (#2)", 2023, "heroes animadas sagas"],
    ["El Padrino (The Godfather)", "Trilogía El Padrino (#1)", 1972, "crimen sagas"],
    ["El Padrino: Parte II (The Godfather Part II)", "Trilogía El Padrino (#2)", 1974, "crimen sagas"],
    ["El Padrino: Parte III (The Godfather Part III)", "Trilogía El Padrino (#3)", 1990, "crimen sagas"],
    ["Pulp Fiction (Tiempos Violentos)", "Quentin Tarantino", 1994, "crimen"],
    ["El Club de la Pelea (Fight Club)", "David Fincher", 1999, "crimen"],
    ["Seven: Los 7 Pecados Capitales (Se7en)", "David Fincher", 1995, "crimen terror"],
    ["El Silencio de los Inocentes", "Jonathan Demme", 1991, "crimen terror"],
    ["Dune: Parte Uno", "Saga Dune / Denis Villeneuve (#1)", 2021, "scifi sagas"],
    ["Dune: Parte Dos", "Saga Dune / Denis Villeneuve (#2)", 2024, "scifi sagas"],
    ["Corazón Valiente (Braveheart)", "Mel Gibson", 1995, "accion"],
    ["La Momia (The Mummy)", "Trilogía Brendan Fraser (#1)", 1999, "accion fantasia sagas"],
    ["El Regreso de la Momia (The Mummy Returns)", "Trilogía Brendan Fraser (#2)", 2001, "accion fantasia sagas"],
    ["La Momia: La Tumba del Emperador Dragón", "Trilogía Brendan Fraser (#3)", 2008, "accion fantasia sagas"],
    ["Joker (Guasón)", "Todd Phillips / Joaquin Phoenix", 2019, "crimen heroes"],
    ["Scarface (Caracortada)", "Brian De Palma / Al Pacino", 1983, "crimen"],
    ["Duro de Matar (Die Hard)", "Saga Duro de Matar (#1)", 1988, "accion sagas"],
    ["Duro de Matar 2 (Die Hard 2)", "Saga Duro de Matar (#2)", 1990, "accion sagas"],
    ["Duro de Matar 3: La Venganza", "Saga Duro de Matar (#3)", 1995, "accion sagas"],
    ["Duro de Matar 4.0 (Live Free or Die Hard)", "Saga Duro de Matar (#4)", 2007, "accion sagas"],
    ["Duro de Matar: Un Buen Día para Morir", "Saga Duro de Matar (#5)", 2013, "accion sagas"]
];

const SERIES_DATA = [
    ["Breaking Bad", "Vince Gilligan (5 Temporadas)", 2008, "drama"],
    ["Better Call Saul", "Universo Breaking Bad (6 Temporadas)", 2015, "drama"],
    ["Peaky Blinders", "Steven Knight / Cillian Murphy (6 Temporadas)", 2013, "drama"],
    ["Dark", "Baran bo Odar / Viajes en el Tiempo (3 Temporadas)", 2017, "drama scifi"],
    ["Riverdale", "Misterio & Drama en Riverdale (7 Temporadas)", 2017, "juvenil drama"],
    ["Control Z", "Thriller Juvenil Tecnológico (3 Temporadas)", 2020, "juvenil drama"],
    ["Rick y Morty (Rick and Morty)", "Adult Swim Sci-Fi Multiversal", 2013, "animadas scifi comedia"],
    ["Ben 10 (Serie Clásica)", "Franquicia Ben 10 (#1 - 4 Temporadas)", 2005, "animadas scifi"],
    ["Ben 10: Fuerza Alienígena (Alien Force)", "Franquicia Ben 10 (#2 - 3 Temporadas)", 2008, "animadas scifi"],
    ["Ben 10: Supremacía Alienígena (Ultimate Alien)", "Franquicia Ben 10 (#3 - 3 Temporadas)", 2010, "animadas scifi"],
    ["Ben 10: Omniverse", "Franquicia Ben 10 (#4 - 8 Temporadas)", 2012, "animadas scifi"],
    ["Arcane: League of Legends", "Fortiche / Piltover & Zaun (2 Temporadas)", 2021, "animadas drama scifi"],
    ["Seinfeld", "Larry David & Jerry Seinfeld (9 Temporadas)", 1989, "comedia"],
    ["BoJack Horseman", "Raphael Bob-Waksberg (6 Temporadas)", 2014, "animadas drama comedia"],
    ["South Park", "Trey Parker & Matt Stone (Sátira Animada)", 1997, "animadas comedia"],
    ["La Familia del Barrio", "Comedia Animada Mexicana (MTV)", 2013, "animadas comedia"],
    ["Invincible (Invencible)", "Robert Kirkman / Prime Video", 2021, "animadas drama scifi"],
    ["Un Show Más (Regular Show)", "J.G. Quintel / Mordecai & Rigby", 2010, "animadas comedia"],
    ["Hora de Aventura (Adventure Time)", "Pendleton Ward / Finn & Jake", 2010, "animadas comedia"]
];

const ANIMES_DATA = [
    ["Naruto", "Naruto Shippuden Universe", 2002, "shonen"],
    ["Naruto Shippuden", "Secuela Masashi Kishimoto / Studio Pierrot", 2007, "shonen"],
    ["Gachiakuta", "Kei Urana / Bones Inc", 2025, "shonen"],
    ["Dragon Ball", "Akira Toriyama / Toei Animation", 1986, "shonen retro"],
    ["Dragon Ball Z", "Sagas Saiyajin, Freezer, Cell y Buu", 1989, "shonen retro"],
    ["Dragon Ball GT", "Saga de las Esferas del Dragon y Baby", 1996, "shonen retro"],
    ["Dragon Ball Super", "Torneo de la Fuerza y Dioses de la Destruccion", 2015, "shonen"],
    ["Dragon Ball Daima", "Ultima obra canonica de Akira Toriyama", 2024, "shonen"],
    ["Tokyo Revengers", "Viajes temporales y pandillas de Tokyo", 2021, "shonen"],
    ["Neon Genesis Evangelion", "Shin Seiki Evangerion - Hideaki Anno / Gainax", 1995, "seinen retro"],
    ["Monster", "Naoki Urasawa / Dr. Tenma y Johan Liebert", 2004, "seinen"],
    ["Serial Experiments Lain", "Cyberpunk filosofico, redes y conciencia", 1998, "seinen retro"],
    ["Ataque a los Titanes (Attack on Titan)", "Shingeki no Kyojin - Hajime Isayama / MAPPA", 2013, "shonen seinen"],
    ["Kuroko no Basket", "Generacion Milagrosa y Seirin High", 2012, "deportes"],
    ["Cowboy Bebop", "Shinichiro Watanabe / Bebop Jazz Espacial", 1998, "seinen retro"],
    ["Steins;Gate", "Lineas temporales, CERN y Kurisu Makise", 2011, "seinen"],
    ["Espíritu de Lucha", "Hajime no Ippo - Boxeo y George Morikawa", 2000, "deportes retro"],
    ["Demon Slayer: Guardianes de la Noche", "Kimetsu no Yaiba - Ufotable", 2019, "shonen"],
    ["Haikyuu!! ¡Los Ases del Vóley!", "Karasuno High School Volleyball", 2014, "deportes"],
    ["My Hero Academia", "Boku no Hero Academia - Kohei Horikoshi", 2016, "shonen"],
    ["Slam Dunk", "Takehiko Inoue / Shohoku Basketball", 1993, "deportes retro"],
    ["Supercampeones (Capitán Tsubasa)", "Oliver Atom / Yoichi Takahashi", 1983, "deportes retro"],
    ["Pokémon (Viajes en Kanto, Johto y Hoenn)", "Ash Ketchum y Pikachu - Temporadas Clasicas", 1997, "shonen retro"],
    ["Tu Mentira en Abril", "Shigatsu wa Kimi no Uso - Naoshi Arakawa", 2014, "drama"],
    ["Inuyasha", "Rumiko Takahashi / Sengoku Jidai", 2000, "shonen retro"],
    ["Los Caballeros del Zodiaco", "Saint Seiya - Masami Kurumada", 1986, "shonen retro"],
    ["Samurai Champloo", "Mugen, Jin y Fuu - Hip-Hop y Katanas", 2004, "seinen"],
    ["Dororo", "Hyakkimaru y Dororo - Osamu Tezuka / MAPPA", 2019, "seinen"],
    ["Given", "Natsuki Kizu / Rock Alternativo y Drama", 2019, "drama"],
    ["Banana Fish", "Ash Lynx y Eiji Okumura - Akimi Yoshida", 2018, "seinen drama"],
    ["Initial D", "Takumi Fujiwara / Toyota AE86 Trueno Touge", 1998, "deportes retro"],
    ["Parasyte: El Maxim", "Kiseiju - Shinichi Izumi y Migi / Madhouse", 2014, "seinen"],
    ["Gurren Lagann", "Tengen Toppa Guren Lagann - Studio Trigger / Gainax", 2007, "shonen"],
    ["Trigun", "Vash la Estampida - Yasuhiro Nightow", 1998, "seinen retro"],
    ["Yu-Gi-Oh! Duelo de Monstruos", "Yugi Muto y el Faraon Atem - Kazuki Takahashi", 2000, "shonen retro"],
    ["Castlevania", "Trevor Belmont, Sypha y Alucard - Powerhouse", 2017, "seinen"],
    ["Vinland Saga", "Thorfinn Karlsefni - Makoto Yukimura / MAPPA", 2019, "seinen"]
];

const LIBROS_DATA = [
    ["El Psicoanalista (Parte 1)", "John Katzenbach", "The Analyst (2002) - Thriller Psicológico", "thriller"],
    ["Jaque al Psicoanalista (El Psicoanalista 2)", "John Katzenbach", "The Analyst II (2018) - Secuela Directa", "thriller"],
    ["El Visitante", "Stephen King", "The Outsider (2018) - Misterio Sobrenatural", "terror thriller king"],
    ["Coraline", "Neil Gaiman", "Coraline (2002) - Fantasía Oscura y Terror", "fantasia terror"],
    ["El Exorcista", "William Peter Blatty", "The Exorcist (1971) - Terror Clásico", "terror"],
    ["El Resplandor", "Stephen King", "The Shining (1977) - Hotel Overlook", "terror king"],
    ["Entrevista con el Vampiro", "Anne Rice", "Interview with the Vampire (1976) - Crónicas Vampíricas", "terror fantasia"],
    ["Guerra Mundial Z", "Max Brooks", "World War Z (2006) - Historia Oral de la Guerra Zombi", "terror thriller"],
    ["La Semilla del Diablo (El Bebé de Rosemary)", "Ira Levin", "Rosemary's Baby (1967) - Terror Ocultista", "terror thriller"],
    ["La Torre Oscura I: El Pistolero", "Stephen King", "The Dark Tower: The Gunslinger (1982) - Roland Deschain", "fantasia king"],
    ["The Keep (La Fortaleza)", "F. Paul Wilson", "The Keep (1981) - Ciclo del Adversario", "terror fantasia"]
];

const JUEGOS_DATA = [
    ["Mobile Legends: Bang Bang", "Móvil Competitivo (5v5 MOBA)", "MOBA competitivo 5v5 de ritmo explosivo: dominio de rotaciones en jungla, línea de oro/experiencia, control de Lord/Tortuga y sinergia de drafts en clasificatorias Míticas.", "moviles"],
    ["Pokémon UNITE", "Móvil / Switch Competitivo (5v5 MOBA)", "MOBA estratégico por equipos en Aeos Island: control de objetivos (Rayquaza / Regieleki), builds de medallas/objetos equipados y coordinación de movimientos UNITE.", "moviles"],
    ["Honor of Kings", "Móvil Competitivo (5v5 eSports)", "El coloso competitivo del MOBA móvil: micro-mecánicas de alta precisión, duelos de línea intensos, control de visión en río y teamfights tácticas de nivel profesional.", "moviles"],
    ["Call of Duty: Mobile", "Móvil Competitivo (FPS / Battle Royale)", "Shooter táctico en primera persona: dominio de modos Igualada (Buscar y Destruir, Punto Caliente, Dominio), control de retroceso, movement avanzado y precisión de francotirador/SMG.", "moviles"],

    ["Crash Bandicoot (1996 / N. Sane Trilogy)", "Saga Crash Bandicoot (#1 - PS1 / PS4)", "El origen plataformero de Naughty Dog en las Islas Wumpa: precisión milimétrica en saltos, cajas de tiempo y duelos contra Ripper Roo y el Dr. Neo Cortex.", "sagas-legendarias crash"],
    ["Crash Bandicoot 2: Cortex Strikes Back", "Saga Crash Bandicoot (#2 - PS1 / PS4)", "Perfección de las mecánicas clásicas con el deslizamiento, niveles de jetpack, osos polares y recolección de cristales y gemas ocultas.", "sagas-legendarias crash"],
    ["Crash Bandicoot 3: Warped", "Saga Crash Bandicoot (#3 - PS1 / PS4)", "Viajes en el tiempo por la máquina Tornatiempo de Uka Uka y Nefarious Tropy: niveles de moto, reliquias de platino y poderes desbloqueables.", "sagas-legendarias crash"],
    ["Crash Team Racing (CTR & Nitro-Fueled)", "Saga Crash Bandicoot (Kart Racing - PS1 / PS4)", "El rey indiscutible del karting técnico: dominio del turbo derrape (Blue Fire / Sacred Fire), atajos imposibles y contrarrelojes contra Oxide.", "sagas-legendarias crash carreras-musica"],
    ["Crash Bash", "Saga Crash Bandicoot (Party - PS1)", "Clásico multijugador de minijuegos competitivos entre Aku Aku y Uka Uka: Crate Crush, Polar Push y batallas de tanques.", "sagas-legendarias crash"],
    ["Crash Bandicoot: The Wrath of Cortex", "Saga Crash Bandicoot (PS2)", "El salto de Crash a PlayStation 2 enfrentando a Crunch Bandicoot y el poder de las cuatro Máscaras Elementales.", "sagas-legendarias crash joyas-ps2-culto"],
    ["Crash Twinsanity", "Saga Crash Bandicoot (PS2)", "Joya de culto en PS2 con humor irreverente, banda sonora a capela de Spiralmouth y alianza caótica entre Crash y el Dr. Neo Cortex.", "sagas-legendarias crash joyas-ps2-culto"],
    ["Crash Tag Team Racing", "Saga Crash Bandicoot (PS2)", "Fusión de plataformas de mundo abierto en el parque de Von Clutch con carreras de karts fusionados (Clashing) y artillería pesada.", "sagas-legendarias crash carreras-musica"],
    ["Crash of the Titans", "Saga Crash Bandicoot (PS2)", "Reinvención beat 'em up en PS2 con el sistema de doma de mutantes gigantes (Jacking), combos acrobáticos y cooperativo dinámico.", "sagas-legendarias crash joyas-ps2-culto"],
    ["Crash: Mind over Mutant", "Saga Crash Bandicoot (PS2)", "Mundo interconectado en la Isla Wumpa con almacenamiento de titanes en el bolsillo, cinemáticas de distintos estilos de animación y combates intensos.", "sagas-legendarias crash joyas-ps2-culto"],
    ["Crash Bandicoot 4: It's About Time", "Saga Crash Bandicoot (PS4)", "Secuela directa de la trilogía original con las cuatro Máscaras Cuánticas, niveles de dificultad extrema y reliquias N. Sanely Perfect.", "sagas-legendarias crash"],

    ["Assassin's Creed (Altair Ibn-La'Ahad)", "Saga Assassin's Creed (#1)", "El nacimiento de la Hermandad en Tierra Santa (Masyaf, Jerusalén, Acre y Damasco): investigación, hoja oculta y el Credo original.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed II (Ezio Auditore)", "Saga Assassin's Creed (#2 - PS4)", "Obra maestra del Renacimiento Italiano en Florencia y Venecia. El despertar de Ezio Auditore da Firenze bajo el lema: Nada es verdad, todo está permitido.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed: Brotherhood (La Hermandad)", "Saga Assassin's Creed (#3 - PS4)", "Ezio como Mentor en Roma contra los Borgia: reclutamiento de asesinos, reconstrucción de la ciudad y sigilo letal.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed: Revelations", "Saga Assassin's Creed (#4 - PS4)", "El cierre emotivo de Ezio Auditore y Altair en Constantinopla: gancho-hoja (Hookblade), bombas tácticas y la biblioteca de Masyaf.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed III Remastered", "Saga Assassin's Creed (#5 - PS4)", "La historia de Ratonhnhaké:ton (Connor) y Haytham Kenway en la Revolución Americana: combate brutal con tomahawk y frontera salvaje.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed IV: Black Flag", "Saga Assassin's Creed (#6 - PS4)", "La edad de oro de la piratería con Edward Kenway y el Jackdaw: batallas navales épicas, abordajes y exploración del Caribe.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Rogue Remastered", "Saga Assassin's Creed (#7 - PS4)", "La perspectiva templaria de Shay Patrick Cormac en el Atlántico Norte con el Morrigan, cazando antiguos hermanos asesinos.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Unity", "Saga Assassin's Creed (#8 - PS4)", "El parkour más fluido y estético de toda la franquicia junto a Arno Dorian en plena Revolución Francesa en París.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Syndicate", "Saga Assassin's Creed (#9 - PS4)", "Los gemelos Jacob y Evie Frye liberando el Londres Victoriano con el gancho lanzacabos, peleas clandestinas y los Rooks.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Origins", "Saga Assassin's Creed (#10 - PS4)", "El origen de Los Ocultos en el Antiguo Egipto con Bayek de Siwa y Aya: transición al Action RPG y un mundo abierto imponente.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Odyssey", "Saga Assassin's Creed (#11 - PS4)", "Odisea épica en la Antigua Grecia durante la Guerra del Peloponeso: batallas navales, mitología griega y la Lanza de Leónidas.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Valhalla", "Saga Assassin's Creed (#12 - PS4)", "La saga vikinga de Eivor del Clan del Cuervo conquistando Inglaterra, incursiones fluviales y incursiones en Asgard.", "sagas-legendarias assassins-creed"],
    ["Assassin's Creed Mirage", "Saga Assassin's Creed (#13 - PS4)", "Retorno a las raíces de sigilo social, parkour denso y asesinatos de caja negra con Basim Ibn Ishaq en la Bagdad del siglo IX.", "sagas-legendarias assassins-creed"],

    ["Resident Evil (HD Remaster)", "Saga Resident Evil (#1 - PS4)", "El terror claustrofóbico de la Mansión Spencer con Chris Redfield y Jill Valentine: gestión de recursos, cámaras fijas y Crimson Heads.", "sagas-legendarias resident-evil"],
    ["Resident Evil 2 (Clásico & Remake)", "Saga Resident Evil (#2 - PS4)", "La noche de pesadilla en la comisaría R.P.D. de Raccoon City con Leon S. Kennedy y Claire Redfield perseguidos por Mr. X y Birkin.", "sagas-legendarias resident-evil"],
    ["Resident Evil 3: Nemesis (Clásico & Remake)", "Saga Resident Evil (#3 - PS4)", "Escape desesperado de Jill Valentine y Carlos Oliveira por las calles en ruinas de Raccoon City bajo el acecho implacable de Nemesis.", "sagas-legendarias resident-evil"],
    ["Resident Evil CODE: Veronica X", "Saga Resident Evil (PS2 / PS4)", "Joya clásica de survival horror en la Isla Rockfort y la Antártida con Claire y Chris Redfield enfrentando a la familia Ashford y Wesker.", "sagas-legendarias resident-evil joyas-ps2-culto"],
    ["Resident Evil Zero (RE0 HD)", "Saga Resident Evil (PS4)", "El incidente del tren Ecliptic Express con Rebecca Chambers y Billy Coen y el sistema de cambio dinámico de compañero (Partner Zapping).", "sagas-legendarias resident-evil"],
    ["Resident Evil 4 (Clásico PS2 & Remake)", "Saga Resident Evil (#4 - PS2 / PS4)", "Revolución histórica de la acción y el survival horror: Leon S. Kennedy rescatando a Ashley contra Los Iluminados, Krauser y el Dr. Salvador.", "sagas-legendarias resident-evil joyas-ps2-culto"],
    ["Resident Evil 5", "Saga Resident Evil (#5 - PS4)", "Acción cooperativa intensa en Kijuju con Chris Redfield y Sheva Alomar culminando en el enfrentamiento definitivo contra Albert Wesker.", "sagas-legendarias resident-evil"],
    ["Resident Evil 6", "Saga Resident Evil (#6 - PS4)", "Cuatro campañas entrelazadas a escala global (Leon, Chris, Jake y Ada Wong) con un sistema de combate físico y esquivas ultra dinámico.", "sagas-legendarias resident-evil"],
    ["Resident Evil 7: Biohazard", "Saga Resident Evil (#7 - PS4)", "Renacimiento del terror puro en primera persona: Ethan Winters atrapado en la plantación de la familia Baker en Luisiana.", "sagas-legendarias resident-evil"],
    ["Resident Evil Village (RE8)", "Saga Resident Evil (#8 - PS4)", "Terror gótico y acción en la aldea europea contra Lady Dimitrescu, Heisenberg, Beneviento, Moreau y Madre Miranda.", "sagas-legendarias resident-evil"],

    ["Kingdom Hearts Final Mix (KH I)", "Saga Kingdom Hearts (#1 - PS4)", "El inicio del viaje de Sora, Donald y Goofy con la Llave Espada buscando a Riku y Kairi a través de mundos inolvidables.", "sagas-legendarias kingdom-hearts"],
    ["Kingdom Hearts Re:Chain of Memories", "Saga Kingdom Hearts (#2 - PS2 / PS4)", "El misterio del Castillo del Olvido y la Organización XIII con un sistema estratégico de combate basado en naipes y estocadas.", "sagas-legendarias kingdom-hearts"],
    ["Kingdom Hearts II Final Mix (KH II)", "Saga Kingdom Hearts (#3 - PS2 / PS4)", "Pináculo del Action RPG: Formas de Fusión (Valor, Sabiduría, Maestra, Final), Roxas, la Organización XIII y la batalla contra Lingering Will.", "sagas-legendarias kingdom-hearts joyas-ps2-culto"],
    ["Kingdom Hearts 358/2 Days", "Saga Kingdom Hearts (#4 - NDS / HD)", "La historia más emotiva de la saga: la amistad entre Roxas, Axel y Xion compartiendo helado de sal marina en la Torre del Reloj.", "sagas-legendarias kingdom-hearts"],
    ["Kingdom Hearts Birth by Sleep Final Mix", "Saga Kingdom Hearts (#5 - PSP / PS4)", "El destino trágico de Terra, Ventus y Aqua diez años antes de Sora, con el sistema de Comandos de Estilo y el Maestro Xehanort.", "sagas-legendarias kingdom-hearts"],
    ["Kingdom Hearts Dream Drop Distance HD (KH 3D)", "Saga Kingdom Hearts (#6 - PS4)", "El Examen del Título de Maestro de Sora y Riku en los Mundos Dormidos con el sistema Flowmotion y los Atrapasueños.", "sagas-legendarias kingdom-hearts"],
    ["Kingdom Hearts III + Re Mind", "Saga Kingdom Hearts (#7 - PS4)", "El clímax de la Saga del Buscador de la Oscuridad en la Necrópolis de las Llaves Espada y los 14 jefes supremos de Datos en Re Mind.", "sagas-legendarias kingdom-hearts"],

    ["Final Fantasy VII (Original & Remake)", "Saga Final Fantasy (PS1 / PS4)", "Cloud Strife, Tifa, Aerith y Sephiroth en Midgar: el sistema de Materias, el combate ATB/híbrido y una de las mejores historias de los videojuegos.", "sagas-legendarias final-fantasy"],
    ["Crisis Core: Final Fantasy VII Reunion", "Saga Final Fantasy (PSP / PS4)", "El honor y legado de Zack Fair como SOLDADO de 1ra Clase y portador original de la Espada Mortal. Un final inolvidable.", "sagas-legendarias final-fantasy"],
    ["Final Fantasy VIII Remastered", "Saga Final Fantasy (PS1 / PS4)", "Squall Leonhart, Rinoa y el sable pistola (Gunblade): sistema de Enlaces (Junction), Guardianes de la Fuerza y el juego de cartas Triple Triad.", "sagas-legendarias final-fantasy"],
    ["Final Fantasy IX", "Saga Final Fantasy (PS1 / PS4)", "Carta de amor al JRPG clásico con Yitán, Vivi, Garnet y Steiner en Gaia: una reflexión profunda sobre la vida, la memoria y la identidad.", "sagas-legendarias final-fantasy"],
    ["Final Fantasy X / X-2 HD Remaster", "Saga Final Fantasy (PS2 / PS4)", "El peregrinaje de Tidus, Yuna y Auron por Spira contra Sinh, el Tablero de Esferas, el Blitzball y el inmortal tema To Zanarkand.", "sagas-legendarias final-fantasy joyas-ps2-culto"],
    ["Final Fantasy XII: The Zodiac Age", "Saga Final Fantasy (PS2 / PS4)", "Intriga política en Ivalice con Balthier, Fran, Ashe y Vaan, destacando el revolucionario sistema táctico de Gambits y Licencias Zodiacales.", "sagas-legendarias final-fantasy joyas-ps2-culto"],
    ["Final Fantasy XV: Royal Edition", "Saga Final Fantasy (PS4)", "El viaje de hermandad de Noctis, Ignis, Gladio y Prompto por Eos a bordo del Regalia con combates de lux e invocaciones colosales.", "sagas-legendarias final-fantasy"],
    ["Final Fantasy XVI", "Saga Final Fantasy (Action RPG)", "Fantasía oscura medieval en Valisthea con Clive Rosfield y el poder devastador de los Eikons (Ifrit, Phoenix, Bahamut y Odin).", "sagas-legendarias final-fantasy"],

    ["God of War (2005 - PS2)", "Saga God of War (#1 - PS2)", "El inicio de la tragedia griega de Kratos, el Fantasma de Esparta: las Espadas del Caos, el Templo de Pandora y el duelo contra Ares.", "sagas-legendarias god-of-war joyas-ps2-culto"],
    ["God of War II (2007 - PS2)", "Saga God of War (#2 - PS2)", "La cumbre técnica de PlayStation 2: la traición de Zeus, la Espada del Olimpo, los Titanes y el combate contra las Hermanas del Destino.", "sagas-legendarias god-of-war joyas-ps2-culto"],
    ["God of War: Chains of Olympus", "Saga God of War (PSP / PS3)", "Precuela de los diez años de servidumbre de Kratos a los dioses del Olimpo, el descenso al Tártaro y el sacrificio junto a su hija Calíope.", "sagas-legendarias god-of-war"],
    ["God of War III Remastered", "Saga God of War (#3 - PS3 / PS4)", "La venganza absoluta de Kratos escalando el Monte Olimpo en un espectáculo brutal contra Poseidón, Hades, Helios, Hércules y Zeus.", "sagas-legendarias god-of-war"],
    ["God of War: Ghost of Sparta", "Saga God of War (PSP / PS3)", "El viaje más personal de Kratos hacia la Atlántida y Esparta para rescatar a su hermano Deimos de las garras de Tánatos.", "sagas-legendarias god-of-war"],
    ["God of War: Ascension", "Saga God of War (PS3)", "El origen de la ruptura del juramento de sangre con Ares y la lucha de Kratos contra las tres Furias (Megera, Tisífone y Alecto).", "sagas-legendarias god-of-war"],
    ["God of War (2018 - Mitología Nórdica)", "Saga God of War (PS4)", "Reinvención magistral en plano secuencia continuo: Kratos y Atreus en Midgard con el Hacha Leviatán, las Espadas del Caos y las Valquirias.", "sagas-legendarias god-of-war"],
    ["God of War Ragnarök", "Saga God of War (PS4 / PS5)", "El desenlace épico por los Nueve Reinos enfrentando a Thor y Odín junto a Atreus, Mimir y Freya, sumando la Lanza Draupnir.", "sagas-legendarias god-of-war"],

    ["Prince of Persia: Las Arenas del Tiempo", "Saga Prince of Persia (#1 - PS2)", "Obra maestra de plataformas acrobáticas en PS2: correr por las paredes, la Daga del Tiempo para rebobinar el destino y los acertijos del palacio.", "sagas-legendarias prince-of-persia joyas-ps2-culto"],
    ["Prince of Persia: El Alma del Guerrero", "Saga Prince of Persia (#2 - PS2)", "Tono oscuro y metalero (Godsmack) en la Isla del Tiempo: el Príncipe huyendo del implacable Dahaka con el sistema de combate Free-Form Fighting.", "sagas-legendarias prince-of-persia joyas-ps2-culto"],
    ["Prince of Persia: Las Dos Coronas", "Saga Prince of Persia (#3 - PS2)", "El cierre perfecto de la trilogía en Babilonia: asesinatos sigilosos (Speed Kills), carreras de cuadrigas y la dualidad con el Príncipe Oscuro.", "sagas-legendarias prince-of-persia joyas-ps2-culto"],
    ["Prince of Persia: Las Arenas Olvidadas", "Saga Prince of Persia (PS3 / PSP)", "Aventura situada entre Las Arenas del Tiempo y El Alma del Guerrero con el poder de congelar cascadas de agua en pleno salto.", "sagas-legendarias prince-of-persia"],
    ["Prince of Persia: The Lost Crown", "Saga Prince of Persia (PS4)", "Metroidvania frenético en el Monte Qaf con Sargon de Los Inmortales: parries milimétricos, poderes temporales y diseño de niveles brillante.", "sagas-legendarias prince-of-persia"],

    ["Silent Hill (1999)", "Saga Silent Hill (#1 - PS1)", "Harry Mason buscando a su hija Cheryl entre la niebla espesa, la radio estática, las sirenas del Otro Mundo y la música industrial de Akira Yamaoka.", "sagas-legendarias silent-hill"],
    ["Silent Hill 2 (PS2 & Remake)", "Saga Silent Hill (#2 - PS2)", "La cumbre del terror psicológico: James Sunderland tras la carta de Mary, enfrentando sus culpas personificadas en Pyramid Head.", "sagas-legendarias silent-hill joyas-ps2-culto"],
    ["Silent Hill 3 (PS2)", "Saga Silent Hill (#3 - PS2)", "Heather Mason atrapada en la pesadilla visceral del culto de Silent Hill: dirección artística perturbadora y el himno You're Not Here.", "sagas-legendarias silent-hill joyas-ps2-culto"],
    ["Silent Hill 4: The Room (PS2)", "Saga Silent Hill (#4 - PS2)", "Terror claustrofóbico en el apartamento 302 de Henry Townshend encadenado desde adentro, los fantasmas inmortales y el ritual de Walter Sullivan.", "sagas-legendarias silent-hill joyas-ps2-culto"],
    ["Silent Hill: Origins (PS2 / PSP)", "Saga Silent Hill (PS2)", "La precuela protagonizada por el camionero Travis Grady, explorando el incendio de Alessa Gillespie y la transición a través de espejos.", "sagas-legendarias silent-hill joyas-ps2-culto"],
    ["Silent Hill: Shattered Memories (PS2)", "Saga Silent Hill (PS2)", "Reimaginación psicológica que analiza las respuestas del jugador en consulta terapéutica para moldear el entorno helado y las pesadillas.", "sagas-legendarias silent-hill joyas-ps2-culto"],

    ["Tekken 3", "Saga Tekken (#3 - PS1)", "Leyenda de la lucha 3D que introdujo a Jin Kazama, Eddy Gordo, Hwoarang y Bryan Fury con fluidez y banda sonora histórica.", "sagas-legendarias lucha-tekken-mk"],
    ["Tekken Tag Tournament", "Saga Tekken (PS2)", "Clásico de lanzamiento en PS2 con combates por parejas (Tag), relevos estratégicos, Tekken Bowl y un plantel de 35 luchadores.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Tekken 4", "Saga Tekken (#4 - PS2)", "Atmósfera más oscura y realista con escenarios con muros, desniveles y el conflicto del Gen del Diablo entre Jin, Kazuya y Heihachi.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Tekken 5", "Saga Tekken (#5 - PS2)", "El mejor Tekken de la era PS2: velocidad competitiva perfecta, personalización de personajes, modo Devil Within y el despertar de Jinpachi Mishima.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Tekken 7 & Tekken 8", "Saga Tekken (PS4 / Next-Gen)", "La era competitiva moderna con Rage Arts, Rage Drives, el sistema agresivo Heat y el desenlace definitivo de la saga Mishima.", "sagas-legendarias lucha-tekken-mk"],
    ["Mortal Kombat: Deadly Alliance", "Saga Mortal Kombat (PS2)", "Revolución en 3D en PS2 donde Shang Tsung y Quan Chi unen fuerzas; introduce tres estilos de artes marciales y arma por luchador.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Mortal Kombat: Deception", "Saga Mortal Kombat (PS2)", "Regreso del Rey Dragón Onaga con trampas mortales en escenario, el modo aventura Konquest de Shujinko, Puzzle Kombat y Chess Kombat.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Mortal Kombat: Shaolin Monks", "Saga Mortal Kombat (PS2 - Beat 'em up)", "Joya absoluta del cooperativo en PS2 con Liu Kang y Kung Lao recorriendo los eventos de MK II con combos aéreos y Fatalities en equipo.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Mortal Kombat: Armageddon", "Saga Mortal Kombat (PS2)", "El apocalipsis de todos los luchadores de la franquicia en la Pirámide de Argus, sumando creación de luchadores y el modo Motor Kombat.", "sagas-legendarias lucha-tekken-mk joyas-ps2-culto"],
    ["Mortal Kombat XL & Mortal Kombat 11 Ultimate", "Saga Mortal Kombat (PS4)", "Combates viscerales en 2.5D con variantes de personaje, X-Rays, Krushing Blows, Fatal Blows y un modo historia cinematográfico.", "sagas-legendarias lucha-tekken-mk"],

    ["Star Wars: The Force Unleashed (El Poder de la Fuerza)", "Cuadro de Honor Star Wars PS2", "La historia de Galen Marek (Starkiller), el aprendiz secreto de Darth Vader: uso desatado de la Fuerza, rayos, agarres y duelos de sables de luz en PS2.", "joyas-ps2-culto sagas-legendarias"],
    ["Star Wars Episodio III: La Venganza de los Sith", "Cuadro de Honor Star Wars PS2", "Uno de los mejores juegos de sables de luz jamás creados en PS2: campaña de Anakin y Obi-Wan, duelos 1v1 competitivos y final alternativo oscuro.", "joyas-ps2-culto sagas-legendarias"],

    ["Ghost of Tsushima: Director's Cut", "Joya de Acción & Sigilo (PS4)", "La leyenda de Jin Sakai, el Fantasma de Tsushima: duelos de katana bajo hojas de arce, posturas de combate, sigilo e Isla Iki.", "joyas-ps2-culto"],
    ["The Last of Us Remastered (Parte 1)", "Joya de Acción & Narrativa (PS4)", "El viaje inolvidable de Joel y Ellie a través de unos Estados Unidos devastados por el Cordyceps: supervivencia cruda, sigilo y emoción pura.", "joyas-ps2-culto"],
    ["The Last of Us Parte II", "Joya de Acción & Supervivencia (PS4)", "Narrativa desgarradora en Seattle sobre el ciclo de la venganza con el gameplay de sigilo, esquiva y combate más visceral de PS4.", "joyas-ps2-culto"],
    ["Bully (Canis Canem Edit)", "Joya de Culto Rockstar (PS2 / PS4)", "Jimmy Hopkins conquistando la Academia Bullworth: clases interactivas, patineta, resortera, peleas entre facciones escolares y humor clásico de Rockstar.", "joyas-ps2-culto"],
    ["Manhunt (Manhunt 1)", "Joya de Culto & Sigilo Oscuro (PS2 / PS4)", "James Earl Cash sobreviviendo a las películas snuff de Lionel Starkweather en Carcer City: sigilo psicológico extremo entre las sombras.", "joyas-ps2-culto"],
    ["Manhunt 2", "Joya de Culto & Thriller Psicológico (PS2)", "Daniel Lamb y Leo Kasper escapando del Proyecto Pickman: thriller psicológico oscuro de Rockstar con ejecuciones ambientales.", "joyas-ps2-culto"],
    ["Rule of Rose", "Joya de Culto Survival Horror (PS2)", "Obra de culto irrepetible en PS2: Jennifer atrapada en un dirigible regido por el cruel Club de los Aristócratas del Crayón Rojo junto a su fiel perro Brown.", "joyas-ps2-culto"],
    ["Nightmare Creatures", "Clásico de Culto & Terror Gótico", "Acción y horror gótico en el Londres de 1834 con Ignatius Blackward y Nadia Franciscus enfrentando monstruos bajo un contador de adrenalina.", "joyas-ps2-culto"],
    ["Marvel's Spider-Man & Miles Morales", "Acción / Mundo Abierto (PS4)", "El mejor balanceo con telarañas por Nueva York, combate acrobático con gadgets y poder bioeléctrico Venom.", "joyas-ps2-culto"],
    ["Elden Ring", "Action RPG / Soulslike (PS4)", "Exploración monumental en las Tierras Intermedias creadas por Hidetaka Miyazaki y George R. R. Martin.", "joyas-ps2-culto"],

    ["FlatOut 2", "Arcade & Carreras Clásicas (PS2 / PC)", "El rey de las carreras de destrucción en PS2 con física de escombros en tiempo real, minijuegos de acrobacias y un soundtrack de rock/punk legendario.", "carreras-musica joyas-ps2-culto"],
    ["Guitar Hero III: Legends of Rock", "Arcade & Música Clásica (PS2 / PS3)", "Batallas de guitarra contra Slash, Tom Morello y Lou en el Infierno tocando clásicos desde Slow Ride y Knights of Cydonia hasta Through the Fire and Flames.", "carreras-musica joyas-ps2-culto"],
    ["Need for Speed: Carbon", "Arcade & Carreras Nocturnas (PS2 / PC)", "Carreras ilegales nocturnas conquistando territorios en Palmont City, sistema Autosculpt de tuning y duelos al límite en el Cañón contra Darius.", "carreras-musica joyas-ps2-culto"],
    ["DiRT (Colin McRae: DiRT)", "Saga DiRT (#1 - Rally)", "Evolución del rally clásico con etapas todoterreno de alta velocidad, daños mecánicos realistas y escalada a Pikes Peak.", "carreras-musica"],
    ["DiRT 2 (Colin McRae: DiRT 2)", "Saga DiRT (#2 - Rally & Off-Road)", "Gira mundial de rally, Trailblazer y Rallycross con físicas de derrape en tierra/barro sublimes y una banda sonora alternativa brutal.", "carreras-musica"],
    ["DiRT 3 Complete Edition", "Saga DiRT (#3 - Rally & Gymkhana)", "Equilibrio perfecto entre etapas de rally puras bajo nieve/lluvia en Finlandia, Kenia y Montecarlo y el espectáculo técnico de Gymkhana.", "carreras-musica"],
    ["DiRT Rally 2.0 & DiRT 5", "Saga DiRT (#4 - PS4)", "La combinación definitiva entre la simulación exigente de tramos de rally con copiloto y el arcade frenético de nueva generación.", "carreras-musica"],
    ["Ben 10: Protector of Earth", "Saga Ben 10 (#1 - PS2)", "El clásico beat 'em up de PS2 donde Ben recupera el ADN del Omnitrix combinando combos de Cuatro Brazos, Fuego, XLR8, Cannonbolt y Wildvine.", "carreras-musica joyas-ps2-culto"],
    ["Ben 10: Alien Force (The Game)", "Saga Ben 10 (#2 - PS2)", "Aventura de acción en PS2 junto a Gwen y Kevin 11 utilizando a Fuego Pantanoso, Humungosaurio, Jetray, Frío y Piedra contra los Highbreed.", "carreras-musica joyas-ps2-culto"],
    ["Ben 10: Alien Force - Vilgax Attacks", "Saga Ben 10 (#3 - PS2)", "Viaje interplanetario con acceso a las 10 formas alienígenas de Alien Force desde el inicio para detener la invasión de Vilgax.", "carreras-musica joyas-ps2-culto"],
    ["Ben 10: Ultimate Alien - Cosmic Destruction", "Saga Ben 10 (#4 - PS2 / PS3)", "Uso del Superomnitrix y las Formas Supremas (Ultimate Humungousaur, Ultimate Swampfire, Ultimate Echo Echo) alrededor del mundo y contra Muy Grande.", "carreras-musica joyas-ps2-culto"],
    ["Tony Hawk's Pro Skater 3 & EA Sports FC 27", "Skateboarding & Deportes (PS2 / PS4)", "Combos infinitos con Revert y Manual en THPS3 y partidos competitivos en la saga FIFA / EA Sports FC.", "carreras-musica"],

    ["LEGO Star Wars: The Video Game (I)", "Bóveda LEGO (#1 - PS2)", "El juego que inició la fórmula clásica de Traveller's Tales en la Cantina de Dexter cubriendo los Episodios I, II y III con humor mudo y cooperativo.", "universo-lego joyas-ps2-culto"],
    ["LEGO Star Wars II: The Original Trilogy", "Bóveda LEGO (#2 - PS2)", "La Trilogía Original (Episodios IV, V y VI) desde la Cantina de Mos Eisley, construcción de vehículos y creador de personajes personalizados.", "universo-lego joyas-ps2-culto"],
    ["LEGO Star Wars: The Complete Saga", "Bóveda LEGO (#3 - Los 6 Episodios)", "La recopilación definitiva de las seis películas de George Lucas con 36 niveles de historia, ladrillos rojos, minikits y niveles de cazarrecompensas.", "universo-lego"],
    ["LEGO Star Wars III: The Clone Wars", "Bóveda LEGO (#4 - Guerras Clon)", "Batallas terrestres a gran escala con construcción de bases, duelos de sables contra Grievous, Dooku y Ventress y combates espaciales multinivel.", "universo-lego"],
    ["LEGO Star Wars: The Force Awakens", "Bóveda LEGO (#5 - PS4)", "Introduce las Multi-Construcciones (Multi-Builds), batallas de blásters tras coberturas y niveles de vuelo con el Halcón Milenario.", "universo-lego"],
    ["LEGO Star Wars: The Skywalker Saga", "Bóveda LEGO (#6 - PS4)", "Los 9 episodios reinventados desde cero con cámara al hombro, combos de sables de luz, 23 planetas abiertos y más de 380 personajes.", "universo-lego"],
    ["LEGO Indiana Jones: The Original Adventures (1)", "Bóveda LEGO (#7 - PS2)", "Recorre En Busca del Arca Perdida, El Templo Maldito y La Última Cruzada desde la Universidad Barnett usando el látigo de Indy y resolviendo templos.", "universo-lego joyas-ps2-culto"],
    ["LEGO Indiana Jones 2: The Adventure Continues", "Bóveda LEGO (#8)", "Cajas de mundo abierto por película, El Reino de la Calavera de Cristal y un creador de niveles completo con bloques LEGO.", "universo-lego"],
    ["LEGO Batman: The Videogame (1)", "Bóveda LEGO (#9 - PS2)", "Joya oscura en Gotham con 15 niveles como Batman y Robin desde la Batcueva y 15 niveles desde el Asilo Arkham jugando con los villanos (Joker, Riddler, Penguin).", "universo-lego joyas-ps2-culto"],
    ["LEGO Batman 2: DC Super Heroes", "Bóveda LEGO (#10)", "Revolución histórica: el primer juego de LEGO con mundo abierto en Gotham City, voces de diálogo y la llegada de Superman y la Liga de la Justicia.", "universo-lego"],
    ["LEGO Batman 3: Beyond Gotham", "Bóveda LEGO (#11 - PS4)", "Batman y la Liga de la Justicia viajan al espacio exterior y a los mundos de los Cuerpos de Linternas para frenar a Brainiac con trajes modulares.", "universo-lego"],
    ["LEGO DC Super-Villains", "Bóveda LEGO (#12 - PS4)", "Crea tu propio supervillano personalizado junto al Joker, Harley Quinn, Lex Luthor y Deathstroke para salvar la Tierra del Sindicato del Crimen.", "universo-lego"],
    ["LEGO Batman: Legacy of the Dark Knight (Último Batman)", "Bóveda LEGO (#13 - Cierre de la Saga)", "El homenaje definitivo al Caballero de la Noche en formato LEGO: evolución de todos los Batitrajes, Batmóviles históricos y galería completa de villanos de Gotham.", "universo-lego"],
    ["LEGO Harry Potter: Años 1-4 (Years 1-4)", "Bóveda LEGO (#14 - PS4)", "Explora el Castillo de Hogwarts y el Callejón Diagon aprendiendo hechizos (Wingardium Leviosa, Expecto Patronum), pociones y duelos mágicos.", "universo-lego"],
    ["LEGO Harry Potter: Años 5-7 (Years 5-7)", "Bóveda LEGO (#15 - PS4)", "El desenlace oscuro contra Lord Voldemort y los Mortífagos, la Orden del Fénix, los Horrocruxes y la Batalla de Hogwarts.", "universo-lego"],
    ["LEGO Pirates of the Caribbean: The Video Game", "Bóveda LEGO (#16)", "Las aventuras del Capitán Jack Sparrow, Will Turner, Barbossa y Davy Jones desde Port Royal en el Perla Negra y el Holandés Errante.", "universo-lego"],
    ["LEGO The Lord of the Rings (El Señor de los Anillos)", "Bóveda LEGO (#17)", "La Tierra Media completa desde La Comarca hasta el Monte del Destino en Mordor con las voces y la banda sonora original de Howard Shore.", "universo-lego"],
    ["LEGO The Hobbit", "Bóveda LEGO (#18 - PS4)", "El viaje de Bilbo Bolsón, Thorin Escudo de Roble y Gandalf hacia Erebor contra Smaug, con sistema de recolección de piezas de construcción (Loot).", "universo-lego"],
    ["LEGO Marvel Super Heroes", "Bóveda LEGO (#19 - PS4)", "Manhattan abierta desde el Helitransporte de S.H.I.E.L.D. reuniendo a los Vengadores, X-Men, Spider-Man y los 4 Fantásticos contra Loki y Galactus.", "universo-lego"],
    ["LEGO Marvel's Avengers", "Bóveda LEGO (#20 - PS4)", "Recreación del Universo Cinematográfico de Marvel con ataques combinados en pareja, la armadura Hulkbuster y múltiples ubicaciones abiertas.", "universo-lego"],
    ["LEGO Marvel Super Heroes 2", "Bóveda LEGO (#21 - PS4)", "Kang el Conquistador fusiona épocas y realidades en Chronopolis: Spider-Man 2099, Guardianes de la Galaxia, Inhumanos y Caballeros Medievales.", "universo-lego"],
    ["LEGO Jurassic World", "Bóveda LEGO (#22 - PS4)", "Las cuatro películas de Parque Jurásico y Jurassic World en las Islas Nublar y Sorna, permitiendo controlar y personalizar dinosaurios de LEGO.", "universo-lego"],
    ["LEGO City Undercover", "Bóveda LEGO (#23 - PS4)", "El policía encubierto Chase McCain en un gigantesco mundo abierto estilo sandbox policial con disfraces, parkour, vehículos y humor brillante.", "universo-lego"]
];

function usarRespaldoPokemon(imgElement) {
    if (!imgElement) return;
    const urlRespaldo = imgElement.dataset.respaldoSrc || (URL_POKEAPI_EMERALD + "212.png");
    const etiquetaRespaldo = imgElement.dataset.respaldoTexto || "Respaldo: Scizor #212";
    if (imgElement.src !== urlRespaldo) {
        imgElement.src = urlRespaldo;
    }
    imgElement.classList.remove("es-portada-real");
    imgElement.classList.add("es-sprite-respaldo");
    const subtitulo = imgElement.closest(".card-playlist")?.querySelector(".subtitulo-portada");
    if (subtitulo) {
        subtitulo.textContent = etiquetaRespaldo;
    }
}

function guardarCachePortadas() {
    try {
        localStorage.setItem(CLAVE_CACHE_PORTADAS, JSON.stringify(PORTADAS_SPOTIFY_OFICIALES));
        localStorage.setItem(CLAVE_CACHE_TITULOS, JSON.stringify(TITULOS_SPOTIFY_OFICIALES));
    } catch (err) {
    }
}

function aplicarPortadaRealEnDom(imgElement, urlMiniatura, tituloOficial) {
    if (!imgElement) return;
    const card = imgElement.closest(".card-playlist");
    if (urlMiniatura) {
        imgElement.src = urlMiniatura;
        imgElement.classList.remove("es-sprite-respaldo");
        imgElement.classList.add("es-portada-real");
        const subtitulo = card?.querySelector(".subtitulo-portada");
        if (subtitulo) {
            subtitulo.textContent = "Portada Oficial Spotify";
        }
    }
    if (tituloOficial && tituloOficial.trim().length > 0) {
        const tituloEl = card?.querySelector(".titulo-playlist");
        if (tituloEl) {
            tituloEl.textContent = tituloOficial;
            tituloEl.title = tituloOficial;
        }
        imgElement.alt = tituloOficial;
    }
}

function solicitarPortadaOembed(imgElement) {
    if (!imgElement || imgElement.dataset.cargado === "true") {
        return Promise.resolve();
    }
    imgElement.dataset.cargado = "true";
    const urlLimpia = imgElement.dataset.spotifyUrl;
    if (!urlLimpia) {
        return Promise.resolve();
    }
    return fetch(URL_SPOTIFY_OEMBED + encodeURIComponent(urlLimpia))
        .then((res) => {
            if (!res.ok) {
                throw new Error("No disponible");
            }
            return res.json();
        })
        .then((datos) => {
            const nuevoTitulo = (datos && datos.title) ? datos.title : "";
            if (nuevoTitulo) {
                TITULOS_SPOTIFY_OFICIALES[urlLimpia] = nuevoTitulo;
            }
            if (datos && datos.thumbnail_url) {
                PORTADAS_SPOTIFY_OFICIALES[urlLimpia] = datos.thumbnail_url;
                aplicarPortadaRealEnDom(imgElement, datos.thumbnail_url, nuevoTitulo);
                guardarCachePortadas();
            } else if (!PORTADAS_SPOTIFY_OFICIALES[urlLimpia]) {
                usarRespaldoPokemon(imgElement);
            }
        })
        .catch(() => {
            if (!PORTADAS_SPOTIFY_OFICIALES[urlLimpia]) {
                usarRespaldoPokemon(imgElement);
            }
        });
}

function cargarPortadasRealesSpotify() {
    const imagenes = Array.from(document.querySelectorAll(".portada-playlist[data-spotify-url]"));
    if (imagenes.length === 0) return;

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    const img = entrada.target;
                    observador.unobserve(img);
                    solicitarPortadaOembed(img);
                }
            });
        }, {
            root: null,
            rootMargin: "240px"
        });

        imagenes.forEach((img) => {
            if (img.dataset.cargado !== "true") {
                observador.observe(img);
            }
        });
    }

    let indiceActual = 0;
    const concurrencia = 6;

    function procesarSiguiente() {
        if (indiceActual >= imagenes.length) {
            return;
        }
        const imgActual = imagenes[indiceActual++];
        solicitarPortadaOembed(imgActual).finally(() => {
            setTimeout(procesarSiguiente, 35);
        });
    }

    for (let i = 0; i < concurrencia; i++) {
        procesarSiguiente();
    }
}

function renderizarBovedaPlaylists() {
    const contenedor = document.getElementById("contenedorPlaylists");
    if (!contenedor) return;

    let html = "";
    PLAYLISTS_DATA.forEach((item, index) => {
        const categoria = item[0];
        const nombreBase = item[1];
        const urlFija = item[2];
        const poke = index === 0 ? [212, "Scizor"] : SPRITES_GBA_GEN3[index % SPRITES_GBA_GEN3.length];
        const pokeId = poke[0];
        const pokeNombre = poke[1];
        const urlSprite = URL_POKEAPI_EMERALD + pokeId + ".png";
        const textoRespaldo = "Respaldo: " + pokeNombre + " #" + pokeId;
        const urlDestino = linkSpotify(nombreBase, urlFija);
        const urlLimpia = urlDestino.split("?")[0];
        const nombre = TITULOS_SPOTIFY_OFICIALES[urlLimpia] || nombreBase;
        const portadaConocida = PORTADAS_SPOTIFY_OFICIALES[urlLimpia] || "";
        const tienePortadaInicial = portadaConocida.length > 0;
        const srcInicial = tienePortadaInicial ? portadaConocida : urlSprite;
        const claseImagen = tienePortadaInicial ? "portada-playlist es-portada-real" : "portada-playlist es-sprite-respaldo";
        const subtituloInicial = tienePortadaInicial ? "Portada Oficial Spotify" : textoRespaldo;
        const etiquetaVibra = ETIQUETAS_VIBRA[categoria] || categoria;

        html += `
            <div class="item-dom-card card-playlist" data-categoria="${categoria}">
                <div class="d-flex align-items-center justify-content-between gap-3">
                    <div class="d-flex align-items-center gap-3 overflow-hidden">
                        <img
                            src="${srcInicial}"
                            alt="${nombre}"
                            title="${subtituloInicial}"
                            class="${claseImagen}"
                            data-spotify-url="${urlLimpia}"
                            data-respaldo-src="${urlSprite}"
                            data-respaldo-texto="${textoRespaldo}"
                            data-cargado="false"
                            onerror="usarRespaldoPokemon(this)"
                            loading="lazy"
                        >
                        <div class="overflow-hidden">
                            <span class="badge barra-morada text-white badge-compacto mb-1">#${index + 1} | ${etiquetaVibra}</span>
                            <h6 class="mb-0 fw-bold text-truncate titulo-playlist" title="${nombre}">${nombre}</h6>
                            <small class="texto-subtitulo d-block text-truncate subtitulo-portada">${subtituloInicial}</small>
                        </div>
                    </div>
                    <a href="${urlDestino}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-spotify"></i>Abrir
                    </a>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorPlaylists");
    if (contador) {
        contador.textContent = PLAYLISTS_DATA.length + " Playlists";
    }
    cargarPortadasRealesSpotify();
}

function renderizarBovedaCanciones() {
    const contenedor = document.getElementById("contenedorCanciones");
    if (!contenedor) return;

    let html = "";
    CANCIONES_Y_DISCOS.forEach((item) => {
        const categoria = item[0];
        const artista = item[1];
        const titulo = item[2];
        const detalle = item[3];
        const urlFija = item[4];
        const urlDestino = linkSpotify(titulo + " " + artista, urlFija);

        html += `
            <div class="item-dom-card card-cancion card-musica" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-verde text-dark badge-compacto">${detalle}</span>
                    <a href="${urlDestino}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-spotify"></i>Play
                    </a>
                </div>
                <h6 class="mb-1 fw-bold texto-morado">${artista}</h6>
                <p class="mb-0 small">${titulo}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorCanciones");
    if (contador) {
        contador.textContent = CANCIONES_Y_DISCOS.length + " Temas / Álbumes";
    }
}

const DEV_STACK_DATA = [
    ["csharp-net", "C# Orientado a Objetos (POO)", "Clases, Interfaces, Polimorfismo, Herencia y Encapsulamiento", "C# .NET 8", "https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/tutorials/oop"],
    ["csharp-net", "LINQ & Colecciones Genéricas", "Consultas integradas en C# con List<T>, Dictionary y expresiones Lambda", "C# Avanzado", "https://learn.microsoft.com/es-es/dotnet/csharp/linq/"],
    ["csharp-net", "ADO.NET & Conexión SQL Server", "SqlConnection, SqlCommand, SqlDataReader y procedimientos almacenados", "Backend C#", "https://learn.microsoft.com/es-es/dotnet/framework/data/adonet/"],
    ["csharp-net", "Entity Framework Core (ORM)", "Mapeo objeto-relacional, migraciones y DbContext en .NET", "ORM .NET", "https://learn.microsoft.com/es-es/ef/core/"],
    ["csharp-net", "Windows Forms & Sistemas Desktop", "Interfaces gráficas empresariales, eventos, DataGridView y reportes", "Desktop App", "https://learn.microsoft.com/es-es/dotnet/desktop/winforms/"],
    ["csharp-net", "Programación Asíncrona (async / await)", "Manejo de Task<T>, hilos no bloqueantes y concurrencia en C#", "Rendimiento", "https://learn.microsoft.com/es-es/dotnet/csharp/asynchronous-programming/"],
    ["csharp-net", "Arquitectura en N Capas (N-Tier)", "Separación de Capa de Datos, Negocio y Presentación en soluciones .NET", "Arquitectura", "https://github.com/D4V1CH1N"],
    ["csharp-net", "Manejo de Excepciones & Logs", "Bloques try-catch-finally, validaciones robustas y trazabilidad", "Calidad Código", "https://learn.microsoft.com/es-es/dotnet/csharp/fundamentals/exceptions/"],
    ["sql-db", "SQL Server Management (T-SQL)", "Diseño de tablas, Primary Keys, Foreign Keys y restricciones CHECK", "SQL Server", "https://learn.microsoft.com/es-es/sql/t-sql/language-reference"],
    ["sql-db", "Procedimientos Almacenados & Triggers", "Automatización de reglas de negocio, auditoría con INSERTED y DELETED", "T-SQL Pro", "https://learn.microsoft.com/es-es/sql/relational-databases/stored-procedures/stored-procedures-database-engine"],
    ["sql-db", "Consultas Complejas & Joins", "INNER JOIN, LEFT JOIN, subconsultas correlacionadas, GROUP BY y HAVING", "Consultas SQL", "https://www.postgresql.org/docs/current/tutorial-join.html"],
    ["sql-db", "PostgreSQL & pgAdmin 4", "Administración de esquemas relacionales, vistas materializadas y funciones PL/pgSQL", "PostgreSQL", "https://www.postgresql.org/docs/"],
    ["sql-db", "Normalización de Bases de Datos", "Aplicación rigurosa de 1FN, 2FN, 3FN y Forma Normal de Boyce-Codd", "Modelado ER", "https://learn.microsoft.com/es-es/office/troubleshoot/access/database-normalization-description"],
    ["sql-db", "Transacciones ACID & Índices", "BEGIN TRAN, COMMIT, ROLLBACK e índices Clustered / Non-Clustered", "Optimización", "https://learn.microsoft.com/es-es/sql/relational-databases/sql-server-transaction-locking-and-row-versioning-guide"],
    ["sql-db", "Seguridad, Roles & Backups SQL", "Gestión de permisos GRANT/REVOKE y respaldos completos .bak", "DBA Básico", "https://learn.microsoft.com/es-es/sql/relational-databases/backup-restore/back-up-and-restore-of-sql-server-databases"],
    ["python-data", "Python 3: Estructuras & Algoritmos", "List comprehensions, diccionarios, tuplas, sets y generadores", "Python Core", "https://docs.python.org/es/3/tutorial/"],
    ["python-data", "Automatización de Scripts & Archivos", "Lectura/escritura de JSON, CSV, manejo de rutas con os y pathlib", "Scripting", "https://docs.python.org/es/3/library/pathlib.html"],
    ["python-data", "Conexión Python con SQL (pyodbc / psycopg2)", "Integración de scripts Python con motores SQL Server y PostgreSQL", "Data Pipeline", "https://www.psycopg.org/docs/"],
    ["python-data", "Análisis de Datos & Lógica Matemática", "Procesamiento de matrices, estadísticas y resolución de problemas", "Data Science", "https://docs.python.org/es/3/library/statistics.html"],
    ["python-data", "Consumo de APIs REST con Python", "Peticiones HTTP, cabeceras, parseo de JSON y manejo de estados", "APIs & Web", "https://docs.python.org/es/3/library/urllib.request.html"],
    ["web-dom", "Manipulación Nativa del DOM (JS ES6+)", "querySelectorAll, dataset, classList.toggle y renderizado dinámico", "Diseño Web II", "https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model"],
    ["web-dom", "Sistemas de Filtrado Instantáneo", "Filtros por atributo data-categoria con style.display block/none sin recarga", "DOM UPDS", "https://developer.mozilla.org/es/docs/Learn/HTML/Howto/Use_data_attributes"],
    ["web-dom", "Modo Oscuro / Claro Dinámico", "Alternancia de clase dark-mode en body con persistencia y variables visuales", "UI Theme", "https://developer.mozilla.org/es/docs/Web/API/Element/classList"],
    ["web-dom", "Menú Hamburguesa & Animaciones CSS3", "Transiciones cubic-bezier, rotación a X y despliegue en cascada", "CSS3 Avanzado", "https://developer.mozilla.org/es/docs/Web/CSS/CSS_transitions/Using_CSS_transitions"],
    ["web-dom", "Diseño Responsivo Mobile-First", "CSS Grid (auto-fill minmax), Flexbox y sistema de grillas Bootstrap 5.3", "Responsive", "https://getbootstrap.com/docs/5.3/layout/grid/"],
    ["web-dom", "Validación de Formularios & Expresiones Regulares", "Detección anti-gibberish, validación @gmail.com, teléfono por país y fechas", "Validación JS", "https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions"],
    ["web-dom", "Integración API oEmbed Spotify & Lazy Loading", "Extracción asíncrona de miniaturas reales con IntersectionObserver y caché local", "Fetch API", "https://developer.spotify.com/documentation/embeds/tutorials/using-the-oembed-api"],
    ["upds-materias", "Diseño Web II (Ing. Miguel Angel Cruz Ramos)", "Arquitectura modular HTML5, CSS3 y JS con manipulación intensiva del DOM", "UPDS 2026", "https://www.upds.edu.bo/"],
    ["upds-materias", "Base de Datos I y II (Ingeniería en Sistemas)", "Modelado relacional, álgebra relacional, SQL Server y PostgreSQL", "UPDS Sistemas", "https://www.upds.edu.bo/carreras/ingenieria-de-sistemas/"],
    ["upds-materias", "Programación Orientada a Objetos & Estructuras", "Desarrollo de algoritmos, árboles, grafos, pilas, colas y POO en C#", "UPDS Sistemas", "https://github.com/D4V1CH1N"],
    ["upds-materias", "Ingeniería de Software & Análisis de Sistemas", "Levantamiento de requerimientos, diagramas UML, casos de uso y Scrum", "UPDS Sistemas", "https://github.com/D4V1CH1N"],
    ["upds-materias", "Control de Versiones con Git & GitHub", "Repositorios remotos, commits atómicos, ramas y despliegue en GitHub Pages", "Git / GitHub", "https://github.com/D4V1CH1N"]
];

const EDUCAN_DATA = [
    ["rehabilitacion", "Desensibilización Sistemática", "Exposición gradual y controlada al estímulo sin superar el umbral de estrés del perro", "Protocolo Sin Dolor", "https://es.wikipedia.org/wiki/Adiestramiento_canino"],
    ["rehabilitacion", "Contracondicionamiento Positivo", "Cambiar la respuesta emocional de miedo o reactividad por una asociación segura", "Conducta Canina", "https://es.wikipedia.org/wiki/Condicionamiento_cl%C3%A1sico"],
    ["rehabilitacion", "Lectura de Señales de Calma (Turid Rugaas)", "Identificación de bostezo, lamido de trufa, giro de cabeza y olfateo de suelo", "Etología", "https://es.wikipedia.org/wiki/Se%C3%B1ales_de_calma"],
    ["rehabilitacion", "Manejo de Reactividad con Correa", "Uso de arnés en Y, correa larga sin tensión y curvas de distanciamiento en paseo", "Paseo Terapéutico", "https://www.akc.org/expert-advice/training/"],
    ["rehabilitacion", "Prevención de Ansiedad por Separación", "Salidas progresivas, enriquecimiento ambiental y autonomía emocional en casa", "Bienestar", "https://www.akc.org/expert-advice/training/"],
    ["rehabilitacion", "Rehabilitación de Perros con Miedo Urbano", "Adaptación progresiva a ruidos de tráfico, motos y multitudes en La Paz", "Terapia Urbana", "https://es.wikipedia.org/wiki/Etolog%C3%ADa"],
    ["rehabilitacion", "Gestión de Protección de Recursos", "Intercambio positivo y construcción de confianza sin castigos ni intimidación", "Cero Castigo", "https://www.akc.org/expert-advice/training/"],
    ["rehabilitacion", "Socialización Controlada entre Perros", "Presentaciones en paralelo, lectura de colas y pausas de descompresión", "Manada Equilibrada", "https://es.wikipedia.org/wiki/Comportamiento_canino"],
    ["refuerzo-positivo", "Adiestramiento con Clicker / Marcador Verbal", "Precisión milimétrica al premiar la conducta deseada en el instante exacto", "Refuerzo +", "https://es.wikipedia.org/wiki/Adiestramiento_con_clicker"],
    ["refuerzo-positivo", "Llamado Confiable (Recall de Emergencia)", "Acudir al llamado con alegría usando premios de alto valor y juegos", "Seguridad", "https://www.akc.org/expert-advice/training/reliable-recall-train-dogs-to-come-when-called/"],
    ["refuerzo-positivo", "Caminata con Correa Suelta (Loose Leash)", "Caminar en conexión con el guía sin tirones ni collares de ahorque o púas", "Ética Edu-can", "https://www.akc.org/expert-advice/training/"],
    ["refuerzo-positivo", "Juegos de Olfato & LickiMat (Enriquecimiento)", "15 minutos de olfato equivalen a 1 hora de ejercicio físico: reduce el cortisol", "Olfato Canino", "https://www.akc.org/expert-advice/sports/nose-work-for-dogs/"],
    ["refuerzo-positivo", "Autocontrol & Gestión de Impulsos", "Esperar frente al plato, cruzar puertas con calma y saludar sin saltar", "Obediencia Funcional", "https://www.akc.org/expert-advice/training/"],
    ["refuerzo-positivo", "Habituación al Arnés, Cepillado y Veterinario", "Manejo cooperativo (Cooperative Care) para que el perrito disfrute el cuidado", "Cuidado Sin Estrés", "https://www.akc.org/expert-advice/health/"],
    ["razas", "Pastor Alemán & Pastor Belga Malinois", "Alta energía mental, trabajo de olfato, foco y canalización de instinto", "Grupo 1 FCI", "https://www.fci.be/es/nomenclature/"],
    ["razas", "Border Collie & Pastor Australiano", "Perros de pastoreo super inteligentes: requieren retos cognitivos y calma", "Alta Inteligencia", "https://www.fci.be/es/nomenclature/"],
    ["razas", "Golden Retriever & Labrador Retriever", "Sociables y entusiastas: trabajo de autocontrol en saludo y cobro positivo", "Grupo 8 FCI", "https://www.fci.be/es/nomenclature/"],
    ["razas", "Husky Siberiano & Samoyedo", "Independientes y vocales: paseos largos de descompresión y vínculo de confianza", "Nórdicos", "https://www.fci.be/es/nomenclature/"],
    ["razas", "Mestizos / Criollos Rescatados", "Rehabilitación de traumas previos con paciencia infinita, amor y refuerzo positivo", "Adopción & Amor", "https://es.wikipedia.org/wiki/Perro_mestizo"],
    ["razas", "Pitbull, American Bully & Staffordshire", "Desmitificación, socialización ejemplar, juegos de olfato y paseo relajado", "Fuerza Noble", "https://www.akc.org/dog-breeds/"],
    ["razas", "Rottweiler, Boxer & Doberman", "Perros guardianes sensibles a su guía: enfoque en seguridad emocional y calma", "Grupo 2 FCI", "https://www.fci.be/es/nomenclature/"],
    ["razas", "Schnauzer, Beagle, Cocker & Poodle", "Manejo de ladrido por alerta, rastreo olfativo en parques y paseos grupales", "Compañía & Rastro", "https://www.fci.be/es/nomenclature/"],
    ["razas", "Pug, Bulldog Francés, Chihuahua & Shih Tzu", "Razas pequeñas y braquicéfalas: respeto a su espacio personal y ritmo de paseo", "Razas Pequeñas", "https://www.fci.be/es/nomenclature/"],
    ["rutas-lapaz", "Ruta Sopocachi & Plaza Abaroa / España", "Paseos de socialización urbana, habituación a peatones y áreas verdes", "Zona Sopocachi", "https://www.google.com/maps/search/Sopocachi+La+Paz+Bolivia"],
    ["rutas-lapaz", "Ruta Zona Sur (Calacoto, San Miguel, Achumani)", "Caminatas amplias de descompresión, parques seguros y trabajo en manada", "Zona Sur LPZ", "https://www.google.com/maps/search/Zona+Sur+La+Paz+Bolivia"],
    ["rutas-lapaz", "Ruta Miraflores, Parque Urbano & Obrajes", "Entrenamiento de enfoque en entornos dinámicos y recorridos de resistencia", "Miraflores / Obrajes", "https://www.google.com/maps/search/Miraflores+La+Paz+Bolivia"],
    ["rutas-lapaz", "Talleres Grupales Edu-can (Fines de Semana)", "Sesiones prácticas con tutores y sus perros: comunicación, vínculo y cero dolor", "Comunidad Edu-can", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"]
];

const BLACKBOOK_ARTE_DATA = [
    ["poesia-barras", "Verso I: Arquitecto del Caos", "\"Entre líneas de código y asfalto mojado, construyo mi templo donde nadie ha llegado.\"", "Poesía Original", "https://open.spotify.com/user/d4v1ch1n2"],
    ["poesia-barras", "Verso II: Tinta y Madrugada (03:00 AM)", "\"La ciudad duerme mientras el cursor parpadea; mi mente compila lo que el alma desea.\"", "Lírica Nocturna", "https://open.spotify.com/user/d4v1ch1n2"],
    ["poesia-barras", "Verso III: El Credo de Chato", "\"Nada es verdad, todo está permitido; soy dueño del golpe y del tiempo vivido.\"", "Filosofía & Rima", "https://open.spotify.com/playlist/4VrpjOoamcYdvaLVgekjn7"],
    ["poesia-barras", "Verso IV: Sangre, Ladridos y Lealtad", "\"Los perros me enseñaron lo que el humano olvida: que sin causar dolor se sana cualquier herida.\"", "Poesía Real", "https://open.spotify.com/user/d4v1ch1n2"],
    ["poesia-barras", "Verso V: Bajo el Cielo de La Paz", "\"Tres mil seiscientos metros más cerca del trueno, patinando en la cuesta sin pisar el freno.\"", "Urbano LPZ", "https://open.spotify.com/user/d4v1ch1n2"],
    ["poesia-barras", "Composición Musical: Estructura de Canción", "Intro atmosférica, verso de 16 barras, pre-coro melódico, estribillo explosivo y outro", "Composición", "https://open.spotify.com/playlist/356cdaFfhSWpUFP8rfVAzo"],
    ["poesia-barras", "Canto & Interpretación Vocal", "Control de diafragma, voz mixta, falsete melódico (estilo Zoé / TOP) y fraseo rapero", "Técnica Vocal", "https://open.spotify.com/playlist/4uwJD0dL2HY9HM8RMpA5Xu"],
    ["freestyle-metricas", "Métrica Multisilábica & Asonancias", "Encadenamiento de 3 a 4 vocales rimadas por compás manteniendo sentido y punchline", "Técnica Rap", "https://open.spotify.com/playlist/4Rum8fiElouqBKP3PP1SIh"],
    ["freestyle-metricas", "Formato 4x4 & Respuesta al Instante", "Entrenamiento de agilidad mental, ingenio, retruécanos y lectura del entorno", "Freestyle Puro", "https://open.spotify.com/search/Wos%20Freestyle"],
    ["freestyle-metricas", "Doble Tempo & Variación de Flow", "Cambios de subdivisión rítmica (tresillos, síncopas y cajas boombap / trap 808)", "Flow & Ritmo", "https://open.spotify.com/search/Lytos"],
    ["freestyle-metricas", "Storytelling & Concepto Lírico", "Narración cinematográfica en rap (inspirado en Lytos, Crazy Point, Canserbero y Wos)", "Narrativa Rap", "https://open.spotify.com/search/Crazy%20Point"],
    ["graffiti-wildstyle", "Bocetos Wildstyle (Letras Entrelazadas)", "Construcción de flechas, conexiones complejas, barras dinámicas y simetría agresiva", "Wildstyle Pro", "https://es.wikipedia.org/wiki/Grafiti"],
    ["graffiti-wildstyle", "Estilo Throw-Up & Bubble Letters", "Letras bombeadas de trazo rápido con sombra sólida, relleno de dos tonos y brillo", "Bombing / Street", "https://es.wikipedia.org/wiki/Grafiti"],
    ["graffiti-wildstyle", "Caligrafía Urbana: Tagging & Handstyle", "Firma fluida con marcador biselado, control de presión, inclinación y ritmo visual", "Handstyle", "https://es.wikipedia.org/wiki/Caligraf%C3%ADa"],
    ["graffiti-wildstyle", "Efectos 3D, Bloques & Degradados", "Punto de fuga, extrusión tridimensional, powerline neón (verde #00ff9d y morado #a855f7)", "Ilustración Digital", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"],
    ["graffiti-wildstyle", "Diseño de Personajes & Estética Anime/Urbana", "Bocetos en cuaderno y tablet combinando anatomía manga (Gachiakuta / Naruto) con streetwear", "Character Design", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"],
    ["skate-nocturno", "Ollie & Fakie Ollie (Base del Street Skate)", "Pop seco con el tail, arrastre de lija con el pie delantero y nivelación en el aire", "Truco Base", "https://es.wikipedia.org/wiki/Ollie_(skateboard)"],
    ["skate-nocturno", "Kickflip & Heelflip", "Rotación limpia de 360 grados sobre el eje longitudinal de la tabla y recepción en los tornillos", "Flip Tricks", "https://es.wikipedia.org/wiki/Kickflip"],
    ["skate-nocturno", "Pop Shuvit & Frontside / Backside 180", "Giro de tabla de 180 grados bajo los pies y rotación completa de hombros y cadera", "Rotación", "https://es.wikipedia.org/wiki/Skateboarding"],
    ["skate-nocturno", "50-50 Grind, 5-0 & Boardslide", "Deslizamiento de trucks y base de madera sobre bordes, cajones y barandas nocturnas", "Grinds & Slides", "https://es.wikipedia.org/wiki/Skateboarding"],
    ["skate-nocturno", "Manual & Nose Manual", "Equilibrio continuo sobre dos ruedas conectando líneas largas por el asfalto de noche", "Balance & Flow", "https://es.wikipedia.org/wiki/Skateboarding"],
    ["skate-nocturno", "Sesión Nocturna con Audífonos (PS4 THPS3 Vibe)", "Salir a patinar de noche escuchando Gorillaz, Punk-Rock, Nu-Metal y Boom-Bap", "Vibra Nocturna", "https://open.spotify.com/playlist/5NbleL73aT2iC9lTsoW6K1"]
];

const IDIOMAS_DATA = [
    ["frances", "FR: \"Rien n'est vrai, tout est permis.\" | ES: \"Nada es verdad, todo está permitido.\"", "Lema de Ezio Auditore en francés: Nada es verdad, todo está permitido", "Francés Filosófico", "https://www.wordreference.com/fres/permis"],
    ["frances", "FR: \"Je suis développeur de logiciels et dresseur canin.\"", "ES: \"Soy desarrollador de software y adiestrador canino.\" - Presentación profesional", "Francés Profesional", "https://www.wordreference.com/fres/d%C3%A9veloppeur"],
    ["frances", "FR: \"La musique et la poésie sont le langage de l'âme.\"", "ES: \"La música y la poesía son el lenguaje del alma.\" - Expresión artística", "Francés Poético", "https://www.wordreference.com/fres/po%C3%A9sie"],
    ["frances", "FR: \"Travailler dur en silence, laisser le succès faire du bruit.\"", "ES: \"Trabajar duro en silencio, dejar que el éxito haga ruido.\"", "Mentalidad FR", "https://www.wordreference.com/fres/succ%C3%A8s"],
    ["frances", "FR: \"Base de données relationnelle et programmation orientée objet.\"", "ES: \"Base de datos relacional y programación orientada a objetos.\"", "Francés Técnico", "https://www.wordreference.com/fres/donn%C3%A9es"],
    ["frances", "FR: \"Éducation canine bienveillante et renforcement positif.\"", "ES: \"Educación canina respetuosa y refuerzo positivo.\"", "Etología en Francés", "https://www.wordreference.com/fres/bienveillant"],
    ["ingles", "EN: \"Full-Stack Developer & Database Administrator (SQL / C# / Python).\"", "ES: \"Desarrollador Full-Stack y Administrador de Bases de Datos.\" - Perfil Internacional", "English Tech", "https://www.wordreference.com/es/translation.asp?tranword=developer"],
    ["ingles", "EN: \"Force-free dog training and behavioral rehabilitation.\"", "ES: \"Adiestramiento canino libre de fuerza y rehabilitación conductual.\"", "Canine Behavior EN", "https://www.wordreference.com/es/translation.asp?tranword=rehabilitation"],
    ["ingles", "EN: \"Clean code, modular architecture, and native DOM manipulation.\"", "ES: \"Código limpio, arquitectura modular y manipulación nativa del DOM.\"", "Software Engineering", "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"],
    ["ingles", "EN: \"Listening to full album discographies in chronological order.\"", "ES: \"Escuchando discografías completas de álbumes en orden cronológico.\"", "Musicboard EN", "https://open.spotify.com/user/d4v1ch1n2"],
    ["tecnico-dev", "Query Optimization / Optimización de Consultas / Optimisation de requêtes", "Análisis de planes de ejecución (Execution Plans) e índices para respuesta en milisegundos", "Trilingüe SQL", "https://learn.microsoft.com/en-us/sql/relational-databases/performance/query-processing-architecture-guide"],
    ["tecnico-dev", "Asynchronous Event Loop / Bucle de Eventos Asíncrono / Boucle d'événements", "Manejo de promesas, callbacks, Fetch API y concurrencia sin bloquear la interfaz", "Trilingüe JS/C#", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"],
    ["tecnico-dev", "Data Integrity & Foreign Keys / Integridad Referencial / Intégrité des données", "Garantía de consistencia entre tablas maestras y transaccionales en motores SQL", "Trilingüe DB", "https://www.postgresql.org/docs/current/ddl-constraints.html"],
    ["tecnico-dev", "Responsive Layout & Viewport / Diseño Adaptable / Conception réactive", "Adaptación fluida desde pantallas móviles hasta monitores panorámicos", "Trilingüe Frontend", "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design"],
    ["musica-cultura", "FR: \"C'est de la bombe !\" | EN: \"That's fire / dope!\" | ES: \"¡Bomba!\"", "Mi expresión característica adaptada a los tres idiomas en conversaciones reales", "Slang & Identidad", "https://www.wordreference.com/fres/bombe"],
    ["musica-cultura", "EN: \"Underground Hip-Hop, Glitch-Hop, Argentinian Trap & Alternative Rock.\"", "FR: \"Hip-hop underground, rock alternatif et musique électronique.\"", "Géneros Musicales", "https://open.spotify.com/user/d4v1ch1n2"],
    ["musica-cultura", "FR: \"Dessiner des graffitis wildstyle et faire du skate la nuit.\"", "EN: \"Sketching wildstyle graffiti and skateboarding at night.\"", "Cultura Urbana", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"],
    ["musica-cultura", "EN: \"Masterpiece album with zero skips from intro to outro.\"", "FR: \"Chef-d'oeuvre musical sans aucune chanson à passer.\"", "Crítica Musical", "https://open.spotify.com/playlist/3EcShvyD30njVVhPVGM8Bt"]
];

const COLECCION_LEGO_HW_DATA = [
    ["challenger-sueno hot-wheels hw-muscle", "Dodge Challenger SRT Demon '18 - Plum Crazy Purple (Mi Favorito & Auto de Mis Suenos)", "El auto definitivo de mis suenos en su color insigne Plum Crazy Purple (morado Mopar): motor HEMI V8 6.2L Supercharged con 840 HP, Widebody masivo, toma de aire funcional Air-Grabber en el capo, rines negros mate de 20 pulgadas y aceleracion brutal de 0 a 100 km/h en 2.3 segundos. Es mi mayor fascinacion automotriz tanto en miniatura Die-Cast 1:64 como en la vida real.", "AUTO DE MIS SUENOS", "https://es.wikipedia.org/wiki/Dodge_Challenger"],
    ["challenger-sueno hot-wheels hw-muscle", "Hot Wheels '70 Dodge Challenger R/T 426 HEMI - Plum Crazy Purple Classic", "La leyenda clasica del muscle car americano de primera generacion: pintura purpura Mopar original, franjas longitudinales R/T negras, capo shaker y el mitico motor Elephant 426 HEMI V8.", "Muscle Legendario", "https://es.wikipedia.org/wiki/Dodge_Challenger"],
    ["challenger-sueno hot-wheels hw-muscle", "Hot Wheels Super Treasure Hunt (STH): '15 Dodge Challenger SRT", "Edicion de caza suprema para coleccionistas: carroceria en pintura Spectraflame violeta profundo, neumaticos de goma Real Riders con rines deportivos dorados y emblema oculto TH.", "STH Spectraflame", "https://es.wikipedia.org/wiki/Hot_Wheels"],
    ["challenger-sueno hot-wheels hw-muscle", "Hot Wheels RLC Exclusive: '71 Dodge Challenger SRT Hellcat Widebody", "Pieza de ultra coleccion del Red Line Club con apertura funcional de capo, detallado minucioso de motor supercargado, pintura Chameleon Purple y base cromada numerada.", "RLC Edicion Limitada", "https://es.wikipedia.org/wiki/Hot_Wheels"],
    ["challenger-sueno custom-mocs", "Custom 1:64: Dodge Challenger SRT Hellcat 'Plum Crazy' Real Riders Custom", "Personalizacion propia con decapado manual, repintado en tricapa morado perlado, swap a ruedas de goma Real Riders con rines negros de 5 brazos y detallado manual de calaveras traseras.", "Custom Propio 1:64", "https://es.wikipedia.org/wiki/Hot_Wheels"],

    ["lego-potter lego-sets", "LEGO Harry Potter: Castillo de Hogwarts (71043 - 6,020 Piezas)", "Recreacion a microescala colosal del Colegio Hogwarts de Magia y Hechiceria: Gran Comedor con vitrales, Sala Comun de Gryffindor, Camara Secreta, torre de Dumbledore y 4 fundadores.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: Callejon Diagon (75978 - 5,544 Piezas)", "Calle comercial magica modular a escala de minifigura: Ollivanders, Flourish & Blotts, Articulos de Calidad para Quidditch y Sortilegios Weasley con escaparates detallados.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: Banco Magico Gringotts - Edicion Coleccionista (76417)", "Estructura de dos niveles con el banco superior, camaras acorazadas subterraneas en espiral con vias de vagonetas y el dragon Ironbelly ucraniano posable en la cupula.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: Expreso de Hogwarts - Edicion Coleccionista (76405)", "Locomotora a vapor 4-6-0 con tender de carbon, vagon de pasajeros con tres escenas luminosas iluminadas y el mitico Anden 9 y 3/4 de la estacion King's Cross.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: Sombrero Seleccionador Parlante con Sonido Real (76429)", "Modelo interactivo con ladrillo de sonido integrado capaz de reproducir 31 combinaciones de frases en voz alta para asignar al usuario a una de las cuatro casas de Hogwarts.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: Iconos de Hogwarts - Edicion de Coleccionistas (76391)", "Diorama de exhibicion con la lechuza Hedwig a escala real posada sobre libros de texto, carta de aceptacion, pociones magicas, varita de sauco y la Snitch Dorada.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: El Gran Comedor de Hogwarts (76435)", "Set masivo del Gran Comedor con mesas de banquete, chimeneas, velas flotantes, patio exterior y mazmorras secretas con el troll de la montana.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],
    ["lego-potter lego-sets", "LEGO Harry Potter: Torneo de los Tres Magos - El Lago Negro (76420)", "Diorama acuatico de doble nivel con torre en ruinas, arco submarino, minifiguras de Harry, Ron, Hermione y sirena con botes de rescate.", "LEGO Harry Potter", "https://www.lego.com/es-es/themes/harry-potter"],

    ["lego-marvel lego-sets", "LEGO Marvel: Daily Bugle (76178 - 3,772 Piezas & 25 Minifiguras)", "Rascacielos modular de cuatro pisos y 82 cm de altura: redaccion de J. Jonah Jameson, ventana destruida por el Duende Verde y minifiguras de Daredevil, Spider-Man, Punisher y Blade.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: Torre de los Vengadores / Avengers Tower (76269 - 5,201 Piezas)", "El set mas alto de Marvel con 90 cm de altura, 31 minifiguras, laboratorio de Tony Stark, hangar del Quinjet y celda de Loki recreando la Batalla de Nueva York.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: Sanctum Sanctorum de Doctor Strange (76218 - 3 Pisos Modulares)", "Residencia mistica de Doctor Strange en Greenwich Village con biblioteca oculta, camaras dimensionales rotatorias y portales interdimensionales de Gargantos.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: Hulkbuster Edicion Ultron (76210 - Armadura Colosal)", "Meca de combate de mas de 4,000 piezas con articulaciones de alta resistencia, tres reactores Arc luminosos con ladrillos de luz y cabina abatible.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: Guantelete del Infinito de Thanos (76191)", "Replicacion dorada metalica articulada con las seis Gemas del Infinito brillantes, dedos posables para recrear el chasquido y peana de exhibicion negra.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: Escudo del Capitan America (76262 - 3,128 Piezas)", "Emblema circular a tamano real de 47 cm de diametro con estrella central de cinco puntas, anillos concentricos rojo, blanco y azul y soporte de vitrina.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: La Milano de los Guardianes de la Galaxia (76286)", "Nave estelar de Star-Lord con cabina para 4 minifiguras, bodega de carga, compartimento de armas y soporte de vuelo dinamico articulado.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],
    ["lego-marvel lego-sets", "LEGO Marvel: Casco de Iron Man Mark 85 & Mascara de Spider-Man", "Esculturas de coleccionista con piezas curvadas y doradas recreando la armadura nanotecnologica de Tony Stark y la mascara del trepamuros.", "LEGO Marvel", "https://www.lego.com/es-es/themes/marvel"],

    ["lego-dc lego-sets", "LEGO DC Batman: Batmobile 1989 de Tim Burton (76139 - 3,306 Piezas)", "El Batmovil mas iconico del cine: cabina deslizable, dos ametralladoras ocultas activadas por engranajes, turbina de jet trasera y minifigura de Michael Keaton.", "LEGO DC Batman", "https://www.lego.com/es-es/themes/batman"],
    ["lego-dc lego-sets", "LEGO DC Batman: Batwing 1989 (76161 - Escala Gigante de Pared)", "Aeronave gotica con forma del murcielago de 52 cm de envergadura, flap aerodinamico funcional, ametralladoras Gatling y soporte para montaje en pared.", "LEGO DC Batman", "https://www.lego.com/es-es/themes/batman"],
    ["lego-dc lego-sets", "LEGO DC Batman: Batcave Shadow Box (76252 - 3,981 Piezas)", "Baticueva en caja teatral iluminada con silueta troquelada de Batman: computadora central móvil, caja fuerte de armas, plataforma giratoria y Batmovil interior.", "LEGO DC Batman", "https://www.lego.com/es-es/themes/batman"],
    ["lego-dc lego-sets", "LEGO DC Batman: Batmobile Tumbler de The Dark Knight (76240)", "Blindaje militar angular negro mate de la trilogia de Christopher Nolan: suspension delantera independiente, neumaticos traseros dobles y cabina con paneles de control.", "LEGO DC Batman", "https://www.lego.com/es-es/themes/batman"],
    ["lego-dc lego-sets", "LEGO DC Batman: Batmovil de Batman La Serie Animada (BTAS 76274)", "Diseno aerodinamico Art Deco estilizado con silueta alargada, escape de llamas azuladas, cabina abatible y minifigura de Batman de Bruce Timm.", "LEGO DC Batman", "https://www.lego.com/es-es/themes/batman"],
    ["lego-dc lego-sets", "LEGO DC Batman: Asilo Arkham Breakout (10937)", "Fachada gotica de la prision psiquiatrica de Gotham City: celdas de contencion para Joker, Bane, Poison Ivy y Scarecrow con laboratorio y furgon de traslado.", "LEGO DC Batman", "https://www.lego.com/es-es/themes/batman"],

    ["lego-pokemon lego-sets", "Set Pokemon Construccion: Charizard Gigante Articulado", "Figura posable de gran tamano con envergadura alar de 40 cm, cola con efecto de fuego traslucido, cabeza y patas con rotulas de alta friccion para poses de combate.", "Pokemon Construccion", "https://www.wikidex.net/wiki/Charizard"],
    ["lego-pokemon lego-sets", "Set Pokemon Construccion: Pikachu de Exhibicion a Gran Escala", "Escultura de bloques de Pikachu con mas de 800 piezas, cola articulada de rayo, mejillas rojas electricas y peana dinamica con piedras y chispas de luz.", "Pokemon Construccion", "https://www.wikidex.net/wiki/Pikachu"],
    ["lego-pokemon lego-sets", "Set Pokemon Construccion: Gyarados & Magikarp en Cascada Mecanica", "Diorama cinetico con mecanismo de manivela oculta que reproduce el movimiento de natacion ondulante y ascendente de Gyarados saltando sobre la catarata.", "Pokemon Construccion", "https://www.wikidex.net/wiki/Gyarados"],
    ["lego-pokemon lego-sets", "Set Pokemon Construccion: Centro Pokemon de Kanto Modular", "Edificio iconico con techo rojo abovedado, mostrador de sanacion interactivo con Chansey, mostrador de la Enfermera Joy y modulo de computacion de almacenamiento.", "Pokemon Construccion", "https://www.wikidex.net/wiki/Centro_Pok%C3%A9mon"],
    ["lego-pokemon lego-sets", "Set Pokemon Construccion: Batalla Kanto - Venusaur vs Blastoise", "Diorama de duelo elemental de Kanto con la flor gigante de Venusaur, lianas de latigo cepa y los dos canones hidraulicos posables de Blastoise.", "Pokemon Construccion", "https://www.wikidex.net/wiki/Blastoise"],
    ["lego-pokemon lego-sets", "Set Pokemon Construccion: Eevee y Todas sus 8 Evoluciones (Eeveelutions)", "Set completo que reune a Eevee junto a Vaporeon, Jolteon, Flareon, Espeon, Umbreon, Leafeon, Glaceon y Sylveon con poses personalizadas de ataque.", "Pokemon Construccion", "https://www.wikidex.net/wiki/Eevee"],

    ["lego-disney lego-sets", "LEGO Disney: Castillo de Cenicienta (43222 / 71040 - 4,837 Piezas)", "El colosal castillo de Magic Kingdom con torres doradas, salon de baile giratorio, cocina de Blancanieves, habitacion de la Bella Durmiente y fuegos artificiales.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],
    ["lego-disney lego-sets", "LEGO Disney Pixar: La Casa de 'Up' (43217)", "Vivienda clasica victoriana con chimenea, racimo de globos multicolores, muebles interiores de Carl y Ellie, y minifiguras de Carl Fredricksen, Russell y Dug.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],
    ["lego-disney lego-sets", "LEGO Disney: Steamboat Willie (21317 - Clasico Mickey 1928)", "Homenaje monocromatico en blanco y negro al corto animado original de 1928: ruedas de paletas giratorias, chimeneas de vapor oscilantes y grua funcional.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],
    ["lego-disney lego-sets", "LEGO Disney: Tren y Estacion Motorizada Disney (71044)", "Locomotora a vapor motorizada con control Bluetooth por aplicacion movil, tender de carbon, coche de pasajeros y estacion principal con interiores victorianos.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],
    ["lego-disney lego-sets", "LEGO Disney: El Rey Leon - Simba Joven Articulado (43247)", "Modelo de exhibicion de coleccion con cabeza rotatoria, orejas y cola moviles para recrear al futuro rey de las Tierras del Reino sobre roca de la sabana.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],
    ["lego-disney lego-sets", "LEGO Disney: La Cabana de Hocus Pocus - Brujas de Salem (21341)", "Vivienda medieval rustica con molino hidraulico funcional, caldero de humo con ladrillo de luz y las tres hermanas brujas Sanderson con su libro magico.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],
    ["lego-disney lego-sets", "LEGO Disney: Blancanieves y la Cabana de los Siete Enanitos (43242)", "Cabana de cuento de hadas con techo de paja desmontable, mesa de banquete para siete, chimenea luminosa y el pozo de los deseos en el bosque.", "LEGO Disney", "https://www.lego.com/es-es/themes/disney"],

    ["lego-sets", "LEGO Star Wars: Millennium Falcon UCS (75192 - 7,541 Piezas)", "La nave mas legendaria de la galaxia a escala Ultimate Collector Series: paneles superiores removibles, torretas laser cuadruples, cabina para 4 y rampa de acceso.", "LEGO Star Wars", "https://www.lego.com/es-es/themes/star-wars"],
    ["lego-sets", "LEGO Star Wars: Caminante AT-AT Imperial UCS (75313 - 6,785 Piezas)", "Coloso blindado imperial de 62 cm de altura: patas totalmente articuladas, interiores de transporte para 40 soldados de nieve y cuatro motos speeder en su bodega.", "LEGO Star Wars", "https://www.lego.com/es-es/themes/star-wars"],
    ["lego-sets", "LEGO Star Wars: Caza Estelar X-Wing UCS (75355)", "Caza estelar T-65 con mecanismo de apertura de alas en posicion de ataque en X, droide R2-D2 y canones laser en las puntas de las alas con peana informativa.", "LEGO Star Wars", "https://www.lego.com/es-es/themes/star-wars"],
    ["lego-sets", "LEGO El Senor de los Anillos: Rivendell (10316 - 6,167 Piezas)", "Obra maestra arquitectonica con tecnicas SNOT: el Concilio de Elrond bajo el arbol elfico, la forja de Narsil, biblioteca elfica y 15 minifiguras de la Comunidad.", "LEGO Tierra Media", "https://www.lego.com/es-es/themes/lord-of-the-rings"],
    ["lego-sets", "LEGO El Senor de los Anillos: Barad-dur (10333 - 5,471 Piezas)", "La torre fortaleza de Sauron de 83 cm de altura con el Ojo de Sauron iluminado mediante ladrillo de luz, sala del trono, armeria orca y puerta automatizada.", "LEGO Tierra Media", "https://www.lego.com/es-es/themes/lord-of-the-rings"],
    ["lego-sets", "LEGO Icons: Titanic a Escala 1:200 (10294 - 9,090 Piezas)", "Modelo naval titanico de 135 cm de largo dividido en 3 secciones con sala de calderas, gran escalera de primera clase, camarotes, piscinas y 3 helices funcionales.", "LEGO Icons", "https://www.lego.com/es-es/themes/icons"],
    ["lego-sets", "LEGO Icons: Coliseo Romano (10276 - 9,036 Piezas)", "Monumento historico de Roma con tres niveles de gradas, arcos clasicos doricos, jonicos y corintios y el hipogeo subterraneo recreado en microdetalle.", "LEGO Icons", "https://www.lego.com/es-es/themes/icons"],
    ["lego-sets", "LEGO Technic: Superdeportivos 1:8 (Bugatti Chiron, Ferrari Daytona SP3, Sián)", "Mecanica de transmision secuencial de 8 velocidades con levas en el volante, traccion total, motores V12/W16 con pistones y puertas de tijera.", "LEGO Technic", "https://www.lego.com/es-es/themes/technic"],

    ["hot-wheels hw-muscle", "Hot Wheels '69 Dodge Charger 500 & Charger Daytona", "El rey de los ovales con su gigantesco aleron trasero estabilizador, cono frontal aerodinamico alargado y bloque motor HEMI 426 V8 a escala 1:64.", "HW Muscle", "https://es.wikipedia.org/wiki/Dodge_Charger"],
    ["hot-wheels hw-muscle", "Hot Wheels '68 Plymouth Barracuda Formula S (Violeta Velvet Mopar)", "Icono de la era dorada de Chrysler con acabado en violeta metalico, neumaticos con raya roja Redline y motor V8 340 Four-Barrel.", "HW Muscle", "https://es.wikipedia.org/wiki/Plymouth_Barracuda"],
    ["hot-wheels hw-muscle", "Hot Wheels '67 Ford Mustang Fastback & Shelby GT500 Eleanor", "Potencia legendaria inmortalizada en el cine: carroceria ensanchada en gris grafito con franjas negras gemelas y escapes laterales.", "HW Muscle", "https://es.wikipedia.org/wiki/Shelby_Mustang"],
    ["hot-wheels hw-muscle", "Hot Wheels '69 Chevrolet Camaro SS & '70 Chevelle SS 454", "La cuspide del poder de General Motors con el mitico Big Block V8 454 de 450 HP, tomas de aire Cowl Induction y rines American Racing.", "HW Muscle", "https://es.wikipedia.org/wiki/Chevrolet_Chevelle"],

    ["hot-wheels hw-jdm", "Hot Wheels Nissan Skyline GT-R BNR34 (Bayside Blue / Calsonic Racing)", "El maximo icono del JDM a escala 1:64 con pintura azul Bayside, motor RB26DETT Twin-Turbo, traccion ATTESA E-TS y rines NISMO LMGT4.", "HW JDM 1:64", "https://es.wikipedia.org/wiki/Nissan_Skyline_GT-R"],
    ["hot-wheels hw-jdm", "Hot Wheels Nissan Skyline GT-R BNR32 (Godzilla HKS Livery)", "La leyenda que domino el Campeonato Japones de Turismos con su librea de carreras HKS, rines de seis brazos e intercooler delantero.", "HW JDM 1:64", "https://es.wikipedia.org/wiki/Nissan_Skyline_GT-R"],
    ["hot-wheels hw-jdm", "Hot Wheels Nissan Silvia S15 Spec-R (Mona Lisa de Tokyo Drift)", "Coupé de drift por excelencia con carroceria C-West ensanchada, rines Volk Racing TE37 de bronce y motor SR20DET turboalimentado.", "HW Street Tuners", "https://es.wikipedia.org/wiki/Nissan_Silvia"],
    ["hot-wheels hw-jdm", "Hot Wheels Toyota Supra MK4 '94 (Castrol Racing 2JZ-GTE Turbo)", "El mito de los anos 90 con el legendario motor 2JZ-GTE de seis cilindros en linea, aleron de arco alto y faros delanteros transparentes de acrilico.", "HW Street Tuners", "https://es.wikipedia.org/wiki/Toyota_Supra"],
    ["hot-wheels hw-jdm", "Hot Wheels Mazda RX-7 FD3S (Twin-Turbo Rotary RedSuns)", "Aerodinamica pura inspirada en Initial D con motor rotativo 13B-REW, faros pop-up escamoteables y aleron de fibra de carbono.", "HW Street Tuners", "https://es.wikipedia.org/wiki/Mazda_RX-7"],
    ["hot-wheels hw-jdm", "Hot Wheels Honda Civic Type R EK9 & Integra Type R DC2 Spoon", "Chasis ultraligeros de traccion delantera con motores VTEC B16B/B18C aspirados que giran a mas de 8,500 RPM en librea Spoon amarilla y azul.", "HW Street Tuners", "https://es.wikipedia.org/wiki/Honda_Civic_Type_R"],

    ["hot-wheels", "Hot Wheels Porsche 911 GT3 RS (Weissach Package)", "Bestia de circuito alemana a escala 1:64 con aleron de cuello de cisne aerodinamico, jaula antivuelco interior y rines dorados de magnesio.", "HW Euro Speed", "https://es.wikipedia.org/wiki/Porsche_911_GT3"],
    ["hot-wheels", "Hot Wheels Porsche 930 Turbo Slantnose & RWB Stella Artois", "Carroceria ensanchada extrema creada por Akira Nakai con remaches a la vista, parachoques agresivo y aleron tipo cola de ballena.", "HW Euro Speed", "https://es.wikipedia.org/wiki/Porsche_930"],
    ["hot-wheels", "Hot Wheels Lamborghini Murcielago LP670-4 SV & Huracan LB-Works", "Hypercars italianos con kit Widebody Liberty Walk, difusor trasero gigante y motor V10/V12 aspirado en acabado negro mate.", "HW Euro Speed", "https://es.wikipedia.org/wiki/Lamborghini_Murci%C3%A9lago"],

    ["hot-wheels", "Hot Wheels Batmobile The Batman 2022 (Muscle Car Noir)", "La version mas cruda del Batmovil con chasis de muscle car modificado, turbina a reaccion expuesta en la parte trasera y defensas de ariete.", "HW Screen Time", "https://es.wikipedia.org/wiki/Batmovil"],
    ["hot-wheels", "Hot Wheels Batmobile 1989 & Tumbler Nolan Premium Die-Cast", "Edicion especial con base de metal fundido y ruedas de goma Real Riders recreando los dos vehiculos tacticos mas aclamados del cine.", "HW Screen Time", "https://es.wikipedia.org/wiki/Batmovil"],
    ["hot-wheels", "Hot Wheels DeLorean Time Machine (Hover Mode - Back to the Future)", "El clasico auto del tiempo con ruedas plegadas en modo vuelo flotante, reactor Mr. Fusion en el capo trasero y carroceria de acero cepillado.", "HW Screen Time", "https://es.wikipedia.org/wiki/DeLorean_DMC-12"],
    ["hot-wheels", "Hot Wheels Aston Martin DB5 1963 (James Bond 007)", "El vehiculo de espionaje britanico por excelencia con ametralladoras ocultas en las luces delanteras y placa de matricula giratoria BMT 216A.", "HW Screen Time", "https://es.wikipedia.org/wiki/Aston_Martin_DB5"],

    ["custom-mocs", "Tecnica SNOT (Studs Not On Top) & Chasis Lisos", "Diseno de MOCs propios ocultando los conectores cilindricos superiores para lograr acabados totalmente pulidos, curvos y realistas.", "Ingenieria LEGO", "https://es.wikipedia.org/wiki/Lego"],
    ["custom-mocs", "Swap de Ejes y Ruedas Real Riders con Llantas de Goma", "Apertura quirurgica de remaches Zamac en modelos 1:64, instalacion de ejes tubulares de laton y rines de aleacion con grabado de neumatico.", "Custom Die-Cast", "https://es.wikipedia.org/wiki/Hot_Wheels"],
    ["custom-mocs", "Detallado de Faros, Calaveras y Pintura Acrilica de Precision", "Micropintura de opticas delanteras, luces de stop traseras, intercoolers y jaulas antivuelco en miniatura con pinceles de triple cero.", "Pintura a Escala", "https://es.wikipedia.org/wiki/Modelismo"],
    ["custom-mocs", "Diorama de Estacionamiento Nocturno con Iluminacion Neon", "Escenario urbano a escala 1:64 con asfalto texturizado, postes de alumbrado LED funcional, graffitis en miniatura y paredes de ladrillo LEGO.", "Diorama Nocturno", "https://es.wikipedia.org/wiki/Diorama"]
];

const HORARIO_SHEETS_DATA = [
    ["rutina-diaria", "08:30 - 11:45", "Clases presenciales de Ingeniería en Sistemas en la UPDS (Diseño Web II, Base de Datos, POO)", "Académico UPDS", "Fijo Diario", "https://www.upds.edu.bo/"],
    ["rutina-diaria", "12:00 - 13:15", "Almuerzo, organización de rutas caninas y revisión de agenda de clientes", "Logística", "Diario", "https://open.spotify.com/playlist/4uwJD0dL2HY9HM8RMpA5Xu"],
    ["rutina-diaria", "13:30 - 22:00", "Jornada principal en Edu-can: paseos caninos, rehabilitación conductual y adiestramiento sin dolor", "Trabajo Edu-can", "Jornada Principal", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"],
    ["rutina-diaria", "22:15 - 23:00", "Retorno a casa, cena, ducha y selección de álbum o playlist para la sesión nocturna", "Recarga", "Transición", "https://open.spotify.com/playlist/12yCdcNba6b95bQLxI4s20"],
    ["rutina-diaria", "23:00 - 03:00", "Hacer prácticas de la U, programar en C# / Python / SQL y estudiar francés e inglés con música", "Productivo Nocturno", "Alta Concentración", "https://github.com/D4V1CH1N"],
    ["rutina-diaria", "03:00 / Extra", "Recompensa si queda energía: jugar en la PS4 (Elden Ring, Spider-Man, FIFA, AC) o bocetar wildstyle", "Ocio / Relax", "Recompensa", "https://open.spotify.com/playlist/4Rum8fiElouqBKP3PP1SIh"],
    ["fin-semana", "09:00 - 13:00", "Talleres grupales de adiestramiento y rehabilitación conductual en Edu-can", "Edu-can Campo", "Sábados", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"],
    ["fin-semana", "14:30 - 18:00", "Avance intensivo de proyectos de software, bases de datos SQL Server y portafolio web", "Desarrollo", "Fin de Semana", "https://github.com/D4V1CH1N"],
    ["fin-semana", "18:30 - 21:00", "Escribir poesía, componer canciones, cantar y reseñar discografías completas en Musicboard", "Arte & Música", "Creativo", "https://open.spotify.com/playlist/3EcShvyD30njVVhPVGM8Bt"],
    ["fin-semana", "21:30 - 23:30", "Salir a patinar en skate de noche por la ciudad con audífonos y bocetar en el blackbook", "Skate & Graffiti", "Nocturno", "https://open.spotify.com/playlist/5NbleL73aT2iC9lTsoW6K1"],
    ["fin-semana", "00:00 - 04:00", "Maratón de anime (Naruto, Gachiakuta, Monster, Ippo), películas de culto o sagas en PS4", "Cultura & PS4", "Maratón", "https://open.spotify.com/playlist/356cdaFfhSWpUFP8rfVAzo"],
    ["jornada-educan", "Bloque 1 (13:30)", "Recogida de manada equilibrada y caminata de descompresión con olfato libre", "Paseo Terapéutico", "Bienestar Canino", "https://es.wikipedia.org/wiki/Se%C3%B1ales_de_calma"],
    ["jornada-educan", "Bloque 2 (15:30)", "Sesiones individuales de rehabilitación: reactividad con correa, miedos e inseguridad", "Rehabilitación", "Cero Dolor", "https://es.wikipedia.org/wiki/Adiestramiento_canino"],
    ["jornada-educan", "Bloque 3 (17:30)", "Entrenamiento de obediencia funcional con refuerzo positivo: llamado, autocontrol y foco", "Refuerzo Positivo", "Educación", "https://es.wikipedia.org/wiki/Adiestramiento_con_clicker"],
    ["jornada-educan", "Bloque 4 (19:30)", "Paseos nocturnos tranquilos, reporte detallado a cada familia y entrega segura en domicilio", "Fidelización", "Confianza Total", "https://www.instagram.com/nullssj.zip?dlrf=Z2x4ZWM0OHBqZjlu"],
    ["semestre-upds", "Diseño Web II", "Arquitectura HTML5, CSS3, Bootstrap 5 y manipulación avanzada del DOM con el Ing. Miguel Angel Cruz Ramos", "Materia Clave", "UPDS 2026", "https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model"],
    ["semestre-upds", "Bases de Datos", "Modelado Entidad-Relación, normalización, vistas, triggers y procedimientos en SQL Server y PostgreSQL", "Especialidad", "UPDS 2026", "https://www.postgresql.org/docs/"],
    ["semestre-upds", "Desarrollo C# .NET", "Construcción de sistemas empresariales, POO avanzada, LINQ y conexión a motores de datos", "Lenguaje Principal", "UPDS 2026", "https://learn.microsoft.com/es-es/dotnet/csharp/"],
    ["semestre-upds", "Python & Idiomas", "Aprendizaje continuo de Python para ciencia de datos/automatización + Francés e Inglés virtual", "Autodidacta", "Crecimiento", "https://docs.python.org/es/3/"],
    ["setup-herramientas", "Entorno de Código", "Visual Studio 2022, VS Code, SQL Server Management Studio (SSMS), pgAdmin 4, Git & GitHub", "Dev Setup", "Diario", "https://github.com/D4V1CH1N"],
    ["setup-herramientas", "Consola & Gaming", "PlayStation 4 (PS4) + DualShock 4 + Emulador GBA (Pokémon Esmeralda con Scizor #212)", "Gaming Setup", "Favorito", "https://www.wikidex.net/wiki/Scizor"],
    ["setup-herramientas", "Audio & Arte", "Spotify (155 Playlists organizadas), Musicboard, cuaderno Blackbook, marcadores acrílicos y Skate", "Arte Setup", "Esencial", "https://open.spotify.com/user/d4v1ch1n2"]
];

const MUSICBOARD_DATA = [
    ["diez-de-diez alt-rock", "Gorillaz", "Demon Days (2005)", "10/10", "Feel Good Inc. / El Mañana", "Obra maestra absoluta de Damon Albarn y Jamie Hewlett. Mezcla perfecta de hip-hop alternativo, electrónica oscura y crítica social sin un solo tema de relleno."],
    ["diez-de-diez alt-rock", "Gorillaz", "Plastic Beach (2010)", "10/10", "On Melancholy Hill / Empire Ants", "Un viaje conceptual synth-pop y orquestal irrepetible. La transición de Empire Ants y la melancolía de este álbum lo hacen eterno."],
    ["diez-de-diez alt-rock", "Gorillaz", "Gorillaz (Álbum Debut - 2001)", "9.8/10", "Clint Eastwood / Tomorrow Comes Today", "El inicio de la banda virtual más grande de la historia: dub, trip-hop, punk y rap lo-fi con una identidad visual y sonora única."],
    ["alt-rock", "Gorillaz", "Song Machine, Season One: Strange Timez (2020)", "9.5/10", "Momentary Bliss / Aries", "Colaboraciones brutales (Robert Smith, Elton John, slowthai, Peter Hook) donde cada episodio suena fresco y experimental."],
    ["alt-rock", "Gorillaz", "Cracker Island (2023)", "9.3/10", "Silent Running / New Gold", "Producción impecable con bajos funk de Thundercat, Bad Bunny en Tormenta y la voz hipnótica de 2-D."],
    ["alt-rock", "Gorillaz", "The Now Now (2018)", "9.2/10", "Humility / Souk Eye", "El disco más íntimo y melancólico de 2-D, ideal para viajar o programar de madrugada."],
    ["diez-de-diez alt-rock", "Twenty One Pilots", "Trench (2018)", "10/10", "Jumpsuit / Chlorine / Nico and the Niners", "Producción conceptual perfecta junto a Paul Meany. El lore de Dema, los bajos distorsionados de Jumpsuit y la batería de Josh Dun en su punto más alto."],
    ["diez-de-diez alt-rock", "Twenty One Pilots", "Clancy (2024)", "10/10", "Overcompensate / Navigating / Paladin Strait", "El cierre épico de la narrativa de Trench: energético, maduro, con estribillos gigantes y una honestidad lírica brutal."],
    ["diez-de-diez alt-rock", "Twenty One Pilots", "Vessel (2013)", "9.9/10", "Holding on to You /Ode to Sleep / Car Radio", "Poesía pura sobre salud mental e insomnio: convierte la ansiedad nocturna en himnos llenos de esperanza."],
    ["alt-rock", "Twenty One Pilots", "Blurryface (2015)", "9.6/10", "Heavydirtysoul / Ride / Goner", "El álbum que definió una generación enfrentando las inseguridades personificadas en Blurryface."],
    ["alt-rock", "Twenty One Pilots", "Scaled And Icy (2021)", "9.0/10", "Redecorate / Shy Away", "Contraste brillante entre melodías coloridas y letras profundas, cerrando con la joya oscura de Redecorate."],
    ["diez-de-diez alt-rock", "Zoé", "MTV Unplugged: Música de Fondo (2011)", "10/10", "Soñé / Labios Rotos / Luna", "Uno de los mejores Unplugged en español de todos los tiempos. Arreglos espaciales junto a Denise Gutiérrez, Bunbury y Chetes."],
    ["diez-de-diez alt-rock", "Zoé", "Memo Rex Commander y el Corazón Atómico (2006)", "9.9/10", "Vía Láctea / No Me Destruyas / Paula", "Rock espacial psicodélico y sintetizadores galácticos que te transportan a otra dimensión."],
    ["alt-rock", "Zoé", "Prográmaton (2013)", "9.6/10", "Arrullo de Estrellas / 10 A.M.", "Lírica poética y metafísica de León Larregui con una producción analógica impecable."],
    ["alt-rock", "Zoé", "Rocanlover (2003) & Aztlán (2018)", "9.5/10", "Love / Azul / Hielo", "Equilibrio perfecto entre el rock alternativo clásico de los 2000 y su madurez atmosférica."],
    ["diez-de-diez pop-alt", "Oliver Tree", "Ugly Is Beautiful (2020)", "9.8/10", "Hurt / Miracle Man / Alien Boy", "Mezcla explosiva de indie rock alternativo, distorsión, hip-hop y humor absurdo con melodías adictivas."],
    ["pop-alt", "Oliver Tree", "Cowboy Tears (2022) & Alone In A Crowd (2023)", "9.2/10", "Cowboys Don't Cry / Bounce / Miss You", "Reinvención constante desde el emo-country alternativo hasta el dance-pop nostálgico."],
    ["diez-de-diez pop-alt", "Melanie Martinez", "Cry Baby (2015)", "9.8/10", "Dollhouse / Pity Party / Mad Hatter", "Estética dark-pop conceptual impecable: transforma cuentos infantiles en metáforas psicológicas oscuras."],
    ["pop-alt", "Melanie Martinez", "K-12 (2019) & PORTALS (2023)", "9.5/10", "Show & Tell / VOID / EVIL", "Evolución artística total hacia el art-pop alternativo y el rock feérico con bajos pesados en VOID y EVIL."],
    ["diez-de-diez pop-alt", "Lana Del Rey", "Born to Die (2012) & Norman Fucking Rockwell! (2019)", "10/10", "Born to Die / Venice Bitch / Cinnamon Girl", "Cinematografía pura hecha música: cuerdas nostálgicas, poesía melancólica y atmósfera hipnótica."],
    ["pop-alt", "Sabrina Carpenter", "Short n' Sweet (2024) & emails i can't send (2022)", "9.5/10", "Espresso / Taste / Nonsense / Feather", "Pop inteligente, carismático, con armonías vocales impecables y producción brillante."],
    ["diez-de-diez trap-rap", "Duki", "Súper Sangre Joven (2019)", "10/10", "Goteo / Hitboy / Señorita", "El disco que consagró el sonido del trap argentino: energía pura, flows inalcanzables y clásicos de principio a fin."],
    ["diez-de-diez trap-rap", "Duki", "Desde el Fin del Mundo (2021) & Ameri (2024)", "9.8/10", "Malbec / Ticket / Barro / Nueva Era", "Versatilidad total: desde el trap más crudo y rockero hasta la introspección emocional de Barro."],
    ["diez-de-diez trap-rap", "YSY A", "Antezana 247 (2018)", "10/10", "Vuelta a la Luna / Tamo Loco / Linaje", "Álbum histórico grabado en la mansión de Antezana 247. La biblia del trap argentino y la cultura de El Quinto Escalón."],
    ["trap-rap", "YSY A", "Hecho a Mano (2019) & Trap de Verdad (2021)", "9.7/10", "Full Ice / Pasto / Trap de Verdad", "Cero autotune forzado, pura energía sísmica, métricas agresivas y amor real por el género."],
    ["diez-de-diez trap-rap", "Wos", "Caravana (2019) & Oscuro Éxtasis (2021)", "10/10", "Canguro / Melón Vino / Arrancármelo / Niño Gordo Flaco", "Fusión magistral de rap contestatario, rock alternativo argentino y sensibilidad poética."],
    ["trap-rap", "C.R.O", "Cuervos (2019) & Mal de la Cabeza (2023)", "9.6/10", "Reina / Ciudad Gris / h.i.j.o.s d.e l.a n.o.c.h.e", "El rey de la melancolía nocturna y la versatilidad entre el boombap oscuro, el trap y el rock."],
    ["trap-rap", "KHEA & Neo Pistea", "Trapicheo (2020) & Punkdemia (2021)", "9.5/10", "Loca / She Don't Give a FO / Tumbando el Club Remix", "Los himnos fundacionales de la época dorada (2017-2020) que cambiaron la música urbana en español."],
    ["diez-de-diez trap-rap", "Lytos", "Discografía Conceptual & Storytelling", "10/10", "La Caja de Pandora / Silencio / Disculpa", "Lírica teatral, técnica vocal desgarradora y narrativas psicológicas que erizan la piel."],
    ["trap-rap", "Crazy Point", "Antología Sad Rap & R&B Urbano", "9.6/10", "Dime Qué Pasó / Ya No Estoy Aquí / Cicatrices", "Melodías melancólicas y letras sinceras que conectan directo en noches de lluvia y reflexión."]
];

const URL_POKEAPI_OFFICIAL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const TITULARES_POKEMON_DATA = [
    {
        rango: 1,
        id: 212,
        nombre: "Scizor",
        region: "Johto",
        tipos: "Bicho / Acero",
        objeto: "Baya Zidra (Sitrus Berry)",
        habilidad: "Experto (Technician)",
        mecanica: "Megaevolución a Mega-Scizor / Dinamax",
        rol: "Ofensivo físico con Técnica y prioridad en Puño Bala; candidato a Megaevolución."
    },
    {
        rango: 2,
        id: 454,
        nombre: "Toxicroak",
        region: "Sinnoh",
        tipos: "Veneno / Lucha",
        objeto: "Baya Zidra (Sitrus Berry)",
        habilidad: "Piel Seca (Dry Skin)",
        mecanica: "Cobertura Táctica Mixta",
        rol: "Atacante mixto táctico con Piel Seca y cobertura de tipo Lucha/Veneno."
    },
    {
        rango: 3,
        id: 937,
        nombre: "Ceruledge",
        region: "Paldea",
        tipos: "Fuego / Fantasma",
        objeto: "Vidasfera (Life Orb)",
        habilidad: "Cuerpo Llama (Flame Body)",
        mecanica: "Teracristalización Ofensiva",
        rol: "Veloz sweeper físico con Espada Lamentable y portador ideal de la Teracristalización ofensiva."
    },
    {
        rango: 4,
        id: 849,
        nombre: "Toxtricity",
        region: "Galar",
        tipos: "Eléctrico / Veneno",
        objeto: "Vidasfera (Life Orb)",
        habilidad: "Punk Rock",
        mecanica: "Gigamax",
        rol: "Atacante especial con la habilidad Punk Rock para potenciar ataques de sonido masivos y opción a Gigamax."
    },
    {
        rango: 5,
        id: 553,
        nombre: "Krookodile",
        region: "Unova",
        tipos: "Tierra / Siniestro",
        objeto: "Vidasfera (Life Orb)",
        habilidad: "Intimidación (Intimidate)",
        mecanica: "Pivot Intimidatorio",
        rol: "Threat intimidatorio con acceso a cobertura terrestre y siniestra letal."
    },
    {
        rango: 6,
        id: 715,
        nombre: "Noivern",
        region: "Kalos",
        tipos: "Volador / Dragón",
        objeto: "Vidasfera (Life Orb)",
        habilidad: "Allanador (Infiltrator)",
        mecanica: "Control de Velocidad (Speed Control)",
        rol: "Cleaner rápido especializado en control de velocidad e ingreso con Ida y Vuelta."
    }
];

const POKEDEX_PERSONAL_DATA = [
    ["kanto mecanica", "1. KANTO", 6, "Charizard", "Fuego / Volador", "Vidasfera (Life Orb)", "Poder Solar (Solar Power)", "Miedosa (Timid)", ["Lanzallamas", "Onda Ígnea", "Tajo Aéreo", "Sol Matinal"], "Capacidad de Megaevolucionar a Mega-Charizard Y / Dinamax", ""],
    ["kanto", "1. KANTO", 34, "Nidoking", "Veneno / Tierra", "Vidasfera (Life Orb)", "Potencia Bruta (Sheer Force)", "Miedosa (Timid)", ["Tierra Viva", "Lanzallamas", "Rayo Hielo", "Bomba Lodo"], "", ""],
    ["kanto mecanica", "1. KANTO", 65, "Alakazam", "Psíquico", "Banda Focus (Focus Sash)", "Muro Mágico (Magic Guard)", "Miedosa (Timid)", ["Psíquico", "Bola Sombra", "Onda Certera", "Maquinación"], "Capacidad de Megaevolucionar a Mega-Alakazam", ""],
    ["kanto", "1. KANTO", 82, "Magneton", "Eléctrico / Acero", "Gafas Elección (Choice Specs)", "Imán (Magnet Pull)", "Miedosa (Timid)", ["Rayo", "Foco Esplendor", "Voltiocambio", "Tri-Ataque"], "", ""],
    ["kanto", "1. KANTO", 91, "Cloyster", "Agua / Hielo", "Banda Focus (Focus Sash)", "Encadenado (Skill Link)", "Alegre (Jolly)", ["Carámbano", "Capa Guijarro", "Escama Canto", "Rompecoraza"], "", ""],
    ["kanto mecanica", "1. KANTO", 94, "Gengar", "Fantasma / Veneno", "Lodo Negro (Black Sludge)", "Cuerpo Maldito (Cursed Body)", "Miedosa (Timid)", ["Bola Sombra", "Bomba Lodo", "Mismo Destino", "Sustituto"], "Capacidad de Megaevolucionar a Mega-Gengar / Dinamax", ""],

    ["johto", "2. JOHTO", 157, "Typhlosion", "Fuego", "Gafas Elección (Choice Specs)", "Absorbe Fuego (Flash Fire)", "Miedosa (Timid)", ["Erupción", "Lanzallamas", "Onda Ígnea", "Foco Esplendor"], "", ""],
    ["johto", "2. JOHTO", 169, "Crobat", "Veneno / Volador", "Lodo Negro (Black Sludge)", "Foco Interno (Inner Focus)", "Alegre (Jolly)", ["Pájaro Osado", "Respiro", "Desarme", "Ida y Vuelta"], "", ""],
    ["johto mecanica", "2. JOHTO", 248, "Tyranitar", "Roca / Siniestro", "Restos (Leftovers)", "Chorro de Arena (Sand Stream)", "Cuidadosa (Careful)", ["Roca Afilada", "Triturar", "Trampa Rocas", "Danza Dragón"], "Capacidad de Megaevolucionar a Mega-Tyranitar / Dinamax", ""],
    ["johto titulares mecanica", "2. JOHTO", 212, "Scizor", "Bicho / Acero", "Baya Zidra (Sitrus Berry)", "Experto (Technician)", "Firme (Adamant)", ["Puño Bala", "Desarme", "Ida y Vuelta", "Danza Espada"], "Capacidad de Megaevolucionar a Mega-Scizor / Dinamax", "TITULAR #1: Ofensivo físico con Técnica y prioridad en Puño Bala; candidato a Megaevolución."],
    ["johto", "2. JOHTO", 202, "Wobbuffet", "Psíquico", "Restos (Leftovers)", "Sombra Trampa (Shadow Tag)", "Osada (Bold)", ["Contraataque", "Manto Espejo", "Mismo Destino", "Otra Vez"], "", ""],
    ["johto", "2. JOHTO", 171, "Lanturn", "Agua / Eléctrico", "Chaleco Asalto (Assault Vest)", "Absorbe Agua (Water Absorb)", "Modesta (Modest)", ["Rayo", "Hidrobomba", "Rayo Hielo", "Voltiocambio"], "", ""],

    ["hoenn mecanica", "3. HOENN", 257, "Blaziken", "Fuego / Lucha", "Vidasfera (Life Orb)", "Impulso (Speed Boost)", "Firme (Adamant)", ["Envite Ígneo", "Patada Salto Alta", "Danza Espada", "Protección"], "Capacidad de Megaevolucionar a Mega-Blaziken / Dinamax", ""],
    ["hoenn", "3. HOENN", 272, "Ludicolo", "Agua / Planta", "Vidasfera (Life Orb)", "Nado Rápido (Swift Swim)", "Modesta (Modest)", ["Hidrobomba", "Rayo Solar", "Rayo Hielo", "Surf"], "", ""],
    ["hoenn mecanica", "3. HOENN", 282, "Gardevoir", "Psíquico / Hada", "Gafas Elección (Choice Specs)", "Piel Feérica (Pixilate)", "Miedosa (Timid)", ["Vozarrón", "Psíquico", "Onda Certera", "Bola Sombra"], "Capacidad de Megaevolucionar a Mega-Gardevoir", ""],
    ["hoenn", "3. HOENN", 289, "Slaking", "Normal", "Cinta Elección (Choice Band)", "Ausente (Truant)", "Firme (Adamant)", ["Golpe Aéreo", "Terremoto", "Golpetazo", "Puño Fuego"], "", ""],
    ["hoenn mecanica", "3. HOENN", 306, "Aggron", "Acero / Roca", "Restos (Leftovers)", "Roca Sólida (Solid Rock)", "Agitada (Impish)", ["Cabeza de Hierro", "Roca Afilada", "Trampa Rocas", "Rugido"], "Capacidad de Megaevolucionar a Mega-Aggron", ""],
    ["hoenn mecanica", "3. HOENN", 330, "Flygon", "Tierra / Dragón", "Vidasfera (Life Orb)", "Levitación (Levitate)", "Alegre (Jolly)", ["Terremoto", "Enfado", "Idas y Vuelta", "Garra Dragón"], "Dinamax", ""],

    ["sinnoh", "4. SINNOH", 389, "Torterra", "Planta / Tierra", "Restos (Leftovers)", "Capa Espesa (Overgrow)", "Agitada (Impish)", ["Terremoto", "Llave Mota", "Síntesis", "Trampa Rocas"], "", ""],
    ["sinnoh", "4. SINNOH", 419, "Floatzel", "Agua", "Vidasfera (Life Orb)", "Nado Rápido (Swift Swim)", "Miedosa (Timid)", ["Hidrobomba", "Rayo Hielo", "Surf", "Onda Certera"], "", ""],
    ["sinnoh mecanica", "4. SINNOH", 445, "Garchomp", "Dragón / Tierra", "Vidasfera (Life Orb)", "Piel Tosca (Rough Skin)", "Alegre (Jolly)", ["Terremoto", "Garra Dragón", "Danza Espada", "Colmillo Ígneo"], "Megaevolución a Mega-Garchomp / Dinamax / Teracristalización", ""],
    ["sinnoh titulares", "4. SINNOH", 454, "Toxicroak", "Veneno / Lucha", "Baya Zidra (Sitrus Berry)", "Piel Seca (Dry Skin)", "Firme (Adamant)", ["Puño Dinámico", "Gunk Shot", "Desarme", "Sucker Punch"], "", "TITULAR #2: Atacante mixto táctico con Piel Seca y cobertura de tipo Lucha/Veneno."],
    ["sinnoh", "4. SINNOH", 452, "Drapion", "Veneno / Siniestro", "Vidasfera (Life Orb)", "Francotirador (Sniper)", "Alegre (Jolly)", ["Puya Nociva", "Desarme", "Terremoto", "Danza Espada"], "", ""],
    ["sinnoh", "4. SINNOH", 478, "Froslass", "Hielo / Fantasma", "Banda Focus (Focus Sash)", "Manto Nieve (Snow Cloak)", "Miedosa (Timid)", ["Ventisca", "Bola Sombra", "Mismo Destino", "Púas"], "", ""],

    ["unova", "5. UNOVA", 503, "Samurott", "Agua", "Vidasfera (Life Orb)", "Torrente (Torrent)", "Firme (Adamant)", ["Cascada", "Megacuerno", "Aqua Jet", "Danza Espada"], "", ""],
    ["unova", "5. UNOVA", 530, "Excadrill", "Tierra / Acero", "Pañuelo Elección (Choice Scarf)", "Rompemoldes (Mold Breaker)", "Alegre (Jolly)", ["Terremoto", "Cabeza de Hierro", "Avalancha", "Puño Certero"], "", ""],
    ["unova titulares", "5. UNOVA", 553, "Krookodile", "Tierra / Siniestro", "Vidasfera (Life Orb)", "Intimidación (Intimidate)", "Alegre (Jolly)", ["Terremoto", "Triturar", "Roca Afilada", "Demolición"], "", "TITULAR #5: Threat intimidatorio con acceso a cobertura terrestre y siniestra letal."],
    ["unova", "5. UNOVA", 591, "Amoonguss", "Planta / Veneno", "Cascoviejo (Rocky Helmet)", "Regeneración (Regenerator)", "Osada (Bold)", ["Espora", "Gigadrenaje", "Bomba Lodo", "Polvo Ira"], "", ""],
    ["unova", "5. UNOVA", 609, "Chandelure", "Fantasma / Fuego", "Gafas Elección (Choice Specs)", "Absorbe Fuego (Flash Fire)", "Modesta (Modest)", ["Llama Fucsia", "Bola Sombra", "Psíquico", "Llamarada"], "", ""],
    ["unova", "5. UNOVA", 596, "Galvantula", "Bicho / Eléctrico", "Vidasfera (Life Orb)", "Ojo Compuesto (Compound Eyes)", "Miedosa (Timid)", ["Trueno", "Zumbido", "Voltiocambio", "Rayo Hielo"], "", ""],

    ["kalos mecanica", "6. KALOS", 658, "Greninja", "Agua / Siniestro", "Vidasfera (Life Orb)", "Mutatipo (Protean)", "Miedosa (Timid)", ["Surf", "Rayo Hielo", "Ida y Vuelta", "Pulso Umbrío"], "Dinamax / Teracristal", ""],
    ["kalos", "6. KALOS", 675, "Pangoro", "Lucha / Siniestro", "Cinta Elección (Choice Band)", "Puño Férreo (Iron Fist)", "Firme (Adamant)", ["Puño Drenaje", "Puño Cometa", "Desarme", "Puño Bala"], "", ""],
    ["kalos", "6. KALOS", 681, "Aegislash", "Acero / Fantasma", "Restos (Leftovers)", "Cambiodosis (Stance Change)", "Mansa (Quiet)", ["Bola Sombra", "Foco Esplendor", "Escudo Real", "Canon"], "", ""],
    ["kalos titulares", "6. KALOS", 715, "Noivern", "Volador / Dragón", "Vidasfera (Life Orb)", "Allanador (Infiltrator)", "Miedosa (Timid)", ["Dracoaliento", "Vendaval", "Lanzallamas", "Ida y Vuelta"], "", "TITULAR #6: Cleaner rápido especializado en control de velocidad e ingreso con Ida y Vuelta."],
    ["kalos", "6. KALOS", 663, "Talonflame", "Fuego / Volador", "Gafas Elección (Choice Specs)", "Alas Galeote (Gale Wings)", "Miedosa (Timid)", ["Pájaro Osado", "Respiro", "Ida y Vuelta", "Envite Ígneo"], "", ""],
    ["kalos", "6. KALOS", 660, "Diggersby", "Normal / Tierra", "Cinta Elección (Choice Band)", "Potencia (Huge Power)", "Firme (Adamant)", ["Terremoto", "Retorno", "Golpe Rápido", "Persecución"], "", ""],

    ["alola", "7. ALOLA", 724, "Decidueye", "Planta / Fantasma", "Restos (Leftovers)", "Espesura (Overgrow)", "Firme (Adamant)", ["Puntada Sombría", "Hoja Aguda", "Sombra Nocturna", "Desarme"], "", ""],
    ["alola", "7. ALOLA", 748, "Toxapex", "Veneno / Agua", "Lodo Negro (Black Sludge)", "Regeneración (Regenerator)", "Osada (Bold)", ["Escaldar", "Recuperación", "Niebla", "Tóxico"], "", ""],
    ["alola", "7. ALOLA", 758, "Salazzle", "Veneno / Fuego", "Vidasfera (Life Orb)", "Corrosión (Corrosion)", "Miedosa (Timid)", ["Lanzallamas", "Bomba Lodo", "Pulso Dragón", "Maquinación"], "", ""],
    ["alola mecanica", "7. ALOLA", 760, "Bewear", "Normal / Lucha", "Cascoviejo (Rocky Helmet)", "Peluche (Fluffy)", "Firme (Adamant)", ["Doble Golpetazo", "Fuerza Bruta", "Puño Hielo", "Triturar"], "Dinamax", ""],
    ["alola", "7. ALOLA", 738, "Vikavolt", "Bicho / Eléctrico", "Gafas Elección (Choice Specs)", "Levitec (Levitate)", "Modesta (Modest)", ["Rayo", "Zumbido", "Onda Voltio", "Foco Esplendor"], "", ""],
    ["alola mecanica", "7. ALOLA", 778, "Mimikyu", "Fantasma / Hada", "Vidasfera (Life Orb)", "Disfraz (Disguise)", "Alegre (Jolly)", ["Carantoña", "Garra Umbría", "Sombra Vil", "Danza Espada"], "Teracristalización / Dinamax", ""],

    ["galar mecanica", "8. GALAR", 815, "Cinderace", "Fuego", "Vidasfera (Life Orb)", "Libero", "Alegre (Jolly)", ["Balón Ígneo", "Patada Salto Alta", "Ida y Vuelta", "Zen Headbutt"], "Gigamax", ""],
    ["galar mecanica", "8. GALAR", 823, "Corviknight", "Volador / Acero", "Restos (Leftovers)", "Espejo Armadura (Mirror Armor)", "Cuidadosa (Careful)", ["Pájaro Osado", "Respiro", "Giro Bola", "Despeje"], "Gigamax", ""],
    ["galar titulares mecanica", "8. GALAR", 849, "Toxtricity", "Eléctrico / Veneno", "Vidasfera (Life Orb)", "Punk Rock", "Modesta (Modest)", ["Overdrive", "Bomba Lodo", "Voltiocambio", "Alboroto"], "Gigamax", "TITULAR #4: Atacante especial con la habilidad Punk Rock para potenciar ataques de sonido masivos y opción a Gigamax."],
    ["galar mecanica", "8. GALAR", 858, "Hatterene", "Psíquico / Hada", "Vidasfera (Life Orb)", "Mágico Espejo (Magic Bounce)", "Modesta (Modest)", ["Psíquico", "Brillo Mágico", "Espacio Raro", "Zona Mágica"], "Gigamax", ""],
    ["galar", "8. GALAR", 862, "Obstagoon", "Siniestro / Normal", "Llama Esfera (Flame Orb)", "Agallas (Guts)", "Alegre (Jolly)", ["Tajo Umbría", "Desarme", "Imagen", "Puntapié"], "", ""],
    ["galar mecanica", "8. GALAR", 887, "Dragapult", "Dragón / Fantasma", "Vidasfera (Life Orb)", "Infiltrador (Infiltrator)", "Miedosa (Timid)", ["Cometa Draco", "Bola Sombra", "Lanzallamas", "Voltiocambio"], "Dinamax", ""],

    ["paldea mecanica", "9. PALDEA", 908, "Meowscarada", "Planta / Siniestro", "Vidasfera (Life Orb)", "Espadazo (Protean)", "Alegre (Jolly)", ["Truco Flor", "Desarme", "Puño Hielo", "Ida y Vuelta"], "Teracristalización", ""],
    ["paldea titulares mecanica", "9. PALDEA", 937, "Ceruledge", "Fuego / Fantasma", "Vidasfera (Life Orb)", "Cuerpo Llama (Flame Body)", "Alegre (Jolly)", ["Espada Lamentable", "Puño Fantasma", "A Afilar", "Sombra Vil"], "Teracristalización", "TITULAR #3: Veloz sweeper físico con Espada Lamentable y portador ideal de la Teracristalización ofensiva."],
    ["paldea", "9. PALDEA", 945, "Grafaiai", "Veneno / Normal", "Vidasfera (Life Orb)", "Prankster", "Alegre (Jolly)", ["Gunk Shot", "Ida y Vuelta", "Demolición", "Mofa"], "", ""],
    ["paldea", "9. PALDEA", 959, "Tinkaton", "Hada / Acero", "Restos (Leftovers)", "Rompemoldes (Mold Breaker)", "Cuidadosa (Careful)", ["Martillo Gigante", "Despeje", "Truco", "Onda Trueno"], "", ""],
    ["paldea", "9. PALDEA", 975, "Cetitan", "Hielo", "Vidasfera (Life Orb)", "Sebo (Thick Fat)", "Firme (Adamant)", ["Carámbano", "Terremoto", "Cuerpo Pesado", "Danza Espada"], "", ""],
    ["paldea mecanica", "9. PALDEA", 984, "Colmilargo (Great Tusk)", "Tierra / Lucha", "Vidasfera (Life Orb)", "Paleoactivación (Protosynthesis)", "Alegre (Jolly)", ["Terremoto", "Cornada Certera", "Desarme", "Giro Rápido"], "Teracristalización", ""]
];

function renderizarDev() {
    const contenedor = document.getElementById("contenedorDev");
    if (!contenedor) return;

    let html = "";
    DEV_STACK_DATA.forEach((d) => {
        const categoria = d[0];
        const titulo = d[1];
        const detalle = d[2];
        const badge = d[3];
        const url = d[4];

        html += `
            <div class="item-dom-card card-dev" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-verde text-dark badge-compacto">${badge}</span>
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-code-slash"></i>Doc
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${titulo}</h6>
                <p class="texto-subtitulo small mb-0">${detalle}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarEducan() {
    const contenedor = document.getElementById("contenedorEducan");
    if (!contenedor) return;

    let html = "";
    EDUCAN_DATA.forEach((e) => {
        const categoria = e[0];
        const titulo = e[1];
        const detalle = e[2];
        const badge = e[3];
        const url = e[4];

        html += `
            <div class="item-dom-card card-educan" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-morada text-white badge-compacto">${badge}</span>
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-heart-pulse"></i>Guía
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${titulo}</h6>
                <p class="texto-subtitulo small mb-0">${detalle}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarArte() {
    const contenedor = document.getElementById("contenedorArte");
    if (!contenedor) return;

    let html = "";
    BLACKBOOK_ARTE_DATA.forEach((a) => {
        const categoria = a[0];
        const titulo = a[1];
        const detalle = a[2];
        const badge = a[3];
        const url = a[4];

        html += `
            <div class="item-dom-card card-arte" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-verde text-dark badge-compacto">${badge}</span>
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-box-arrow-up-right me-1"></i>Ver
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${titulo}</h6>
                <p class="texto-subtitulo small mb-0">${detalle}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarIdiomas() {
    const contenedor = document.getElementById("contenedorIdiomas");
    if (!contenedor) return;

    let html = "";
    IDIOMAS_DATA.forEach((i) => {
        const categoria = i[0];
        const frase = i[1];
        const detalle = i[2];
        const badge = i[3];
        const url = i[4];

        html += `
            <div class="item-dom-card card-idioma" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-morada text-white badge-compacto">${badge}</span>
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-translate"></i>Dict
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${frase}</h6>
                <p class="texto-subtitulo small mb-0">${detalle}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarColeccion() {
    const contenedor = document.getElementById("contenedorColeccion");
    if (!contenedor) return;

    let html = "";
    COLECCION_LEGO_HW_DATA.forEach((c) => {
        const categoria = c[0];
        const titulo = c[1];
        const detalle = c[2];
        const badge = c[3];
        const url = c[4];
        const esSueno = categoria.indexOf("challenger-sueno") !== -1;
        const claseSueno = esSueno ? "card-challenger-sueno" : "";
        const badgeClase = esSueno ? "barra-morada text-white" : "barra-verde text-dark";

        html += `
            <div class="item-dom-card card-coleccion ${claseSueno}" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge ${badgeClase} badge-compacto">${badge}</span>
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-boxes"></i>Info
                    </a>
                </div>
                <h6 class="mb-1 fw-bold ${esSueno ? 'texto-verde' : ''}">${titulo}</h6>
                <p class="texto-subtitulo small mb-0">${detalle}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarHorarioSheets() {
    const contenedor = document.getElementById("contenedorHorario");
    if (!contenedor) return;

    let html = "";
    HORARIO_SHEETS_DATA.forEach((fila, idx) => {
        const categoria = fila[0];
        const bloque = fila[1];
        const actividad = fila[2];
        const catNombre = fila[3];
        const prioridad = fila[4];
        const url = fila[5];
        const claseBadge = idx % 2 === 0 ? "barra-verde text-dark" : "barra-morada text-white";

        html += `
            <tr class="fila-horario" data-categoria="${categoria}">
                <td class="numero-fila">${idx + 1}</td>
                <td class="fw-bold text-nowrap">${bloque}</td>
                <td>${actividad}</td>
                <td>${catNombre}</td>
                <td><span class="badge ${claseBadge} badge-compacto">${prioridad}</span></td>
                <td class="text-center">
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="link-spotify">
                        <i class="bi bi-box-arrow-up-right"></i>Ir
                    </a>
                </td>
            </tr>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarMusicboard() {
    const contenedor = document.getElementById("contenedorMusicboard");
    if (!contenedor) return;

    let html = "";
    MUSICBOARD_DATA.forEach((m) => {
        const categoria = m[0];
        const artista = m[1];
        const album = m[2];
        const nota = m[3];
        const trackFav = m[4];
        const resena = m[5];
        const urlSpotify = "https://open.spotify.com/search/" + encodeURIComponent(album.replace(/\s*\(\d{4}\)/, "") + " " + artista);

        html += `
            <div class="item-dom-card card-musicboard" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <div class="d-flex flex-wrap align-items-center gap-2">
                        <span class="badge barra-verde text-dark badge-compacto">${nota}</span>
                        <span class="small fw-bold texto-morado">${artista}</span>
                    </div>
                    <a href="${urlSpotify}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-spotify"></i>Álbum
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${album}</h6>
                <small class="texto-verde d-block fw-semibold mb-1"><i class="bi bi-music-note-beamed me-1"></i>Track Fav: ${trackFav}</small>
                <p class="texto-subtitulo small mb-0">${resena}</p>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarHeroes() {
    const contenedor = document.getElementById("contenedorHeroes");
    if (!contenedor) return;

    let html = "";
    HEROES_DATA.forEach((h) => {
        const urlWiki = "https://es.wikipedia.org/w/index.php?search=" + encodeURIComponent(h.nombre + " " + h.editorial);
        html += `
            <div class="heroe-card card-heroe" data-categoria="${h.categoria}">
                <div class="heroe-img-wrap">
                    <img src="${h.img}" alt="${h.nombre}" class="heroe-img" loading="lazy">
                </div>
                <div class="p-3">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge barra-morada text-white badge-compacto">${h.editorial}</span>
                        <small class="texto-verde fw-bold">${h.identidad}</small>
                    </div>
                    <h5 class="fw-bold mb-1">${h.nombre}</h5>
                    <p class="small texto-subtitulo mb-3">${h.rol}</p>
                    <a href="${urlWiki}" target="_blank" rel="noopener noreferrer" class="link-spotify w-100 justify-content-center">
                        <i class="bi bi-journal-richtext"></i>Explorar Historia (Wiki)
                    </a>
                </div>
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function renderizarPeliculas() {
    const contenedor = document.getElementById("contenedorPeliculas");
    if (!contenedor) return;

    let html = "";
    PELICULAS_DATA.forEach((p, idx) => {
        const titulo = p[0];
        const saga = p[1];
        const anio = p[2];
        const categoria = p[3];
        const urlImdb = "https://www.imdb.com/find/?q=" + encodeURIComponent(titulo + " " + anio);

        html += `
            <div class="item-dom-card card-pelicula" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <div class="d-flex flex-wrap align-items-center gap-2">
                        <span class="badge barra-morada text-white badge-compacto">${saga}</span>
                        <small class="texto-verde fw-bold">${anio}</small>
                    </div>
                    <a href="${urlImdb}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-film"></i>IMDb
                    </a>
                </div>
                <h6 class="mb-0 fw-bold">${idx + 1}. ${titulo}</h6>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorPeliculas");
    if (contador) {
        contador.textContent = PELICULAS_DATA.length + " Películas";
    }
}

function renderizarSeries() {
    const contenedor = document.getElementById("contenedorSeries");
    if (!contenedor) return;

    let html = "";
    SERIES_DATA.forEach((s, idx) => {
        const titulo = s[0];
        const detalle = s[1];
        const anio = s[2];
        const categoria = s[3];
        const urlImdb = "https://www.imdb.com/find/?q=" + encodeURIComponent(titulo);

        html += `
            <div class="item-dom-card card-serie" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-verde text-dark badge-compacto">${anio}</span>
                    <a href="${urlImdb}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-tv"></i>IMDb
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${idx + 1}. ${titulo}</h6>
                <small class="texto-subtitulo d-block">${detalle}</small>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorSeries");
    if (contador) {
        contador.textContent = SERIES_DATA.length + " Series";
    }
}

function renderizarAnimes() {
    const contenedor = document.getElementById("contenedorAnimes");
    if (!contenedor) return;

    let html = "";
    ANIMES_DATA.forEach((a, idx) => {
        const nombreLatino = a[0];
        const nombreJapones = a[1];
        const anio = a[2];
        const categoria = a[3];
        const urlMal = "https://myanimelist.net/search/all?q=" + encodeURIComponent(nombreJapones);

        html += `
            <div class="item-dom-card card-anime" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <div class="d-flex align-items-center gap-2">
                        <span class="badge barra-morada text-white badge-compacto">Anime #${idx + 1}</span>
                        <small class="texto-verde fw-bold">${anio}</small>
                    </div>
                    <a href="${urlMal}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-play-btn"></i>MAL
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">ES: ${nombreLatino}</h6>
                <small class="texto-morado d-block fw-semibold">JP: ${nombreJapones}</small>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorAnimes");
    if (contador) {
        contador.textContent = ANIMES_DATA.length + " Animes";
    }
}

function renderizarLibros() {
    const contenedor = document.getElementById("contenedorLibros");
    if (!contenedor) return;

    let html = "";
    LIBROS_DATA.forEach((l, idx) => {
        const titulo = l[0];
        const autor = l[1];
        const detalle = l[2];
        const categoria = l[3];
        const urlLibro = "https://www.goodreads.com/search?q=" + encodeURIComponent(titulo + " " + autor);

        html += `
            <div class="item-dom-card card-libro" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-verde text-dark badge-compacto">${autor}</span>
                    <a href="${urlLibro}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-book"></i>Goodreads
                    </a>
                </div>
                <h6 class="mb-1 fw-bold">${idx + 1}. ${titulo}</h6>
                <small class="texto-subtitulo d-block">${detalle}</small>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorLibros");
    if (contador) {
        contador.textContent = LIBROS_DATA.length + " Libros";
    }
}

function renderizarJuegos() {
    const contenedor = document.getElementById("contenedorJuegos");
    if (!contenedor) return;

    let html = "";
    JUEGOS_DATA.forEach((j) => {
        const titulo = j[0];
        const plataforma = j[1];
        const detalle = j[2];
        const categoria = j[3];
        const urlJuego = "https://store.playstation.com/es-bo/search/" + encodeURIComponent(titulo);

        html += `
            <div class="item-dom-card card-juego" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <span class="badge barra-morada text-white badge-compacto">${plataforma}</span>
                    <a href="${urlJuego}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-controller"></i>PS Store
                    </a>
                </div>
                <h6 class="mb-1 fw-bold texto-verde">${titulo}</h6>
                <small class="texto-subtitulo d-block">${detalle}</small>
            </div>
        `;
    });

    contenedor.innerHTML = html;
    const contador = document.getElementById("contadorJuegos");
    if (contador) {
        contador.textContent = JUEGOS_DATA.length + " Videojuegos";
    }
}

function renderizarPokemon() {
    const contenedorTitulares = document.getElementById("contenedorTitularesPokemon");
    if (contenedorTitulares) {
        let htmlTitulares = "";
        TITULARES_POKEMON_DATA.forEach((t) => {
            const urlSpriteTitular = URL_POKEAPI_OFFICIAL + t.id + ".png";
            htmlTitulares += `
                <div class="card-titular-mini">
                    <div class="d-flex align-items-start gap-3">
                        <div class="sprite-vgc-box">
                            <img src="${urlSpriteTitular}" alt="${t.nombre}" class="sprite-vgc" loading="lazy">
                        </div>
                        <div class="w-100">
                            <div class="d-flex flex-wrap justify-content-between align-items-center gap-1 mb-1">
                                <span class="badge barra-verde text-dark badge-compacto">TITULAR #${t.rango} | ${t.region}</span>
                                <span class="badge barra-morada text-white badge-compacto">${t.tipos}</span>
                            </div>
                            <h6 class="mb-1 fw-bold texto-verde">${t.nombre} <small class="texto-morado fw-normal">@ ${t.objeto}</small></h6>
                            <p class="small mb-2">${t.rol}</p>
                            <span class="badge-mecanica-activa">${t.mecanica}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        contenedorTitulares.innerHTML = htmlTitulares;
    }

    const contenedor = document.getElementById("contenedorPokemon");
    if (!contenedor) return;

    let html = "";
    POKEDEX_PERSONAL_DATA.forEach((p) => {
        const categoria = p[0];
        const regionLabel = p[1];
        const id = p[2];
        const nombre = p[3];
        const tipos = p[4];
        const objeto = p[5];
        const habilidad = p[6];
        const naturaleza = p[7];
        const movimientos = p[8];
        const mecanica = p[9];
        const rolTitular = p[10];
        const esTitular = categoria.indexOf("titulares") !== -1;
        const claseTitular = esTitular ? "es-titular-vgc" : "";
        const urlSprite = URL_POKEAPI_OFFICIAL + id + ".png";
        const nombreLimpioWiki = nombre.split(" (")[0];
        const urlDex = "https://www.wikidex.net/wiki/" + encodeURIComponent(nombreLimpioWiki);

        const htmlMecanica = mecanica !== ""
            ? `<span class="badge-mecanica-activa">Mecánica Especial: ${mecanica}</span>`
            : `<span class="badge-mecanica-estandar">Mecánica: Estándar VGC / Showdown (Sin transformación)</span>`;

        const htmlBadgeTitular = esTitular
            ? `<span class="badge barra-verde text-dark badge-compacto">TITULAR 6v6</span>`
            : "";

        const htmlRolTitular = rolTitular !== ""
            ? `<div class="mt-2 p-2 rounded small fw-semibold" style="background-color: rgba(0, 255, 157, 0.08); border-left: 3px solid #00ff9d;">${rolTitular}</div>`
            : "";

        let htmlBadgeRegion = "";
        const matchRegion = regionLabel.match(/^(\d+)\.\s*(.+)$/);
        if (matchRegion) {
            const numPad = matchRegion[1].padStart(2, "0");
            const nombreRegion = matchRegion[2];
            htmlBadgeRegion = `<span class="badge-region-vgc"><span class="badge-gen-tag">${numPad}</span>${nombreRegion}</span>`;
        } else {
            htmlBadgeRegion = `<span class="badge-region-vgc">${regionLabel}</span>`;
        }

        html += `
            <div class="card-pokemon-vgc card-pokemon ${claseTitular}" data-categoria="${categoria}">
                <div class="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <div class="d-flex align-items-center gap-3">
                        <div class="sprite-vgc-box">
                            <img src="${urlSprite}" alt="${nombre}" class="sprite-vgc" loading="lazy">
                        </div>
                        <div>
                            <div class="d-flex flex-wrap align-items-center gap-1 mb-1">
                                ${htmlBadgeRegion}
                                <span class="badge barra-verde text-dark badge-compacto">#${id} | ${tipos}</span>
                                ${htmlBadgeTitular}
                            </div>
                            <h5 class="mb-0 fw-bold">${nombre}</h5>
                            <small class="texto-morado fw-bold d-block">@ ${objeto}</small>
                        </div>
                    </div>
                    <a href="${urlDex}" target="_blank" rel="noopener noreferrer" class="link-spotify flex-shrink-0">
                        <i class="bi bi-hdd-network"></i>WikiDex
                    </a>
                </div>

                <div class="d-flex flex-wrap gap-2 my-2 pt-2 border-top border-secondary small">
                    <span class="chip-bento"><strong>Habilidad:</strong> ${habilidad}</span>
                    <span class="chip-bento"><strong>Naturaleza:</strong> ${naturaleza}</span>
                </div>

                <div class="grid-moveset-vgc">
                    <div class="move-pill-vgc"><span class="badge-move-slot">M1</span>${movimientos[0]}</div>
                    <div class="move-pill-vgc"><span class="badge-move-slot">M2</span>${movimientos[1]}</div>
                    <div class="move-pill-vgc"><span class="badge-move-slot">M3</span>${movimientos[2]}</div>
                    <div class="move-pill-vgc"><span class="badge-move-slot">M4</span>${movimientos[3]}</div>
                </div>

                <div class="mt-3">
                    ${htmlMecanica}
                </div>
                ${htmlRolTitular}
            </div>
        `;
    });

    contenedor.innerHTML = html;
}

function actualizarBotonesFiltro(idContenedorBotones, categoriaActiva) {
    const contenedor = document.getElementById(idContenedorBotones);
    if (!contenedor) return;
    const botones = contenedor.querySelectorAll(".btn-filtro, .btn-sheet-tab");
    botones.forEach((btn) => {
        if (btn.dataset.filtro === categoriaActiva) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });
}

function coincideCategoria(catCard, categoria) {
    if (categoria === "todos" || catCard === categoria) {
        return true;
    }
    if (!catCard) {
        return false;
    }
    const partes = catCard.split(" ");
    return partes.indexOf(categoria) !== -1;
}

function cambiarTabIdentidad(nombreTab) {
    const paneles = document.querySelectorAll(".panel-identidad");
    paneles.forEach((panel) => {
        if (panel.id === "panel-id-" + nombreTab) {
            panel.style.display = "block";
        } else {
            panel.style.display = "none";
        }
    });

    const botonesTab = document.querySelectorAll("#tabsIdentidad .btn-tab-cultura");
    botonesTab.forEach((btn) => {
        if (btn.dataset.tabId === nombreTab) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });
}

function navegarTabIdentidad(nombreTab) {
    cambiarTabIdentidad(nombreTab);
    cerrarMenu();
}

function filtrarDev(categoria) {
    const tarjetas = document.querySelectorAll(".card-dev");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosDev", categoria);
    const contador = document.getElementById("contadorDev");
    if (contador) {
        contador.textContent = visibles + " / " + DEV_STACK_DATA.length + " Módulos";
    }
}

function filtrarEducan(categoria) {
    const tarjetas = document.querySelectorAll(".card-educan");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosEducan", categoria);
    const contador = document.getElementById("contadorEducan");
    if (contador) {
        contador.textContent = visibles + " / " + EDUCAN_DATA.length + " Registros";
    }
}

function filtrarArte(categoria) {
    const tarjetas = document.querySelectorAll(".card-arte");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosArte", categoria);
    const contador = document.getElementById("contadorArte");
    if (contador) {
        contador.textContent = visibles + " / " + BLACKBOOK_ARTE_DATA.length + " Piezas";
    }
}

function filtrarIdiomas(categoria) {
    const tarjetas = document.querySelectorAll(".card-idioma");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosIdiomas", categoria);
    const contador = document.getElementById("contadorIdiomas");
    if (contador) {
        contador.textContent = visibles + " / " + IDIOMAS_DATA.length + " Tarjetas";
    }
}

function filtrarColeccion(categoria) {
    const tarjetas = document.querySelectorAll(".card-coleccion");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosColeccion", categoria);
    const contador = document.getElementById("contadorColeccion");
    if (contador) {
        contador.textContent = visibles + " / " + COLECCION_LEGO_HW_DATA.length + " Piezas";
    }
}

function irAVideojuegosFiltro(categoria) {
    cambiarTabCultura("videojuegos");
    filtrar(categoria || "universo-lego");
    cerrarMenu();
}

function filtrarHorario(categoria) {
    const filas = document.querySelectorAll(".fila-horario");
    let visibles = 0;

    filas.forEach((fila) => {
        const catFila = fila.dataset.categoria;
        if (coincideCategoria(catFila, categoria)) {
            fila.style.display = "table-row";
            visibles++;
        } else {
            fila.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosHorario", categoria);
    const contador = document.getElementById("contadorHorario");
    if (contador) {
        contador.textContent = visibles + " / " + HORARIO_SHEETS_DATA.length + " Filas Activas";
    }
}

function cambiarTabMusica(nombreTab) {
    const paneles = {
        playlists: document.getElementById("bloque-playlists"),
        canciones: document.getElementById("bloque-canciones"),
        musicboard: document.getElementById("bloque-musicboard")
    };

    Object.keys(paneles).forEach((clave) => {
        if (paneles[clave]) {
            paneles[clave].style.display = clave === nombreTab ? "block" : "none";
        }
    });

    const botonesTab = document.querySelectorAll("#tabsMusica .btn-tab-cultura");
    botonesTab.forEach((btn) => {
        if (btn.dataset.tabMusica === nombreTab) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });
}

function seleccionarRamaCanciones(rama, filtroEspecifico) {
    const botonesRama = document.querySelectorAll("#ramasCanciones .btn-tab-cultura");
    botonesRama.forEach((btn) => {
        if (btn.dataset.rama === rama) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });

    const botonesFiltro = document.querySelectorAll("#filtrosCanciones .btn-filtro");
    let primerFiltroRama = null;

    botonesFiltro.forEach((btn) => {
        if (btn.dataset.ramaItem === rama) {
            btn.style.display = "inline-block";
            if (!primerFiltroRama) {
                primerFiltroRama = btn.dataset.filtro;
            }
        } else {
            btn.style.display = "none";
        }
    });

    const filtroDestino = filtroEspecifico || primerFiltroRama || "todos";
    filtrarCanciones(filtroDestino);
}

function filtrarPlaylists(categoria) {
    const tarjetas = document.querySelectorAll(".card-playlist");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosPlaylists", categoria);
    const contador = document.getElementById("contadorPlaylists");
    if (contador) {
        contador.textContent = visibles + " / " + PLAYLISTS_DATA.length + " Playlists";
    }
}

function filtrarCanciones(categoria) {
    const tarjetas = document.querySelectorAll(".card-cancion");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosCanciones", categoria);
    const contador = document.getElementById("contadorCanciones");
    if (contador) {
        contador.textContent = visibles + " / " + CANCIONES_Y_DISCOS.length + " Temas";
    }
}

function filtrarMusicboard(categoria) {
    const tarjetas = document.querySelectorAll(".card-musicboard");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosMusicboard", categoria);
    const contador = document.getElementById("contadorMusicboard");
    if (contador) {
        contador.textContent = visibles + " / " + MUSICBOARD_DATA.length + " Reseñas";
    }
}

function filtrarMusica(categoria) {
    filtrarCanciones(categoria);
}

function filtrarHeroes(categoria) {
    const tarjetas = document.querySelectorAll(".card-heroe");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosHeroes", categoria);
    const contador = document.getElementById("contadorHeroes");
    if (contador) {
        contador.textContent = visibles + " / " + HEROES_DATA.length + " Héroes";
    }
}

function filtrarPeliculas(categoria) {
    const tarjetas = document.querySelectorAll(".card-pelicula");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosPeliculas", categoria);
    const contador = document.getElementById("contadorPeliculas");
    if (contador) {
        contador.textContent = visibles + " / " + PELICULAS_DATA.length + " Películas";
    }
}

function filtrarSeries(categoria) {
    const tarjetas = document.querySelectorAll(".card-serie");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosSeries", categoria);
    const contador = document.getElementById("contadorSeries");
    if (contador) {
        contador.textContent = visibles + " / " + SERIES_DATA.length + " Series";
    }
}

function filtrarAnimes(categoria) {
    const tarjetas = document.querySelectorAll(".card-anime");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosAnimes", categoria);
    const contador = document.getElementById("contadorAnimes");
    if (contador) {
        contador.textContent = visibles + " / " + ANIMES_DATA.length + " Animes";
    }
}

function filtrarLibros(categoria) {
    const tarjetas = document.querySelectorAll(".card-libro");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosLibros", categoria);
    const contador = document.getElementById("contadorLibros");
    if (contador) {
        contador.textContent = visibles + " / " + LIBROS_DATA.length + " Libros";
    }
}

function filtrar(categoria) {
    const tarjetas = document.querySelectorAll(".card-juego");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosJuegos", categoria);
    const contador = document.getElementById("contadorJuegos");
    if (contador) {
        contador.textContent = visibles + " / " + JUEGOS_DATA.length + " Videojuegos";
    }
}

function filtrarPokemon(categoria) {
    const tarjetas = document.querySelectorAll(".card-pokemon");
    let visibles = 0;

    tarjetas.forEach((card) => {
        const catCard = card.dataset.categoria;
        if (coincideCategoria(catCard, categoria)) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    actualizarBotonesFiltro("filtrosPokemon", categoria);
    const contador = document.getElementById("contadorPokemon");
    if (contador) {
        contador.textContent = visibles + " / " + POKEDEX_PERSONAL_DATA.length + " Pokémon";
    }
}

function buscarEnPokemon(texto) {
    const termino = texto.trim().toLowerCase();
    const tarjetas = document.querySelectorAll("#salon-pokemon .card-pokemon");
    let visibles = 0;

    tarjetas.forEach((card) => {
        if (termino === "" || card.textContent.toLowerCase().indexOf(termino) !== -1) {
            card.style.display = "block";
            visibles++;
        } else {
            card.style.display = "none";
        }
    });

    const contador = document.getElementById("contadorPokemon");
    if (contador) {
        contador.textContent = visibles + " / " + POKEDEX_PERSONAL_DATA.length + " Pokémon";
    }
}

function irASalonPokemon(categoria) {
    filtrarPokemon(categoria || "titulares");
    cerrarMenu();
    const seccion = document.getElementById("salon-pokemon");
    if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

function buscarEnIdentidad(texto) {
    const termino = texto.trim().toLowerCase();
    const tarjetas = document.querySelectorAll("#actividades .item-dom-card");
    tarjetas.forEach((card) => {
        if (termino === "" || card.textContent.toLowerCase().indexOf(termino) !== -1) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function buscarEnMusica(texto) {
    const termino = texto.trim().toLowerCase();
    const tarjetas = document.querySelectorAll("#favoritos .item-dom-card");
    tarjetas.forEach((card) => {
        if (termino === "" || card.textContent.toLowerCase().indexOf(termino) !== -1) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function buscarEnCultura(texto) {
    const termino = texto.trim().toLowerCase();
    const tarjetas = document.querySelectorAll("#cultura .item-dom-card");
    tarjetas.forEach((card) => {
        if (termino === "" || card.textContent.toLowerCase().indexOf(termino) !== -1) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function buscarEnHeroes(texto) {
    const termino = texto.trim().toLowerCase();
    const tarjetas = document.querySelectorAll("#panteon-heroes .heroe-card");
    tarjetas.forEach((card) => {
        if (termino === "" || card.textContent.toLowerCase().indexOf(termino) !== -1) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

let modoAcordeonActivo = false;

function cambiarSuperBoveda(seccion) {
    modoAcordeonActivo = false;
    const btnAcordeon = document.getElementById("btnModoAcordeon");
    if (btnAcordeon) {
        btnAcordeon.classList.remove("activo");
        btnAcordeon.innerHTML = `<i class="bi bi-arrows-expand me-1"></i>Modo Acordeón: Expandir Todo`;
    }

    const mapaIds = {
        favoritos: "favoritos",
        cultura: "cultura",
        heroes: "panteon-heroes"
    };

    Object.keys(mapaIds).forEach((clave) => {
        const panel = document.getElementById(mapaIds[clave]);
        if (panel) {
            panel.style.display = clave === seccion ? "block" : "none";
        }
    });

    const botonesSuper = document.querySelectorAll("#superTabsBoveda .btn-super-tab");
    botonesSuper.forEach((btn) => {
        if (btn.dataset.superTab === seccion) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });
}

function alternarModoAcordeonBoveda() {
    modoAcordeonActivo = !modoAcordeonActivo;
    const btnAcordeon = document.getElementById("btnModoAcordeon");
    const paneles = document.querySelectorAll(".panel-super-boveda");

    if (modoAcordeonActivo) {
        paneles.forEach((p) => {
            p.style.display = "block";
        });
        if (btnAcordeon) {
            btnAcordeon.classList.add("activo");
            btnAcordeon.innerHTML = `<i class="bi bi-arrows-collapse me-1"></i>Volver a Vista Pestañas Compactas`;
        }
    } else {
        cambiarSuperBoveda("favoritos");
    }
}

function cambiarTabCultura(nombreTab) {
    if (nombreTab === "superheroes") {
        cambiarSuperBoveda("heroes");
        return;
    }
    if (nombreTab === "pokemon") {
        irASalonPokemon("titulares");
        return;
    }

    cambiarSuperBoveda("cultura");
    const paneles = document.querySelectorAll(".panel-cultura");
    paneles.forEach((panel) => {
        if (panel.id === "panel-" + nombreTab) {
            panel.style.display = "block";
        } else {
            panel.style.display = "none";
        }
    });

    const botonesTab = document.querySelectorAll("#tabsCultura .btn-tab-cultura");
    botonesTab.forEach((btn) => {
        if (btn.dataset.tab === nombreTab) {
            btn.classList.add("activo");
        } else {
            btn.classList.remove("activo");
        }
    });
}

function navegarFiltroPlaylist(categoria) {
    cambiarSuperBoveda("favoritos");
    cambiarTabMusica("playlists");
    filtrarPlaylists(categoria);
    cerrarMenu();
}

function navegarFiltroCancion(categoria) {
    cambiarSuperBoveda("favoritos");
    cambiarTabMusica("canciones");
    const botonDestino = document.querySelector(`#filtrosCanciones .btn-filtro[data-filtro="${categoria}"]`);
    const ramaDestino = botonDestino ? botonDestino.dataset.ramaItem : "todos";
    seleccionarRamaCanciones(ramaDestino, categoria);
    cerrarMenu();
}

function navegarMusicboard(categoria) {
    cambiarSuperBoveda("favoritos");
    cambiarTabMusica("musicboard");
    filtrarMusicboard(categoria);
    cerrarMenu();
}

function navegarTabCultura(nombreTab) {
    cambiarTabCultura(nombreTab);
    cerrarMenu();
}

function navegarPanteonHeroes(categoria) {
    cambiarSuperBoveda("heroes");
    filtrarHeroes(categoria);
    cerrarMenu();
}

renderizarDev();
renderizarEducan();
renderizarArte();
renderizarIdiomas();
renderizarColeccion();
renderizarHorarioSheets();
renderizarBovedaPlaylists();
renderizarBovedaCanciones();
renderizarMusicboard();
renderizarHeroes();
renderizarPeliculas();
renderizarSeries();
renderizarAnimes();
renderizarLibros();
renderizarJuegos();
renderizarPokemon();

filtrarDev("csharp-net");
filtrarEducan("rehabilitacion");
filtrarArte("poesia-barras");
filtrarIdiomas("frances");
filtrarColeccion("challenger-sueno");
filtrarHorario("rutina-diaria");
filtrarPlaylists("gaming-ps4");
seleccionarRamaCanciones("bandas", "gorillaz");
filtrarMusicboard("diez-de-diez");
filtrarHeroes("antiheroes");
filtrarPeliculas("sagas");
filtrarSeries("drama");
filtrarAnimes("shonen");
filtrarLibros("terror");
filtrar("sagas-legendarias");
filtrarPokemon("titulares");

const form = document.getElementById("contactForm");
const nombreClienteInput = document.getElementById("nombreCliente");
const correoInput = document.getElementById("correo");
const prefijoPaisInput = document.getElementById("prefijoPais");
const telefonoInput = document.getElementById("telefono");
const fechaReunionInput = document.getElementById("fechaReunion");
const servicioInput = document.getElementById("servicio");
const mensajeInput = document.getElementById("mensaje");
const alertaBox = document.getElementById("alertaBox");

const errorNombre = document.getElementById("errorNombre");
const errorCorreo = document.getElementById("errorCorreo");
const errorTelefono = document.getElementById("errorTelefono");
const errorFecha = document.getElementById("errorFecha");
const errorServicio = document.getElementById("errorServicio");
const errorMensaje = document.getElementById("errorMensaje");

function obtenerFechaHoyLocal() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}

const fechaActual = obtenerFechaHoyLocal();
fechaReunionInput.setAttribute("min", fechaActual);

const VOCABULARIO_VALIDO = new Set([
    "hola", "buenos", "buenas", "dias", "tardes", "noches", "david", "chato", "estimado",
    "necesito", "necesitamos", "quiero", "queremos", "quisiera", "busco", "buscamos", "requiero",
    "contratar", "cotizar", "cotizacion", "presupuesto", "proyecto", "sistema", "sistemas", "web",
    "pagina", "sitio", "aplicacion", "app", "software", "programa", "base", "datos", "sql",
    "server", "csharp", "python", "desarrollo", "desarrollar", "crear", "diseño", "diseno",
    "disenar", "adiestramiento", "adiestrar", "paseo", "paseos", "perro", "perros", "perrito",
    "mascota", "mascotas", "educan", "conducta", "rehabilitacion", "musica", "cancion", "composicion",
    "arte", "urbano", "logo", "graffiti", "empresa", "negocio", "tienda", "reunion", "coordinar",
    "contacto", "llamar", "mensaje", "propuesta", "trabajo", "trabajar", "servicio", "servicios",
    "para", "con", "por", "como", "una", "uno", "del", "las", "los", "que", "mas", "sobre",
    "favor", "gracias", "saludos", "atento", "espero", "respuesta", "informacion", "detalles",
    "implementar", "mejorar", "gestion", "ventas", "inventario", "control", "clientes", "usuarios",
    "microsoft", "google", "upds", "bolivia", "lapaz", "tech", "solutions", "srl", "juan", "perez",
    "carlos", "maria", "luis", "ana", "jose", "diego", "fernando", "gabriel", "alejandro"
]);

function normalizarPalabra(palabra) {
    return palabra
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z]/g, "");
}

function esPalabraSinSentido(palabraCruda) {
    const limpia = normalizarPalabra(palabraCruda);
    if (limpia.length === 0) {
        return false;
    }
    if (VOCABULARIO_VALIDO.has(limpia)) {
        return false;
    }
    if (limpia.length > 16) {
        return true;
    }
    if (/(.)\1\1/.test(limpia)) {
        return true;
    }
    if (/^(..)\1+$/.test(limpia) || /^(...)\1+$/.test(limpia)) {
        return true;
    }
    if (/[asdfghjkl]{4,}/.test(limpia) || /[qwertyuiop]{5,}/.test(limpia) || /[zxcvbnm]{4,}/.test(limpia)) {
        return true;
    }
    if (/[^aeiou]{4,}/.test(limpia) || /[aeiou]{4,}/.test(limpia)) {
        return true;
    }
    if (limpia.length >= 4) {
        const vocales = (limpia.match(/[aeiou]/g) || []).length;
        const proporcion = vocales / limpia.length;
        if (proporcion < 0.25 || proporcion > 0.78) {
            return true;
        }
    }
    return false;
}

function validarTextoPropuesta(texto) {
    if (texto.length < 12) {
        return { valido: false, error: "[!] Describe tu propuesta con al menos 12 caracteres." };
    }
    const tokens = texto.trim().split(/\s+/);
    if (tokens.length < 3) {
        return { valido: false, error: "[!] Escribe al menos 3 palabras explicando lo que necesitas." };
    }

    let palabrasConLetras = 0;
    let palabrasSospechosas = 0;
    let palabrasReconocidas = 0;

    for (let i = 0; i < tokens.length; i++) {
        const limpio = normalizarPalabra(tokens[i]);
        if (limpio.length >= 2) {
            palabrasConLetras++;
            if (VOCABULARIO_VALIDO.has(limpio)) {
                palabrasReconocidas++;
            }
            if (esPalabraSinSentido(tokens[i])) {
                palabrasSospechosas++;
            }
        }
    }

    if (palabrasConLetras < 3) {
        return { valido: false, error: "[X] El mensaje debe contener palabras reales y no solo símbolos." };
    }

    if (palabrasSospechosas > 0) {
        return { valido: false, error: "[X] Se detectó texto sin sentido o teclado aleatorio (ej. spam)." };
    }

    if (palabrasReconocidas === 0 && palabrasConLetras < 5) {
        return { valido: false, error: "[X] Redacta una propuesta real comprensible en español." };
    }

    return { valido: true, error: "" };
}

function marcarEstadoCampo(inputEl, spanError, estado, mensajeError) {
    if (!inputEl || !spanError) return;

    if (estado === null) {
        spanError.innerHTML = "";
        inputEl.classList.remove("campo-invalido", "campo-valido");
    } else if (estado === true) {
        spanError.innerHTML = "";
        inputEl.classList.remove("campo-invalido");
        inputEl.classList.add("campo-valido");
    } else {
        spanError.innerHTML = mensajeError;
        inputEl.classList.remove("campo-valido");
        inputEl.classList.add("campo-invalido");
    }
}

function validarCampoNombre(forzarObligatorio) {
    const nombre = nombreClienteInput.value.trim();
    if (nombre === "") {
        if (forzarObligatorio) {
            marcarEstadoCampo(nombreClienteInput, errorNombre, false, "[!] Campo obligatorio");
        } else {
            marcarEstadoCampo(nombreClienteInput, errorNombre, null, "");
        }
        return false;
    }

    const palabras = nombre.split(/\s+/);
    let tieneSpam = false;
    for (let i = 0; i < palabras.length; i++) {
        if (esPalabraSinSentido(palabras[i])) {
            tieneSpam = true;
            break;
        }
    }

    if (nombre.length < 3 || !/[a-zA-ZáéíóúÁÉÍÓÚñÑ]{2,}/.test(nombre) || tieneSpam) {
        marcarEstadoCampo(nombreClienteInput, errorNombre, false, "[X] Ingresa un nombre o empresa real");
        return false;
    }

    marcarEstadoCampo(nombreClienteInput, errorNombre, true, "");
    return true;
}

function validarCampoCorreo(forzarObligatorio) {
    const valorCorreo = correoInput.value.trim().toLowerCase();
    if (valorCorreo === "") {
        if (forzarObligatorio) {
            marcarEstadoCampo(correoInput, errorCorreo, false, "[!] Campo obligatorio");
        } else {
            marcarEstadoCampo(correoInput, errorCorreo, null, "");
        }
        return false;
    }

    const regexCorreoGmail = /^[a-zA-Z0-9._%+-]{3,}@gmail\.com$/;
    if (!regexCorreoGmail.test(valorCorreo)) {
        marcarEstadoCampo(correoInput, errorCorreo, false, "[X] Debe ser un correo válido terminado en @gmail.com");
        return false;
    }

    const usuarioLocal = valorCorreo.split("@")[0];
    if (esPalabraSinSentido(usuarioLocal)) {
        marcarEstadoCampo(correoInput, errorCorreo, false, "[X] Ingresa un correo @gmail.com real (sin texto aleatorio)");
        return false;
    }

    marcarEstadoCampo(correoInput, errorCorreo, true, "");
    return true;
}

function validarCampoTelefono(forzarObligatorio) {
    const telefono = telefonoInput.value.trim();
    if (telefono === "") {
        if (forzarObligatorio) {
            marcarEstadoCampo(telefonoInput, errorTelefono, false, "[!] Campo obligatorio");
        } else {
            marcarEstadoCampo(telefonoInput, errorTelefono, null, "");
        }
        return false;
    }

    const soloNumeros = /^\d{7,15}$/;
    if (!soloNumeros.test(telefono)) {
        marcarEstadoCampo(telefonoInput, errorTelefono, false, "[X] Solo dígitos numéricos (7 a 15 números, sin letras ni símbolos)");
        return false;
    }

    if (/^(\d)\1{6,}$/.test(telefono)) {
        marcarEstadoCampo(telefonoInput, errorTelefono, false, "[X] Ingresa un número de WhatsApp válido");
        return false;
    }

    marcarEstadoCampo(telefonoInput, errorTelefono, true, "");
    return true;
}

function validarCampoFecha(forzarObligatorio) {
    const fecha = fechaReunionInput.value;
    const fechaMinimaHoy = obtenerFechaHoyLocal();

    if (fecha === "") {
        if (forzarObligatorio) {
            marcarEstadoCampo(fechaReunionInput, errorFecha, false, "[!] Selecciona una fecha");
        } else {
            marcarEstadoCampo(fechaReunionInput, errorFecha, null, "");
        }
        return false;
    }

    if (fecha < fechaMinimaHoy) {
        marcarEstadoCampo(fechaReunionInput, errorFecha, false, "[X] No se permiten fechas pasadas");
        return false;
    }

    marcarEstadoCampo(fechaReunionInput, errorFecha, true, "");
    return true;
}

function validarCampoServicio(forzarObligatorio) {
    const servicio = servicioInput.value;
    if (servicio === "") {
        if (forzarObligatorio) {
            marcarEstadoCampo(servicioInput, errorServicio, false, "[!] Selecciona un servicio");
        } else {
            marcarEstadoCampo(servicioInput, errorServicio, null, "");
        }
        return false;
    }

    marcarEstadoCampo(servicioInput, errorServicio, true, "");
    return true;
}

function validarCampoMensaje(forzarObligatorio) {
    const mensaje = mensajeInput.value.trim();
    if (mensaje === "") {
        if (forzarObligatorio) {
            marcarEstadoCampo(mensajeInput, errorMensaje, false, "[!] Escribe los detalles del trabajo");
        } else {
            marcarEstadoCampo(mensajeInput, errorMensaje, null, "");
        }
        return false;
    }

    const resultadoTexto = validarTextoPropuesta(mensaje);
    if (!resultadoTexto.valido) {
        marcarEstadoCampo(mensajeInput, errorMensaje, false, resultadoTexto.error);
        return false;
    }

    marcarEstadoCampo(mensajeInput, errorMensaje, true, "");
    return true;
}

nombreClienteInput.addEventListener("input", () => validarCampoNombre(false));
nombreClienteInput.addEventListener("blur", () => validarCampoNombre(true));

correoInput.addEventListener("input", () => validarCampoCorreo(false));
correoInput.addEventListener("blur", () => validarCampoCorreo(true));

telefonoInput.addEventListener("input", () => validarCampoTelefono(false));
telefonoInput.addEventListener("blur", () => validarCampoTelefono(true));
prefijoPaisInput.addEventListener("change", () => {
    if (telefonoInput.value.trim() !== "") {
        validarCampoTelefono(false);
    }
});

fechaReunionInput.addEventListener("input", () => validarCampoFecha(false));
fechaReunionInput.addEventListener("change", () => validarCampoFecha(true));
fechaReunionInput.addEventListener("blur", () => validarCampoFecha(true));

servicioInput.addEventListener("change", () => validarCampoServicio(true));
servicioInput.addEventListener("blur", () => validarCampoServicio(true));

mensajeInput.addEventListener("input", () => validarCampoMensaje(false));
mensajeInput.addEventListener("blur", () => validarCampoMensaje(true));

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alertaBox.innerHTML = "";

    const vNombre = validarCampoNombre(true);
    const vCorreo = validarCampoCorreo(true);
    const vTelefono = validarCampoTelefono(true);
    const vFecha = validarCampoFecha(true);
    const vServicio = validarCampoServicio(true);
    const vMensaje = validarCampoMensaje(true);

    if (!vNombre || !vCorreo || !vTelefono || !vFecha || !vServicio || !vMensaje) {
        return;
    }

    const nombre = nombreClienteInput.value.trim();
    const valorCorreo = correoInput.value.trim().toLowerCase();
    const prefijo = prefijoPaisInput.value;
    const telefono = telefonoInput.value.trim();
    const fecha = fechaReunionInput.value;
    const servicio = servicioInput.value;
    const fechaMinimaHoy = obtenerFechaHoyLocal();

    alertaBox.innerHTML = `
        <div class="alert alert-success mt-3 mb-0 border-success bg-transparent">
            <p class="msg-exito mb-1"><i class="bi bi-check-circle-fill me-1"></i>¡Propuesta enviada con éxito, ${nombre}!</p>
            <small class="texto-subtitulo d-block">
                Reunión agendada para el <strong>${fecha}</strong> por el servicio de <em>${servicio}</em>.<br>
                Te contactaremos a tu WhatsApp <strong>${prefijo} ${telefono}</strong> y al correo <strong>${valorCorreo}</strong>.
            </small>
        </div>
    `;

    form.reset();
    fechaReunionInput.setAttribute("min", fechaMinimaHoy);
    marcarEstadoCampo(nombreClienteInput, errorNombre, null, "");
    marcarEstadoCampo(correoInput, errorCorreo, null, "");
    marcarEstadoCampo(telefonoInput, errorTelefono, null, "");
    marcarEstadoCampo(fechaReunionInput, errorFecha, null, "");
    marcarEstadoCampo(servicioInput, errorServicio, null, "");
    marcarEstadoCampo(mensajeInput, errorMensaje, null, "");
});
