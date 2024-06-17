import { MET } from 'bing-translate-api'

export const wordLength = 5
export const rowCount = 5

MET.translate('你好，很高兴认识你！', null, ['en', 'ja'])
	.then(res => {
		console.log(res)
	})
	.catch(err => {
		console.error(err)
	})
