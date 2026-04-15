/* ========================================
   🎮 Puzzle Sudamérica - Game Logic v2
   ======================================== */

// ==========================================
// CONFIG
// ==========================================
const UNSPLASH_ACCESS_KEY = 'Jxev90HPjzslJ7p06qmOmEILjjHYmKZaWDPWYJQVNBQ';
const UNSPLASH_CACHE_KEY = 'puzzle_unsplash_cache_v5';
const UNSPLASH_PARAMS = '?w=800&h=800&q=85&fit=crop&crop=attention&auto=format';

// Cache in memory + localStorage
const photoCache = JSON.parse(localStorage.getItem(UNSPLASH_CACHE_KEY) || '{}');

function saveCache() {
    localStorage.setItem(UNSPLASH_CACHE_KEY, JSON.stringify(photoCache));
}

async function imgUrl(slug) {
    if (slug.startsWith('http')) {
        return `https://wsrv.nl/?url=${encodeURIComponent(slug)}&w=800&h=800&fit=cover&a=attention&output=jpg`;
    }
    if (photoCache[slug]) return photoCache[slug];

    try {
        const res = await fetch(
            `https://api.unsplash.com/photos/${slug}?client_id=${UNSPLASH_ACCESS_KEY}`
        );
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        const baseUrl = data.urls.raw.split('?')[0];
        const url = baseUrl + UNSPLASH_PARAMS;
        photoCache[slug] = url;
        saveCache();
        return url;
    } catch {
        return `https://via.placeholder.com/900x600/1a2035/94a3b8?text=${encodeURIComponent(slug)}`;
    }
}

// ==========================================
// DATA
// ==========================================
const CATEGORIES = {
    paisajes: {
        id: 'paisajes',
        name: 'Paisajes',
        icon: '🏔️',
        description: 'Maravillas naturales del continente',
        gradientFrom: '#3b82f6',
        gradientTo: '#8b5cf6',
    },
    animales: {
        id: 'animales',
        name: 'Animales',
        icon: '🦁',
        description: 'Fauna única de Sudamérica',
        gradientFrom: '#10b981',
        gradientTo: '#f59e0b',
    },
    ciudades: {
        id: 'ciudades',
        name: 'Ciudades',
        icon: '🏙️',
        description: 'Metrópolis e historia viva',
        gradientFrom: '#ef4444',
        gradientTo: '#f59e0b',
    }
};

