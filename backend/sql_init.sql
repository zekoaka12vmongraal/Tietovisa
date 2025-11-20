-- Luo taulut questions ja results (suorita Supabase SQL Editorissa)
create table if not exists questions (
  id bigserial primary key,
  category text,
  question text,
  option_a text,
  option_b text,
  option_c text,
  option_d text,
  correct_answer text
);

create table if not exists results (
  id bigserial primary key,
  username text,
  category text,
  correct_answers int,
  time_seconds int,
  created_at timestamptz default now()
);

-- Esimerkkikysymyksiä (lisää kaikkiaan vähintään 10 per aihe)
insert into questions (category, question, option_a, option_b, option_c, option_d, correct_answer) values
('FullStack','Mikä on HTTP-protokollan oletusportti (ei HTTPS)?','80','443','8080','21','A'),
('FullStack','Mikä seuraavista on frontend-kirjasto?','Express','React','Django','Flask','B'),
('FullStack','Mikä tietokanta on relaatiotietokanta?','MongoDB','PostgreSQL','Redis','ElasticSearch','B'),
('FullStack','Mihin käytetään CSS:ää?','Tietokannan hallintaan','Sivun tyyliin','Palvelinlogiikkaan','Reititykseen','B'),
('FullStack','Mikä on REST?','Tietokantatyyppi','HTTP-arkkitehtuurityyli','CSS-framework','JS-kääre','B'),
('FullStack','Mikä on Node.js?','Java-kirjasto','Palvelinympäristö JavaScriptille','Tietokanta','CSS-preprosessor','B'),
('FullStack','Mikä työkalu rakentaa frontend-projekteja usein nopeasti (dev server)?','Vite','Gulp','Webpack (vain)','MySQL','A'),
('FullStack','Mikä on JSON?','Kuvaformaatti','Tietokantamoottori','Dataformaatti','Ohjelmointikieli','C'),
('FullStack','Mikä seuraavista on versiohallintajärjestelmä?','Docker','Git','Nginx','Jenkins','B'),
('FullStack','Mikä merkintäkieli sopii verkkosivun sisällön rakenteeseen?','HTML','SQL','SVG','BASH','A'),

('Historia','Missä vuonna World War II päättyi?','1945','1939','1918','1963','A'),
('Historia','Kuka oli Neuvostoliiton johtaja toisen maailmansodan aikana?','Lenin','Gorbatsov','Stalin','Khrushev','C'),
('Historia','Missä tapahtui Ranskan vallankumous?','Bordeaux','Versailles','Pariisi','Lyon','C'),
('Historia','Mikä oli Rooman pääkaupunki muinaisessa valtakunnassa?','Constantinopolis','Rooma','Ateena','Pompeiji','B'),
('Historia','Kuka tunnetaan Rautarouvana?','Theresa May','Margaret Thatcher','Angela Merkel','Indira Gandhi','B'),
('Historia','Milloin Suomen itsenäisyysjulistus annettiin (vuosi)?','1917','1905','1920','1919','A'),
('Historia','Mikä muinainen sivilisaatio rakensi pyramideja?','Roomalaiset','Egyptiläiset','Babylonialaiset','Kreetalaiset','B'),
('Historia','Kuka maalasi Mona Lisan?','Michelangelo','Raphael','Leonardo da Vinci','Donatello','C'),
('Historia','Mikä tapahtuma käynnisti ensimmäisen maailmansodan?','Saksan hyökkäys Belgiaan','Sarajevon laukaukset','Versaillesin sopimus','Potsdamin konferenssi','B'),
('Historia','Mikä oli muinaisen Kreikan jumalten pääkaupunki?','Olympus','Sparta','Ateena','Troy','A'),

('Elokuvat','Kuka ohjasi elokuvan Jaws?','Steven Spielberg','Martin Scorsese','Stanley Kubrick','Francis Ford Coppola','A'),
('Elokuvat','Mikä elokuva voitti parhaan elokuvan Oscarin vuonna 1994?','Pulp Fiction','Forrest Gump','The Shawshank Redemption','Four Weddings and a Funeral','B'),
('Elokuvat','Kuka näytteli pääosaa elokuvassa Titanic?','Brad Pitt','Leonardo DiCaprio','Tom Hanks','Johnny Depp','B'),
('Elokuvat','Mikä elokuvagenre keskittyy jännitykseen ja yllätyksiin?','Koomedia','Trilleri','Musikaali','Dokumentti','B'),
('Elokuvat','Mikä studio tuotti Star Wars -alkuperäistrilogian?','Warner Bros.','Lucasfilm/20th Century Fox','Paramount','Universal','B'),
('Elokuvat','Kuka esitti pääosan elokuvassa The Matrix?','Keanu Reeves','Will Smith','Tom Cruise','Matt Damon','A'),
('Elokuvat','Mikä on elokuvan score?','Kuvauspaikka','Musiikki/elokuvasävellys','Käsikirjoitus','Kuvaaja','B'),
('Elokuvat','Missä kaupungissa Sundance järjestetään?','Los Angeles','Park City, Utah','New York','Miami','B'),
('Elokuvat','Kuka ohjasi Pulp Fiction?','Quentin Tarantino','Guy Ritchie','Tim Burton','Ridley Scott','A'),
('Elokuvat','Mikä elokuva tunnetaan nimellä The Godfather suomeksi?','Kummisetä','Hyvä, paha ja ruma','Seitsemän veljestä','Koskinen','A');
