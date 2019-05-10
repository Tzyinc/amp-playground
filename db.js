var loki = require('lokijs');
const fs = require('fs');
const path = './db.json';

var db;
var presentations;

function initDbAlways() {
    db = new loki('db.json');
    presentations = db.addCollection('presentations');
}

function initDbIfNotExist() {
    db = new loki('db.json');
    try {
        if (fs.existsSync(path)){
            db.loadDatabase({}, function() {
                presentations = db.getCollection('presentations');
                console.log(presentations.data);
                console.log('DB INITIALISED');
            })
        } else {
            presentations = db.addCollection('presentations');
        }
    } catch {
        presentations = db.addCollection('presentations');
    }
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
                        elements: [
                            {
                                value: 'asdfggggg',
                                tag: 'h1'
                            }
                        ]
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
                        elements: [
                            {
                                value: 'asdfggggg',
                                tag: 'h1'
                            }
                        ]
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
                        elements: [
                            {
                                value: 'asdfggggg',
                                tag: 'h1'
                            }
                        ]
                    }
                ],
            },
            {
                title: '4',
                layers: [
                    {
                        style: `background: linear-gradient(225deg,#00dcc0 0,#005af0 75%);`,
                        template: "fill"
                    },
                    {
                        elements: [
                            {
                                value: 'hello',
                                tag: 'h1'
                            }
                        ]
                    }
                ],
            },
            {
                title: '5',
                layers: [
                    {
                        style: `background: linear-gradient(225deg,#00dcc0 0,#005af0 75%);`,
                        template: "fill"
                    },
                    {
                        elements: [
                            {
                                value: 'asdfggggg',
                                tag: 'h1'
                            }
                        ]
                    }
                ],
            }
        ],
    });
}

function saveToDisk () {
    db.saveDatabase();
}

function fetchTest() {
    return presentations.get(1);
}

function fetch(storyTitle) {
    return presentations.findOne(storyTitle);
}

function update(data) {
    presentations.update(data);
}

module.exports = {
    initDbIfNotExist: initDbIfNotExist,
    initDbAlways: initDbAlways,
    initData: initData,
    fetchTest: fetchTest,
    fetch: fetch,
    update: update,
    saveToDisk: saveToDisk,
};