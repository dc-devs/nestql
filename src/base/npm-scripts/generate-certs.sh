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
mkcert -days 36500 -key-file ./src/base/docker/certs/key.pem -cert-file ./src/base/docker/certs/cert.pem 'localhost' 'local.nestql.com'

echo "Certificate setup complete!"