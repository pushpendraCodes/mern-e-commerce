
export const itemPerPage = 10;
export const price_Calc = (price ,discountPercentage)=>{
    let discountedPrice = Math.round((price - (price*discountPercentage/100)))
    return discountedPrice

}