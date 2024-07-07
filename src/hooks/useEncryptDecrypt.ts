import CryptoJS from 'crypto-js'

export const useEncryptDecrypt = ({
	message,
	secretKey = 'wordle',
}: {
	message: string
	secretKey?: string
}) => {
	return {
		encrypt: CryptoJS.Rabbit.encrypt(message, secretKey).toString(),
		decrypt: CryptoJS.Rabbit.decrypt(message, secretKey).toString(
			CryptoJS.enc.Utf8
		),
	}
}

