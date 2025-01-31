# PrivacyHub Frontend

Welcome to the frontend repository for PrivacyHub, a smart home control hub focused on enhancing user privacy.

## Overview
The frontend of PrivacyHub is a web application built with Svelte, designed to provide an intuitive and interactive user interface for managing smart home devices. It allows users to control their devices, visualize data, and adjust privacy settings in real-time.

## Key Features
- Local and Online Access: Control your devices from within your home network or remotely via the internet.
- Privacy States: Manage device access with three privacy states—Local, Online, and Online-Shared.
- Data Visualization: View historical data of your device states and interactions.
- Responsive Design: Access the interface from various devices including desktops, tablets, and smartphones.

## Installing dependencies

`npm install`

## Running the application

`npm run dev`

## Usage
### Accessing the Interface
- **Local Mode**: Access the interface within your home network by navigating to the local IP address of the PrivacyHub.
- **Online Mode**: Access remotely via the URL provided by the NGROK service.

### Privacy States
- **Local**: Device accessible only within the local network.
- **Online**: Device accessible from anywhere with an internet connection.
- **Online-Shared**: Device can be paired with third-party hubs (e.g., Amazon Alexa).

### Data Visualization
The frontend uses D3.js for displaying historical data. Navigate to the "History" section to view detailed plots and interact with the data.
