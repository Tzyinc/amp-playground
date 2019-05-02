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
                                value: 'asdfggggg',
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
    initData: initData,
    fetchTest: fetchTest,
    fetch: fetch,
    update: update,
};