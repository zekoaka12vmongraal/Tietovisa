Tietovisa Supabase -käyttöinen versio (suomeksi, ei CSS)

Ohjeet:
1) Supabase:
   - Avaa Supabase-projektisi ja suorita backend/sql_init.sql SQL-editorissa. Tämä luo taulut ja lisää kysymykset.
   - Varmista että RLS (Row Level Security) on pois päältä tai salli anonym-key kirjoitus.

2) Backend:
   cd backend
   npm install
   node server.js
   Backend käyttää .env-arvoja tai kovakoodattuja arvoja (paiikkeilla SUPABASE_URL ja SUPABASE_ANON_KEY)

3) Frontend:
   cd frontend
   npm install
   npm run dev
   Avaa http://localhost:5173


