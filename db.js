var loki = require('lokijs');

var db;
var presentations;

function initDbIfNotExist() {
    db = new loki('db.json');
    presentations = db.addCollection('presentations');
}

function initData() {
    presentations.insert({
        posterPortraitSrc: '/assets/images/profile.png',
        publisher: 'tenzy',
        publisherLogoSrc: '/assets/images/profile.png',
        title: 'AMP Conf',
        globalStyle: 'color: white;',
        pages: [
            {
                title: '1',
                layers: [
                    {
                        style: `background: linear-gradient(225deg,#00dcc0 0,#005af0 75%);`,
                        template: "fill"
                    },
                    {
                        content: '<h1>asdfg</h1>'
                    }
                ],
            },
            {
                title: '2',
                layers: [
                    {
                        style: `background: linear-gradient(225deg,#00dcc0 0,#005af0 75%);`,
                        template: "fill"
                    },
                    {
                        content: '<h2>the d</h2>'
                    }
                ],
            },
            {
                title: '3',
                layers: [
                    {
                        style: `background: linear-gradient(225deg,#00dcc0 0,#005af0 75%);`,
                        template: "fill"
                    },
                    {
                        content: '<h3>the end<h3>'
                    }
                ],
            }
        ],
    });
}

function fetchTest() {
    return presentations.get(1);
}

module.exports = {
    initDbIfNotExist: initDbIfNotExist,
    initData: initData,
    fetchTest: fetchTest,
};