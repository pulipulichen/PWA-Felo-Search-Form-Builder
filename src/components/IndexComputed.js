// Convertor
// https://docs.google.com/spreadsheets/d/1Dt-nmoDnIny1MPqQ_4Za8CV0OpCBal4dnHxsBkbpEp4/edit?usp=sharing

export default function (app) {
  if (!app.computed) {
    app.computed = {}
  }

  app.computed.computedNameListFirstLine = function () {
    let nameListText = this.db.localConfig.nameListText.trim()
    if (nameListText === '') {
      return false
    }
    
    if (nameListText.indexOf('\n') === -1) {
      return false
    }

    let firstLine = nameListText.slice(0, nameListText.indexOf('\n')).trim()

    return firstLine
  }

  app.computed.computedNameListSeperator = function () {
    let seperator = ','
    let firstLine = this.computedNameListFirstLine
    
    if (!firstLine) {
      return false
    }

    if (firstLine.indexOf(seperator) !== -1) {
      return seperator
    }
    else {
      return '\t'
    }
  }

  app.computed.computedColumns = function () {
    let firstLine = this.computedNameListFirstLine
      if (!firstLine) {
        return []
      }

      let seperator = this.computedNameListSeperator
      if (!seperator) {
        return []
      }

      return firstLine.split(seperator).map(col => col.trim()).filter(col => col !== '')
  }

  app.computed.computedNameListArray = function () {
    let output = []

    let nameListText = this.db.localConfig.nameListText.trim()
    let lines = nameListText.split('\n')
    let columns = this.computedColumns

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().split(this.computedNameListSeperator)
        .map(v  => v.trim())

      let item = {}
      for (let j = 0; j < values.length; j++) {
        let column = columns[j]
        let value = values[j]

        item[column] = value
      }
      output.push(item)
    }

    return output
  }
  
  app.computed.namesPerPage = function () {
    return this.db.localConfig.layoutColumnNumber * 
      this.db.localConfig.layoutRowNumber
  }

  app.computed.numberOfNames = function () {
    return this.computedNameListArray.length
  }

  app.computed.numberOfPages = function () {
    return Math.floor(this.numberOfNames / this.namesPerPage)
  }

  app.computed.listRowColumnNames = function () {
    let pages = []

    let columns = []
    let row = []

    let layoutRowNumber = Number(this.db.localConfig.layoutRowNumber)
    let layoutColumnNumber = Number(this.db.localConfig.layoutColumnNumber)

    // console.log(this.db.localConfig.layoutColumnNumber)

    this.computedNameListArray.forEach((item, i) => {
      row.push(item)

      if (i % layoutRowNumber === (layoutRowNumber - 1) ) {
        columns.push(row)

        row = []

        if (columns.length === layoutColumnNumber ) {
          pages.push(columns)

          columns = []
        }
      }
    })

    // ----------

    if (row.length > 0) {
      while (row.length < layoutRowNumber) {
        row.push(null)
      }

      columns.push(row)
    }
    
    // console.log(pages)
    
    if (columns.length > 0) {
      while (columns.length < layoutColumnNumber ) {
        let emptyRow = [...this.emptyRow]
        columns.push(emptyRow)
      }

      pages.push(columns) 
    }

    // console.log(pages)

    // ----------

    // return JSON.stringify(pages)
    return pages
  }


  app.computed.emptyRow = function () {
    let row = []

    let layoutRowNumber = Number(this.db.localConfig.layoutRowNumber)

    for (let i = 0; i < layoutRowNumber; i++) {
      row.push(null)
    }

    return row
  }
}