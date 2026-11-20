const CACHE_NAME = 'pwa-cache-v8';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './horizontal.html',
    './styles.css',
    './styles.css?v=8',
    './script.js',
    './JS/supabase-api.js',
    './script.js?v=8',
    './manifest.json',
    '../../../data/canciones.json',
    'https://dl.dropboxusercontent.com/scl/fi/opdzkbtttcop66r3hp14b/assassins.jpg?rlkey=j55n68e06m3gt7p8nl4v4wvxc&st=9lt8mmqc&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/wyb1qsoc0rd2anbrwnm38/arquitectura_empresarial.jpg?rlkey=n43mfg9oui2c1d10ab2p05jxi&st=5ttyzz6r&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/mq4nkwx3jzju6dfzn9t9s/scizor.jpg?rlkey=m35z431gwv22uvdvbrp87c5n2&st=acklkspb&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/ipi5s7t4x9m0p58rsybb5/mega-pokeball.jpg?rlkey=bydyp79fydy3o2mcly0bhfo5o&st=43cj6cp7&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/bkkdv7rs5ae4gxpyu0tpt/mega-pikachu.jpg?rlkey=os7irg6e5qbnedz4nx0aujmmz&st=dlm9887q&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/rfdpwyykf6jsp7x3omamv/mega-gyarados.jpg?rlkey=e89tpdclgikwnq855x5w4q2bi&st=snvqgycb&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/ngmybd0pekaftds494v0n/mega-charizard.jpg?rlkey=c9escsrbhjdntbvbgsn0pdi0f&st=ungatjlv&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/8tgv99ow78cvb62xmsfxj/lego-76417-gringotts.jpg?rlkey=isveg7yrbafjt0uubwfdbayc0&st=7ebksb0j&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/r31v8vro8weinbxqkdlfa/lego-76405-hogwarts-express.jpg?rlkey=y2h4694m0tdwu5spu72wxpior&st=ke4y4k9l&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/14pev6o567einwdxv80vg/lego-76391-hogwarts-icons.jpg?rlkey=i34chq3f6iyrapwk3xiuorzl2&st=hbovk6fz&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/q5o9iod2yttxj04z4c7qm/lego-76252-batcave.jpg?rlkey=de7ak4vb215qj6s01etj7cozq&st=23xnf0il&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/3erxtkejk7yc963p20816/lego-76240-tumbler.jpg?rlkey=nnzpdabcvtqylvn7ohdkawxs8&st=p2qwcpyy&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/2p71wv3z8uzto231ufpfr/lego-76139-1989-batmobile.jpg?rlkey=0lta7npihoddqdolpufbn3eom&st=ap3kkm8a&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/ygksbqn3wm6aitbywt3j8/lego-71043-hogwarts.jpg?rlkey=6ojnjild80809oohrijrnfwk9&st=l7v7b990&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/fysl29pzsqt530ma3r324/lego-42127-technic-batmobile.jpg?rlkey=nyrv8wo9m4cp3cwddvrwok15k&st=qiyl2zzc&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/0vjvjbl808mesqq7jrasn/kingdomheart.jpg?rlkey=00ozurttxde3rz4pw8hybsmyl&st=dxe57qcg&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/1u97u18t5kh6rgqhltnyr/hw-toyota-supra-mk4.jpg?rlkey=6rbek6jrmkl9ay97crur8cj7j&st=kz6d07s5&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/a55dzxbniumvku5r32uot/hw-skyline-r34.jpg?rlkey=m5yotdvyjv401r5ik9iwohhda&st=9tvzk4g9&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/sxk7odl5n4plj0185lpoz/hw-porsche-gt3.jpg?rlkey=dcd4fdcb4g3mcevq9tzr2ahhm&st=jj7amlx4&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/3otr9bomz7qv0ubt7ce8o/hw-mazda-rx7.jpg?rlkey=8ibkz5m34rex5rd1lfg7sqsva&st=v4xo9vmh&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/1whxejrp1pmko38ctmbvw/hw-corvette-gt40.jpg?rlkey=c47ynql2k6fileia9adhaxqj2&st=putgsiiq&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/hbusnddkcdwvjiupyymah/hw-challenger-demon.jpg?rlkey=ys2634s52ezmkehwnj2j9qj6i&st=4qxx585n&raw=1',
    'https://dl.dropboxusercontent.com/scl/fi/c2g9v5gx4yvui5jlpghi4/Gorillaz.jpg?rlkey=2xff5hmrelfu19gzjt3n7m81r&st=p7kwgkeg&raw=1',
    'https://code.jquery.com/jquery-3.7.1.min.js',
    'https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css'
];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return Promise.allSettled(ASSETS_TO_CACHE.map(url => cache.add(url)));
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

// Semana 2 - Core Web Vitals BEM y DOMPurify
self.addEventListener('fetch', event => {
    if (event.request.url.includes('supabase.co')) return;
    if (event.request.method !== 'GET') return;
    const req = event.request;
    const esRecursoCodigo = (
        req.destination === 'document' ||
        req.destination === 'style' ||
        req.destination === 'script' ||
        req.url.includes('.json')
    );

    if (esRecursoCodigo) {
        const peticionFresca = req.mode === 'navigate'
            ? fetch(req.url, { cache: 'no-cache' })
            : fetch(req, { cache: 'no-cache' });

        event.respondWith(
            peticionFresca
                .then(networkResponse => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(req, responseClone);
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(req, { ignoreSearch: true }).then(cachedResponse => {
                        if (cachedResponse) return cachedResponse;
                        if (req.mode === 'navigate') {
                            return caches.match('./index.html', { ignoreSearch: true });
                        }
                    });
                })
        );
        return;
    }

    event.respondWith(
        caches.match(req, { ignoreSearch: true }).then(cachedResponse => {
            const redActualizacion = fetch(req).then(networkResponse => {
                const esDropbox = req.url.indexOf('dl.dropboxusercontent.com') > -1;
                if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque' || (esDropbox && networkResponse.ok))) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(req, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => cachedResponse || caches.match(req));

            if (cachedResponse) {
                return cachedResponse;
            }
            return redActualizacion;
        })
    );
});
