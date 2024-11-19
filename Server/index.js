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

//make this return artist Name rather than artist ID
// 2) This will tell us how long an artist’s songs have been listened to in total. ( top 5)
app.get('/api/totalSongListenTime', (req, res) => {
    connection.query(`
    SELECT u.artistName, SUM(l.secondsSum) AS totalSecondsSum
    FROM Song s
    INNER JOIN User u ON s.artistID = u.username
    INNER JOIN (
        SELECT songID, SUM(secondsListened) AS secondsSum
        FROM ListenTime
        GROUP BY songID
    ) AS l ON s.songID = l.songID
    GROUP BY u.artistName
    LIMIT 4;`
        , (error, results) => {
            if (error) {
                res.status(500).send(error.message);
            } else {
                res.json(results);
            }
        });
});

// 3) It will group them by username and genre and add up the secondsListened for each song under that username, 
// genre combo. This will tell us how long a user listened to a specific genre.
//how long each user listened to each genre
app.get('/api/listenTimeGenre', (req, res) => {
    connection.query(`SELECT  l.username, s.genre, SUM(l.secondsListened) AS totalTime
    FROM ListenTime l, Song s
    WHERE l.songID = s.songID
    GROUP BY l.username, s.genre;`, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(results);
        }
    });
});

// 4) Finds the most listened-to genre for each user by calculating the total listening time for each genre, 
// ranking the genres within each user's partition, and then selecting the users with the top genre ‘possimus’.
app.get('/api/topListenedGenre', (req, res) => {
    connection.query(`WITH RankedGenres AS (
        SELECT
            l.username,
            s.genre,
            SUM(l.secondsListened) AS totalTime,
            ROW_NUMBER() OVER (PARTITION BY l.username ORDER BY SUM(l.secondsListened) DESC) AS genreRank
        FROM ListenTime l
        JOIN Song s ON l.songID = s.songID
        GROUP BY l.username, s.genre
    )
    SELECT username, genre
    FROM RankedGenres
    WHERE genreRank = 1 && genre = "hiphop"
    LIMIT 4;`, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(results);
        }
    });
});

// 5) This will return the songs that have been listened to by at least 1 person on a specific date.
app.get('/api/songsListenedDate', (req, res) => {
    connection.query(`SELECT * FROM Song
    WHERE EXISTS(
        SELECT 1
        FROM ListenTime
        WHERE Song.songID = ListenTime.songID && ListenTime.listenDate = '1975-10-28');`, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(results);
        }
    });
});

// 6) This will give us the #1 Potify user. 
app.get('/api/topUser', (req, res) => {
    connection.query(`SELECT username, SUM(secondsListened) AS totalListenTime 
    FROM ListenTime 
    GROUP BY username
    ORDER BY totalListenTime DESC
    LIMIT 1;`, (error, results) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(results);
        }
    });
});