import app from './app'
import config from './utils/config'

app.listen(config.API_PORT, () => console.log(`server running on port ${config.API_PORT}`))
