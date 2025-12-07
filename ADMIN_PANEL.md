# Panel Administracyjny - Dokumentacja

Bezpieczny panel administracyjny do zarządzania zawartością strony - artykułami blogowymi i case studies.

## 🚀 Funkcjonalności

### Blog Post Management
- ✅ Tworzenie nowych postów
- ✅ Edytowanie istniejących postów
- ✅ Usuwanie postów
- ✅ Wyszukiwanie po tytule
- ✅ Filtrowanie po statusie (DRAFT, PUBLISHED, ARCHIVED)
- ✅ Zarządzanie tagami
- ✅ SEO metadata (title, description)
- ✅ Kategorizacja (tech, business, design)
- ✅ Planowanie publikacji

### Case Studies Management
- ✅ Tworzenie nowych case studies
- ✅ Edytowanie case studies
- ✅ Usuwanie case studies
- ✅ Wyszukiwanie po tytule/branży
- ✅ Filtrowanie po statusie
- ✅ Zarządzanie wynikami (revenue, users, time, itp.)
- ✅ Zarządzanie tagami
- ✅ Informacje o kliencie i branży
- ✅ SEO metadata

## 🔐 Bezpieczeństwo

### Authentykacja
- **NextAuth.js** - Bezpieczna autentykacja
- **JWT Sessions** - Tokeny wygasające po 24 godzinach
- **Bcrypt** - Hasła hashowane z salt (10 rund)
- **Middleware** - Ochrona wszystkich route `/admin`

### Login Required
- Wszystkie route `/admin` wymagają sesji NextAuth
- Login page: `/admin/login`
- Automatyczne przekierowanie do logowania jeśli sesja wygasła

## 📋 Poddoręcznik Instalacji

### 1. Środowisko jest już skonfigurowane! ✓
```bash
# Zmigrowano schemat Prisma
# Zainstalowano next-auth i bcryptjs
# Stworzone wszystkie niezbędne API routes
```

### 2. Zaloguj się do panelu

**URL**: `http://localhost:3000/admin/login`

**Dane logowania:**
```
Email: admin@kpzsproductions.com
Hasło: Admin123!
```

⚠️ **WAŻNE**: Zmień hasło natychmiast po pierwszym zalogowaniu!

## 🔧 Konfiguracja

### Zmiana hasła admina

Aby zmienić hasło, edytuj bezpośrednio w bazie danych lub utwórz nowy admin user:

```bash
npm run db:seed
```

Aby zmienić email/hasło w seed scripcie, edytuj `/prisma/seed.ts`

### Environment Variables

Wymagane zmienne w `.env`:

```env
# Database
DATABASE_URL="postgres://..."

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

⚠️ W produkcji zmień `NEXTAUTH_SECRET` na losowy, silny klucz!

## 📁 Struktura Plików

```
app/
  ├── admin/
  │   ├── layout.tsx              # Layout z sidebar
  │   ├── page.tsx                # Dashboard
  │   ├── login/
  │   │   └── page.tsx            # Strona logowania
  │   ├── blog/
  │   │   ├── page.tsx            # Lista postów
  │   │   └── [id]/
  │   │       └── page.tsx        # Edycja posta
  │   └── case-studies/
  │       ├── page.tsx            # Lista case studies
  │       └── [id]/
  │           └── page.tsx        # Edycja case study
  └── api/
      └── admin/
          ├── blog-posts/
          │   ├── route.ts        # GET/POST
          │   └── [id]/
          │       └── route.ts    # GET/PUT/DELETE
          └── case-studies/
              ├── route.ts        # GET/POST
              └── [id]/
                  └── route.ts    # GET/PUT/DELETE
lib/
  ├── auth.ts                     # NextAuth konfiguracja
  └── prisma.ts                   # Prisma client
