# FMWebStudio
FM WEBSTUDIO
============

OVERVIEW
FM WebStudio is a responsive portfolio and service website for a freelance
front-end web developer. It presents services, sample projects, website
packages, maintenance options, add-ons, and contact details.

PROJECT STRUCTURE
The project uses the following folder layout. Keep the Assert folder beside
the files folder so the image paths continue to work.

FM WEB STUDIO/
|-- Assert/
|   |-- FM WebStudio Logo.png
|   |-- FitMomentum.png
|   |-- Car Rental.png
|   |-- DriveX.png
|   |-- pic.jpeg
|   `-- coding.webp
`-- files/
	|-- index.html
	|-- style.css
	|-- script.js
	`-- README.text

RUNNING THE SITE
Open files/index.html in a web browser. No build step or package installation
is required. Deploy the files and Assert folders together, preserving their
relative locations.

FEATURES
- Responsive navigation menu with active-section highlighting.
- Service descriptions and a portfolio featuring FitMomentum, FM Car Rentals,
  and DriveX.
- Website package pricing, monthly maintenance details, and add-on pricing.
- Contact form with name, email, and message validation.
- WhatsApp contact link and pre-filled package inquiry messages.
- Responsive layout and reduced-motion support.

CONTACT AND FORM SETTINGS
Edit the CONFIG object near the top of files/script.js to change the WhatsApp
number, default WhatsApp message, or Formspree form endpoint. The email address
is set in files/index.html.

EXTERNAL SERVICES
Google Fonts are loaded from Google Fonts and require an internet connection.
The contact form submits to the Formspree endpoint configured in script.js.

