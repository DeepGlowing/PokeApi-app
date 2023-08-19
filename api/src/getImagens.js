
const fs = require('fs');
const path = require('path');

const getImage = (req, res) => {
    const fileName = req.params.fileName

  // Ruta completa de la imagen en el servidor
  const imagePath = path.join(__dirname, '..', "src/pokeImages",  `${fileName}.png`)
  

  // Lee la imagen y la envía como respuesta
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error(err);
      
      return res.status(500).json({msg: "Error al leer el archivo " +fileName,err});
    }
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(data);
  });
};

module.exports = getImage