const IMAGES = {
    paisajes: {
        argentina: {
            flag: '🇦🇷', name: 'Argentina',
            items: [
                { id: 'perito_moreno', name: 'Glaciar Perito Moreno', location: 'Santa Cruz, Patagonia', photo: 'V34MPSwaK7k', facts: ['Es uno de los pocos glaciares del mundo que sigue creciendo en lugar de retroceder.', 'Su frente tiene 5 km de ancho y se eleva 60 metros sobre el agua del lago.', 'Cada ciertos años forma un dique natural sobre el Lago Argentino que colapsa espectacularmente.'] },
                { id: 'iguazu', name: 'Cataratas del Iguazú', location: 'Misiones', photo: 'sK2s73nZwz0', facts: ['Son las cataratas más anchas del mundo, con 2,7 km de frente activo.', 'El nombre "Iguazú" en guaraní significa "agua grande".', 'Cuando las visitó Eleanor Roosevelt, exclamó: "¡Pobre Niágara!".'] },
                { id: 'fitz_roy', name: 'Monte Fitz Roy', location: 'El Chaltén, Patagonia', photo: 'HazDeRk87oA', facts: ['Su nombre mapuche es "Chaltén", que significa "montaña que humea" por las nubes que lo rodean.', 'Es considerado uno de los picos más técnicamente difíciles de escalar del mundo.', 'Fue escalado por primera vez en 1952 por una expedición franco-argentina.'] },
                { id: 'nahuel_huapi', name: 'Lago Nahuel Huapi', location: 'Bariloche, Patagonia', photo: 'K_zV9qD53ZY', facts: ['Su nombre en mapuche significa "isla del tigre" o "isla del puma".', 'Tiene más de 500 km² de superficie y 464 metros de profundidad máxima.', 'El Parque Nacional Nahuel Huapi fue el primero de Argentina, creado en 1934.'] },
            ]
        },
        brasil: {
            flag: '🇧🇷', name: 'Brasil',
            items: [
                { id: 'cristo', name: 'Cristo Redentor', location: 'Río de Janeiro', photo: 'eVMLVyrf4g4', facts: ['Mide 38 metros de altura incluyendo el pedestal y es una de las 7 maravillas del mundo moderno.', 'Fue construido entre 1922 y 1931 con la participación del escultor francés Paul Landowski.', 'Sus brazos extendidos miden 28 metros de ancho y pesan 30 toneladas cada uno.'] },
                { id: 'lencois', name: 'Lençóis Maranhenses', location: 'Maranhão', photo: 'lOXd57n2hHU', facts: ['A pesar de parecer un desierto, tiene lluvias estacionales que forman lagunas de agua cristalina.', 'Las lagunas desaparecen completamente en la época seca y vuelven a formarse cada año.', 'El nombre significa "sábanas de Maranhão" por el aspecto blanco ondulado de las dunas.'] },
                { id: 'noronha', name: 'Fernando de Noronha', location: 'Pernambuco', photo: 'PUiEolgEgaE', facts: ['Es un archipiélago volcánico de 21 islas a 545 km de la costa.', 'El acceso está limitado a 420 visitantes por día para proteger su ecosistema marino.', 'Es reconocido por tener aguas con una visibilidad de hasta 50 metros de profundidad.'] },
                { id: 'amazonia', name: 'Selva Amazónica', location: 'Amazonas', photo: 'AycIWyyCuVo', facts: ['Produce aproximadamente el 20% del oxígeno de la Tierra, por eso se la llama "el pulmón del planeta".', 'Alberga el 10% de todas las especies animales conocidas en el planeta.', 'El río Amazonas descarga más agua en el océano que los 7 ríos más grandes del mundo juntos.'] },
            ]
        },
        chile: {
            flag: '🇨🇱', name: 'Chile',
            items: [
                { id: 'torres', name: 'Torres del Paine', location: 'Patagonia chilena', photo: 'rlHAG9QcldI', facts: ['Las torres son formaciones de granito que emergieron hace 12 millones de años.', 'El nombre "Paine" significa "azul" en la lengua del pueblo tehuelche.', 'El parque alberga pumas, guanacos, zorros y el majestuoso cóndor andino.'] },
                { id: 'atacama', name: 'Desierto de Atacama', location: 'Región de Antofagasta', photo: 'Qc6EZC7NWWw', facts: ['Es el desierto no polar más árido del mundo.', 'Algunas zonas no han registrado lluvia en más de 500 años.', 'Cada ciertos años florece con el fenómeno del "desierto florido", cubriendo el suelo de color.'] },
                { id: 'valle_luna', name: 'Valle de la Luna', location: 'Atacama', photo: 'TrWxMFWvk4Y', facts: ['Debe su nombre a su paisaje que evoca la superficie lunar.', 'Fue formado por millones de años de erosión del viento y el agua en la sal y arcilla.', 'Sus colores cambian dramáticamente al atardecer, pasando del ocre al violeta y el rojo.'] },
                { id: 'pascua', name: 'Isla de Pascua', location: 'Rapa Nui', photo: 'thwOv7I363Y', facts: ['Sus famosas estatuas se llaman "moai" y pesan en promedio 14 toneladas.', 'Está a 3.700 km del territorio continental más cercano, siendo uno de los lugares más remotos del mundo.', 'Sus habitantes la llamaban "Te Pito o Te Henua": el ombligo del mundo.'] },
            ]
        },
        uruguay: {
            flag: '🇺🇾', name: 'Uruguay',
            items: [
                { id: 'polonio', name: 'Cabo Polonio', location: 'Rocha', photo: 'FAqQVlNeSUg', facts: ['Es una de las pocas zonas del mundo habitadas sin electricidad de red ni agua corriente.', 'Alberga una de las colonias de lobos marinos del sur más grandes de Sudamérica.', 'Solo se puede llegar en vehículos 4x4 especiales o caminando varios kilómetros por la playa.'] },
                { id: 'punta', name: 'Punta del Este', location: 'Maldonado', photo: 'jHz2WyDBVyo', facts: ['Es conocida como la "Saint-Tropez de Sudamérica" por su vida nocturna y su exclusividad.', 'La escultura "La Mano" en la playa Brava fue creada por el artista chileno Mario Irarrázabal en 1982.', 'Su faro data de 1860 y es uno de los más antiguos en funcionamiento de Uruguay.'] },
                { id: 'colonia_sunset', name: 'Colonia del Sacramento', location: 'Colonia', photo: 'wwBk0aCa7Gs', facts: ['Fue fundada por los portugueses en 1680, siendo la ciudad más antigua de Uruguay.', 'Su casco histórico fue declarado Patrimonio de la Humanidad por la UNESCO en 1995.', 'Está a solo 50 km de Buenos Aires, separada por el Río de la Plata.'] },
            ]
        },
        colombia: {
            flag: '🇨🇴', name: 'Colombia',
            items: [
                { id: 'cocora', name: 'Valle del Cocora', location: 'Quindío', photo: 'akkbyynQtEg', facts: ['Las palmas de cera que crecen aquí son las más altas del mundo, llegando a 60 metros de altura.', 'La palma de cera es el árbol nacional de Colombia desde 1985.', 'El nombre "Cocora" significa "agua de la estrella verde" en lengua quimbaya.'] },
                { id: 'tayrona', name: 'Parque Tayrona', location: 'Magdalena', photo: 'gc5OYAll-rc', facts: ['Combina selva tropical densa, montañas y playas caribeñas en un mismo parque nacional.', 'Fue hogar de la civilización Tayrona, que dejó vestigios arqueológicos aún visibles.', 'La Sierra Nevada de Santa Marta que lo enmarca es la montaña costera más alta del mundo.'] },
                { id: 'cartagena_walls', name: 'Ciudad Amurallada', location: 'Cartagena', photo: 'PM95XBE1Xxk', facts: ['Sus murallas fueron construidas en el siglo XVII para proteger la ciudad de ataques piratas.', 'Fue declarada Patrimonio de la Humanidad por la UNESCO en 1984.', 'Era el principal puerto de salida del oro y la plata del Imperio español en América del Sur.'] },
                { id: 'cano_cristales', name: 'Caño Cristales', location: 'Meta', photo: '5hcxlXRW_KM', facts: ['Es conocido como "el río de los cinco colores" y "el río más hermoso del mundo".', 'Sus colores rojos, amarillos y verdes se deben a una planta acuática única llamada Macarenia clavigera.', 'Solo exhibe sus colores entre junio y noviembre, cuando el nivel del agua es el ideal.'] },
            ]
        },
        peru: {
            flag: '🇵🇪', name: 'Perú',
            items: [
                { id: 'machu_picchu', name: 'Machu Picchu', location: 'Cusco', photo: 'gQzlCU9_ItA', facts: ['Fue construida alrededor de 1450 por el Inca Pachacútec y abandonada casi un siglo después.', 'Permaneció desconocida para el mundo occidental hasta que Hiram Bingham la redescubrió en 1911.', 'Está ubicada a 2.430 metros sobre el nivel del mar, en medio de las montañas de los Andes.'] },
                { id: 'rainbow', name: 'Montaña de Colores', location: 'Cusco', photo: 'kTbZ0n9MzqI', facts: ['Su nombre oficial es Vinicunca y tiene 5.200 metros de altitud.', 'Sus colores son el resultado de la exposición de distintos minerales: hierro, azufre y cobre.', 'Estuvo cubierta de nieve hasta hace pocos años; el calentamiento global reveló sus colores.'] },
                { id: 'huacachina', name: 'Huacachina', location: 'Ica', photo: 'Q-bULd2CYds', facts: ['Es un oasis natural rodeado de dunas que superan los 100 metros de altura.', 'La leyenda dice que la laguna se formó de las lágrimas de una princesa inca sorprendida bañándose.', 'Es uno de los pocos oasis naturales de toda América del Sur.'] },
                { id: 'titicaca', name: 'Lago Titicaca', location: 'Puno', photo: 'xq0MW-DM6Cc', facts: ['Es el lago navegable más alto del mundo, a 3.812 metros sobre el nivel del mar.', 'En su interior viven los Uros, que construyen y habitan islas flotantes de totora.', 'Tiene 8.372 km² de superficie y es compartido entre Perú y Bolivia.'] },
            ]
        },
        bolivia: {
            flag: '🇧🇴', name: 'Bolivia',
            items: [
                { id: 'uyuni', name: 'Salar de Uyuni', location: 'Potosí', photo: '1k-hqjlmBRE', facts: ['Es el desierto de sal más grande del mundo, con 10.582 km² de extensión.', 'Cuando llueve se convierte en el espejo natural más grande del planeta.', 'Contiene aproximadamente el 70% de las reservas mundiales conocidas de litio.'] },
                { id: 'laguna_colorada', name: 'Laguna Colorada', location: 'Potosí', photo: 'Ni0fXNmEPJ4', facts: ['Su color rojizo intenso se debe a los pigmentos de algas microscópicas y sedimentos minerales.', 'Es el hábitat de tres especies de flamencos andinos que anidan en sus orillas.', 'Está ubicada a 4.278 metros sobre el nivel del mar, en el altiplano sur de Bolivia.'] },
                { id: 'valle_luna_bo', name: 'Valle de la Luna', location: 'La Paz', photo: '0dqqcem_lWI', facts: ['Es una formación de arcillas y areniscas esculpidas por la erosión durante millones de años.', 'Está ubicado a solo 10 km del centro de La Paz, siendo un destino turístico muy accesible.', 'Sus agujas y cañones cambian de tonalidad según la luz del sol durante el día.'] },
            ]
        },
        ecuador: {
            flag: '🇪🇨', name: 'Ecuador',
            items: [
                { id: 'galapagos', name: 'Islas Galápagos', location: 'Galápagos', photo: 'LJIjXgutX4g', facts: ['Fueron el laboratorio natural que inspiró a Charles Darwin a desarrollar su teoría de la evolución.', 'Tienen especies únicas en el mundo como la iguana marina, la única que se alimenta en el mar.', 'Están a 1.000 km de la costa ecuatoriana y fueron declaradas Patrimonio de la Humanidad en 1978.'] },
                { id: 'cotopaxi', name: 'Volcán Cotopaxi', location: 'Cotopaxi', photo: 'GvLG8Q-KQ6A', facts: ['Es uno de los volcanes activos más altos del mundo, con 5.897 metros de altura.', 'Su nombre en quechua significa "cuello de luna" o "luna de montaña".', 'Tiene un glaciar en su cima que podría generar lahares peligrosos si entrara en erupción.'] },
                { id: 'amazon_ec', name: 'Selva Amazónica', location: 'Orellana', photo: 'zzzS45Cjhdw', facts: ['Ecuador tiene la mayor biodiversidad por kilómetro cuadrado de toda Sudamérica.', 'El Parque Nacional Yasuní es considerado uno de los lugares con más biodiversidad del planeta.', 'Alberga comunidades indígenas como los Waorani, que han vivido en la selva por siglos.'] },
            ]
        },
        venezuela: {
            flag: '🇻🇪', name: 'Venezuela',
            items: [
                { id: 'angel_falls', name: 'Salto Ángel', location: 'Bolívar', photo: 'TwojIl0NzMY', facts: ['Es la cascada más alta del mundo, con 979 metros de caída libre ininterrumpida.', 'Fue "descubierta" por el aviador estadounidense Jimmy Angel en 1933, quien aterrizó en su cima.', 'Su nombre en lengua pemón es "Kerepakupai Merú", que significa "salto del lugar más profundo".'] },
                { id: 'roraima', name: 'Tepuy Roraima', location: 'Gran Sabana', photo: 'lxmavRZKFJ4', facts: ['Inspiró a Arthur Conan Doyle para escribir "El Mundo Perdido" en 1912.', 'Su cima es tan inaccesible que alberga especies de plantas y animales que no existen en ningún otro lugar.', 'Tiene más de 2.810 metros de altura y su meseta es casi completamente plana.'] },
                { id: 'morrocoy', name: 'Parque Nacional Morrocoy', location: 'Falcón', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Morrocoy_cayo_sombrero.jpg/1280px-Morrocoy_cayo_sombrero.jpg', facts: ['Sus cayos de arena blanca y aguas turquesas lo convierten en uno de los destinos de playa más bellos del Caribe sur.', 'Tiene más de 30 cayos e islotes accesibles solo por lancha.', 'Es hogar de una enorme variedad de corales, pelícanos y flamencos.'] },
                { id: 'medanos', name: 'Médanos de Coro', location: 'Falcón', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/M%C3%A9danos_de_coro.jpg/1280px-M%C3%A9danos_de_coro.jpg', facts: ['Son el único desierto de arena de Venezuela, con dunas que superan los 40 metros de altura.', 'Fueron declarados Parque Nacional en 1974 para proteger este ecosistema único.', 'Las dunas se desplazan constantemente por la acción del viento alisio del noreste.'] },
            ]
        },
        paraguay: {
            flag: '🇵🇾', name: 'Paraguay',
            items: [
                { id: 'ypacarai', name: 'Lago Ypacaraí', location: 'Cordillera', photo: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Lago_Ypacarai_-_panoramio.jpg', facts: ['Fue inmortalizado en la canción "India" de José Asunción Flores, considerada el segundo himno de Paraguay.', 'Tiene 21 km de largo y 5 km de ancho, siendo uno de los lagos más importantes del país.', 'La ciudad de San Bernardino en sus costas fue fundada por inmigrantes alemanes en 1881.'] },
                { id: 'trinidad', name: 'Ruinas de Trinidad', location: 'Itapúa', photo: 'zsdDAztLRiE', facts: ['Son consideradas las ruinas jesuíticas mejor conservadas de toda Sudamérica.', 'Fueron construidas en el siglo XVIII y abandonadas tras la expulsión de los jesuitas en 1767.', 'Junto con las Ruinas de Jesús fueron declaradas Patrimonio de la Humanidad por la UNESCO en 1993.'] },
                { id: 'pantanal_py', name: 'Pantanal Paraguayo', location: 'Alto Paraguay', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Pantanal_-_Rio_Paraguay.jpg/1280px-Pantanal_-_Rio_Paraguay.jpg', facts: ['Es la porción paraguaya del mayor humedal del mundo, compartido con Brasil y Bolivia.', 'Alberga más de 650 especies de aves, incluyendo el jabirú, el ave voladora más grande de América.', 'Los estancieros del Chaco lo llaman "el mar interior" cuando se inunda en época de lluvias.'] },
                { id: 'saltos_monday', name: 'Saltos del Monday', location: 'Alto Paraná', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Salto_Monday.jpg/1280px-Salto_Monday.jpg', facts: ['Tienen 45 metros de altura y 120 metros de ancho, siendo las segundas cataratas más grandes de Paraguay.', 'Están a solo 10 km de Ciudad del Este y son un destino turístico muy accesible.', 'Su nombre en guaraní significa "río de los ladrones" por antiguas leyendas indígenas.'] },
            ]
        },
        guyana: {
            flag: '🇬🇾', name: 'Guyana',
            items: [
                { id: 'kaieteur', name: 'Cataratas Kaieteur', location: 'Potaro-Siparuni', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Kaieteur_Falls.jpg/800px-Kaieteur_Falls.jpg', facts: ['Con 226 metros de caída libre, es una de las cascadas de mayor volumen y altura del mundo.', 'Es 5 veces más alta que las Cataratas del Niágara y el doble de alta que las Victoria.', 'La rana dorada de Kaieteur vive exclusivamente en las bromelias que rodean la cascada.'] },
                { id: 'rupununi', name: 'Sabana del Rupununi', location: 'Alto Takutu', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Rupununi_savanna%2C_Guyana.jpg/1280px-Rupununi_savanna%2C_Guyana.jpg', facts: ['Es una enorme sabana tropical que se extiende entre la selva amazónica y los tepuyes.', 'Está habitada por pueblos indígenas Makushi y Wapishana que mantienen sus tradiciones ancestrales.', 'Durante la temporada de lluvias, los ríos se desbordan creando un ecosistema acuático impresionante.'] },
                { id: 'shell_beach', name: 'Shell Beach', location: 'Barima-Waini', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Shell_Beach_Guyana.jpg/1024px-Shell_Beach_Guyana.jpg', facts: ['Es un sitio de anidación de cuatro especies de tortugas marinas en peligro de extinción.', 'La playa tiene 145 km de largo y está cubierta de millones de conchas marinas.', 'Forma parte de una reserva protegida desde 2011 para conservar las tortugas.'] },
            ]
        },
        surinam: {
            flag: '🇸🇷', name: 'Surinam',
            items: [
                { id: 'reserva_central', name: 'Reserva Natural de Surinam Central', location: 'Sipaliwini', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Voltzberg_Suriname.jpg/1280px-Voltzberg_Suriname.jpg', facts: ['Con 1,6 millones de hectáreas, cubre el 12% del territorio del país y es Patrimonio de la Humanidad.', 'Contiene el inselberg Voltzberg, un domo de granito de 240 metros que emerge de la selva virgen.', 'Alberga más de 5.000 especies de plantas vasculares, muchas aún sin catalogar por la ciencia.'] },
                { id: 'brownsberg', name: 'Parque Natural Brownsberg', location: 'Brokopondo', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Brownsberg3.jpg/1280px-Brownsberg3.jpg', facts: ['Está en una meseta de 500 metros de altura con cascadas que caen hacia el embalse Brokopondo.', 'Es uno de los destinos de ecoturismo más populares de Surinam, a solo 130 km de Paramaribo.', 'Su selva tropical alberga monos aulladores, tucanes y jaguares.'] },
                { id: 'raleighvallen', name: 'Raleighvallen', location: 'Sipaliwini', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Raleighvallen-3.JPG/1280px-Raleighvallen-3.JPG', facts: ['Es accesible solo por avioneta o por río, lo que mantiene su selva casi intacta.', 'El inselberg Voltzberg en su interior ofrece una vista de 360° de selva virgen ininterrumpida.', 'Es hogar del gallito de roca guayanés, con su espectacular plumaje naranja brillante.'] },
            ]
        },
        trinidad: {
            flag: '🇹🇹', name: 'Trinidad y Tobago',
            items: [
                { id: 'pigeon_point', name: 'Pigeon Point', location: 'Tobago', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Pigeon_Point%2C_Tobago.jpg/1280px-Pigeon_Point%2C_Tobago.jpg', facts: ['Es la playa más fotografiada del Caribe, con su icónico muelle de techo de palma.', 'Sus aguas cristalinas y arena blanca la convierten en la postal más reconocida de Trinidad y Tobago.', 'Desde aquí se accede al Nylon Pool, una piscina natural de aguas poco profundas en medio del mar.'] },
                { id: 'pitch_lake', name: 'Lago de Asfalto', location: 'La Brea, Trinidad', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Pitch_Lake_2.jpg/1280px-Pitch_Lake_2.jpg', facts: ['Es el mayor depósito natural de asfalto del mundo, con más de 40 hectáreas de superficie.', 'Se estima que contiene 10 millones de toneladas de asfalto y ha sido explotado desde 1595.', 'Walter Raleigh lo usó para calafatear sus barcos durante su exploración de las Américas.'] },
                { id: 'caroni_swamp', name: 'Pantano Caroni', location: 'Trinidad', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Scarlet_Ibis_at_Caroni_Swamp.jpg/1280px-Scarlet_Ibis_at_Caroni_Swamp.jpg', facts: ['Es el hogar del ibis escarlata, el ave nacional de Trinidad y Tobago.', 'Al atardecer, miles de ibis regresan a dormir en los manglares creando un espectáculo rojo brillante.', 'El pantano tiene 12.000 hectáreas de manglares que protegen la costa de huracanes.'] },
            ]
        },
    },
    animales: {
        sudamerica: {
            flag: '🌎', name: 'Sudamérica',
            items: [
                { id: 'jaguar', name: 'Jaguar', location: 'Pantanal, Brasil', photo: 'cC2I3_XvFDs', facts: ['Es el felino más grande de América y el tercero más grande del mundo.', 'Nada muy bien y es uno de los pocos felinos que disfruta del agua.', 'Su nombre en guaraní, "yaguaretá", significa "el que mata de un solo salto".'] },
                { id: 'tucan', name: 'Tucán', location: 'Selva tropical', photo: 'aIc0mwL-Tt0', facts: ['Su enorme pico de colores le sirve para regular su temperatura corporal.', 'A pesar del tamaño del pico, come con la punta y lanza la comida hacia atrás para tragarla.', 'Hay más de 40 especies de tucanes distribuidas en América Latina.'] },
                { id: 'tapir', name: 'Tapir', location: 'Amazonia', photo: '1m8mdst8JTE', facts: ['Es el mamífero terrestre más grande de Sudamérica, pudiendo pesar hasta 300 kg.', 'Su pequeña trompa prensil es muy útil para agarrar hojas y frutas.', 'Está emparentado con los caballos y los rinocerontes, y no con los cerdos como parece.'] },
                { id: 'condor', name: 'Cóndor Andino', location: 'Andes', photo: 'fGvDhUKTdUc', facts: ['Es el ave voladora más grande del mundo, con una envergadura de hasta 3,3 metros.', 'Puede vivir más de 70 años, siendo una de las aves con mayor longevidad.', 'Era considerado una divinidad que conectaba el mundo de los vivos con el cielo por los pueblos andinos.'] },
                { id: 'capibara', name: 'Capibara', location: 'Humedales', photo: 'kl617diIESw', facts: ['Es el roedor más grande del mundo, puede pesar hasta 65 kg.', 'Son muy sociables y viven en grupos de hasta 20 individuos alrededor del agua.', 'Se relacionan pacíficamente con casi cualquier especie, incluso con depredadores cuando están saciados.'] },
                { id: 'pinguino', name: 'Pingüino de Magallanes', location: 'Tierra del Fuego', photo: 'zBVhMwd7g_A', facts: ['Migra hasta 3.000 km en busca de alimento durante el invierno austral.', 'Forman parejas de por vida y vuelven cada año al mismo nido.', 'Su nombre se debe a Hernando de Magallanes, quien los describió por primera vez en 1520.'] },
                { id: 'llama', name: 'Llama', location: 'Andes', photo: 'OQykYSpB5qQ', facts: ['Fue domesticada por los incas hace más de 5.000 años como animal de carga.', 'Puede cargar hasta el 30% de su peso corporal durante largas distancias.', 'Cuando se molesta o siente amenazada, escupe con notable precisión y alcance.'] },
                { id: 'flamingo', name: 'Flamenco Andino', location: 'Salar de Bolivia', photo: 't0_p8hlJiZw', facts: ['Su color rosado no es genético: viene de los pigmentos de los crustáceos y algas que consume.', 'Puede vivir en lagunas con hasta 10 veces más sal que el agua del mar.', 'Duerme parado sobre una sola pata para conservar el calor corporal.'] },
                { id: 'guacamayo', name: 'Guacamayo', location: 'Amazonia', photo: 'nzBMNJvWZAE', facts: ['Puede aprender a imitar palabras, frases y sonidos con gran precisión.', 'Forma parejas de por vida y se cuidan y acicalan mutuamente.', 'Su pico es tan fuerte que puede romper nueces con cáscara dura fácilmente.'] },
                { id: 'oso_hormiguero', name: 'Oso Hormiguero', location: 'Pantanal, Brasil', photo: 'FmukIbiGMrk', facts: ['Come hasta 35.000 hormigas y termitas por día.', 'No tiene dientes: tritura los insectos con su musculosa molleja y los traga con la lengua.', 'Su lengua puede extenderse 60 cm y vibra hasta 150 veces por minuto.'] },
                { id: 'anaconda', name: 'Anaconda', location: 'Amazonia', photo: 'BJZK8bc2mhE', facts: ['Es la serpiente más pesada del mundo, pudiendo superar los 200 kg.', 'No es venenosa: mata a sus presas por constricción, apretándolas hasta que dejan de respirar.', 'Puede pasar varios meses sin comer después de una presa de gran tamaño.'] },
                { id: 'rana_dardo', name: 'Rana Dardo', location: 'Amazonia', photo: '98dUMCI_KI8', facts: ['Es uno de los animales más venenosos del planeta pese a medir apenas 5 cm.', 'Los indígenas usaban su veneno para envenenar las puntas de sus cerbatanas y flechas.', 'En cautiverio pierden su veneno al no consumir los insectos que lo producen.'] },
                { id: 'piranha', name: 'Piraña', location: 'Pantanal, Brasil', photo: 'sIzlhggRAqg', facts: ['A pesar de su fama feroz, los ataques graves a humanos son extremadamente raros.', 'Tiene los dientes más afilados proporcionalmente de todos los peces de agua dulce.', 'Son omnívoras y también comen plantas, frutas caídas al agua y animales muertos.'] },
                { id: 'caiman', name: 'Caimán Negro', location: 'Amazonia', photo: 'euquelL3lkw', facts: ['Es el depredador más grande de la cuenca amazónica.', 'Puede alcanzar los 5 metros de longitud y pesar hasta 400 kg.', 'A diferencia de los cocodrilos marinos, habita exclusivamente en agua dulce.'] },
                { id: 'lobo_marino', name: 'Lobo Marino', location: 'Galápagos, Ecuador', photo: '1HaoVXAbsv4', facts: ['Puede bucear hasta 200 metros de profundidad en busca de peces.', 'Las hembras reconocen a sus crías entre miles de individuos por su voz característica.', 'En las Galápagos no temen a los humanos y suelen acercarse con curiosidad.'] },
                { id: 'mono', name: 'Mono Araña', location: 'Amazonia', photo: 'R8w5il3avv8', facts: ['Tiene cinco extremidades funcionales: cuatro patas y una cola prensil tan hábil como una mano.', 'Es uno de los primates más inteligentes de América, capaz de usar herramientas rudimentarias.', 'Vive en grupos de hasta 30 individuos con complejas estructuras sociales y jerarquías.'] },
                { id: 'vicuna', name: 'Vicuña', location: 'Andes, Perú', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Vicugna_vicugna_-_Lauca_National_Park.jpg/1280px-Vicugna_vicugna_-_Lauca_National_Park.jpg', facts: ['Su lana es la más fina y costosa del mundo, más suave que el cashmere.', 'Aparece en el escudo nacional de Perú como símbolo de la riqueza animal del país.', 'Vive a más de 4.000 metros de altura y fue sagrada para los incas.'] },
                { id: 'delfin_rosado', name: 'Delfín Rosado', location: 'Amazonia', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Inia_geoffrensis2.jpg/1280px-Inia_geoffrensis2.jpg', facts: ['Es el delfín de río más grande del mundo, puede medir hasta 2,5 metros.', 'Su color rosado se intensifica cuando está excitado o activo, como un rubor natural.', 'En la mitología amazónica se transforma en un hombre apuesto que seduce a las mujeres.'] },
                { id: 'oso_anteojos', name: 'Oso de Anteojos', location: 'Andes', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Spectacled_Bear_-_Houston_Zoo.jpg/800px-Spectacled_Bear_-_Houston_Zoo.jpg', facts: ['Es la única especie de oso en Sudamérica y está en peligro de extinción.', 'Las marcas claras alrededor de sus ojos son únicas en cada individuo, como huellas dactilares.', 'Es principalmente herbívoro y puede trepar árboles de hasta 30 metros para buscar frutas.'] },
                { id: 'armadillo', name: 'Armadillo', location: 'Gran Chaco', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Nine-banded_Armadillo.jpg/1280px-Nine-banded_Armadillo.jpg', facts: ['Su armadura ósea es única entre los mamíferos y lo protege de la mayoría de depredadores.', 'El armadillo de nueve bandas siempre tiene cuatrillizos genéticamente idénticos.', 'Puede contener la respiración hasta 6 minutos para cruzar ríos caminando por el fondo.'] },
            ]
        }
    },
    ciudades: {
        argentina: {
            flag: '🇦🇷', name: 'Argentina',
            items: [
                { id: 'obelisco', name: 'Obelisco', location: 'Buenos Aires', photo: 'ekA3fTefJMA', facts: ['Fue construido en solo 31 días en 1936 para conmemorar el cuarto centenario de Buenos Aires.', 'Mide 67,5 metros de altura y es el símbolo más reconocible de la ciudad.', 'En cada festejo importante, los argentinos se reúnen espontáneamente a su alrededor.'] },
                { id: 'caminito', name: 'Caminito', location: 'La Boca, Buenos Aires', photo: 'fl3fdbbtj4Q', facts: ['Sus casas de colores se pintaron originalmente con la pintura sobrante de los barcos del puerto.', 'Su nombre viene de una famosa canción de tango de 1926 compuesta por Juan de Dios Filiberto.', 'Es el barrio más fotografiado de Buenos Aires y cuna del tango rioplatense.'] },
                { id: 'puerto_madero', name: 'Puerto Madero', location: 'Buenos Aires', photo: 'VXSlXVlLLY4', facts: ['Es el barrio más nuevo y uno de los más exclusivos de Buenos Aires, creado en los años 90.', 'Fue construido sobre antiguos depósitos portuarios que estuvieron abandonados décadas.', 'Alberga el Puente de la Mujer, una pasarela giratoria diseñada por Santiago Calatrava.'] },
            ]
        },
        brasil: {
            flag: '🇧🇷', name: 'Brasil',
            items: [
                { id: 'pelourinho', name: 'Pelourinho', location: 'Salvador, Bahía', photo: 'BGD47PMGzyM', facts: ['Es el centro histórico colonial de Salvador y Patrimonio de la Humanidad desde 1985.', 'Su nombre significa "picota" en portugués, ya que allí se castigaba públicamente a los esclavizados.', 'Es el corazón de la cultura afrobrasileña, con música, capoeira y religiones de origen africano.'] },
                { id: 'rio_sugarloaf', name: 'Pan de Azúcar', location: 'Río de Janeiro', photo: 'P40XjykprjM', facts: ['Su nombre en portugués es "Pão de Açúcar" y tiene 396 metros de altura sobre la bahía.', 'El teleférico que sube al cerro fue el primero de Brasil, inaugurado en 1912.', 'Desde su cima se ve toda la bahía de Guanabara, el Cristo Redentor y las playas de Río.'] },
                { id: 'sao_paulo', name: 'São Paulo', location: 'São Paulo', photo: '6OMe9rp3v9c', facts: ['Es la ciudad más grande de Sudamérica, con más de 22 millones de habitantes en su área metropolitana.', 'Tiene la mayor flota de helicópteros privados del mundo, usados para evitar el tráfico.', 'Es el mayor polo económico y financiero de América Latina.'] },
            ]
        },
        chile: {
            flag: '🇨🇱', name: 'Chile',
            items: [
                { id: 'santiago', name: 'Santiago', location: 'Región Metropolitana', photo: 'QH3rBhcJS54', facts: ['Está ubicada en un valle rodeado por la Cordillera de los Andes y la Cordillera de la Costa.', 'En días despejados se puede ver el Aconcagua —la montaña más alta de América— desde la ciudad.', 'Fue fundada por el conquistador español Pedro de Valdivia el 12 de febrero de 1541.'] },
                { id: 'valparaiso', name: 'Valparaíso', location: 'Valparaíso', photo: 'H6KJ2D0LphU', facts: ['Es conocida como "La Joya del Pacífico" por sus coloridas casas en los cerros.', 'Fue declarada Patrimonio de la Humanidad por la UNESCO en 2003.', 'Pablo Neruda tenía una de sus casas preferidas aquí: La Sebastiana.'] },
                { id: 'valparaiso2', name: 'Valparaíso Cerros', location: 'Valparaíso', photo: 'qGcIfPdQSb4', facts: ['Sus famosos ascensores (funiculares) fueron construidos entre 1883 y 1916 para subir los cerros.', 'La ciudad tiene más de 40 cerros habitados, cada uno con su propio carácter y nombre.', 'Fue uno de los puertos más importantes del mundo antes de la apertura del Canal de Panamá.'] },
            ]
        },
        colombia: {
            flag: '🇨🇴', name: 'Colombia',
            items: [
                { id: 'bogota', name: 'Bogotá', location: 'Cundinamarca', photo: 'gdcT7prXMzE', facts: ['Está ubicada a 2.600 metros sobre el nivel del mar, siendo una de las capitales más altas del mundo.', 'Su Museo del Oro alberga la mayor colección de orfebrería precolombina del mundo.', 'Es la tercera ciudad más grande de Sudamérica y el principal centro cultural del país.'] },
                { id: 'cartagena_street', name: 'Cartagena Colorida', location: 'Cartagena de Indias', photo: 'JINIW3yzobc', facts: ['Sus casas de colores brillantes son características del estilo colonial caribeño del siglo XVII.', 'Gabriel García Márquez ambientó varias de sus novelas en esta ciudad.', 'Fue durante siglos el principal puerto de exportación del oro del Imperio español.'] },
                { id: 'guatape', name: 'Guatapé', location: 'Antioquia', photo: 'Q8HGO9en0sY', facts: ['La famosa Piedra del Peñol tiene 220 metros de altura y 740 escalones para llegar a la cima.', 'El embalse que rodea el pueblo fue creado artificialmente en los años 70 para generar electricidad.', 'Cada casa del centro tiene un zócalo pintado con figuras que representan escenas del dueño.'] },
            ]
        },
        peru: {
            flag: '🇵🇪', name: 'Perú',
            items: [
                { id: 'cusco', name: 'Cusco', location: 'Plaza de Armas', photo: '2LydtNCRBv8', facts: ['Fue la capital del Imperio Inca y en quechua "Qusqu" significa "ombligo del mundo".', 'Está a 3.400 metros sobre el nivel del mar, en plena Cordillera de los Andes.', 'Muchas iglesias coloniales fueron construidas directamente sobre los cimientos de templos incas.'] },
                { id: 'lima', name: 'Lima Miraflores', location: 'Lima', photo: 'JvxnQV_gaO8', facts: ['Lima es la segunda ciudad capital más grande del mundo ubicada en un desierto, después de El Cairo.', 'Miraflores tiene acantilados de hasta 70 metros que caen directamente sobre el océano Pacífico.', 'Lima concentra más de un tercio de la población total del Perú.'] },
                { id: 'arequipa', name: 'Arequipa', location: 'Arequipa', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Plaza_de_Armas_de_Arequipa.jpg/1280px-Plaza_de_Armas_de_Arequipa.jpg', facts: ['Es conocida como la "Ciudad Blanca" por sus edificios construidos con sillar, piedra volcánica blanca.', 'Está dominada por el volcán Misti de 5.822 metros, que enmarca la ciudad como un telón de fondo.', 'Su centro histórico fue declarado Patrimonio de la Humanidad por la UNESCO en 2000.'] },
            ]
        },
        uruguay: {
            flag: '🇺🇾', name: 'Uruguay',
            items: [
                { id: 'colonia_colonial', name: 'Colonia del Sacramento', location: 'Colonia', photo: 'PWjA3zA497I', facts: ['Sus calles empedradas con piedras traídas de Portugal son únicas en toda Sudamérica.', 'La Calle de los Suspiros es una de las más fotografiadas y reconocidas de Uruguay.', 'Fue disputada entre España y Portugal durante más de 100 años antes de pertenecer a Uruguay.'] },
                { id: 'punta_buildings', name: 'Punta del Este', location: 'Maldonado', photo: 'ehFgttlFJNA', facts: ['Tiene más rascacielos por kilómetro cuadrado que cualquier otra ciudad de Sudamérica.', 'Es conocida como la "Marbella de Sudamérica" por su jet set internacional en verano.', 'Su nombre viene del cabo que forma el punto más oriental de Uruguay.'] },
                { id: 'punta_skyline', name: 'Punta del Este Skyline', location: 'Maldonado', photo: 'gnwPEQZR9pk', facts: ['Concentra algunas de las propiedades más caras y exclusivas de toda Sudamérica.', 'La península separa las aguas más bravas del océano Atlántico de las tranquilas del Río de la Plata.', 'En enero recibe más turistas que toda la población de Uruguay.'] },
            ]
        },
        bolivia: {
            flag: '🇧🇴', name: 'Bolivia',
            items: [
                { id: 'la_paz', name: 'La Paz', location: 'La Paz', photo: 'T_oeAGfY3MI', facts: ['Es la sede de gobierno más alta del mundo, a 3.640 metros sobre el nivel del mar.', 'Su sistema de teleféricos urbanos es el más extenso del mundo, con más de 30 km de líneas.', 'Está rodeada por el altiplano y vigila el nevado Illimani de 6.438 metros.'] },
                { id: 'sucre', name: 'Sucre', location: 'Chuquisaca', photo: 'P3kH_hH-4z4', facts: ['Es la capital constitucional de Bolivia y fue declarada Patrimonio de la Humanidad en 1991.', 'Es conocida como "la ciudad blanca" por la obligación histórica de pintar sus edificios de blanco.', 'Aquí se firmó la Declaración de Independencia de Bolivia el 6 de agosto de 1825.'] },
                { id: 'cochabamba', name: 'Cochabamba', location: 'Cochabamba', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Cristo_de_la_Concordia_Cochabamba.jpg/800px-Cristo_de_la_Concordia_Cochabamba.jpg', facts: ['Su Cristo de la Concordia mide 34,2 metros, siendo más alto que el Cristo Redentor de Río.', 'Es conocida como la "Ciudad Jardín" por su clima primaveral todo el año a 2.500 metros de altura.', 'Es la capital gastronómica de Bolivia, famosa por su variedad de platos tradicionales.'] },
            ]
        },
        ecuador: {
            flag: '🇪🇨', name: 'Ecuador',
            items: [
                { id: 'quito', name: 'Quito', location: 'Pichincha', photo: 'IUwpdJVM4Fc', facts: ['Es la capital más alta del mundo en funciones, a 2.850 metros sobre el nivel del mar.', 'Su centro histórico fue el primero en ser declarado Patrimonio de la Humanidad por la UNESCO en 1978.', 'Está ubicada a tan solo 25 km del ecuador geográfico, pero su clima es primaveral todo el año.'] },
                { id: 'cuenca', name: 'Cuenca', location: 'Azuay', photo: 'rI0arLMf4do', facts: ['Es la tercera ciudad más grande de Ecuador y Patrimonio de la Humanidad desde 1999.', 'Los famosos sombreros "Panama" son en realidad de origen ecuatoriano, fabricados en Cuenca.', 'El río Tomebamba que atraviesa la ciudad fue fundamental para la civilización Cañari.'] },
                { id: 'guayaquil', name: 'Guayaquil', location: 'Guayas', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Malecon2000_Guayaquil.jpg/1280px-Malecon2000_Guayaquil.jpg', facts: ['Es la ciudad más grande y poblada de Ecuador, con más de 2,7 millones de habitantes.', 'El Malecón 2000 es un paseo de 2,5 km junto al río Guayas que revitalizó la ciudad.', 'Es el principal puerto del país y motor económico del Ecuador.'] },
            ]
        },
        venezuela: {
            flag: '🇻🇪', name: 'Venezuela',
            items: [
                { id: 'caracas', name: 'Caracas', location: 'Distrito Capital', photo: '8Pm2WioMBBQ', facts: ['Está ubicada en un valle a solo 900 metros de altura pero a pocos kilómetros del mar Caribe.', 'Es la ciudad natal de Simón Bolívar, el Libertador que independizó cinco países de América del Sur.', 'Su teleférico del Warairarepano une el centro de la ciudad con la montaña y la costa en minutos.'] },
                { id: 'merida', name: 'Mérida', location: 'Mérida', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/M%C3%A9rida_Venezuela_2.jpg/1280px-M%C3%A9rida_Venezuela_2.jpg', facts: ['Tiene el teleférico más alto y segundo más largo del mundo, subiendo hasta los 4.765 metros.', 'Es la capital universitaria de Venezuela, con una vida cultural y estudiantil muy activa.', 'Está rodeada por la Sierra Nevada con picos que superan los 5.000 metros de altura.'] },
                { id: 'maracaibo', name: 'Maracaibo', location: 'Zulia', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Puente_General_Rafael_Urdaneta.jpg/1280px-Puente_General_Rafael_Urdaneta.jpg', facts: ['Su puente sobre el lago es uno de los más largos de Sudamérica con 8,7 km.', 'El Lago de Maracaibo es el más grande de toda Sudamérica con 13.210 km².', 'Es una de las ciudades más calurosas del continente, con promedios de 35°C todo el año.'] },
            ]
        },
        paraguay: {
            flag: '🇵🇾', name: 'Paraguay',
            items: [
                { id: 'asuncion', name: 'Asunción', location: 'Distrito Capital', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Asunci%C3%B3n_Panor%C3%A1mica.jpg/1280px-Asunci%C3%B3n_Panor%C3%A1mica.jpg', facts: ['Es conocida como "Madre de Ciudades" por ser base de las expediciones que fundaron otras ciudades coloniales.', 'Fue fundada el 15 de agosto de 1537, siendo una de las ciudades más antiguas de Sudamérica.', 'La bahía de Asunción sobre el río Paraguay es el corazón histórico y comercial del país.'] },
                { id: 'encarnacion', name: 'Encarnación', location: 'Itapúa', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Costanera_de_Encarnaci%C3%B3n.jpg/1280px-Costanera_de_Encarnaci%C3%B3n.jpg', facts: ['Es conocida como la "Perla del Sur" y capital del carnaval paraguayo.', 'Su costanera sobre el río Paraná es una de las obras urbanas más modernas del país.', 'Es puerta de entrada a las ruinas jesuíticas de Trinidad y Jesús, Patrimonio de la Humanidad.'] },
                { id: 'ciudad_del_este', name: 'Ciudad del Este', location: 'Alto Paraná', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ciudad_del_Este_Paraguay.jpg/1280px-Ciudad_del_Este_Paraguay.jpg', facts: ['Es la segunda ciudad más grande de Paraguay y uno de los centros comerciales más activos del mundo.', 'El Puente de la Amistad que la une con Foz do Iguazú tiene un tránsito de miles de personas diarias.', 'Está en la Triple Frontera entre Paraguay, Brasil y Argentina.'] },
            ]
        },
        guyana: {
            flag: '🇬🇾', name: 'Guyana',
            items: [
                { id: 'georgetown', name: 'Georgetown', location: 'Demerara-Mahaica', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/St._George%27s_Cathedral%2C_Georgetown%2C_Guyana.jpg/800px-St._George%27s_Cathedral%2C_Georgetown%2C_Guyana.jpg', facts: ['La Catedral de San Jorge es una de las iglesias de madera más altas del mundo con 43 metros.', 'Es la única capital de Sudamérica donde el inglés es el idioma oficial.', 'Gran parte de la ciudad está por debajo del nivel del mar, protegida por diques y canales holandeses.'] },
                { id: 'stabroek', name: 'Mercado Stabroek', location: 'Georgetown', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Stabroek_Market.jpg/1024px-Stabroek_Market.jpg', facts: ['Es el mercado más grande y emblemático de Guyana, construido en hierro fundido en 1881.', 'Su torre del reloj de estilo victoriano es el punto de referencia más reconocido de Georgetown.', 'Aquí se mezclan las culturas india, africana, amerindia y europea que forman la identidad guyanesa.'] },
            ]
        },
        surinam: {
            flag: '🇸🇷', name: 'Surinam',
            items: [
                { id: 'paramaribo', name: 'Paramaribo', location: 'Paramaribo', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Paramaribo_waterkant.JPG/1280px-Paramaribo_waterkant.JPG', facts: ['Su centro histórico es Patrimonio de la Humanidad desde 2002 por su arquitectura colonial holandesa.', 'Es la única capital del mundo donde conviven una sinagoga y una mezquita una al lado de la otra.', 'El neerlandés es el idioma oficial, siendo el único país de habla holandesa en Sudamérica.'] },
                { id: 'fort_zeelandia', name: 'Fort Zeelandia', location: 'Paramaribo', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Fort_Zeelandia_Paramaribo.JPG/1280px-Fort_Zeelandia_Paramaribo.JPG', facts: ['Es la fortaleza más antigua de Surinam, construida por los ingleses en 1651 y tomada por los holandeses.', 'Hoy es el Museo de Surinam y alberga la historia colonial y de independencia del país.', 'Desde sus murallas se tiene una vista panorámica del río Surinam y la ciudad.'] },
            ]
        },
        trinidad: {
            flag: '🇹🇹', name: 'Trinidad y Tobago',
            items: [
                { id: 'port_of_spain', name: 'Puerto España', location: 'Trinidad', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Port_of_spain_trinidad.jpg/1280px-Port_of_spain_trinidad.jpg', facts: ['Es la capital y centro financiero del Caribe anglófono, con una arquitectura que mezcla colonial y moderno.', 'Su carnaval es considerado el más grande del Caribe y uno de los más coloridos del mundo.', 'El steelpan (tambor de acero) fue inventado aquí, siendo el único instrumento acústico del siglo XX.'] },
                { id: 'scarborough', name: 'Scarborough', location: 'Tobago', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Scarborough%2C_Tobago.jpg/1280px-Scarborough%2C_Tobago.jpg', facts: ['Es la capital de Tobago y tiene el Fort King George del siglo XVIII con vistas espectaculares.', 'Tobago tiene la selva tropical protegida más antigua del hemisferio occidental, desde 1776.', 'La isla es mucho más tranquila que Trinidad y es el destino de playa preferido del país.'] },
            ]
        },
    }
};

const DIFFICULTIES = {
    3: { label: 'Fácil', icon: '🟢' },
    4: { label: 'Medio', icon: '🟡' },
    5: { label: 'Difícil', icon: '🟠' },
    6: { label: 'Experto', icon: '🔴' }
};

// Move limits per difficulty (future: draw from global regen pool)
const MOVE_LIMITS = { 3: 15, 4: 30, 5: 55, 6: 90 };

// ==========================================
// PLAYER
// ==========================================
let playerName = localStorage.getItem('puzzle_player_name') || '';

// ==========================================
// SOUND SYSTEM (Web Audio API — 0 KB files)
// ==========================================
let audioCtx = null;
let ambientNodes = [];
let soundEnabled = localStorage.getItem('puzzle_sound') !== '0';

function getAudioCtx() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
}

function playTone(freq, type, volume, duration, delay = 0) {
    if (!soundEnabled) return;
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = type;
        osc.frequency.value = freq;
        const t = ctx.currentTime + delay;
        gain.gain.setValueAtTime(volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
        osc.start(t);
        osc.stop(t + duration);
    } catch(e) {}
}

function playClick() {
    playTone(700, 'sine', 0.07, 0.07);
}

function playCorrect() {
    [523, 659, 784].forEach((f, i) => playTone(f, 'sine', 0.12, 0.25, i * 0.08));
}

function playWin() {
    [523, 659, 784, 659, 1047].forEach((f, i) => playTone(f, 'sine', 0.18, 0.35, i * 0.13));
}

function playOutOfMoves() {
    [300, 240, 180].forEach((f, i) => playTone(f, 'sawtooth', 0.09, 0.3, i * 0.15));
}

function startAmbient() {
    if (!soundEnabled || ambientNodes.length > 0) return;
    try {
        const ctx = getAudioCtx();
        const master = ctx.createGain();
        master.gain.value = 0.035;
        master.connect(ctx.destination);
        [130.81, 196.00, 261.63].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();
            lfo.frequency.value = 0.12 + idx * 0.05;
            lfoGain.gain.value = freq * 0.004;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            osc.type = 'sine';
            osc.frequency.value = freq;
            osc.connect(master);
            lfo.start();
            osc.start();
            ambientNodes.push(osc, lfo);
        });
        ambientNodes.push(master);
    } catch(e) {}
}

function stopAmbient() {
    ambientNodes.forEach(n => { try { n.stop(); } catch(e) {} try { n.disconnect(); } catch(e) {} });
    ambientNodes = [];
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('puzzle_sound', soundEnabled ? '1' : '0');
    document.getElementById('btn-mute').textContent = soundEnabled ? '🔊' : '🔇';
    if (soundEnabled) startAmbient(); else stopAmbient();
}

// ==========================================
// GAME STATE
// ==========================================
let gameState = {
    currentScreen: 'home',
    currentCategory: null,
    currentCountry: null,
    currentImageIndex: 0,
    selectedImage: null,
    gridSize: 3,
    pieces: [],
    selectedPiece: null,
    moves: 0,
    movesRemaining: 0,
    moveLimit: 0,
    timer: null,
    seconds: 0,
    isCompleted: false,
    isDragging: false,
    dragPiece: null,
    dragElement: null,
    dragClone: null,
    dragOffsetX: 0,
    dragOffsetY: 0
};

// ==========================================
// DOM ELEMENTS
// ==========================================
const screens = {
    home: document.getElementById('home-screen'),
    country: document.getElementById('country-screen'),
    select: document.getElementById('select-screen'),
    game: document.getElementById('game-screen'),
    win: document.getElementById('win-screen')
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    renderCategoryCards();
    initEventListeners();
    if (!playerName) showNameModal();
    document.getElementById('btn-mute').textContent = soundEnabled ? '🔊' : '🔇';
});

// ==========================================
// PARTICLES
// ==========================================
function initParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (6 + Math.random() * 6) + 's';
        const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(particle);
    }
}

// ==========================================
// CATEGORY CARDS (Home)
// ==========================================
function renderCategoryCards() {
    const container = document.getElementById('category-cards');
    container.innerHTML = '';

    Object.values(CATEGORIES).forEach((cat, index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animationDelay = `${index * 0.15}s`;
        card.style.setProperty('--cat-from', cat.gradientFrom);
        card.style.setProperty('--cat-to', cat.gradientTo);
        card.innerHTML = `
            <div class="category-card-icon">${cat.icon}</div>
            <div class="category-card-name">${cat.name}</div>
            <div class="category-card-desc">${cat.description}</div>
            <div class="category-card-arrow">→</div>
        `;
        card.addEventListener('click', () => selectCategory(cat.id));
        container.appendChild(card);
    });
}

// ==========================================
// CATEGORY SELECTION
// ==========================================
function selectCategory(categoryId) {
    gameState.currentCategory = categoryId;
    const cat = CATEGORIES[categoryId];

    const root = document.documentElement;
    root.style.setProperty('--accent-primary', cat.gradientFrom);
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`);
    root.style.setProperty('--shadow-glow', `0 0 30px ${cat.gradientFrom}40`);

    showScreen('country');
}

// ==========================================
// COUNTRY CARDS
// ==========================================
async function renderCountryCards() {
    const cat = CATEGORIES[gameState.currentCategory];
    const countries = IMAGES[gameState.currentCategory];

    document.getElementById('country-title').textContent = `${cat.icon} ${cat.name} — Elegí un País`;
    document.getElementById('category-badge').textContent = cat.name;

    const container = document.getElementById('country-cards');
    container.innerHTML = '';

    Object.entries(countries).forEach(([countryId, country], index) => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.alt = country.name;
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'country-card-overlay';
        overlay.innerHTML = `
            <div class="country-card-flag">${country.flag}</div>
            <div class="country-card-name">${country.name}</div>
            <div class="country-card-count">${country.items.length} imagen${country.items.length !== 1 ? 'es' : ''}</div>
        `;

        card.appendChild(img);
        card.appendChild(overlay);
        card.addEventListener('click', () => selectCountry(countryId));
        container.appendChild(card);

        imgUrl(country.items[0].photo).then(url => { img.src = url; });
    });
}

function selectCountry(countryId) {
    gameState.currentCountry = countryId;
    showScreen('select');
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function showNameModal() {
    document.getElementById('name-modal').classList.add('active');
    document.getElementById('player-name-input').focus();
}

function savePlayerName() {
    const input = document.getElementById('player-name-input').value.trim();
    if (!input) return;
    playerName = input;
    localStorage.setItem('puzzle_player_name', playerName);
    document.getElementById('name-modal').classList.remove('active');
}

function initEventListeners() {
    // Name modal
    document.getElementById('btn-save-name').addEventListener('click', savePlayerName);
    document.getElementById('player-name-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') savePlayerName();
    });

    // Navigation
    document.getElementById('btn-back-home').addEventListener('click', () => { stopAmbient(); showScreen('home'); });
    document.getElementById('btn-back-country').addEventListener('click', () => showScreen('country'));
    document.getElementById('btn-back-select').addEventListener('click', () => {
        stopTimer(); stopAmbient();
        showScreen('select');
    });

    document.getElementById('difficulty-options').addEventListener('click', (e) => {
        const btn = e.target.closest('.diff-btn');
        if (!btn) return;
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.gridSize = parseInt(btn.dataset.grid);
    });

    // Game controls
    document.getElementById('btn-hint').addEventListener('mousedown', showHint);
    document.getElementById('btn-hint').addEventListener('mouseup', hideHint);
    document.getElementById('btn-hint').addEventListener('mouseleave', hideHint);
    document.getElementById('btn-hint').addEventListener('touchstart', (e) => { e.preventDefault(); showHint(); });
    document.getElementById('btn-hint').addEventListener('touchend', hideHint);
    document.getElementById('btn-shuffle').addEventListener('click', shufflePuzzle);
    document.getElementById('btn-mute').addEventListener('click', toggleSound);

    // Out of moves
    document.getElementById('btn-retry').addEventListener('click', () => {
        document.getElementById('out-of-moves-overlay').classList.remove('active');
        startGame(gameState.selectedImage);
    });
    document.getElementById('btn-give-up').addEventListener('click', () => {
        document.getElementById('out-of-moves-overlay').classList.remove('active');
        stopTimer(); stopAmbient();
        showScreen('home');
    });

    // Win screen
    document.getElementById('btn-download').addEventListener('click', downloadImage);
    document.getElementById('btn-next-puzzle').addEventListener('click', () => {
        const items = IMAGES[gameState.currentCategory][gameState.currentCountry].items;
        const nextImage = items[gameState.currentImageIndex + 1];
        if (nextImage) startGame(nextImage);
    });
    document.getElementById('btn-play-again').addEventListener('click', () => showScreen('select'));
    document.getElementById('btn-go-home').addEventListener('click', () => showScreen('home'));
}

// ==========================================
// SCREEN NAVIGATION
// ==========================================
function showScreen(screenName) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[screenName].classList.add('active');
    gameState.currentScreen = screenName;

    if (screenName === 'country') renderCountryCards();
    if (screenName === 'select') renderSelectScreen();
}

function renderSelectScreen() {
    const country = IMAGES[gameState.currentCategory][gameState.currentCountry];

    document.querySelector('.theme-badge-flag').textContent = country.flag;
    document.querySelector('.theme-badge-name').textContent = country.name;
    document.getElementById('select-title').textContent = `Elegí tu Imagen — ${country.name}`;

    renderImageCards();
}

// ==========================================
// IMAGE CARDS (Select screen)
// ==========================================
function renderImageCards() {
    const country = IMAGES[gameState.currentCategory][gameState.currentCountry];
    const container = document.getElementById('landscape-cards');
    container.innerHTML = '';

    country.items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'landscape-card';
        card.style.animationDelay = `${index * 0.1}s`;

        const img = document.createElement('img');
        img.alt = item.name;
        img.loading = 'lazy';

        card.appendChild(img);
        card.insertAdjacentHTML('beforeend', `
            <div class="landscape-card-overlay">
                <div class="landscape-card-name">${item.name}</div>
                <div class="landscape-card-location">📍 ${item.location}</div>
            </div>
            <div class="landscape-card-play">🧩</div>
        `);
        card.addEventListener('click', () => startGame(item));
        container.appendChild(card);

        imgUrl(item.photo).then(url => { img.src = url; });
    });
}

// ==========================================
// GAME LOGIC
// ==========================================
async function startGame(image) {
    gameState.selectedImage = image;
    gameState.moves = 0;
    gameState.movesRemaining = MOVE_LIMITS[gameState.gridSize];
    gameState.moveLimit = MOVE_LIMITS[gameState.gridSize];
    gameState.seconds = 0;
    gameState.isCompleted = false;
    gameState.selectedPiece = null;

    const items = IMAGES[gameState.currentCategory][gameState.currentCountry].items;
    gameState.currentImageIndex = items.findIndex(img => img.id === image.id);

    // Resolve URL before building puzzle
    gameState.currentImageUrl = await imgUrl(image.photo);

    document.querySelector('#game-landscape-name .info-text').textContent = image.name;
    updateMoves();
    updateTimer();

    document.getElementById('preview-image').src = gameState.currentImageUrl;
    document.getElementById('hint-image').src = gameState.currentImageUrl;

    buildPuzzle();
    showScreen('game');
    startTimer();
    startAmbient();
}

function buildPuzzle() {
    const board = document.getElementById('puzzle-board');
    const size = gameState.gridSize;

    board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    board.innerHTML = '';

    const totalPieces = size * size;
    gameState.pieces = [];

    for (let i = 0; i < totalPieces; i++) {
        gameState.pieces.push({ id: i, currentPos: i, correctPos: i });
    }

    shuffleArray(gameState.pieces);
    gameState.pieces.forEach((piece, index) => { piece.currentPos = index; });

    renderPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzle-board');
    const size = gameState.gridSize;
    const url = gameState.currentImageUrl;

    board.innerHTML = '';

    const sortedPieces = [...gameState.pieces].sort((a, b) => a.currentPos - b.currentPos);

    sortedPieces.forEach(piece => {
        const div = document.createElement('div');
        div.className = 'puzzle-piece';
        div.dataset.id = piece.id;

        const correctRow = Math.floor(piece.correctPos / size);
        const correctCol = piece.correctPos % size;
        const bgX = (correctCol / (size - 1)) * 100;
        const bgY = (correctRow / (size - 1)) * 100;

        div.style.backgroundImage = `url('${url}')`;
        div.style.backgroundSize = `${size * 100}%`;
        div.style.backgroundPosition = `${bgX}% ${bgY}%`;

        if (piece.currentPos === piece.correctPos) div.classList.add('correct');

        div.addEventListener('pointerdown', (e) => onDragStart(e, piece, div));
        div.style.touchAction = 'none';

        board.appendChild(div);
    });

    updateProgress();
}

// ==========================================
// DRAG & DROP
// ==========================================
function onDragStart(e, piece, element) {
    if (gameState.isCompleted) return;
    e.preventDefault();

    const pieceRect = element.getBoundingClientRect();

    gameState.isDragging = true;
    gameState.dragPiece = piece;
    gameState.dragElement = element;
    gameState.dragOffsetX = e.clientX - pieceRect.left;
    gameState.dragOffsetY = e.clientY - pieceRect.top;

    const clone = element.cloneNode(true);
    clone.className = 'puzzle-piece drag-clone';
    clone.style.width = pieceRect.width + 'px';
    clone.style.height = pieceRect.height + 'px';
    clone.style.left = pieceRect.left + 'px';
    clone.style.top = pieceRect.top + 'px';
    clone.style.backgroundImage = element.style.backgroundImage;
    clone.style.backgroundSize = element.style.backgroundSize;
    clone.style.backgroundPosition = element.style.backgroundPosition;
    document.body.appendChild(clone);
    gameState.dragClone = clone;

    element.classList.add('dragging-origin');
    element.setPointerCapture(e.pointerId);

    const onMove = (ev) => onDragMove(ev);
    const onEnd = (ev) => {
        onDragEnd(ev);
        element.removeEventListener('pointermove', onMove);
        element.removeEventListener('pointerup', onEnd);
        element.removeEventListener('pointercancel', onEnd);
    };

    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerup', onEnd);
    element.addEventListener('pointercancel', onEnd);
}

function onDragMove(e) {
    if (!gameState.isDragging || !gameState.dragClone) return;
    gameState.dragClone.style.left = (e.clientX - gameState.dragOffsetX) + 'px';
    gameState.dragClone.style.top = (e.clientY - gameState.dragOffsetY) + 'px';
    highlightDropTarget(e.clientX, e.clientY);
}

function onDragEnd(e) {
    if (!gameState.isDragging) return;

    const targetPiece = getDropTarget(e.clientX, e.clientY);

    if (gameState.dragClone) { gameState.dragClone.remove(); gameState.dragClone = null; }
    if (gameState.dragElement) gameState.dragElement.classList.remove('dragging-origin');

    document.querySelectorAll('.puzzle-piece').forEach(p => p.classList.remove('drop-target'));

    if (targetPiece && targetPiece.id !== gameState.dragPiece.id) {
        swapPieces(gameState.dragPiece, targetPiece);
    }

    gameState.isDragging = false;
    gameState.dragPiece = null;
    gameState.dragElement = null;
}

function highlightDropTarget(clientX, clientY) {
    document.getElementById('puzzle-board').querySelectorAll('.puzzle-piece').forEach(p => {
        p.classList.remove('drop-target');
        const rect = p.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom &&
            p !== gameState.dragElement) {
            p.classList.add('drop-target');
        }
    });
}

function getDropTarget(clientX, clientY) {
    for (const p of document.getElementById('puzzle-board').querySelectorAll('.puzzle-piece')) {
        if (p === gameState.dragElement) continue;
        const rect = p.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top && clientY <= rect.bottom) {
            const id = parseInt(p.dataset.id);
            return gameState.pieces.find(piece => piece.id === id);
        }
    }
    return null;
}

function swapPieces(piece1, piece2) {
    const tempPos = piece1.currentPos;
    piece1.currentPos = piece2.currentPos;
    piece2.currentPos = tempPos;

    gameState.moves++;
    gameState.movesRemaining--;
    playClick();
    updateMoves();
    renderPuzzle();

    const anyCorrect = piece1.currentPos === piece1.correctPos || piece2.currentPos === piece2.correctPos;
    if (anyCorrect) playCorrect();

    if (checkWin()) {
        onWin();
    } else if (gameState.movesRemaining <= 0) {
        onOutOfMoves();
    }
}

function checkWin() {
    return gameState.pieces.every(p => p.currentPos === p.correctPos);
}

function onOutOfMoves() {
    gameState.isCompleted = true;
    stopTimer();
    stopAmbient();
    playOutOfMoves();
    document.getElementById('out-of-moves-overlay').classList.add('active');
}

function onWin() {
    gameState.isCompleted = true;
    stopTimer();
    stopAmbient();
    playWin();

    setTimeout(() => {
        const image = gameState.selectedImage;
        const name = playerName ? `¡Felicitaciones, ${playerName}!` : '¡Felicitaciones!';
        document.querySelector('.win-title').textContent = `🎉 ${name}`;

        document.getElementById('win-image').src = gameState.currentImageUrl;
        document.querySelector('.win-landscape-name').textContent = image.name;
        document.querySelector('.win-landscape-location').textContent = `📍 ${image.location}`;
        document.getElementById('stat-moves').textContent = gameState.moves;
        document.getElementById('stat-time').textContent = formatTime(gameState.seconds);
        document.getElementById('stat-difficulty').textContent = DIFFICULTIES[gameState.gridSize].label;

        document.getElementById('btn-download').style.display = gameState.gridSize === 6 ? '' : 'none';

        const facts = image.facts || [];
        const factEl = document.getElementById('fun-fact');
        if (facts.length > 0) {
            document.getElementById('fun-fact-text').textContent = facts[Math.floor(Math.random() * facts.length)];
            factEl.style.display = '';
        } else {
            factEl.style.display = 'none';
        }

        const items = IMAGES[gameState.currentCategory][gameState.currentCountry].items;
        const nextImage = items[gameState.currentImageIndex + 1];
        document.getElementById('btn-next-puzzle').style.display = nextImage ? '' : 'none';

        showScreen('win');
        createConfetti();
    }, 500);
}

// ==========================================
// PUZZLE HELPERS
// ==========================================
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const isSolved = arr.every((piece, idx) => piece.correctPos === idx);
    if (isSolved && arr.length > 1) [arr[0], arr[1]] = [arr[1], arr[0]];
}

function shufflePuzzle() {
    gameState.selectedPiece = null;
    gameState.moves = 0;
    gameState.movesRemaining = MOVE_LIMITS[gameState.gridSize];
    gameState.seconds = 0;
    stopTimer();
    updateMoves();
    updateTimer();

    shuffleArray(gameState.pieces);
    gameState.pieces.forEach((piece, index) => { piece.currentPos = index; });

    renderPuzzle();
    startTimer();
}

function updateProgress() {
    const correct = gameState.pieces.filter(p => p.currentPos === p.correctPos).length;
    const total = gameState.pieces.length;
    const percent = Math.round((correct / total) * 100);

    document.getElementById('progress-bar').style.width = percent + '%';
    document.getElementById('progress-text').textContent = `${percent}% completado (${correct}/${total})`;
}

// ==========================================
// TIMER
// ==========================================
function startTimer() {
    stopTimer();
    gameState.timer = setInterval(() => { gameState.seconds++; updateTimer(); }, 1000);
}

function stopTimer() {
    if (gameState.timer) { clearInterval(gameState.timer); gameState.timer = null; }
}

function updateTimer() {
    document.querySelector('#game-timer .info-text').textContent = formatTime(gameState.seconds);
}

function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

function updateMoves() {
    const rem = gameState.movesRemaining;
    const el = document.querySelector('#game-moves .info-text');
    el.textContent = `Movimientos: ${rem}`;
    el.style.color = rem <= 5 ? '#ef4444' : rem <= 15 ? '#f59e0b' : '';
}

// ==========================================
// HINT
// ==========================================
function showHint() { document.getElementById('hint-overlay').classList.add('active'); }
function hideHint() { document.getElementById('hint-overlay').classList.remove('active'); }

// ==========================================
// DOWNLOAD (Experto only)
// ==========================================
function downloadImage() {
    if (gameState.gridSize !== 6) return;
    const image = gameState.selectedImage;
    const url = gameState.currentImageUrl.split('?')[0] + '?w=2400&q=95&fit=crop&auto=format';

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous';
    img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = `${image.id}_HD.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };
    img.onerror = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${image.id}_HD.png`;
        link.click();
    };
    img.src = url;
}

// ==========================================
// CONFETTI
// ==========================================
function createConfetti() {
    const container = document.getElementById('confetti');
    container.innerHTML = '';
    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.borderRadius = ['50%', '0%', '30%'][Math.floor(Math.random() * 3)];
        piece.style.width = (6 + Math.random() * 10) + 'px';
        piece.style.height = (6 + Math.random() * 10) + 'px';
        container.appendChild(piece);
    }

    setTimeout(() => { container.innerHTML = ''; }, 5000);
}
