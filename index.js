const compression = require('compression');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(compression());
app.use(bodyParser.json());
app.use(cors());

const resourceData = {
    'tzuyu': {
        'yes-i-am-tzuyu': {
            title: 'Yes, I am Tzuyu.',
            path: 'resource/tzuyu/yes-i-am-tzuyu/url.txt'
        },
        '4th-world-tour-tzuyu': {
            title: 'Twice 4th World Tour Tzuyu',
            path: 'resource/tzuyu/4th-world-tour-tzuyu/url.txt'
        }
    },
    'chaeyoung': {
        '4th-world-tour-chaeyoung': {
            title: 'Twice 4th World Tour Chaeyoung',
            path: 'resource/chaeyoung/4th-world-tour-chaeyoung/url.txt'
        }
    },
    'dahyun': {
        '4th-world-tour-dahyun': {
            title: 'Twice 4th World Tour Dahyun',
            path: 'resource/dahyun/4th-world-tour-dahyun/url.txt'
        }
    },
    'mina': {
        'yes-i-am-mina': {
            title: 'Yes, I am Mina.',
            path: 'resource/mina/yes-i-am-mina/url.txt'
        },
        '4th-world-tour-mina': {
            title: 'Twice 4th World Tour Mina',
            path: 'resource/mina/4th-world-tour-mina/url.txt'
        }
    },
    'jihyo': {
        'yes-i-am-jihyo': {
            title: 'Yes, I am Jihyo',
            path:'resource/jihyo/yes-i-am-jihyo/url.txt'
        },
        '4th-world-tour-jihyo': {
            title: 'Twice 4th World Tour Jihyo',
            path: 'resource/jihyo/4th-world-tour-jihyo/url.txt'
        }
    },
    'sana': {
        'yes-i-am-sana': {
            title: 'Yes, I am Sana',
            path: 'resource/sana/yes-i-am-sana/url.txt'
        }
    },
    'momo': {
        '4th-world-tour-momo': {
            title: 'Twice 4th World Tour Momo',
            path: 'resource/momo/4th-world-tour-momo/url.txt'
        }
    },
    'jeongyeon': {
        'jeongyeon-at-2019-sbs-gayo-daejun': {
            title: 'Jeongyeon at 2019 SBS Gayo Daejun',
            path: 'resource/jeongyeon/jeongyeon-at-2019-sbs-gayo-daejun/url.txt'
        }
    },
    'nayeon': {
        '4th-world-tour-nayeon': {
            title: 'Twice 4th World Tour Nayeon',
            path: 'resource/nayeon/4th-world-tour-nayeon/url.txt'
        }
    }
};

app.get('/menus', (req, res) => {
    const response = {};

    Object.keys(resourceData).forEach(key => {
        response[key] = [];
        Object.keys(resourceData[key]).forEach(keyItem => {
            response[key].push(keyItem);
        });
    });

    res.send(response);
})

app.get('/gallery/:name/:title', (req, res) => {
    const { name, title } = req.params;
    const { page, show } = req.query;
    
    if (!Object.keys(resourceData).includes(name)) {
        return res.status(404).send({});
    }

    if (!Object.keys(resourceData[name]).includes(title)) {
        return res.status(404).send({});
    }

    try {
        const { path, title: titlePage } = resourceData[name][title]

        const dataStr = fs.readFileSync(path, 'utf8');
        const data = dataStr ? dataStr.split(',') : [];

        const totalShow = show || 15;
        const currentPage = page || 1;
        const totalData = data.length;
        const totalPage = Math.ceil(totalData / totalShow);

        const start = totalShow * (currentPage - 1);
        const end = start + totalShow   
        
        if (currentPage > totalPage) {
            return res.status(404).send({});
        }

        res.send({
            title: titlePage,
            data: data.slice(start, end),
            page: Number(currentPage),
            totalShow,
            totalPage
        });

    } catch (err) {
        return res.status(404).send({});
    }

    
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('listening to ' + port);
})