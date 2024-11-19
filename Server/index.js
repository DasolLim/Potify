const express = require('express');
const { createConnection } = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// FIRST cd to the DUMP folder
// THEN TO RUN THE SCRIPT RUN: 'node db.js'

// HOW TO USE:
// do 'npm i mysql' to download dependencies
// also do 'npm -y' to initialize package.json
const connection = createConnection({
    host: 'localhost',
    user: 'root',
    // CHANGE WITH YOUR MYSQL PASSWORD
    // *** ALSO NEED THE DATABASE CREATED IN MYSQL WORKBENCH
    password: '123!@#QWEasdzxc',
    database: 'Potify',
    port: 3306,
});

connection.connect();

// 1) This will match each listener with an album depending on their initial preferred genre
// THIS USES QUERY #1 FROM ASSIGNMENT 3
app.get('/api/listenersPreferredGenre', (req, res) => {
    connection.query(`WITH PlaylistGenres AS (
        SELECT
            ps.playlistID,
            s.genre AS playlistMostCommonGenre,
            RANK() OVER (PARTITION BY ps.playlistID, s.genre ORDER BY COUNT(*) DESC) AS genreRank
        FROM
            PlaylistSongs ps
        JOIN ArtistAlbum aa ON ps.playlistID = aa.playlistID
        JOIN Song s ON aa.artistID = s.artistID
        GROUP BY ps.playlistID, s.genre
    ),
    UserGenreMatch AS (
        SELECT
            u.username,
            u.userType,
            pg.playlistMostCommonGenre
        FROM
            User u
        JOIN PlaylistGenres pg ON u.genrePref = pg.playlistMostCommonGenre
        WHERE u.userType = 'l'
    )
    SELECT
        playlistMostCommonGenre,
        COUNT(username) AS numberOfUsers
    FROM UserGenreMatch
    GROUP BY playlistMostCommonGenre
    ORDER BY numberOfUsers DESC;`, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(results);
        }
    });
});