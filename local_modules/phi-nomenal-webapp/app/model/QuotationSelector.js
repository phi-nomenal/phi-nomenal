export default class QuotationSelector {

  quotations

  constructor (quotations = []) {
    this.quotations = quotations.sort(function (a, b) {
      if (a.greenness < b.greenness) {
        return -1
      }
      if (a.greenness > b.greenness) {
        return 1
      }
      return 0
    })
  }

  selectGreenness (greenness) {
    for (let quotation of this.quotations) {
      if (greenness <= quotation.greenness) {
        return quotation
      }
    }
    return this.quotations[this.quotations.length - 1]
  }
}
