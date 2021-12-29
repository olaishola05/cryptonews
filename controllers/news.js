const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cheerio = require('cheerio');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const getAllNews = async (req, res) => {
  res.status(StatusCodes.OK).json('im all news');
};

const getANews = async (req, res) => {
  res.status(StatusCodes.OK).json('A single headline');
};

const searchNews = async (req, res) => {
  res.status(StatusCodes.OK).json('searching home');
};

module.exports = {
  getAllNews,
  getANews,
  searchNews,
};
