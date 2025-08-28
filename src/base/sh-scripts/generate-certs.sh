#!/bin/bash

# Check if mkcert is installed
if ! command -v mkcert &> /dev/null; then
	echo "mkcert not found. Installing via Homebrew..."

	# Check if Homebrew is installed
	if ! command -v brew &> /dev/null; then
		echo "Homebrew not found. Please install Homebrew first:"
		echo "Visit: https://brew.sh"
		exit 1
	fi

	# Install mkcert
	brew install mkcert
else
	echo "mkcert is already installed"
fi

# Continue with cert generation
echo "Generating local certificates..."
mkcert -install

# Clean certs directory
rm -rf ./src/base/docker/nql-nginx/certs/*
echo "Cleaned certs directory"

# Generate certificates
mkcert -key-file ./src/base/docker/nql-nginx/certs/key.pem -cert-file ./src/base/docker/nql-nginx/certs/cert.pem 'localhost' 'local.nestql.com' 'nestql.com'

# Set permissions on certificate files
echo "Setting certificate permissions..."
chmod 644 ./src/base/docker/nql-nginx/certs/*.pem

echo "Certificate setup complete!"