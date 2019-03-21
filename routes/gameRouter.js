const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authenticate = require("../authenticate");
const cors = require("./cors");

const Games = require("../models/games");

const gameRouter = express.Router();

gameRouter.use(bodyParser.json());

gameRouter
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(cors.cors, (req, res, next) => {
    Games.find(req.query)
      .populate("comments.author")
      .then(
        games => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(games);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Games.create(req.body)
        .then(
          game => {
            console.log("Game created ", game);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(game);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("PUT operation not supported on /games");
    }
  )

  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Games.remove({})
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

gameRouter
  .route("/:gameId")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })

  .get(cors.cors, (req, res, next) => {
    Games.findById(req.params.gameId)
      .populate("comments.author")
      .then(
        game => {
          console.log("Game created ", game);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(game);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })

  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      res.statusCode = 403;
      res.end("POST operation not supported on /games/" + req.params.gameId);
    }
  )

  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Games.findByIdAndUpdate(
        req.params.gameId,
        {
          $set: req.body
        },
        {
          new: true
        }
      )
        .then(
          game => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(game);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  )

  .delete(
    cors.corsWithOptions,

    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Games.findByIdAndRemove(req.params.gameId)
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

//////////////

module.exports = gameRouter;
