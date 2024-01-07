-- Insérer des utilisateurs
INSERT INTO users (username, email, password)
VALUES
('utilisateur1', 'utilisateur1@email.com', 'motdepasse1'),
('utilisateur2', 'utilisateur2@email.com', 'motdepasse2'),
('utilisateur3', 'utilisateur3@email.com', 'motdepasse3');

-- Insérer des sujets
INSERT INTO topics (title, description)
VALUES
('Sujet 1', 'Description du sujet 1'),
('Sujet 2', 'Description du sujet 2'),
('Sujet 3', 'Description du sujet 3'),
('Sujet 4', 'Description du sujet 4'),
('Sujet 5', 'Description du sujet 5');

-- Insérer des publications
INSERT INTO posts (user_id, topic_id, title, author, topic, content)
VALUES
(1, 1, 'Titre de la publication 1', 'utilisateur1', 'Sujet 1', 'Contenu de la publication 1'),
(2, 2, 'Titre de la publication 2', 'utilisateur2', 'Sujet 2', 'Contenu de la publication 2'),
(3, 3, 'Titre de la publication 3', 'utilisateur3', 'Sujet 3', 'Contenu de la publication 3'),
(1, 4, 'Titre de la publication 4', 'utilisateur1', 'Sujet 4', 'Contenu de la publication 4'),
(2, 5, 'Titre de la publication 5', 'utilisateur2', 'Sujet 5', 'Contenu de la publication 5'),
(3, 1, 'Titre de la publication 6', 'utilisateur3', 'Sujet 1', 'Contenu de la publication 6'),
(1, 2, 'Titre de la publication 7', 'utilisateur1', 'Sujet 2', 'Contenu de la publication 7'),
(2, 3, 'Titre de la publication 8', 'utilisateur2', 'Sujet 3', 'Contenu de la publication 8'),
(3, 4, 'Titre de la publication 9', 'utilisateur3', 'Sujet 4', 'Contenu de la publication 9'),
(1, 5, 'Titre de la publication 10', 'utilisateur1', 'Sujet 5', 'Contenu de la publication 10');

-- Insérer des abonnements
INSERT INTO subscriptions (user_id, topic_id)
VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insérer des commentaires sur une publication sur deux
INSERT INTO comments (user_id, post_id, author, content)
VALUES
(1, 2, 'utilisateur1', 'Commentaire sur la publication 2'),
(2, 4, 'utilisateur2', 'Commentaire sur la publication 4'),
(3, 6, 'utilisateur3', 'Commentaire sur la publication 6'),
(1, 8, 'utilisateur1', 'Commentaire sur la publication 8'),
(2, 10, 'utilisateur2', 'Commentaire sur la publication 10');


