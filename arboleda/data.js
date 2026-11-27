/* arboleda/data.js - CONTENIDO DE COLEGIO INTEGRAL LA ARBOLEDA
   Aquí editas todo lo de La Arboleda: nombre, niveles, áreas, calendario, blog y fotos.
   Al guardar este archivo se actualiza la web unida y la app de La Arboleda.
   Las fotos van en la carpeta /media y se escriben así: ASSET_BASE + 'media/nombre.webp' */

const ARBOLEDA_TITLE_HTML = '<span class="brand-nowrap"><span class="arb-t">C</span><span class="arb-g">o</span><span class="arb-y">l</span><span class="arb-t">e</span><span class="arb-g">g</span><span class="arb-y">i</span><span class="arb-t">o</span> <span class="arb-g">I</span><span class="arb-y">n</span><span class="arb-t">t</span><span class="arb-g">e</span><span class="arb-y">g</span><span class="arb-t">r</span><span class="arb-g">a</span><span class="arb-y">l</span></span> <span class="brand-nowrap"><span class="arb-t">L</span><span class="arb-g">a</span> <span class="arb-y">A</span><span class="arb-t">r</span><span class="arb-g">b</span><span class="arb-y">o</span><span class="arb-t">l</span><span class="arb-g">e</span><span class="arb-y">d</span><span class="arb-t">a</span></span>';

