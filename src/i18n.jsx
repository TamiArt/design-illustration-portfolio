import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANGUAGE_KEY = 'portfolio-language';

const ruEn = {
  'Татьяна Ципелева': 'Tatiana Tsipeleva',
  'Татьяна Ципелева | arTami':'Tatiana Tsipeleva | arTami',
  'Художник • Дизайнер визуальных решений':'Artist • Visual Designer',
  'Художник • дизайнер визуальных решений':'Artist • visual designer',
  'Контакты':'Contact','Основная навигация':'Main navigation','Выбор языка':'Language selector',
  'Мое резюме':'My resume','Обо мне':'About me','Профиль':'Profile',
  'Открыть раздел':'Open section','Открыть':'Open','Навигация':'Navigation','Выберите раздел':'Choose a section',
  'Меню':'Menu','Просмотреть резюме':'View resume','Открыть меню':'Open menu',
  'Открыть полноценное резюме в PDF':'Open full resume as PDF',
  'Способы связаться со мной':'Ways to contact me','Раздел портфолио':'Portfolio section',
  'Быстрая навигация':'Quick navigation','Назад':'Back','На главную':'Home','Наверх':'Top',
  'Обсудить проект':'Discuss a project','заявка':'project','note':'note','gallery':'gallery',
  'Связаться со мной':'Get in touch',
  'Здесь собраны все каналы связи. Можно сразу перейти в нужный сервис или скопировать контакт в один клик. Я открыта к сотрудничеству, участию в проектах и новым творческим задачам.':'All contact channels are collected here. You can open the service you need or copy a contact in one click. I am open to collaborations, projects and new creative tasks.',
  'Создаю авторские визуалы на стыке живописи, иллюстрации и digital-подачи.':'I create original visuals at the intersection of painting, illustration and digital design.',
  'Направления':'Areas of work','Основные сферы, в которых я работаю как художник и дизайнер.':'The main areas where I work as an artist and designer.',
  'Форматы работы':'Work formats','Типы задач, в которых я могу быть полезна заказчику.':'Types of tasks where I can help a client.',
  'Инструменты':'Tools','Рабочая среда, в которой я собираю визуальные проекты.':'The tools I use to build visual projects.',
  'Этапы работы':'Workflow','От постановки задачи до финальной визуальной отрисовки.':'From defining the brief to the final visual.',
  'Формат':'Format','Сотрудничество':'Collaboration','Подход':'Approach','Результат':'Result',
  'Авторские картины, digital-визуалы и серии для интерьера':'Original paintings, digital visuals and interior series',
  'Частные заказы, бренды, интерьерные и контент-проекты':'Private commissions, brands, interior and content projects',
  'Композиция, цвет, атмосфера и аккуратная профессиональная подача':'Composition, color, atmosphere and polished professional presentation',
  'Готовый визуальный материал для digital, печати и пространства':'Ready-to-use visual material for digital, print and space',
  'Пишу картины маслом на заказ для интерьера, подарка или личной коллекции.':'I paint original oil works to order for interiors, gifts or private collections.',
  'Создаю AI-иллюстрации и визуальные концепции в разных стилях под конкретную задачу.':'I create AI illustrations and visual concepts in different styles for specific needs.',
  'Разрабатываю интерьерные скетчи, принты и материалы для социальных сетей и печати.':'I create interior sketches, prints and materials for social media and print.',
  'Живопись':'Painting','Картины и авторские серии':'Paintings and original series',
  'Авторские работы для интерьеров, подарков, частных коллекций и персональных заказов.':'Original works for interiors, gifts, private collections and personal commissions.',
  'AI':'AI','Иллюстрации и digital-визуалы':'Illustrations and digital visuals',
  'Иллюстрации в разных стилях, постеры, moodboards и визуальные образы для брендов и проектов.':'Illustrations in different styles, posters, moodboards and visual concepts for brands and projects.',
  'Скетчинг':'Sketching','Интерьерные скетчи':'Interior sketches',
  'Подача пространства, атмосферы и декоративных сценариев для презентации идеи и согласования концепции.':'Presentation of space, atmosphere and decorative scenarios for presenting and approving a concept.',
  'Print':'Print','Соцсети и печать':'Social media and print',
  'Принты, планеры, постеры, визуальные серии и материалы для digital- и print-носителей.':'Prints, planners, posters, visual series and materials for digital and print media.',
  'Формирование ТЗ':'Brief definition','Набросок':'Draft','Скетч':'Sketch','Утверждение':'Approval',
  'Подбор цветовой палитры':'Color palette','Финальная отрисовка':'Final artwork',
  'Рабочие приложения':'Creative software','Авторская портретная работа':'Original portrait artwork',
  'Живопись на холсте':'Oil painting','Картины на заказ, авторские серии и интерьерная живопись.':'Commissioned paintings, original series and interior art.',
  'Картины для интерьера и коллекции':'Paintings for interiors and collections',
  'Пишу маслом авторские работы и картины на заказ: от камерных натюрмортов до интерьерных полотен с выверенной палитрой, фактурой и настроением.':'I create original oil paintings and commissioned works, from intimate still lifes to interior pieces with a considered palette, texture and mood.',
  'В этом разделе собраны работы в технике масляной живописи. Я создаю произведения на заказ, подбираю сюжет, палитру и формат под интерьер, идею проекта или личную историю заказчика.':'This section presents my oil paintings. I create commissioned works and select the subject, palette and format for an interior, project concept or personal story.',
  'услуги':'services','Что получает заказчик':'What the client receives',
  'Авторскую живописную работу с вниманием к композиции, цвету и атмосфере. Работаю с пейзажем, натюрмортом, предметной и эмоциональной живописью, помогаю подобрать формат и характер картины под пространство, подарок или личную коллекцию.':'An original artwork with careful attention to composition, color and atmosphere. I work with landscapes, still lifes, objects and expressive painting, helping choose the format and character for a space, gift or private collection.',
  'Заказать картину маслом':'Commission an oil painting',
  'Если вам нужна авторская работа для интерьера, в подарок или в личную коллекцию, этот раздел показывает, как я работаю с сюжетом, цветом и настроением.':'If you need an original work for an interior, gift or private collection, this section shows how I work with subject, color and mood.',
  'портрет':'portrait','Портрет с настроением':'Portrait with atmosphere',
  'Эмоциональная портретная подача с мягкой цветовой драматургией и акцентом на атмосферу образа.':'An expressive portrait with gentle color drama and an emphasis on the mood of the image.',
  'пейзаж':'landscape','Пейзаж для интерьера':'Landscape for an interior',
  'Спокойные пейзажные сюжеты хорошо работают в интерьерной живописи и создают ощущение глубины и света.':'Calm landscapes work well in interior art and create a sense of depth and light.',
  'натюрморт':'still life','Теплый камерный сюжет':'Warm intimate scene',
  'Натюрморты с предметной детализацией подойдут для уютных интерьерных акцентов и подарочных работ.':'Detailed still lifes work well as cozy interior accents and gifts.',
  'предметность':'objects','Предметная композиция':'Object composition',
  'Работаю с формой, ритмом и тональными отношениями, чтобы даже простые предметы звучали выразительно и цельно.':'I work with shape, rhythm and tonal relationships so even simple objects feel expressive and cohesive.',
  'фактура':'texture','Контраст фактур':'Texture contrast',
  'В живописи для меня важны не только цвет и сюжет, но и ощущение поверхности, материала и живого мазка.':'In painting, I care not only about color and subject but also the feel of surface, material and a living brushstroke.',
  'архитектура':'architecture','Архитектурный мотив':'Architectural motif',
  'Архитектурные и сезонные сюжеты можно адаптировать под интерьер, частный заказ или тематическую серию.':'Architectural and seasonal subjects can be adapted for interiors, commissions or themed series.',
  'Иллюстрации с ИИ':'AI illustrations','Иллюстрации в разных стилях, концепты и визуальные подборки.':'Illustrations in different styles, concepts and visual collections.',
  'Визуалы с идеей, стилем и характером':'Visuals with an idea, style and character',
  'Создаю AI-иллюстрации в различных стилях: от мягкой акварельной подачи до декоративных, графичных и постерных решений для брендов, проектов и личных серий.':'I create AI illustrations in different styles, from soft watercolor looks to decorative, graphic and poster solutions for brands, projects and personal series.',
  'подход':'approach','Иллюстрации в разных стилях':'Illustrations in different styles',
  'Создаю визуалы от акварельной и декоративной стилистики до flat-графики, персонажной подачи и атмосферных концептов. Это удобно для брендов, обложек, постеров, digital-материалов и авторских серий.':'I create visuals ranging from watercolor and decorative styles to flat graphics, character work and atmospheric concepts. They work well for brands, covers, posters, digital materials and original series.',
  'Заказать иллюстрации с ИИ':'Commission AI illustrations',
  'декор':'decor','Декоративная стилизация':'Decorative styling',
  'акварель':'watercolor','Мягкая акварельная подача':'Soft watercolor look',
  'персонаж':'character','Авторский персонаж':'Original character',
  'сюжет':'story','Сказочный образ':'Fairytale image','animal':'animal','Animal-иллюстрация':'Animal illustration',
  'динамика':'dynamics','Движение и пластика':'Movement and flow','символ':'symbol','Символьная композиция':'Symbolic composition',
  'flat':'flat','Графичная flat-иллюстрация':'Graphic flat illustration','lifestyle':'lifestyle','Lifestyle-визуал':'Lifestyle visual',
  'Интерьерный скетчинг':'Interior sketching','Эскизы интерьеров, атмосфера пространства и цветовые сценарии.':'Interior sketches, spatial atmosphere and color scenarios.',
  'Подача пространства, света и настроения':'Space, light and mood','формат':'format','Что можно показать через скетч':'What a sketch can show',
  'Заказать интерьерный скетч':'Commission an interior sketch','гостиная':'living room','Жилая зона':'Living area',
  'кабинет':'office','Рабочее место у окна':'Workspace by the window','атмосфера':'atmosphere','Сезонный интерьер':'Seasonal interior',
  'концепт':'concept','Тематическая комната':'Themed room','детали':'details','Вариант композиции':'Composition option',
  'серия':'series','Развитие идеи':'Developing the idea',
  'Детская иллюстрация':'Children’s illustration','Персонажи, сказочные сцены и визуалы для детских проектов.':'Characters, fairytale scenes and visuals for children’s projects.',
  'Иллюстрация для детских изданий и проектов':'Illustration for children’s publications and projects',
  'направление':'direction','Иллюстрации для детей и семейных проектов':'Illustrations for children and family projects',
  'Обсудить детский проект':'Discuss a children’s project','Сказочный герой':'Fairytale character','пространство':'space',
  'Иллюстрация для детской комнаты':'Illustration for a children’s room',
  'Социальные сети и принты':'Social media and prints',
  'Визуалы для соцсетей, принты и фирменная подача материалов.':'Visuals for social media, prints and cohesive presentation.',
  'Визуалы для бренда, соцсетей и печати':'Visuals for brands, social media and print','результат':'result',
  'Визуальная система для digital и print':'Visual system for digital and print',
  'Заказать визуалы и принты':'Commission visuals and prints','постер':'poster','Постерная подача':'Poster presentation',
  'планер':'planner','Печатный планер':'Printed planner','Коллекция шаблонов':'Template collection',
  'печать':'print','Материалы для ежедневного использования':'Materials for everyday use',
  'Этап':'Stage',
  'Работаю с частными и коммерческими задачами: от картин на заказ и авторских серий до AI-визуалов, скетчей и материалов для digital и print.':'I work with private and commercial tasks, from commissioned paintings and original series to AI visuals, sketches and digital/print materials.',
  'Создаю авторские визуальные решения на стыке живописи, иллюстрации и интерьерного скетчинга. В работе соединяю художественный подход, композиционную точность и продуманную подачу результата.':'I create original visual solutions at the intersection of painting, illustration and interior sketching, combining an artistic approach, precise composition and polished presentation.',
  'Живопись на холсте':'Oil painting',
  'Иллюстрации с ИИ':'AI illustrations',
  'Интерьерный скетчинг':'Interior sketching',
  'Детская иллюстрация':'Children’s illustration',
  'Социальные сети':'Social media',
  'Принты и полиграфия':'Prints and graphic materials',
  'Этот раздел показывает, как я работаю с AI-иллюстрацией как с художественным инструментом. Мне важно не просто получить красивую картинку, а выстроить характер, стиль, цветовую логику и визуальное впечатление под конкретную задачу.':'This section shows how I use AI illustration as an artistic tool. I focus not just on a beautiful image, but on character, style, color logic and a visual impression tailored to the task.',
  'Если вам нужен выразительный визуальный стиль для бренда, проекта, постера или контента, здесь видно, как я работаю с разными художественными направлениями и образами.':'If you need a distinctive visual style for a brand, project, poster or content, this section shows how I work across different artistic directions and imagery.',
  'Иллюстрации с мягкой подачей и выразительным характером хорошо подходят для книжных и сувенирных проектов.':'Gentle, expressive illustrations work well for books and souvenir projects.',
  'Разрабатываю выразительных героев для storytelling-проектов, серий постов, упаковки и цифровых материалов.':'I develop expressive characters for storytelling projects, post series, packaging and digital materials.',
  'Подходит для коллекций с характером, стилизованных серий и проектов, где важна необычная атмосфера.':'Suitable for characterful collections, stylized series and projects where atmosphere matters.',
  'Работаю с мягкими и дружелюбными образами, которые хорошо смотрятся в детских и lifestyle-проектах.':'I create gentle, friendly imagery for children’s and lifestyle projects.',
  'Сцены с динамикой помогают сделать подборку более живой и добавить энергии в визуальный ряд.':'Dynamic scenes make a collection feel more alive and energetic.',
  'Лаконичные образы можно использовать в айдентике, тематических сериях и эмоциональном digital-контенте.':'Minimal imagery can be used in identity, themed series and emotional digital content.',
  'Чистая графика подходит для социальных сетей, карточек, обучающих материалов и бренд-коммуникации.':'Clean graphics work well for social media, cards, educational materials and brand communication.',
  'Такой стиль хорошо работает для wellness-, beauty- и личных брендов, где нужен спокойный современный образ.':'This style works well for wellness, beauty and personal brands that need a calm modern image.',
  'Разрабатываю интерьерные скетчи и визуальные концепции, которые помогают увидеть пространство, настроение, свет и композицию еще на этапе идеи.':'I create interior sketches and visual concepts that help clients see space, mood, light and composition at the idea stage.',
  'Интерьерный скетчинг для меня — это способ быстро и красиво показать характер пространства. Визуал помогает заказчику почувствовать будущую атмосферу, увидеть композицию, материалы и цветовое решение до реализации.':'For me, interior sketching is a fast and beautiful way to show the character of a space. It helps a client feel the future atmosphere and see composition, materials and color before implementation.',
  'Планировочные идеи, атмосферу помещения, декоративные акценты, мебельные сценарии и общий стиль интерьера. Такие изображения подходят для презентаций, согласований и частных дизайн-проектов.':'Planning ideas, room atmosphere, decorative accents, furniture scenarios and the overall interior style. These visuals work well for presentations, approvals and private design projects.',
  'Раздел подойдет тем, кто хочет презентовать интерьер красиво и понятно: с настроением, светом, деталями и аккуратной художественной подачей.':'This section is for those who want to present an interior clearly and beautifully, with mood, light, details and an artistic finish.',
  'Скетчи жилых пространств помогают передать уют, сценарий света и общий характер интерьера.':'Residential sketches convey comfort, lighting scenarios and the overall character of an interior.',
  'Компактные пространства и функциональные зоны можно показать легко, живо и без ощущения сухой схемы.':'Compact spaces and functional zones can be shown clearly and naturally without feeling like a dry diagram.',
  'Такие скетчи хорошо передают настроение проекта и помогают усилить эмоцию через детали и декор.':'These sketches convey the mood of a project and strengthen the emotion through details and decor.',
  'Работаю с сюжетными интерьерными идеями, когда пространство должно отражать характер хозяина или концепцию бренда.':'I work with themed interior ideas when a space should reflect the owner’s character or a brand concept.',
  'Показываю разные ракурсы и решения, чтобы заказчик мог увидеть проект объемно и целостно.':'I show different views and solutions so a client can see the project as a complete whole.',
  'Серия скетчей помогает раскрыть интерьер как историю: от общего впечатления до акцентных элементов.':'A series of sketches develops an interior as a story, from the overall impression to accent details.',
  'Создаю детские иллюстрации с мягким характером и понятным сюжетом: для книг, открыток, постеров, оформления пространств и авторских серий.':'I create children’s illustrations with a gentle character and clear story for books, cards, posters, spaces and original series.',
  'В детской иллюстрации для меня особенно важны добрый характер образов, ясный сюжет и теплое эмоциональное впечатление. Это направление подходит для книг, полиграфии, интерьерного оформления и визуалов для детских проектов.':'For children’s illustration, I value kind imagery, a clear story and a warm emotional impression. This direction works for books, print, interiors and children’s projects.',
  'Создаю персонажей, сказочные сцены и мягкие визуальные миры для книг, постеров, открыток, развивающих материалов и оформления детских пространств.':'I create characters, fairytale scenes and gentle visual worlds for books, posters, cards, educational materials and children’s spaces.',
  'Если вам нужна добрая, запоминающаяся и профессионально поданная иллюстрация для детской аудитории, этот раздел показывает мой подход к персонажу и настроению.':'If you need a warm, memorable and professionally presented illustration for children, this section shows my approach to character and mood.',
  'Детские сюжеты могут работать не только в книгах, но и в оформлении пространства, постерах и декоративных сериях.':'Children’s imagery can work not only in books but also in rooms, posters and decorative series.',
  'Оформляю серии для социальных сетей и печати: посты, карточки, планеры, афиши и принты с аккуратной композицией и целостным стилем.':'I design series for social media and print: posts, cards, planners, posters and prints with a clear composition and cohesive style.',
  'В этом разделе собраны работы, где важна не только эстетика изображения, но и практичность использования. Я создаю визуалы, которые хорошо смотрятся в цифровой среде, в печати и в системной бренд-подаче.':'This section presents work where usability matters as much as aesthetics. I create visuals that work well digitally, in print and within a consistent brand system.',
  'Разрабатываю материалы для социальных сетей, принты, планеры, постеры и другие носители так, чтобы они были одновременно красивыми, понятными и удобными в использовании.':'I create social media materials, prints, planners, posters and other formats that are attractive, clear and practical to use.',
  'Если вам нужен современный визуальный пакет для социальных сетей, печати или авторской линейки материалов, здесь можно увидеть мой подход к композиции, стилю и аккуратной подаче.':'If you need a modern visual package for social media, print or an original product line, this section shows my approach to composition, style and polished presentation.',
  'Художественные визуалы могут работать как самостоятельные принты, афиши или декоративные digital-материалы.':'Artistic visuals can work as standalone prints, posters or decorative digital materials.',
  'Практичные материалы могут оставаться эстетичными и визуально цельными, если продумать иерархию и композицию.':'Practical materials can remain aesthetic and cohesive when hierarchy and composition are carefully considered.',
  'Создаю серии материалов в одном стиле, чтобы продукт выглядел профессионально и узнаваемо.':'I create material series in one style so the product feels professional and recognizable.',
  'Работаю с форматом, цветом и графикой так, чтобы изделие было удобным и одновременно визуально привлекательным.':'I work with format, color and graphics so the final product is practical and visually appealing.'
};