middleware.ts                     # Ochrona routes
```

## 🔌 API Routes

### Blog Posts API

**GET** `/api/admin/blog-posts` - Lista postów
```query
- page: number (default: 1)
- limit: number (default: 10)
- search: string
- status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
```

**POST** `/api/admin/blog-posts` - Utwórz post
```json
{
  "title": "string",
  "slug": "string",
  "excerpt": "string?",
  "content": "string",
  "featuredImage": "string?",
  "category": "tech" | "business" | "design",
  "tags": ["string"],
  "metaTitle": "string?",
  "metaDescription": "string?",
  "status": "DRAFT" | "PUBLISHED" | "ARCHIVED",
  "publishedAt": "ISO8601 date?"
}
```

**GET** `/api/admin/blog-posts/[id]` - Pobierz post
**PUT** `/api/admin/blog-posts/[id]` - Aktualizuj post
**DELETE** `/api/admin/blog-posts/[id]` - Usuń post

### Case Studies API

**GET** `/api/admin/case-studies` - Lista case studies
```query
- page: number (default: 1)
- limit: number (default: 10)
- search: string
- status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
```

**POST** `/api/admin/case-studies` - Utwórz case study
```json
{
  "title": "string",
  "slug": "string",
  "clientName": "string?",
  "clientIndustry": "ecommerce" | "saas" | "med",
  "problem": "string",
  "solution": "string",
  "results": { "key": "value" },
  "featuredImage": "string?",
  "tags": ["string"],
  "metaTitle": "string?",
  "metaDescription": "string?",
  "status": "DRAFT" | "PUBLISHED" | "ARCHIVED",
  "publishedAt": "ISO8601 date?"
}
```

**GET** `/api/admin/case-studies/[id]` - Pobierz case study
**PUT** `/api/admin/case-studies/[id]` - Aktualizuj case study
**DELETE** `/api/admin/case-studies/[id]` - Usuń case study

## 🎨 Styling

Panel używa Tailwind CSS z ciemnym motywem dostosowanym do brandu:

- Główny kolor: `#ffc59c` (pomarańczowy)
- Akcent: `#f8b500` (złoty)
- Cyjan: `#00bfff`
- Tło: `#0a0a0a` (czarny)

## 📝 Uwagi

### Tworzenie Nowego Posta

1. Przejdź do `/admin/blog`
2. Kliknij "Nowy Post"
3. Wypełnij wymagane pola (Tytuł, Slug, Treść)
4. Dodaj kategorie, tagi, obrazek
5. Ustaw status (DRAFT/PUBLISHED/ARCHIVED)
6. Zapisz

### Best Practices

- **Slug**: Używaj małych liter, łączników zamiast spacji
- **Content**: Obsługiwany Markdown format
- **Tags**: Jeden tag per słowo kluczowe
- **Status DRAFT**: Post nie jest widoczny na froncie
- **Status PUBLISHED**: Post dostępny dla użytkowników
- **Status ARCHIVED**: Post ukryty ale zachowany

## 🐛 Troubleshooting

### Nie mogę się zalogować
- Sprawdź czy email to: `admin@kpzsproductions.com`
- Sprawdź czy hasło to: `Admin123!`
- Uruchom `npm run db:seed` żeby stworzyć nowego admina

### Błąd "Unauthorized"
- Sesja wygasła (24h) - zaloguj się ponownie
- Sprawdź czy `NEXTAUTH_SECRET` jest ustawiony w `.env`

### Baza danych nie odpowiada
- Sprawdź `DATABASE_URL` w `.env`
- Upewnij się że baza PostgreSQL jest dostępna

## 📚 Dodatkowe Zasoby

- [NextAuth.js Dokumentacja](https://next-auth.js.org/)
- [Prisma Dokumentacja](https://www.prisma.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚨 Producja

Przed deploymentem na produkcję:

1. ✅ Zmień `NEXTAUTH_SECRET` na silny klucz (32+ znaków)
2. ✅ Zmień hasło admina na silne (min 12 znaków)
3. ✅ Ustaw `NEXTAUTH_URL` na produkcyjny URL
4. ✅ Włącz HTTPS
5. ✅ Setup zmiennych `.env` na serwerze
6. ✅ Backup bazy danych
7. ✅ Test wszystkich funkcjonalności na produkcji

---

**Utworzono:** December 7, 2025
**Wersja:** 1.0.0
**Status:** Production Ready ✓
