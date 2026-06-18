const axios = require('axios')
const nsfw = require('nsfwjs')
const tf = require('@tensorflow/tfjs-node')

let aiModel

async function init() {
    console.log('Booting up NSFW model...')
    aiModel = await nsfw.load()
    console.log('Model is ready')
}

async function analyze(imgUrl) {
    const res = await axios.get(imgUrl, { 
        responseType: 'arraybuffer',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    })
    
    const tensor = tf.node.decodeImage(Buffer.from(res.data), 3)
    const predictions = await aiModel.classify(tensor)
    tensor.dispose()
    
    return predictions
}

module.exports = { init, analyze }
