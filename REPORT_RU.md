# Отчёт о выполненных работах — Red Core (REDCORE)

Период: от коммита «GTM» (3c75bd16818e5e094ecbb04a7e10791b117d814a) до последнего коммита (f099a2c48dec27e5dbb897cf81d72bdd7acaf6a7).

---

## 1. SEO-оптимизация + Keywords

### Глобальные метаданные (layout.tsx)
- Обновлены title, description, keywords под бренд REDCORE и локальные запросы (concrete cutting MA, Boston, near me и т.д.).
- Обновлены Open Graph и Twitter card (title, description, image /opengraph-image).
- Автор/создатель/издатель переименованы в REDCORE.

### Ключевые слова на страницах услуг
- Core Drilling, Slab/Asphalt Cutting, Demolition & Cutting, Wall Saw Cutting, Concrete Restoration — каждой странице добавлен массив `keywords` с локальными запросами (Springfield MA, Agawam MA, Worcester, Northampton, Boston и др.).
- Заголовки страниц унифицированы в формат «… Across Massachusetts».

### Структурированные данные (JSON-LD)
- LocalBusiness / HomeAndConstructionBusiness: geo-координаты, postalCode, sameAs (Facebook, Instagram, Google Maps, share.google), hasMap, hasOfferCatalog, расширенный areaServed (города и штаты NE).
- Service + BreadcrumbList на каждой из 5 страниц услуг.
- FAQPage schema на всех страницах услуг и на главной.

### FAQ-секции
- Добавлен компонент `faq-accordion.tsx` и секция FAQ на главной и на всех 5 страницах услуг.
- Вопросы/ответы с автолинковкой телефонов и email.

### Техническое SEO
- `robots.ts`: расширенные правила для AI-краулеров (GPTBot, ClaudeBot, PerplexityBot, Google-Extended и др.), запрет на /api/, /admin/, /email-preview, graphql.
- `sitemap.ts`: обновлена дата lastModified.
- `llms.txt` и `llms-full.txt` для AI-поиска (AEO), ссылки `<link rel="llms">` в head.
- Верификационный файл IndexNow в `public/`.
- `next.config.ts`: 308-редирект www → apex, редирект /small-demolition → /demolition-cutting, HSTS-заголовок, кэш-заголовки для медиа.
- `site.webmanifest` обновлён.
- Семантическая разметка: заголовки секций переведены в `<h2>`, добавлены sr-only тексты для SEO («across Massachusetts», локация проекта).
- Улучшены alt-тексты изображений (hero, about us, проекты, офферы).
- OpenGraph/Twitter images на страницах услуг.
- Canonical URL на главной и страницах услуг.

### IndexNow
- GitHub Actions workflow (`.github/workflows/indexnow.yml`) для автоматической отправки URL из sitemap в IndexNow (Bing, Yandex, Seznam, Naver и др.).
- Скрипт `scripts/indexnow-submit.mjs`.

---

## 2. Трекинг на сайте

### Аналитика и теги
- Google Tag Manager (GTM-586Q4LZW) — подключение в production.
- Meta Pixel + Meta Conversions API (CAPI) на сервере с дедупликацией по eventId.
- Миграция gtag.js → GTM.
- Файл `gtm-ga4-import.json` для импорта GA4.

### Единая библиотека трекинга (src/lib/tracking.ts)
- `trackUnifiedEvent` — отправка событий одновременно в GTM/GA4, Meta Pixel и Meta CAPI.
- Генерация eventId, сбор client environment context (IP, geo, устройство, браузер, соединение).
- Visitor/session метрики.

### AnalyticsProvider (автоматический трекинг)
- PageView и ViewService на страницах услуг.
- Глубина скролла (25/50/75/90/100%).
- Время на странице (майлстоуны 15/30/60/120/300 сек).
- Просмотр секций и время пребывания (IntersectionObserver).
- Глобальный клик-листенер для кнопок и ссылок с контекстом секции.

### События форм (воронка)
- form_start, form_field_change, открытие шага выбора времени звонка, form_conversion, form_abandon (с beacon при закрытии страницы).
- Реализовано для форм «Get a Quote» и консультации в футере.

### События взаимодействий
- Клики по телефону, email, соцсетям.
- Открытие изображений проектов, смена слайдов карусели, переключение страниц проектов.
- Открытие/закрытие lightbox, смена фото в lightbox.
- Смена слайда в офферах.
- Клики по карточкам услуг.
- Открытие FAQ.
- Открытие модального окна «Get a Quote» с указанием триггера (hero, navbar, mobile menu, projects).

### Серверная часть
- `/api/track` (GET — IP/geo контекст, POST — Meta CAPI).
- `/api/get-a-quote` и `/api/contact-us` отправляют Meta CAPI события Lead + form_submission с хешированными user data и eventId для дедупликации.

---

## 3. Изменения UI по запросу клиента

### CTA-кнопки hero-секций (toggle + slide)
- Email и phone кнопки с анимацией раскрытия значения (contact-buttons.tsx).
- Иконка email переключается (Mail → MailOpen) при hover, анимация звонка для phone.

### Навигация (navbar)
- Рефакторинг layout: navbar меньше и выровнен с логотипом.
- Логотип REDCORE (новый SVG).
- Подменю услуг в мобильном меню (ссылки на 5 страниц услуг).
- Мобильное меню: email-кнопка красная с округлыми углами (как phone).
- Отслеживание кликов для аналитики.

### Главная страница (hero)
- Обновлено изображение hero-секции на более качественное.
- Добавлены sr-only «across Massachusetts», обновлено описание.

### Иконки в секции услуг
- Исправлена проблема серого цвета под 2 из 4 логотипов.

### Проекты
- Сущность «project» поддерживает больше изображений, отображение в виде карусели.
- Все проекты рендерятся в SSR DOM (для SEO), неактивные страницы скрываются через CSS.
- Улучшены alt-тексты и локация проекта.

### «Our Offers»
- Пересортировка карточек (order values).
- Обновлены alt-тексты офферов с SEO-ключами.
- Заголовки переведены в `<h2>`.

### Модальное окно «Get a Quote»
- Обновлены значения select: offer и service (согласно новым данным).
- «Slab / Foundation Cutting» → «Slab / Asphalt Cutting».
- Добавлена воронка трекинга (открытие, поля, отправка, отказ).

### Шрифт
- Адаптация под новый шрифт от дизайнера (inter, microgramma, urbanist, montserrat).

### Унификация 4 страниц услуг
- Единый формат (title + description), одинаковая структура метаданных, JSON-LD, FAQ.

### Hero для мобильных
- Адаптация hero-секций для телефонов (изображения, размеры, приоритет загрузки).

### Футер
- Добавлены ссылки на 5 страниц услуг.
- Соцсети: Instagram, Google Business Profile, «Оставить отзыв в Google».
- Форма консультации с воронкой трекинга и отправкой в Meta CAPI.
- Обновлены alt-тексты изображений about us.

### Другие UI-улучшения
- Lightbox: улучшенная навигация, трекинг, alt-тексты.
- BlurImage: корректное отображение приоритетных изображений.
- Секции (Why Choose Us, Feedbacks, Offers, FAQ, Our Services, Our Projects) — заголовки переведены в семантические h2/h3.
- Добавлены id для секций (hero, faq, feedbacks, why-choose-us) для трекинга и навигации.

---

## Итоговая стоимость

**300 EURO** — за все перечисленные работы (SEO-оптимизация + Keywords, трекинг на сайте, UI-изменения).
