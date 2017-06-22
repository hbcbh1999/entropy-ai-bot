#!/bin/bash

CERTS_DIR="cert"
CSR_COUNTRY="US"
CSR_STATE="Washington"
CSR_LOCALITY="Bellevue"
CSR_ORGANISATION="Caura Inc."
CSR_COMMON="caura.co"
CSR_NAME="myservercert"
KEYSTORE_FILE="keystore.jks"

mkdir -p $CERTS_DIR
openssl genrsa -out $CERTS_DIR/privkey.pem 4096
openssl req -new -subj "/C=$CSR_COUNTRY/ST=$CSR_STATE/L=$CSR_LOCALITY/O=$CSR_ORGANISATION/CN=$CSR_COMMON" -key $CERTS_DIR/privkey.pem -out $CERTS_DIR/csr.pem
openssl x509 -req -days 7300 -in $CERTS_DIR/csr.pem -signkey $CERTS_DIR/privkey.pem -out $CERTS_DIR/cert.pem
openssl rsa -in $CERTS_DIR/privkey.pem -pubout -out $CERTS_DIR/pubkey.pem
openssl pkcs12 -export -name $CSR_NAME -in $CERTS_DIR/cert.pem -inkey $CERTS_DIR/privkey.pem -out $CERTS_DIR/keystore.p12 -passout pass:$KEYSTORE_PASSWORD
keytool -importkeystore -noprompt -destkeystore $CERTS_DIR/$KEYSTORE_FILE -srckeystore $CERTS_DIR/keystore.p12 -srcstorepass $KEYSTORE_PASSWORD -storepass $KEYSTORE_PASSWORD -srcstoretype pkcs12 -alias $CSR_NAME
