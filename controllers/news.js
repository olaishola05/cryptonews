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
    url: 'https://cointelegraph.com',
  },

  {
    name: 'Tradingview',
    url: 'https://www.tradingview.com/markets/cryptocurrencies/news/',
  },

  {
    name: 'livemint',
    url: 'https://www.livemint.com/amp-market/cryptocurrency',
  },

  {
    name: 'business insider',
    url: 'https://markets.businessinsider.com/cryptocurrencies',
  },

  {
    name: 'fxstreet',
    url: 'https://www.fxstreet.com/cryptocurrencies',
  },

  {
    name: 'Todayonchain',
    url: 'https://www.todayonchain.com/',
  },
  {
    name: 'bitcoin',
    url: 'https://dailycoin.com/bitcoin-news/',
  },

  {
    name: 'Altcoins',
    url: 'https://dailycoin.com/altcoin-news/',
  },

  {
    name: 'coindoo',
    url: 'https://coindoo.com/news/',
  },

  {
    name: 'zycrypto',
    url: 'https://zycrypto.com/category/news/',
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
          const title = $(this).text().trim();
          const url = $(this).attr('href');

          cryptoNews.push({
            id: uuidv4(),
            title,
            url,
            source: news.name,
          });
        });

        $('.td-module-thumb', html).each(function () {
          const title = $(this).find('a').attr('title');
          const url = $(this).find('a').attr('href');
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
  res.status(StatusCodes.OK).json({ nhits: cryptoNews.length, cryptoNews });
};

const getANews = async (req, res) => {
  const id = req.params.id;
  const news = await cryptoNews.filter((news) => news.id === id);
  res.status(StatusCodes.OK).json(news);
};

const searchNews = async (req, res) => {
  const { source } = req.query;

  res.status(StatusCodes.OK).json('searching home');
};

module.exports = {
  getAllNews,
  getANews,
  searchNews,
};
