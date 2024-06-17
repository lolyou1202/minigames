export const useEncryptDecrypt = (text: string, secretKey: string) => {
	let output = ''

	for (let i = 0; i < text.length; i++) {
		output += String.fromCharCode(
			text.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length)
		)
	}
	
	return output
}
