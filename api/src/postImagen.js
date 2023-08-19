
const fs = require('fs');
const path = require('path');

// Ruta POST para subir y guardar una imagen
const uploadImage = ((req, res) => {

  try {
    console.log(req.body)

   
    const imagePath = path.join(__dirname,  "../src/pokeImages",  fileName);
    const imageBuffer = Buffer.from(imageData, 'base64');

    fs.writeFileSync(imagePath, imageBuffer);

   
 
    return res.status(200).json({ message: 'Imagen subida exitosamente' });
}
   catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = uploadImage