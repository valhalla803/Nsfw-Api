const express = require('express')
const nsfwService = require('./services/nsfw')

const app = express()
app.set('json spaces', 2)
app.use(express.json())

app.post('/api/check', async (req, res) => {
    const { url, threshold = 0.5 } = req.body

    if (!url) {
        return res.status(400).json({ error: 'Missing image URL' })
    }

    try {
        const predictions = await nsfwService.analyze(url)

        const score = predictions
            .filter(p => ['Porn', 'Hentai', 'Sexy'].includes(p.className))
            .reduce((total, p) => total + p.probability, 0)

        res.json({
            success: true,
            url,
            adult_score: score,
            is_adult_content: score >= threshold,
            results: predictions
        })

    } catch (err) {
        console.error('NSFW Check Error:', err.message)
        res.status(500).json({ 
            success: false, 
            error: 'Unable to process image. Check if URL is valid.' 
        })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    await nsfwService.init()
    console.log(`Server live on port ${PORT}`)
})
