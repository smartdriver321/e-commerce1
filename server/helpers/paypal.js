const paypal = require('paypal-rest-sdk')

paypal.configure({
	mode: 'sandbox',
	client_id:
		'AaOGWv89nLhaFl8TObo7RTPel0St_hZRS74a_UHAolG2ExJUf1lGLXBLucMUaK-Gz7U8FoPMBvN2EBUE',
	client_secret:
		'EEfLhJSn-bUY5IHB5rXHQDqIeVoPrw71K0inkUlkFDExR6zSHbQ3muhAUsoL6_VZDDv7HDTtBrh3L0S0',
})

module.exports = paypal