INSTITUTIONS_DATA.arboleda = {
    name: 'Colegio Integral La Arboleda',
    titleHtml: ARBOLEDA_TITLE_HTML,
    logo: ASSET_BASE + 'media/arb.png',
    kicker: 'Nivel Primaria',
    motto: 'Sembrando valores, cosechando líderes',
    description: 'Formación académica integral, bilingüismo, pensamiento lógico-matemático, tecnología STEAM y espíritu emprendedor para Primero Primaria y Segundo Primaria.',
    grades: ['Primero primaria', 'Segundo primaria'],
    mission: 'Formar estudiantes íntegros en Primaria mediante una educación bilingüe, participativa e innovadora que equilibra rigor académico, pensamiento crítico y valores humanos.',
    vision: 'Ser una institución educativa líder reconocida por sembrar valores éticos sólidos y cosechar líderes creativos, bilingües y comprometidos con su comunidad.',
    values: 'Valores e integridad, liderazgo y emprendimiento, excelencia académica bilingüe, pensamiento científico y formación física integral.',
    bridgeKicker: 'Etapa Previa • Semillero Montessori',
    bridgeTitle: '¿Tienes hijos pequeños entre 18 meses y 6 años?',
    bridgeText: 'Conoce Little Seeds Montessori, nuestro centro hermano especializado en estimulación temprana y pre-primaria (Maternal 1 y 2, Nursery, Pre-kinder, Kinder y Preparatoria).',
    bridgeBtn: '← Conocer Little Seeds Montessori',
    nivelesSub: 'Continuidad académica sólida en los primeros grados de Primaria.',
    levels: [
        {
            step: '06',
            name: 'Primero Primaria',
            age: '6 a 7 años',
            desc: 'Comprensión lectora fluida, resolución creativa de problemas matemáticos, ciencias experimentales y proyectos STEAM.',
            longDesc: 'Continuidad directa desde Preparatoria: fortalecemos la comprensión lectora fluida, redacción, razonamiento lógico-matemático, ciencias experimentales, proyectos STEAM e inglés bilingüe diario.'
        },
        {
            step: '07',
            name: 'Segundo Primaria',
            age: '7 a 8 años',
            desc: 'Autonomía académica, redacción estructurada, bilingüismo activo, liderazgo colaborativo y cultura emprendedora.',
            longDesc: 'Consolidamos hábitos de estudio autónomo, pensamiento analítico, expresión oral y escrita bilingüe, robótica/STEAM y proyectos de liderazgo y emprendimiento infantil.'
        }
    ],
    areasTitle: 'Áreas Curriculares • Colegio Integral La Arboleda',
    areasSub: 'Currículo integral enfocado en competencias para el futuro.',
    areas: [
        'Comunicación y Lenguaje',
        'Matemáticas y Lógica',
        'Inglés Bilingüe',
        'Ciencias Naturales y Tecnología',
        'STEAM y Robótica Inicial',
        'Formación Ciudadana y Valores',
        'Emprendimiento y Liderazgo',
        'Educación Física y Arte'
    ],
    modeloTitle: 'Modelo Integral: Excelencia Académica, Bilingüismo y Liderazgo',
    modeloDesc: 'En Colegio Integral La Arboleda transformamos la curiosidad infantil en hábitos de estudio, investigación científica, expresión bilingüe y liderazgo positivo.',
    pillars: [
        { icon: '🌎', title: 'Bilingüismo Activo', desc: 'Desarrollo progresivo de comprensión auditiva, expresión oral, lectura y escritura en inglés.' },
        { icon: '🚀', title: 'STEAM y Pensamiento Crítico', desc: 'Aprendizaje basado en proyectos que integran ciencia, tecnología, ingeniería, arte y matemáticas.' },
        { icon: '🌱', title: 'Valores y Emprendimiento', desc: 'Formación del carácter, trabajo en equipo, responsabilidad y proyectos de liderazgo infantil.' }
    ],
    calendar: [
        { trim: 'T1', date: '15 de Enero 2027', title: 'Inauguración Ciclo Escolar 2027', desc: 'Acto cívico de bienvenida y presentación de proyectos anuales.' },
        { trim: 'T1', date: '26 de Marzo 2027', title: 'Spelling Bee & English Showcase', desc: 'Demostración de habilidades comunicativas en inglés en Primaria.' },
        { trim: 'T2', date: '22 de Mayo 2027', title: 'Feria de Ciencias y Proyectos STEAM', desc: 'Exposición de experimentos, prototipos y soluciones creativas.' },
        { trim: 'T2', date: '03 de Julio 2027', title: 'Torneo Deportivo y Convivencia', desc: 'Juegos deportivos intergrados fomentando el juego limpio y trabajo en equipo.' },
        { trim: 'T3', date: '14 de Septiembre 2027', title: 'Festival Cívico "Sembrando Valores"', desc: 'Presentaciones artísticas y culturales celebrando nuestra identidad.' },
        { trim: 'T3', date: '29 de Octubre 2027', title: 'Feria de Emprendimiento Infantil & Clausura', desc: 'Presentación de mini proyectos emprendedores y cierre del ciclo escolar.' }
    ],
    blog: [
        {
            grade: 'Primero primaria',
            tag: 'Transición Escolar',
            title: 'Del Semillero Montessori a los retos de Primaria',
            summary: 'Cómo una base concreta y autónoma facilita el éxito académico en Primero y Segundo Primaria.',
            paragraphs: [
                'Cuando un niño ha manipulado cantidades concretas y desarrollado hábitos de concentración desde Maternal hasta Preparatoria, su paso a Primaria ocurre con seguridad y entusiasmo.',
                'En Colegio Integral La Arboleda aprovechamos esa autonomía para introducir proyectos de investigación, lectura comprensiva y trabajo colaborativo.'
            ]
        },
        {
            grade: 'Segundo primaria',
            tag: 'Liderazgo Infantil',
            title: 'Sembrando valores, cosechando líderes desde Primaria',
            summary: 'El liderazgo infantil comienza con la empatía, la responsabilidad personal y saber escuchar a los demás.',
            paragraphs: [
                'Fomentar el liderazgo en niños de Primaria significa brindarles oportunidades reales para proponer ideas, resolver conflictos con diálogo y asumir responsabilidades en su aula.',
                'Cada estudiante descubre sus fortalezas únicas y aprende a colaborar con respeto.'
            ]
        },
        {
            grade: 'Primero primaria',
            tag: 'STEAM',
            title: 'Despertando la curiosidad científica',
            summary: 'Aprender haciendo mediante experimentos.',
            paragraphs: [
                'Combinamos exploración natural con retos lógicos para que cada niño observe, formule preguntas y resuelva problemas en equipo.'
            ]
        }
    ]
};