const originalTextNodes = new WeakMap();

function translateNode(node, language) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (!node.parentElement || ['SCRIPT','STYLE'].includes(node.parentElement.tagName)) return;
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    let value = original;
    if (language === 'en') {
      value = ruEn[original] ?? original.replace(/(\d+) этап/g, '$1 Stage');
    }
    if (node.nodeValue !== value) node.nodeValue = value;
  }
}

function translateDom(language) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = language;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) translateNode(walker.currentNode, language);
  document.querySelectorAll('[aria-label],[title],[alt]').forEach((el) => {
    ['aria-label','title','alt'].forEach((attr) => {
      const originalKey = 'i18nOriginal' + attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      const original = el.dataset[originalKey] ?? el.getAttribute(attr);
      if (!original) return;
      el.dataset[originalKey] = original;
      el.setAttribute(attr, language === 'en' ? (ruEn[original] ?? original) : original);
    });
  });
}

const LanguageContext = createContext({ language:'ru', setLanguage:()=>{} });

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    if (typeof window === 'undefined') return 'ru';
    return window.localStorage.getItem(LANGUAGE_KEY) === 'en' ? 'en' : 'ru';
  });

  function setLanguage(next) {
    const value = next === 'en' ? 'en' : 'ru';
    setLanguageState(value);
    window.localStorage.setItem(LANGUAGE_KEY, value);
  }

  useEffect(() => {
    translateDom(language);
    const observer = new MutationObserver(() => translateDom(language));
    observer.observe(document.body, { childList:true, subtree:true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
