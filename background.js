// Phishing blacklist
const blacklist = [
    "http://0000000000000000000000000.findyourjacket.com",
"http://00000000000000000000000.fielty.mx",
"http://00000000000000000update.emy.ba",
"http://0000000000c0.x9xcax2a.workers.dev",
"http://00000002.c1.biz",
"http://0.00000.life/paypal/login.html",
"http://0000-1t8.pages.dev",
"http://0.0.0.0forum.cryptonight.net",
"http://0000h00003.byethost7.com/?i=1",
"http://0.0.0.0mailgate.cryptonight.net",
"http://0.0.0.0ns10.cryptonight.net",
"http://0.0.0.0ssl.cryptonight.net",
"http://0001.353527440.workers.dev",
"http://0001home.webflow.io",
"http://0006.mediafirew.xyz",
"http://000717-coinbase.com",
"http://0007854.atwebpages.com/desk/index.html",
"http://000811893962007154932393170597959432.hanefra7bikiemta.com",
"http://0009aak.pages.dev",
"http://0.0.0assets.cryptonight.net",
"http://000chgojhd78jhvbwreuvk.webnode.com",
"http://0.0.0dbs.cryptonight.net",
"http://000ficohs99onli22.125mb.com",
"http://0.0.0fileserver.cryptonight.net",
"http://000l34e.wcomhost.com/?fbclid=IwAR0bTLKRzZoi5OU7l2Jy29nIPaepITsvtkgGMXlTLwh8x-wn6Yj6mmFqRRU",
"http://000m8ih.wcomhost.com/mama/0f78b/index_2.html",
"http://000m8ih.wcomhost.com/mama/23a2c/index_2.html",
"http://000m8ih.wcomhost.com/mama/53c3e/index_2.html",
"http://000m8ih.wcomhost.com/mama/adee9/index_2.html",
"http://000m8ih.wcomhost.com/mama/c4fce/index_2.html",
"http://000m8ih.wcomhost.com/nass1/072b7/index_2.html",
"http://000m8ih.wcomhost.com/nass1/19423/index_2.html",
"http://000m8ih.wcomhost.com/nass1/288f1/index_2.html",
"http://000m8ih.wcomhost.com/nass1/36388/index_2.html",
"http://000m8ih.wcomhost.com/nass1/44739/index_2.html",
"http://000m8ih.wcomhost.com/nass1/575bd/index_2.html",
"http://000m8ih.wcomhost.com/nass1/a2554/index_2.html",
"http://000m8ih.wcomhost.com/nass1/b412b/index_2.html",
"http://000m8ih.wcomhost.com/nass1/c5487/index_2.html",
"http://000m8ih.wcomhost.com/nass1/c6b64/index_2.html",
"http://000m8ih.wcomhost.com/nass1/fe249/index_2.html",
"http://000m8ih.wcomhost.com/papa/24083/index_2.html",
"http://000m8ih.wcomhost.com/papa/3d7bf/index_2.html",
"http://000m8ih.wcomhost.com/papa/98ed0/index_2.html",
"http://000m8ih.wcomhost.com/papa/b6f27/index_2.html",
"http://000m8ih.wcomhost.com/papa/c12e7/index_2.html",
"http://000m8ih.wcomhost.com/papa/c4eed/index_2.html",
"http://0.0.0mail3.cryptonight.net",
"http://0.0.0ns6.cryptonight.net",
"http://000nt6r.wcomhost.com/suspension/home/check/valid/access",
"http://000o2ba.wcomhost.com/mail/good/customer_center/customer-IDPP00C435/myaccount/signin",
"http://000o2ba.wcomhost.com/mail/good/customer_center/customer-IDPP00C443/myaccount/signin",
"http://000o5eh.wcomhost.com/admin/customer_center/customer-IDPP00C352/myaccount/signin/?locale.x=en_",
"http://000o5eh.wcomhost.com/logssss/customer_center/customer-IDPP00C332/myaccount/signin/?locale.x=en_",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/085a79cda16f5e151892fc6d32ab48ae/codigo_incorrecta.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/085a79cda16f5e151892fc6d32ab48ae/firma_electronica.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/085a79cda16f5e151892fc6d32ab48ae/Mi_cuenta.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/085a79cda16f5e151892fc6d32ab48ae/Phone_Number.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/085a79cda16f5e151892fc6d32ab48ae/sms_codigo.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/584afb0ead7021795f04d7a317fe3b61",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/584afb0ead7021795f04d7a317fe3b61/codigo_incorrecta.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/584afb0ead7021795f04d7a317fe3b61/firma_electronica.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/584afb0ead7021795f04d7a317fe3b61/Mi_cuenta.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/584afb0ead7021795f04d7a317fe3b61/Phone_Number.php",
"http://000o8dc.wcomhost.com/www.santanderbanco.es/bancosantander/es/particulares/Santander/584afb0ead7021795f04d7a317fe3b61/sms_codigo.php",
"http://000ogwl.wcomhost.com/fasc/admin/customer_center/customer-IDPP00C963/myaccount/signin",
"http://000ogxd.wcomhost.com/loggss/customer_center/customer-IDPP00C899/myaccount/signin",
"http://000ogxd.wcomhost.com/logs/customer_center/customer-IDPP00C557/myaccount/signin",
"http://000ogxd.wcomhost.com/logssss/customer_center/customer-IDPP00C196/myaccount/signin",
"http://000ogxd.wcomhost.com/loogs/customer_center/customer-IDPP00C844/myaccount/signin",
"http://000ogxd.wcomhost.com/mass/customer_center/customer-IDPP00C384/myaccount/success",
"http://000ogxd.wcomhost.com/tops/customer_center/customer-IDPP00C176/myaccount/signin",
"http://000ogxd.wcomhost.com/tops/customer_center/customer-IDPP00C266/myaccount/signin",
"http://000ogxd.wcomhost.com/trustme/customer_center/customer-IDPP00C849",
"http://000oiq3.wcomhost.com/drunk/customer_center/customer-IDPP00C374/myaccount/signin"
]