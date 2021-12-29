const express = require('express');
const { StatusCodes } = require('http-status-codes');
const cheerio = require('cheerio');
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const cryptoNews = [];

const newsSources = [
  {
    name: 'Time',
    url: 'https://time.com/nextadvisor/investing/cryptocurrency/latest-crypto-news/',
  },

  {
    name: 'Cointelegraph',
    url: 'https://cointelegraph.com/markets',
  },

  {
    name: 'Tradingview',
    url: 'https://www.tradingview.com/markets/cryptocurrencies/news/',
  },
];

function fetchNews() {
  newsSources.forEach((news) => {
    axios
      .get(news.url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $('a:contains("crypto")', html).each(function () {
          const title = $(this).text();
          const url = $(this).attr('href');

          cryptoNews.push({
            id: uuidv4(),
            title,
            url,
            source: news.name,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return cryptoNews;
}
fetchNews();

const getAllNews = async (req, res) => {
  res.status(StatusCodes.OK).json({ cryptoNews, nhits: cryptoNews.length });
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
