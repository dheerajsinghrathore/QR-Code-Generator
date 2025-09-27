# QR Code Generator
need to geneate a qr code in node js.

please follow below instructions.

        * Ask the user to input a URL
        * Validate that URL
        * If it is invalid then display appropriate error message and terminate
        * If URL is valid , then ask the user what type of QR Code image he wants to generate ( png, svg, pdf)
        * Validate the choice
        * As per the choice of image type , generate a QR Code image of the typed URL by the same name as the main url
        * Finally it should save the generated QR Code file in a folder called qrcodes and the URL in a file called URL.txt in the same folder
    * 
    * Make sure to display all error messages in RED and all success messages in green
    * Use async-await wherever possible
    * The modules which you will need are:
        * fs
        * validator
        * chalk
        * inquirer
        * path
        * qr-image
