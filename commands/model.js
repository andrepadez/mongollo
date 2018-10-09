const fs = require('fs')
const path = require('path')
const plural = require('plural')

const templatePath = path.join(__dirname, '..', 'templates')

module.exports = ([ modelName, where = './' ]) => {
  const lowerCaseSingular = modelName.uncapitalize()
  const upperCaseSingular = modelName.capitalize()
  const lowerCasePlural = plural(lowerCaseSingular, 2)
  const upperCasePlural = plural(upperCaseSingular, 2)

// console.log(Object.keys(fs))
  fs.readdir(templatePath, (err, files) => {
    where = path.join(process.cwd(), where, upperCasePlural)
    fs.mkdir(where, (err) => {
      if(err && err.errno !== -17){
        console.error('unable to create directory', where)
        process.exit(1)
      }
      let count = 0
      files.forEach(file => {
        const destFile = path.join(where, file.replace('.jst', '.js'))
        file = path.join(templatePath, file)
        fs.readFile(file, (err, data) => {
          const output = data.toString()
            .replace(/\{\{lower-case-singular\}\}/g,lowerCaseSingular)
            .replace(/\{\{lower-case-plural\}\}/g,lowerCasePlural)
            .replace(/\{\{upper-case-singular\}\}/g,upperCaseSingular)
            .replace(/\{\{upper-case-plural\}\}/g,upperCasePlural)
          fs.writeFile(destFile, output, () => {
            console.log('wrote', destFile)
            if(++count === files.length){
              console.log('success')
            }
          })
        })
      })
    })
  })
}


