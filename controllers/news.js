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
    base: '',
  },

  {
    name: 'Cointelegraph',
    url: 'https://cointelegraph.com',
    base: 'https://cointelegraph.com',
  },

  {
    name: 'Tradingview',
    url: 'https://www.tradingview.com/markets/cryptocurrencies/news/',
    base: '',
  },

  {
    name: 'livemint',
    url: 'https://www.livemint.com/amp-market/cryptocurrency',
    base: 'https://www.livemint.com',
  },

  {
    name: 'business insider',
    url: 'https://markets.businessinsider.com/cryptocurrencies',
    base: 'https://market.businessinsider.com',
  },

  {
    name: 'fxstreet',
    url: 'https://www.fxstreet.com/cryptocurrencies',
    base: '',
  },

  {
    name: 'Todayonchain',
    url: 'https://www.todayonchain.com/',
    base: '',
  },
  {
    name: 'bitcoin',
    url: 'https://dailycoin.com/bitcoin-news/',
    base: '',
  },

  {
    name: 'Altcoins',
    url: 'https://dailycoin.com/altcoin-news/',
    base: '',
  },

  {
    name: 'coindoo',
    url: 'https://coindoo.com/news/',
    base: '',
  },

  {
    name: 'zycrypto',
    url: 'https://zycrypto.com/category/news/',
    base: '',
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
            url: news.base + url,
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

const getNewsById = async (req, res) => {
  const newsId = req.params.newsId;
  const news = cryptoNews.filter((news) => news.id == newsId);
  res.status(StatusCodes.OK).json(news);
};

// const getNewsByName = async (req, res) => {
//   console.log(req.params.newsName);
// };

const searchNews = async (req, res) => {
  const searchParams = req.params;

  res.status(StatusCodes.OK).json('searching home');
};

module.exports = {
  getAllNews,
  getNewsById,
  searchNews,
  // getNewsByName,
};
