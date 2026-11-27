/* little/data.js - CONTENIDO DE LITTLE SEEDS MONTESSORI
   Aquí editas todo lo de Little: nombre, niveles, áreas, calendario, blog y fotos.
   Al guardar este archivo se actualiza la web unida y la app de Little.
   Las fotos van en la carpeta /media y se escriben así: ASSET_BASE + 'media/nombre.webp' */

const LITTLE_SEEDS_TITLE_HTML = '<span class="brand-nowrap"><span class="let-l1">L</span><span class="let-i1">i</span><span class="let-t1">t</span><span class="let-t2">t</span><span class="let-l2">l</span><span class="let-e1">e</span> <span class="let-s1">S</span><span class="let-ee1">e</span><span class="let-ee2">e</span><span class="let-d1">d</span><span class="let-ss2">s</span></span> <span class="brand-nowrap"><span class="let-m">M</span><span class="let-o1">o</span><span class="let-n">n</span><span class="let-t">t</span><span class="let-e2">e</span><span class="let-s3">s</span><span class="let-s4">s</span><span class="let-o2">o</span><span class="let-r">r</span><span class="let-i2">i</span></span>';

INSTITUTIONS_DATA.seeds = {
    name: 'Little Seeds Montessori',
    titleHtml: LITTLE_SEEDS_TITLE_HTML,
    logo: ASSET_BASE + 'media/lit.png',
    kicker: 'Etapa Inicial • Semillero Montessori',
    motto: 'Inspirados en metodología Montessori',
    description: 'Un ambiente preparado con calidez, respeto y estimulación temprana para acompañar los primeros descubrimientos de tus hijos desde los 18 meses hasta los 6 años en Maternal 1 y 2, Nursery, Pre-kinder, Kinder y Preparatoria.',
    grades: ['Maternal 1 y 2', 'Nursery', 'Pre-kinder', 'Kinder', 'Preparatoria'],
    mission: 'Brindar en la primera infancia un ambiente preparado, afectivo y seguro inspirado en la metodología Montessori, respetando el ritmo individual de cada niño para despertar su curiosidad natural y amor por aprender.',
    vision: 'Ser el centro referente por nuestra calidez humana y excelencia en neurodesarrollo infantil, formando niños felices, seguros y con bases sólidas autónomos.',
    values: 'Respeto al ritmo individual, autonomía ("Puedo hacerlo por mi mismo"), curiosidad sensorial, empatía y alianza cercana con la familia.',
    bridgeKicker: 'Continuidad hacia Primaria',
    bridgeTitle: '¿Tu hijo está listo para dar el siguiente paso a Primaria?',
    bridgeText: 'Conoce Colegio Integral La Arboleda, nuestra institución hermana que da continuidad académica bilingüe e integral en Primero Primaria y Segundo Primaria.',
    bridgeBtn: 'Conocer Colegio Integral La Arboleda →',
    nivelesSub: 'Grados del Semillero: acompañamiento personalizado desde los 18 meses hasta los 6 años.',
    levels: [
        {
            step: '01',
            name: 'Maternal 1 y 2',
            age: '18 meses y 2 años',
            desc: 'Estimulación sensorial temprana, desarrollo motor grueso y fino, vínculos afectivos seguros y exploración guiada.',
            longDesc: 'Acompañamos los primeros pasos educativos en un ambiente cálido, seguro y preparado a su medida. Trabajamos estimulación multisensorial, coordinación motriz gruesa y fina, lenguaje inicial, música y vínculos afectivos seguros que fortalecen su confianza.'
        },
        {
            step: '02',
            name: 'Nursery',
            age: '3 años',
            desc: 'Fortalecemos vocabulario expresivo y rutinas de independencia para fomentar la autonomía.',
            longDesc: 'En Nursery potenciamos la expresión oral, la socialización positiva y las rutinas diarias de Vida Práctica Montessori ("puedo hacerlo por mí mismo"), desarrollando concentración, hábitos de orden y seguridad personal.'
        },
        {
            step: '03',
            name: 'Pre-kinder',
            age: '4 años',
            desc: 'Programa de Pre-lectoescritura, área numérica y área de lenguaje por medio de materiales sensoriales.',
            longDesc: 'Mediante materiales concretos y sensoriales Montessori, los niños desarrollan conciencia fonológica, trazo inicial, conteo lógico, clasificación y exploración STEAM mientras fortalecen su creatividad.'
        },
        {
            step: '04',
            name: 'Kinder',
            age: '5 años',
            desc: 'Inician formalmente el proceso de lectura y escritura. Aprenden a leer y a escribir con letra de molde.',
            longDesc: 'Inician formalmente la lectura comprensiva y la escritura con letra de molde, combinando matemáticas manipulativas, inglés comunicativo, proyectos STEAM y madurez socioemocional.'
        },
        {
            step: '05',
            name: 'Preparatoria',
            age: '6 años',
            desc: 'Consolidación de lectoescritura, pensamiento lógico-matemático, inglés comunicativo y madurez socioemocional para Primaria.',
            longDesc: 'Culminan la etapa inicial consolidando lectura fluida, escritura estructurada, razonamiento lógico-matemático e inmersión en inglés, quedando listos para dar el salto armónico a Primero Primaria en Colegio Integral La Arboleda.'
        }
    ],
    areasTitle: 'Áreas de Pre-primaria • Little Seeds Montessori',
    areasSub: 'Estas son las áreas que trabajamos en la pre-primaria:',
    areas: [
        {
            name: 'Comunicación y Lenguaje',
            paragraphs: [
                'En Little Seeds Montessori acompañamos a cada niño y niña en el descubrimiento natural de la palabra, la escucha atenta y la expresión segura de sus ideas, emociones y descubrimientos diarios.',
                'Mediante cuentos, conversación cotidiana y experiencias sensoriales con letras y sonidos, fortalecemos su vocabulario, el gusto por los libros y una base sólida para la lectura y la escritura a su propio ritmo.'
            ],
            photos: [
                { src: ASSET_BASE + 'media/libro.webp', caption: 'Acercamiento a la lectura y exploración de cuentos' },
                { src: ASSET_BASE + 'media/texletra.webp', caption: 'Letras y trazo sensorial Montessori' },
                { src: ASSET_BASE + 'media/histo.webp', caption: 'Creación, diseño y lectura de su propio libro.' },
                { src: ASSET_BASE + 'media/cone.webp', caption: 'Dramatización de su cuento favorito.' }
            ]
        },
        {
            name: 'Aprendizaje Matemático',
            paragraphs: [
                'En Little Seeds Montessori construimos el pensamiento lógico-matemático desde lo concreto hacia lo manipulativo y visual, respetando el ritmo natural de cada niño y niña.',
                'A través de materiales Montessori y experiencias cotidianas, exploran formas, tamaños, medidas, equilibrio, cantidades y relaciones espaciales, desarrollando razonamiento, concentración y seguridad al resolver retos.'
            ],
            photos: [
                { src: ASSET_BASE + 'media/medi.webp', caption: 'Primeros acercamientos a la medición y longitud comparando tamaños en el aula.' },
                { src: ASSET_BASE + 'media/bala.webp', caption: 'Exploración de peso y equilibrio manipulativo' },
                { src: ASSET_BASE + 'media/fig.webp', caption: 'Exploración de figuras geométricas y relaciones espaciales sobre tapete Montessori.' },
                { src: ASSET_BASE + 'media/bloc.webp', caption: 'Construcción lógica y clasificación de formas' }
            ]
        },
        {
            name: 'Área integradora de ciencia, desarrollo integral y sociocultural',
            paragraphs: [
                'En Little Seeds Montessori impulsamos una mirada integral donde la curiosidad científica, el desarrollo personal y la convivencia sociocultural se entrelazan de forma vivencial.',
                'A través del juego simbólico, proyectos comunitarios, tradiciones y experiencias participativas, los niños exploran su entorno, fortalecen su identidad, practican el respeto y la empatía, y aprenden a expresarse y colaborar con los demás.'
            ],
            photos: [
                { src: ASSET_BASE + 'media/pad.webp', caption: 'Juego de roles y expresión en comunidad con disfraces y capas en el patio escolar.' },
                { src: ASSET_BASE + 'media/merca.webp', caption: 'Actividad vivencial de intercambio y convivencia con flores y detalles preparados por los niños.' },
                { src: ASSET_BASE + 'media/cola.webp', caption: 'Experiencias culturales, tradiciones y dinámicas participativas compartidas en el aula.' },
                { src: ASSET_BASE + 'media/expo.webp', caption: 'Exposición y descubrimiento compartido en comunidad' }
            ]
        },
        {
            name: 'Educación artística',
            paragraphs: [
                'En Little Seeds Montessori cultivamos la sensibilidad estética, la imaginación y la libre expresión a través del arte como lenguaje natural de la infancia.',
                'Mediante el color, las texturas, el movimiento y el juego creativo, los niños experimentan sin presiones, fortalecen su motricidad fina, canalizan emociones y descubren el valor del proceso creativo propio y compartido.'
            ],
            photos: [
                { src: ASSET_BASE + 'media/dis.webp', caption: 'Creación manual al aire libre decorando cometas y piezas de colores en comunidad.' },
                { src: ASSET_BASE + 'media/art.webp', caption: 'Pintura con pincel y exploración de color y trazo sobre papel y madera.' }
            ]
        },
        {
            name: 'Educación física',
            paragraphs: ['Desarrollo motor grueso, equilibrio, coordinación espacial y juego cooperativo al aire libre.'],
            photos: []
        },
        {
            name: 'STEAM',
            paragraphs: [
                'En Little Seeds Montessori despertamos la curiosidad natural de los niños conectando ciencia, tecnología, ingeniería, arte y matemáticas a través de retos prácticos y manipulativos.',
                'Al construir, experimentar y probar ideas en equipo, desarrollan pensamiento lógico, creatividad, observación y confianza para resolver problemas cotidianos.'
            ],
            photos: [
                { src: ASSET_BASE + 'media/gru.webp', caption: 'Construcción colaborativa de una estructura tipo puente al aire libre trabajando en equipo.' },
                { src: ASSET_BASE + 'media/pir.webp', caption: 'Diseño y armado de torres y formas geométricas con piezas magnéticas de colores.' },
                { src: ASSET_BASE + 'media/nin.webp', caption: 'Presentación de una estructura armada con piezas conectables reforzando ingenio y coordinación.' }
            ]
        },
        {
            name: 'Inglés',
            paragraphs: ['Inmersión natural al segundo idioma mediante canciones, cuentos, rutinas cotidianas y materiales sensoriales.'],
            photos: []
        }
    ],
    modeloTitle: 'Metodología Montessori & Neurodesarrollo Infantil',
    modeloDesc: 'En Little Seeds Montessori cada aula está diseñada a la altura y medida del niño para favorecer la concentración, la autodisciplina y el aprendizaje activo mediante materiales concretos.',
    pillars: [
        { icon: '🏡', title: 'Ambiente Preparado', desc: 'Materiales accesibles al niño y mobiliario adecuado a cada edad.' },
        { icon: '🧠', title: 'Neurodesarrollo', desc: 'Estimulación integral de destrezas cognitivas y motrices.' },
        { icon: '🔬', title: 'Montessori', desc: 'Integra las 5 áreas para resolver problemas reales mediante proyectos prácticos y creativos según la edad.' }
    ],
    calendar: [
        { trim: 'T1', date: '14 de Enero 2027', title: 'Bienvenida y Adaptación Gradual', desc: 'Jornadas de integración afectiva para niños y familias de nuevo ingreso.' },
        { trim: 'T1', date: '19 de Marzo 2027', title: 'Mañana de Vida Práctica en Familia', desc: 'Los niños muestran a papá y mamá sus habilidades en el ambiente Montessori.' },
        { trim: 'T2', date: '15 de Mayo 2027', title: 'Festival Sensorial y Artístico', desc: 'Exposición de arte infantil, música y expresión corporal.' },
        { trim: 'T2', date: '26 de Junio 2027', title: 'Mini Olimpiadas Motrices', desc: 'Circuito de psicomotricidad, equilibrio y juego cooperativo al aire libre.' },
        { trim: 'T3', date: '11 de Septiembre 2027', title: 'Celebración Cultural y Folklórica', desc: 'Actividades lúdicas de identidad, tradiciones y convivencia.' },
        { trim: 'T3', date: '22 de Octubre 2027', title: 'Transición Preparatoria → La Arboleda', desc: 'Visita vivencial de los alumnos de Preparatoria a las aulas de Primero Primaria.' }
    ],
    blog: [
        {
            tag: 'Autoestima',
            title: '5 formas de fomentar la autonomía en casa',
            summary: 'Pequeños ajustes que ayudan a ganar seguridad.',
            paragraphs: [
                'Acompañar los logros diarios de nuestros hijos con paciencia y confianza construye su seguridad interior:'
            ],
            orderedList: [
                {
                    text: '<strong>Poner sus cosas a su alcance.</strong> Coloca su ropa, zapatos, libros y juguetes en repisas bajas para que pueda tomarlos y ordenarlos por sí mismo.',
                    image: ASSET_BASE + 'media/alc.webp',
                    caption: 'Repisas y objetos a la altura del niño'
                },
                {
                    text: '<strong>Permitirle elegir.</strong> Ofrécele dos opciones sencillas de vestimenta o refacción para que practique tomar decisiones propias.',
                    image: ASSET_BASE + 'media/ordn.webp',
                    caption: 'Eligiendo entre dos opciones sencillas'
                },
                {
                    text: '<strong>Involucrarlo en tareas cotidianas del hogar.</strong> Invítalo a colaborar en acciones simples como llevar su plato o doblar una servilleta.',
                    image: ASSET_BASE + 'media/cotd.webp',
                    caption: 'Colaborando en tareas cotidianas del hogar'
                },
                {
                    text: '<strong>Brindarle el tiempo necesario.</strong> Dale espacio para intentar abrocharse o vestirse por sí mismo antes de intervenir.',
                    image: ASSET_BASE + 'media/tiemp.webp',
                    caption: 'Practicando vestirse a su propio ritmo'
                },
                {
                    text: '<strong>Dejar que corrija pequeños errores con calma.</strong> Acompáñalo con paciencia y valora su esfuerzo más que la perfección.',
                    image: ASSET_BASE + 'media/erro.webp',
                    caption: 'Aprendiendo con calma y confianza en su esfuerzo'
                }
            ],
            closingNote: 'El niño que descubre todo lo que puede hacer por sí mismo.'
        },
        {
            tag: 'Aprendizaje en casa',
            title: '3 maneras de continuar el aprendizaje Montessori en casa',
            summary: '3 ideas sencillas para fomentar la autonomía y el aprendizaje en casa.',
            paragraphs: [
                'Fomenta su autonomía fuera del aula adaptando espacios a su estatura, involucrándolo en tareas diarias del hogar y respetando su propio ritmo de aprendizaje.'
            ],
            orderedList: [
                {
                    text: '<strong>Invita a tu hijo a participar en las tareas cotidianas.</strong> Poner la mesa, doblar una servilleta o limpiar un derrame son oportunidades para practicar la coordinación y ganar autonomía. Elige una tarea que pueda hacer según su edad y dale tiempo para terminarla.',
                    image: ASSET_BASE + 'media/part.webp',
                    caption: 'Participación activa en actividades cotidianas'
                },
                {
                    text: '<strong>Coloca los materiales a su alcance.</strong> Organiza unos pocos libros, rompecabezas o materiales de dibujo en un estante bajo. Así podrá elegir qué usar, encontrarlo por su cuenta y devolverlo a su lugar cuando termine.',
                    image: ASSET_BASE + 'media/rep.webp',
                    caption: 'Mejorar la toma de decisiones'
                },
                {
                    text: '<strong>Confía en tu hijo y permítele hacerlo por sí mismo.</strong> Cuando quiera ponerse los zapatos, servirse agua o guardar sus juguetes, dale tiempo para intentarlo. Acompáñalo con paciencia y, si necesita ayuda, apóyalo solo en el paso que le cuesta. Cada vez que le das la oportunidad de decir ¡Lo hice yo!, le ayudas a confiar más en sus propias capacidades.',
                    image: ASSET_BASE + 'media/deci.webp',
                    caption: 'Mejorar la confianza para la toma de decisiones'
                }
            ],
            closingNote: 'Con pequeños cambios diarios y mucha paciencia, cualquier rincón de tu hogar puede convertirse en su mejor espacio de aprendizaje.'
        },
        {
            grade: 'Maternal 1 y 2',
            tag: 'Desarrollo Motriz',
            title: 'La importancia de la psicomotricidad',
            summary: 'Cómo el movimiento libre prepara el cerebro.',
            paragraphs: [
                'A través del movimiento y el juego, los niños conocen su cuerpo, aprenden a coordinar sus movimientos y ganan autonomía en las actividades de todos los días. Esto se consigue trabajando el área de Vida Práctica Montessori.'
            ]
        },
        {
            grade: 'Preparatoria',
            tag: 'STEAM',
            title: 'Despertando la curiosidad científica',
            summary: 'Aprender haciendo mediante experimentos.',
            paragraphs: [
                'Combinamos exploración natural con retos lógicos para que cada niño observe, formule preguntas y descubra cómo funciona su entorno.'
            ]
        }
    ]
};
